export type manifestValuesType = {
  manifestId: string
  baseURL: string
  fileBaseName: string
  availabilityStartTime: string
  liveDuration: number
  minimumUpdatePeriod: number
  minBufferTime: number
  timeShiftBufferDepth: number
  suggestedPresentationDelay: number
  timescale: number
  segmentPresentationTimeOffset: number
  segmentPresentationTimeOffsetDiff: number
  segmentStartNumber: number
  segmentStartTime: number
  segmentDuration: number
  menifestType: 'static' | 'dynamic'
  mediaPresentationDuration: number // DVR window for the Live event
  periodDuration: number
  vodPeriodStart: number
  segmentTimelineRepeat: number
  liveStarted: boolean
}

export type formValuesType = {
  baseURL: string
  fileBaseName: string
  liveDuration: number
  minimumUpdatePeriod: number
  minBufferTime: number
  timeShiftBufferDepth: number
  suggestedPresentationDelay: number
  periodDuration: number
  vodPeriodStart: number
  timescale: number
  segmentPresentationTimeOffset: number
  segmentPresentationTimeOffsetDiff: number
  segmentStartNumber: number
  segmentStartTime: number
  segmentDuration: number
}
