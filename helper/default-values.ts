const defaultValues = {
  baseURL:
    'https://chromecast-failover-test.s3.ap-southeast-2.amazonaws.com/manifest-timeoffset-test/video/',
  fileBaseName: 'BBB_720_1M_video',
  availabilityStartTime: '',
  liveDuration: 600,
  minimumUpdatePeriod: 16,
  minBufferTime: 2,
  timeShiftBufferDepth: 60,
  suggestedPresentationDelay: 32,
  vodPeriodStart: 0,
  periodDuration: 600,
  timescale: 12288,
  segmentPresentationTimeOffset: 0,
  segmentPresentationTimeOffsetDiff: false,
  segmentStartNumber: 1,
  segmentStartTime: 0,
  segmentDuration: 24576,
  mediaPresentationDuration: 180,
  segmentTimelineRepeat: 0,
  playStarted: false,
}

export const getDefaultValues = () => {
  return {
    ...defaultValues,
  }
}
