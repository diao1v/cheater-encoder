import cache from 'memory-cache'
import {
  getManifestValuesFromCache,
  patchManifestValuesInCache,
  putManifestValuesToCache,
} from './cache'
import { manifestValuesType } from '../helpers/types'

describe('cache', () => {

  afterEach(() => {
    cache.clear()
  })

  describe('putManifestValuesToCache', () => {
    test('should add the manifest values to cache', () => {
      const key = 'test-key'
      const manifestValues: manifestValuesType = {
        manifestId: 'test-manifest',
        availabilityStartTime: '2023-03-22T12:00:00.000Z',
        manifestType: 'static',
        eventType: 'live',
        mediaPresentationDuration: 3600,
        segmentTimelineRepeat: 0,
        playStarted: true,
        liveToVod: false,
        userId: 'test-user',
        baseURL: 'http://example.com',
        fileBaseName: 'test',
        liveDuration: 1800,
        minimumUpdatePeriod: 300,
        minBufferTime: 2,
        timeShiftBufferDepth: 10,
        suggestedPresentationDelay: 0,
        periodDuration: 1800,
        vodPeriodStart: 0,
        timescale: 90000,
        segmentPresentationTimeOffset: 0,
        segmentPresentationTimeOffsetDiff: false,
        segmentStartNumber: 1,
        segmentStartTime: 0,
        segmentDuration: 5,
      }

      putManifestValuesToCache(key, manifestValues)
      const cachedValues = cache.get(key)

      expect(cachedValues).toEqual(manifestValues)
    })
  })

  describe('getManifestValuesFromCache', () => {
    describe('getManifestValuesFromCache', () => {
      test('should return the manifest values from cache', () => {
        const key = 'test-key'
        const manifestValues: manifestValuesType = {
          manifestId: 'test-manifest',
          availabilityStartTime: '2023-03-22T12:00:00.000Z',
          manifestType: 'static',
          eventType: 'live',
          mediaPresentationDuration: 3600,
          segmentTimelineRepeat: 0,
          playStarted: true,
          liveToVod: false,
          userId: 'test-user',
          baseURL: 'http://example.com',
          fileBaseName: 'test',
          liveDuration: 1800,
          minimumUpdatePeriod: 300,
          minBufferTime: 2,
          timeShiftBufferDepth: 10,
          suggestedPresentationDelay: 0,
          periodDuration: 1800,
          vodPeriodStart: 0,
          timescale: 90000,
          segmentPresentationTimeOffset: 0,
          segmentPresentationTimeOffsetDiff: false,
          segmentStartNumber: 1,
          segmentStartTime: 0,
          segmentDuration: 5,
        }

        putManifestValuesToCache(key, manifestValues)
        const cachedValues = getManifestValuesFromCache(key)

        expect(cachedValues).toEqual(manifestValues)
      })

      test('should return undefined if the key is not found in cache', () => {
        const key = 'test-key'
        const cachedValues = getManifestValuesFromCache(key)

        expect(cachedValues).toBeUndefined()
      })
    })
  })

  describe('patchManifestValuesInCache', () => {
    describe('patchManifestValuesInCache', () => {
      it('should update the specified property in the manifest values in cache', () => {
        const key = 'test-key'
        const manifestValues: manifestValuesType = {
          manifestId: 'test-manifest',
          availabilityStartTime: '2023-03-22T12:00:00.000Z',
          manifestType: 'static',
          eventType: 'live',
          mediaPresentationDuration: 3600,
          segmentTimelineRepeat: 0,
          playStarted: true,
          liveToVod: false,
          userId: 'test-user',
          baseURL: 'http://example.com',
          fileBaseName: 'test',
          liveDuration: 1800,
          minimumUpdatePeriod: 300,
          minBufferTime: 2,
          timeShiftBufferDepth: 10,
          suggestedPresentationDelay: 0,
          periodDuration: 1800,
          vodPeriodStart: 0,
          timescale: 90000,
          segmentPresentationTimeOffset: 0,
          segmentPresentationTimeOffsetDiff: false,
          segmentStartNumber: 1,
          segmentStartTime: 0,
          segmentDuration: 5,
        }
        const newSegmentStartNumber = 5

        putManifestValuesToCache(key, manifestValues)
        patchManifestValuesInCache(
          key,
          'segmentStartNumber',
          newSegmentStartNumber
        )
        const cachedValues = getManifestValuesFromCache(key)

        expect(cachedValues.segmentStartNumber).toEqual(newSegmentStartNumber)
      })

      it('should not update the manifest values if the key is not found in cache', () => {
        const key = 'test-key'
        const property = 'segmentStartNumber'
        const value = 5

        patchManifestValuesInCache(key, property, value)
        const cachedValues = getManifestValuesFromCache(key)

        expect(cachedValues).toBeUndefined()
      })
    })
  })
})
