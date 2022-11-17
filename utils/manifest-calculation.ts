import { manifestValuesType } from '../helper/types'
import { getUnixTime } from './time-conversion'

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
  // calculate the new values for VoD
  if (
    manifestValues.menifestType === 'static' &&
    manifestValues.segmentTimelineRepeat === 0
  ) {
    calculatedManifestValues.segmentTimelineRepeat =
      Math.floor(
        manifestValues.periodDuration /
          (manifestValues.segmentDuration / manifestValues.timescale)
      ) - 1
  }

  const currentTimeUnix = getUnixTime(currentTime)
  const liveStartTimeUnix = getUnixTime(manifestValues.availabilityStartTime)
  const currentLiveLength = currentTimeUnix - liveStartTimeUnix

  // calculate the new values for Live when Live just started
  if (manifestValues.menifestType === 'dynamic' && currentLiveLength === 0) {
  }

  // calculate the new values for Live
  // before Live start move out of DVR window
  // S@r changed
  if (
    manifestValues.menifestType === 'dynamic' &&
    currentLiveLength < manifestValues.timeShiftBufferDepth
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
    manifestValues.menifestType === 'dynamic' &&
    currentLiveLength >= manifestValues.timeShiftBufferDepth
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

  return {
    ...calculatedManifestValues,
  }
}
