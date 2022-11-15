export type manifestValues = {
  manifestId: string
  baseURL: string
  availabilityStartTime: Date
  minimumUpdatePeriod: number
  minBufferTime: number
  timeShiftBufferDepth: number
  suggestedPresentationDelay: number
  timescale: number
  segmentPresentationTimeOffset: number
  segmentPresentationTimeOffsetDiff: null | number
  segmentStartNumber: number
  segmentStartTime: number
  segmentDuration: number
  menifestType: 'static' | 'dynamic'
  mediaPresentationDuration: null | number
  periodDuration: null | number
  segmentTimelineRepeat: number
  publishTime: null | Date
}

export type formInitialValues = {
  baseURL: string
  availabilityStartTime: Date
  minimumUpdatePeriod: number
  minBufferTime: number
  timeShiftBufferDepth: number
  suggestedPresentationDelay: number
  timescale: number
  segmentPresentationTimeOffset: number
  segmentPresentationTimeOffsetDiff: null | number
  segmentStartNumber: number
  segmentStartTime: number
  segmentDuration: number
}