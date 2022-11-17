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
    baseURL,
    availabilityStartTime,
    minimumUpdatePeriod,
    minBufferTime,
    timeShiftBufferDepth,
    suggestedPresentationDelay,
    timescale,
    segmentPresentationTimeOffset,
    segmentPresentationTimeOffsetDiff,
    segmentStartNumber,
    segmentStartTime,
    segmentDuration,
    menifestType,
    mediaPresentationDuration,
    periodDuration,
    segmentTimelineRepeat,
  } = manifestValues

  const manifest = `<?xml version="1.0" encoding="UTF-8"?>
  <MPD xmlns="urn:mpeg:dash:schema:mpd:2011" xsi:schemaLocation="urn:mpeg:dash:schema:mpd:2011 http://standards.iso.org/ittf/PubliclyAvailableStandards/MPEG-DASH_schema_files/DASH-MPD.xsd" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" id="8605f177-ef63-4f72-bdd4-15de37cc798f" profiles="urn:mpeg:dash:profile:isoff-live:2011,http://dashif.org/guidelines/dash264" type="static" availabilityStartTime="2022-08-31T23:24:34.48Z" publishTime="2022-09-20T23:08:54.402Z" mediaPresentationDuration="PT0H9M54.00S" minBufferTime="PT1.500000S" timeShiftBufferDepth="PT5M" suggestedPresentationDelay="PT32S">
    <BaseURL>https://chromecast-failover-test.s3.ap-southeast-2.amazonaws.com/manifest-timeoffset-test/</BaseURL>
    <Period id="1663679443440"  duration="PT0H9M54.00S" bitstreamSwitching="true">
      <AdaptationSet mimeType="video/mp4" segmentAlignment="true">
         <Representation width="1280" height="720" frameRate="2400/100" codecs="avc1.4d401f" id="BBB_720_1M_video" bandwidth="1485978">
          <SegmentTemplate timescale="12288" presentationTimeOffset="1024" startNumber="1" media="video/$RepresentationID$_$Number$.mp4" initialization="video/$RepresentationID$_init.mp4">
            <SegmentTimeline>
              <S t="0" d="24576" r="299"></S>
            </SegmentTimeline>
          </SegmentTemplate>
        </Representation>
      </AdaptationSet>
      <AdaptationSet mimeType="audio/mp4" lang="eng" segmentAlignment="true">
        <Representation audioSamplingRate="48000" codecs="mp4a.40.29" id="BBB_32k" bandwidth="33434">
          <SegmentTemplate timescale="48000" startNumber="1" media="video/$RepresentationID$_$Number$.mp4" initialization="video/$RepresentationID$_init.mp4">
            <SegmentTimeline>
              <S t="0" d="94175" r="299"></S>
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
    menifestType,
    periodDuration,
    vodPeriodStart,
  } = manifestValues

  const perdiodDurationToFormate = convertSecToTimespan(periodDuration)
  const miniBufferTimeToFormate = convertSecToTimespan(minBufferTime)
  const vodPeriodStartToFormate = convertSecToTimespan(vodPeriodStart)
  const adjustedSegmentPresentationTimeOffset =
    segmentPresentationTimeOffset - segmentPresentationTimeOffsetDiff
  const segmentTimelineRepeat =
    Math.floor(periodDuration / (segmentDuration / timescale)) - 1

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
  let calculatedManifestValues: manifestValuesType

  if (
    // if the manifest is a VoD or the first time the Live manifest is created
    // no need the further calculate the manifest values
    // use the initial manifest values
    manifestValues.menifestType === 'static' ||
    currentTime === manifestValues.availabilityStartTime
  ) {
    calculatedManifestValues = manifestValues
  } else {
    calculatedManifestValues = calculateNewManifestValues(
      manifestValues,
      currentTime
    )
    putManifestValuesToCache(
      manifestValues.manifestId as string,
      calculatedManifestValues
    )
  }
  // create manifest content
  const manifestContent =
    manifestValues.menifestType === 'static'
      ? createVodManifestContent(manifestValues, currentTime)
      : createLiveManifestContent(manifestValues, currentTime)

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
