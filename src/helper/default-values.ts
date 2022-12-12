const defaultValues = {
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

export const getInitialDefaultValues = () => {
  return {
    ...defaultValues,
  }
}
