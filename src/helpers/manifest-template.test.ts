import {
  createDefaultLiveManifestContent,
  createDefaultVodManifestContent,
} from './manifest-template'
import { manifestValuesType } from './types'

describe('manifest-template', () => {
  describe('createDefaultLiveManifestContent', () => {
    test('creates live manifest content correctly', () => {
      const manifestValues: manifestValuesType = {
        manifestId: 'manifestId',
        baseURL: 'https://baseURL',
        liveDuration: 6000,
        eventType: 'live',
        liveToVod: false,
        mediaPresentationDuration: 6000,
        periodDuration: 6000,
        vodPeriodStart: 0,
        playStarted: false,
        userId: 'userId',
        segmentPresentationTimeOffsetDiff: false,
        fileBaseName: 'videoSegment',
        availabilityStartTime: '2023-01-02T00:00:00.000Z',
        minimumUpdatePeriod: 16,
        minBufferTime: 10,
        timeShiftBufferDepth: 600,
        suggestedPresentationDelay: 10,
        timescale: 24000,
        segmentPresentationTimeOffset: 0,
        segmentStartNumber: 1,
        segmentStartTime: 1,
        segmentDuration: 2,
        manifestType: 'dynamic',
        segmentTimelineRepeat: 10,
      }

      const currentTime = '2023-01-02T00:03:00.000Z'

      const result = createDefaultLiveManifestContent(
        manifestValues,
        currentTime
      )

      expect(result).toContain('id="manifestId"')
      expect(result).toContain('<BaseURL>https://baseURL</BaseURL>')
      expect(result).toContain('type="dynamic"')
      expect(result).toContain(
        'availabilityStartTime="2023-01-02T00:00:00.000Z"'
      )
      expect(result).toContain('minimumUpdatePeriod="PT0H0M16.00000S"')

      expect(result).toMatchSnapshot()
    })
  })

  describe('createDefaultVodManifestContent', () => {
    test('creates vod manifest content correctly', () => {
      const manifestValues: manifestValuesType = {
        manifestId: 'manifestId',
        baseURL: 'https://baseURL',
        liveDuration: 6000,
        eventType: 'live',
        liveToVod: false,
        mediaPresentationDuration: 6000,
        periodDuration: 6000,
        vodPeriodStart: 0,
        playStarted: false,
        userId: 'userId',
        segmentPresentationTimeOffsetDiff: false,
        fileBaseName: 'videoSegment',
        availabilityStartTime: '2023-01-02T00:00:00.000Z',
        minimumUpdatePeriod: 16,
        minBufferTime: 10,
        timeShiftBufferDepth: 600,
        suggestedPresentationDelay: 10,
        timescale: 24000,
        segmentPresentationTimeOffset: 0,
        segmentStartNumber: 1,
        segmentStartTime: 1,
        segmentDuration: 2,
        manifestType: 'static',
        segmentTimelineRepeat: 10,
      }

      const currentTime = '2023-01-02T00:03:00.000Z'

      const result = createDefaultVodManifestContent(
        manifestValues,
        currentTime
      )

      expect(result).toContain('id="manifestId"')
      expect(result).toContain('<BaseURL>https://baseURL</BaseURL>')
      expect(result).toContain('type="static"')
      expect(result).toContain('mediaPresentationDuration="PT1H40M0.00000S"')

      expect(result).toMatchSnapshot()
    })
  })
})
