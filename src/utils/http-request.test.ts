import {
  defaultValuesGetter,
  defaultValuesPoster,
  manifestCreationPoster,
  manifestLiveToVodPatcher,
  manifestUpdatePutor,
  userLoginPoster,
  userLogoutPoster,
  userSignupPoster,
} from './http-request'
import axios from 'axios'
import {
  manifestValuesType,
  SignupValuesType,
  LoginValuesType,
  formValuesType,
} from '../helpers/types'

jest.mock('axios')

describe('http-request', () => {
  describe('manifestCreationPoster', () => {
    test('should post a manifest creation request', () => {
      const manifestBody: manifestValuesType = {
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
      manifestCreationPoster(manifestBody)
      expect(axios.post).toHaveBeenCalledWith(
        '/api/create-manifest',
        manifestBody
      )
    })
  })

  describe('manifestUpdatePutor', () => {
    test('should put a manifest update request', () => {
      const manifestBody: manifestValuesType = {
        manifestId: 'test-manifest-id',
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
      manifestUpdatePutor(manifestBody)
      expect(axios.put).toHaveBeenCalledWith(
        '/api/test-manifest-id/update-manifest',
        manifestBody
      )
    })
  })

  describe('manifestLiveToVodPatcher', () => {
    test('should patch a manifest live to vod request', () => {
      const updateObj: {
        manifestId: string
        liveToVod: boolean
      } = {
        manifestId: 'test-manifest-id',
        liveToVod: true,
      }

      manifestLiveToVodPatcher(updateObj)
      expect(axios.patch).toHaveBeenCalledWith(
        '/api/test-manifest-id/update-manifest',
        { liveToVod: true }
      )
    })
  })

  describe('userLoginPoster', () => {
    test('should post a user login request', () => {
      const loginValues: LoginValuesType = {
        email: 'test@example.com',
        password: 'test-password',
      }
      userLoginPoster(loginValues)
      expect(axios.post).toHaveBeenCalledWith('/api/account/login', loginValues)
    })
  })

  describe('userLogoutPoster', () => {
    test('should post a user logout request', () => {
      userLogoutPoster()
      expect(axios.post).toHaveBeenCalledWith('/api/account/logout')
    })
  })

  describe('userSignupPoster', () => {
    test('should post a user signup request', () => {
      const signupValues: SignupValuesType = {
        email: 'test@example.com',
        password: 'test-password',
        invitationCode: 'test-code',
      }
      userSignupPoster(signupValues)
      expect(axios.post).toHaveBeenCalledWith(
        '/api/account/signup',
        signupValues
      )
    })
  })

  describe('defaultValuesGetter', () => {
    test('should get default values', () => {
      defaultValuesGetter()
      expect(axios.get).toHaveBeenCalledWith('/api/default-values')
    })
  })

  describe('defaultValuesPoster', () => {
    test('should post default values', () => {
      const defaultValues: formValuesType = {
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
      defaultValuesPoster(defaultValues)
      expect(axios.post).toHaveBeenCalledWith(
        '/api/default-values',
        defaultValues
      )
    })
  })
})
