import type {FetchedDefaultValuesType, DefaultValuesType} from '../helper/types'

const defaultManifestValues: DefaultValuesType = {
  baseURL: '',
  fileBaseName: ' ',
  availabilityStartTime: '',
  liveDuration: 0,
  minimumUpdatePeriod: 0,
  minBufferTime: 0,
  timeShiftBufferDepth: 0,
  suggestedPresentationDelay: 0,
  vodPeriodStart: 0,
  periodDuration: 0,
  timescale: 0,
  segmentPresentationTimeOffset: 0,
  segmentPresentationTimeOffsetDiff: false,
  segmentStartNumber: 0,
  segmentStartTime: 0,
  segmentDuration: 0,
  mediaPresentationDuration: 0,
  segmentTimelineRepeat: 0,
  playStarted: false,
  liveToVod: false,
}

export const getInitialManifestDefaultValues = () => {
  return {
    ...defaultManifestValues,
  }
}

const defaultUserValues: FetchedDefaultValuesType = {
  baseURL: '',
  fileBaseName: ' ',
  liveDuration: 0,
  minimumUpdatePeriod: 0,
  minBufferTime: 0,
  timeShiftBufferDepth: 0,
  suggestedPresentationDelay: 0,
  vodPeriodStart: 0,
  periodDuration: 0,
  timescale: 0,
  segmentPresentationTimeOffset: 0,
  segmentPresentationTimeOffsetDiff: false,
  segmentStartNumber: 0,
  segmentStartTime: 0,
  segmentDuration: 0,
  mediaPresentationDuration: 0,
  segmentTimelineRepeat: 0,
}

export const getInitialUserDefaultValues = () => {
  return {
    ...defaultUserValues,
  }
}
