import { manifestValuesType } from '../helpers/types'
import { calculateNewManifestValues } from './manifest-calculation'

describe('calculateNewManifestValues', () => {
  test('calculates new values for VOD', () => {
    const manifestValues: manifestValuesType = {
      baseURL: 'https://example.com/',
      fileBaseName: 'video',
      liveDuration: 0,
      minimumUpdatePeriod: 0,
      minBufferTime: 0,
      timeShiftBufferDepth: 120,
      suggestedPresentationDelay: 0,
      periodDuration: 600,
      vodPeriodStart: 0,
      timescale: 9000,
      segmentPresentationTimeOffset: 0,
      segmentPresentationTimeOffsetDiff: false,
      segmentStartNumber: 1,
      segmentStartTime: 0,
      segmentDuration: 18000,
      manifestId: 'abcd-1234',
      availabilityStartTime: '2023-01-01T00:00:00.000Z',
      manifestType: 'static',
      eventType: 'vod',
      mediaPresentationDuration: 0,
      segmentTimelineRepeat: 0,
      playStarted: false,
      liveToVod: false,
      userId: 'user-1234',
    }
    const currentTime = '2023-01-01T00:00:00.000Z'

    const result = calculateNewManifestValues(manifestValues, currentTime)

    expect(result.mediaPresentationDuration).toBe(600)
    expect(result.segmentTimelineRepeat).toBe(299)
  })

  test('calculates new values for live, if the live event just started', () => {
    const manifestValues: manifestValuesType = {
      baseURL: 'https://example.com/',
      fileBaseName: 'video',
      liveDuration: 600,
      minimumUpdatePeriod: 0,
      minBufferTime: 0,
      timeShiftBufferDepth: 120,
      suggestedPresentationDelay: 0,
      periodDuration: 600,
      vodPeriodStart: 0,
      timescale: 9000,
      segmentPresentationTimeOffset: 0,
      segmentPresentationTimeOffsetDiff: false,
      segmentStartNumber: 1,
      segmentStartTime: 0,
      segmentDuration: 18000,
      manifestId: 'abcd-1234',
      availabilityStartTime: '2023-01-01T00:00:00.000Z',
      manifestType: 'dynamic',
      eventType: 'live',
      mediaPresentationDuration: 0,
      segmentTimelineRepeat: 0,
      playStarted: false,
      liveToVod: false,
      userId: 'user-1234',
    }
    const currentTime = '2023-01-01T00:00:00.000Z'

    const result = calculateNewManifestValues(manifestValues, currentTime)

    expect(result).toEqual(manifestValues)
  })

  test('calculates new values for Live event before moving out of DVR window', () => {
    const manifestValues: manifestValuesType = {
      baseURL: 'https://example.com/',
      fileBaseName: 'video',
      liveDuration: 600,
      minimumUpdatePeriod: 0,
      minBufferTime: 0,
      timeShiftBufferDepth: 120,
      suggestedPresentationDelay: 0,
      periodDuration: 600,
      vodPeriodStart: 0,
      timescale: 9000,
      segmentPresentationTimeOffset: 0,
      segmentPresentationTimeOffsetDiff: false,
      segmentStartNumber: 1,
      segmentStartTime: 0,
      segmentDuration: 18000,
      manifestId: 'abcd-1234',
      availabilityStartTime: '2023-01-01T00:00:00.000Z',
      manifestType: 'dynamic',
      eventType: 'live',
      mediaPresentationDuration: 0,
      segmentTimelineRepeat: 0,
      playStarted: true,
      liveToVod: false,
      userId: 'user-1234',
    }
    const currentTime = '2023-01-01T00:01:00.000Z'
    const expectedManifestValues = {
      ...manifestValues,
      segmentTimelineRepeat: 29,
    }
    const result = calculateNewManifestValues(manifestValues, currentTime)
    expect(result).toEqual(expectedManifestValues)
  })

  test('calculates new values for Live event after moving out of DVR window', () => {
    const manifestValues: manifestValuesType = {
      baseURL: 'https://example.com/',
      fileBaseName: 'video',
      liveDuration: 600,
      minimumUpdatePeriod: 0,
      minBufferTime: 0,
      timeShiftBufferDepth: 120,
      suggestedPresentationDelay: 0,
      periodDuration: 600,
      vodPeriodStart: 0,
      timescale: 9000,
      segmentPresentationTimeOffset: 0,
      segmentPresentationTimeOffsetDiff: false,
      segmentStartNumber: 1,
      segmentStartTime: 0,
      segmentDuration: 18000,
      manifestId: 'abcd-1234',
      availabilityStartTime: '2023-01-01T00:00:00.000Z',
      manifestType: 'dynamic',
      eventType: 'live',
      mediaPresentationDuration: 0,
      segmentTimelineRepeat: 0,
      playStarted: true,
      liveToVod: false,
      userId: 'user-1234',
    }
    const currentTime = '2023-01-01T00:03:00.000Z'
    const expectedManifestValues = {
      ...manifestValues,
      segmentTimelineRepeat: 59,
      segmentStartNumber: 30,
      segmentStartTime: 540000,
    }
    const result = calculateNewManifestValues(manifestValues, currentTime)
    expect(result).toEqual(expectedManifestValues)
  })

  test('calculates new values for Live to VoD transition', () => {
    const manifestValues: manifestValuesType = {
      baseURL: 'https://example.com/',
      fileBaseName: 'video',
      liveDuration: 600,
      minimumUpdatePeriod: 0,
      minBufferTime: 0,
      timeShiftBufferDepth: 120,
      suggestedPresentationDelay: 0,
      periodDuration: 600,
      vodPeriodStart: 0,
      timescale: 9000,
      segmentPresentationTimeOffset: 0,
      segmentPresentationTimeOffsetDiff: false,
      segmentStartNumber: 30,
      segmentStartTime: 540000,
      segmentDuration: 18000,
      manifestId: 'abcd-1234',
      availabilityStartTime: '2023-01-01T00:00:00.000Z',
      manifestType: 'dynamic',
      eventType: 'live-to-vod',
      mediaPresentationDuration: 0,
      segmentTimelineRepeat: 59,
      playStarted: true,
      liveToVod: true,
      userId: 'user-1234',
    }
    const currentTime = '2023-01-01T00:06:00.000Z'

    const expectedManifestValues = {
      ...manifestValues,
      manifestType: 'static',
      mediaPresentationDuration: 360,
      periodDuration: 360,
    }

    const result = calculateNewManifestValues(manifestValues, currentTime)
    expect(result).toEqual(expectedManifestValues)
  })
})
