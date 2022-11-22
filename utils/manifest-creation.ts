import { manifestValuesType } from '../helper/types'
import { writeFileSync, existsSync, mkdirSync } from 'fs'
import { convertSecToTimespan } from '../utils/time-conversion'
import path from 'path'
import { putManifestValuesToCache } from './cache'
import { calculateNewManifestValues } from './manifest-calculation'

const createLiveManifestContent = (
  manifestValues: manifestValuesType,
  currentTime: string
): string => {
  const {
    manifestId,
    baseURL,
    fileBaseName,
    availabilityStartTime,
    minimumUpdatePeriod,
    minBufferTime,
    timeShiftBufferDepth,
    suggestedPresentationDelay,
    timescale,
    segmentPresentationTimeOffset,
    segmentStartNumber,
    segmentStartTime,
    segmentDuration,
    manifestType: menifestType,
    segmentTimelineRepeat,
  } = manifestValues

  const miniBufferTimeToFormate = convertSecToTimespan(minBufferTime)
  const timeShiftBufferDepthToFormate =
    convertSecToTimespan(timeShiftBufferDepth)
  const suggestedPresentationDelayToFormate = convertSecToTimespan(
    suggestedPresentationDelay
  )
  const minimumUpdatePeriodToFormate = convertSecToTimespan(minimumUpdatePeriod)

  const manifest = `<?xml version="1.0" encoding="UTF-8"?>
  <MPD xmlns="urn:mpeg:dash:schema:mpd:2011" xsi:schemaLocation="urn:mpeg:dash:schema:mpd:2011 http://standards.iso.org/ittf/PubliclyAvailableStandards/MPEG-DASH_schema_files/DASH-MPD.xsd" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" id="${manifestId}" profiles="urn:mpeg:dash:profile:isoff-live:2011,http://dashif.org/guidelines/dash264" type="${menifestType}" availabilityStartTime="${availabilityStartTime}" publishTime="${currentTime}" minimumUpdatePeriod="PT${minimumUpdatePeriodToFormate}" minBufferTime="PT${miniBufferTimeToFormate}" timeShiftBufferDepth="PT${timeShiftBufferDepthToFormate}" suggestedPresentationDelay="PT${suggestedPresentationDelayToFormate}">
     <BaseURL>${baseURL}</BaseURL>
    <Period id="1" start="PT0S" bitstreamSwitching="true">
      <AdaptationSet mimeType="video/mp4" segmentAlignment="true">
         <Representation width="1280" height="720" frameRate="2400/100" codecs="avc1.4d401f" id="${fileBaseName}" bandwidth="1485978">
          <SegmentTemplate timescale="${timescale}" presentationTimeOffset="${segmentPresentationTimeOffset}" startNumber="${segmentStartNumber}" media="$RepresentationID$_$Number$.mp4" initialization="$RepresentationID$_init.mp4">
            <SegmentTimeline>
              <S t="${segmentStartTime}" d="${segmentDuration}" r="${segmentTimelineRepeat}"></S>
            </SegmentTimeline>
          </SegmentTemplate>
        </Representation>
      </AdaptationSet>
    </Period>
  </MPD>`

  return manifest
}

const createVodManifestContent = (
  manifestValues: manifestValuesType,
  currentTime: string
): string => {
  const {
    manifestId,
    baseURL,
    minBufferTime,
    fileBaseName,
    timescale,
    segmentPresentationTimeOffset,
    segmentPresentationTimeOffsetDiff,
    segmentStartNumber,
    segmentStartTime,
    segmentDuration,
    segmentTimelineRepeat,
    manifestType: menifestType,
    periodDuration,
    vodPeriodStart,
  } = manifestValues

  const perdiodDurationToFormate = convertSecToTimespan(periodDuration)
  const miniBufferTimeToFormate = convertSecToTimespan(minBufferTime)
  const vodPeriodStartToFormate = convertSecToTimespan(vodPeriodStart)

  const adjustedSegmentPresentationTimeOffset =
    segmentPresentationTimeOffsetDiff
      ? segmentStartTime
      : segmentPresentationTimeOffset

  const manifest = `<?xml version="1.0" encoding="UTF-8"?>
  <MPD xmlns="urn:mpeg:dash:schema:mpd:2011" xsi:schemaLocation="urn:mpeg:dash:schema:mpd:2011 http://standards.iso.org/ittf/PubliclyAvailableStandards/MPEG-DASH_schema_files/DASH-MPD.xsd" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" id="${manifestId}" profiles="urn:mpeg:dash:profile:isoff-live:2011,http://dashif.org/guidelines/dash264" minBufferTime="PT${miniBufferTimeToFormate}" type="${menifestType}" mediaPresentationDuration="PT${perdiodDurationToFormate}" publishTime="${currentTime}" >
     <BaseURL>${baseURL}</BaseURL>
    <Period id="1" start="PT${vodPeriodStartToFormate}" duration="PT${perdiodDurationToFormate}" bitstreamSwitching="true">
      <AdaptationSet mimeType="video/mp4" segmentAlignment="true">
         <Representation width="1280" height="720" frameRate="2400/100" codecs="avc1.4d401f" id="${fileBaseName}" bandwidth="1485978">
          <SegmentTemplate timescale="${timescale}" presentationTimeOffset="${adjustedSegmentPresentationTimeOffset}" startNumber="${segmentStartNumber}" media="$RepresentationID$_$Number$.mp4" initialization="$RepresentationID$_init.mp4">
            <SegmentTimeline>
              <S t="${segmentStartTime}" d="${segmentDuration}" r="${segmentTimelineRepeat}"></S>
            </SegmentTimeline>
          </SegmentTemplate>
        </Representation>
      </AdaptationSet>
    </Period>
  </MPD>`

  return manifest
}

export const createManifestFile = (
  manifestValues: manifestValuesType,
  currentTime: string
): string | null => {
  // calculate the manifest values base on the time passed
  const calculatedManifestValues = calculateNewManifestValues(
    manifestValues,
    currentTime
  )
  putManifestValuesToCache(
    manifestValues.manifestId as string,
    calculatedManifestValues
  )

  // create manifest content
  const manifestContent =
    calculatedManifestValues.manifestType === 'static'
      ? createVodManifestContent(calculatedManifestValues, currentTime)
      : createLiveManifestContent(calculatedManifestValues, currentTime)

  const dir = path.join(process.cwd(), 'tmp', manifestValues.manifestId)
  let filePath = null

  try {
    if (!existsSync(dir)) {
      mkdirSync(dir)
    }

    filePath = path.join(dir, 'manifest.mpd')
    writeFileSync(filePath, manifestContent)
  } catch (error) {
    console.error(
      "Error: couldn't create manifest file, id: ",
      manifestValues.manifestId
    )
  }

  return filePath
}
