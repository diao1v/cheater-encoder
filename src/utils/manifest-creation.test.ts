import { manifestValuesType } from '../helpers/types'
import { putManifestValuesToCache } from './cache'
import { calculateNewManifestValues } from './manifest-calculation'
import { createManifestFile } from './manifest-creation'
import fs from 'fs'

jest.mock('./cache', () => ({
  putManifestValuesToCache: jest.fn(),
}))

jest.mock('./manifest-calculation', () => ({
  calculateNewManifestValues: jest.fn().mockReturnValue({
    manifestType: 'dynamic',
    manifestId: 'test-manifest-id',
    otherProperty: 'otherValue',
  }),
}))

jest.mock('fs', () => ({
  writeFileSync: jest.fn(),
  existsSync: jest.fn(),
  mkdirSync: jest.fn(),
}))

jest.mock('../helpers/manifest-template', () => ({
  createDefaultLiveManifestContent: jest
    .fn()
    .mockReturnValue('liveManifestContent'),
  createDefaultVodManifestContent: jest
    .fn()
    .mockReturnValue('vodManifestContent'),
}))

describe('createManifestFile', () => {
  test('should create a manifest file and return its path if there is a folder for the manifest already', () => {
    // Arrange
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
      manifestId: 'manifest-test-id',
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

    // Set the mock return value for existsSync
    const existsSyncMock = jest.fn().mockReturnValue(true)
    ;(fs.existsSync as jest.Mock).mockImplementationOnce(existsSyncMock)

    // Act
    const filePath = createManifestFile(manifestValues, currentTime)

    // Assert
    expect(filePath).toContain('/tmp/manifest-test-id/manifest.mpd')
    expect(putManifestValuesToCache).toHaveBeenCalledWith(
      'manifest-test-id',
      expect.any(Object)
    )
    expect(calculateNewManifestValues).toHaveBeenCalledWith(
      manifestValues,
      currentTime
    )
    expect(fs.writeFileSync).toHaveBeenCalledWith(
      filePath,
      'liveManifestContent'
    )
  }),
    test('should create a manifest file and return its path if there is not a folder for the manifest already', () => {
      // Arrange
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
        manifestId: 'manifest-test-id',
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

      // Set the mock return value for existsSync
      const existsSyncMock = jest.fn().mockReturnValue(false)
      ;(fs.existsSync as jest.Mock).mockImplementationOnce(existsSyncMock)

      // Act
      const filePath = createManifestFile(manifestValues, currentTime)

      // Assert
      expect(fs.mkdirSync).toHaveBeenCalledTimes(1)
      expect(filePath).toContain('/tmp/manifest-test-id/manifest.mpd')
      expect(putManifestValuesToCache).toHaveBeenCalledWith(
        'manifest-test-id',
        expect.any(Object)
      )
      expect(calculateNewManifestValues).toHaveBeenCalledWith(
        manifestValues,
        currentTime
      )
      expect(fs.writeFileSync).toHaveBeenCalledWith(
        filePath,
        'liveManifestContent'
      )
    })
})
