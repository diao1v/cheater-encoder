import { manifestValuesType } from '../helpers/types'
import { getUnixTime } from '../helpers/time-conversion'

// need to calculate the following values:
// startNumber: changed after start move out of DVR window
// S@t: changed after start move out of DVR window
// S@r: changed after Live start; but not changed after start move out of DVR window
// situation Live to VoD conversion
export const calculateNewManifestValues = (
  manifestValues: manifestValuesType,
  currentTime: string
) => {
  let calculatedManifestValues: manifestValuesType = {
    ...manifestValues,
  }
  // calculate the values for VoD
  if (
    manifestValues.eventType === 'vod' &&
    manifestValues.segmentTimelineRepeat === 0
  ) {
    // mediaPresentationDuration equals to all persion duration total
    calculatedManifestValues.mediaPresentationDuration =
      manifestValues.periodDuration
    
    calculatedManifestValues.segmentTimelineRepeat =
      Math.floor(
        manifestValues.periodDuration /
          (manifestValues.segmentDuration / manifestValues.timescale)
      ) - 1
  }

  const currentTimeUnix = getUnixTime(currentTime)
  const liveStartTimeUnix = getUnixTime(manifestValues.availabilityStartTime)
  const currentLiveLength = currentTimeUnix - liveStartTimeUnix

  // return the raw values if the Live event just started
  if (manifestValues.eventType !== 'vod' && currentLiveLength === 0) {
  }

  // calculate the new values for Live
  // before Live start move out of DVR window
  // S@r changed
  if (
    manifestValues.eventType !== 'vod' &&
    currentLiveLength < manifestValues.timeShiftBufferDepth &&
    manifestValues.liveToVod === false
  ) {
    const updatedSegmentTimelineRepeat =
      Math.floor(
        currentLiveLength /
          (manifestValues.segmentDuration / manifestValues.timescale)
      ) - 1
    calculatedManifestValues.segmentTimelineRepeat =
      updatedSegmentTimelineRepeat > 0 ? updatedSegmentTimelineRepeat : 0
  }

  // calculate the new values for Live
  // after Live start move out of DVR window
  // startNumber and S@t changed
  // S@r changed
  if (
    manifestValues.eventType !== 'vod' &&
    currentLiveLength >= manifestValues.timeShiftBufferDepth &&
    manifestValues.liveToVod === false
  ) {
    const updatedStartNumber = Math.floor(
      (currentLiveLength - manifestValues.timeShiftBufferDepth) /
        (manifestValues.segmentDuration / manifestValues.timescale)
    )
    const updatedSegmentStartTime =
      (currentLiveLength - manifestValues.timeShiftBufferDepth) *
      manifestValues.timescale

    const updatedSegmentTimelineRepeat =
      Math.floor(
        manifestValues.timeShiftBufferDepth /
          (manifestValues.segmentDuration / manifestValues.timescale)
      ) - 1

    calculatedManifestValues.segmentStartNumber = updatedStartNumber
    calculatedManifestValues.segmentStartTime = updatedSegmentStartTime
    calculatedManifestValues.segmentTimelineRepeat =
      updatedSegmentTimelineRepeat
  }

  // calculate the new values for Live to VoD conversion
  if (
    manifestValues.eventType === 'live-to-vod' &&
    manifestValues.liveToVod === true
  ) {
    calculatedManifestValues.manifestType = 'static'
    const segmentsLengthinDVRWindow =
      (calculatedManifestValues.segmentDuration /
        calculatedManifestValues.timescale) *
      (calculatedManifestValues.segmentTimelineRepeat + 1)

    calculatedManifestValues.mediaPresentationDuration = segmentsLengthinDVRWindow
    calculatedManifestValues.periodDuration = segmentsLengthinDVRWindow
  }

  return {
    ...calculatedManifestValues,
  }
}
