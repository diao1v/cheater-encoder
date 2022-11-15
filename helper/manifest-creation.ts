import { manifestValues } from './types'
import { writeFileSync, existsSync, mkdirSync } from 'fs'
import path from 'path'

const createLiveManifestContent = (manifestValues: manifestValues): string => {
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
    publishTime,
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

const createVodManifestContent = (manifestValues: manifestValues): string => {
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
    publishTime,
  } = manifestValues

  const manifest = ``

  return manifest
}

export const createManifestFile = (
  manifestValues: manifestValues
): string | null => {
  // update the manifest base on time

  // create manifest content
  const manifestContent =
    manifestValues.menifestType === 'static'
      ? createVodManifestContent(manifestValues)
      : createLiveManifestContent(manifestValues)

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
