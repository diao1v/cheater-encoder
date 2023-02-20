import type { formValuesType } from './types'

const defaultFormValues: formValuesType = {
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
}

export const getInitialFormValues = () => {
  return {
    ...defaultFormValues,
  }
}
