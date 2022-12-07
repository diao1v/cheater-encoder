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
  segmentPresentationTimeOffsetDiff: boolean
  segmentStartNumber: number
  segmentStartTime: number
  segmentDuration: number
  manifestType: 'static' | 'dynamic'
  eventType: 'vod' | 'live' | 'live-to-vod'
  mediaPresentationDuration: number // DVR window for the Live event
  periodDuration: number
  vodPeriodStart: number
  segmentTimelineRepeat: number
  playStarted: boolean
  liveToVod: boolean
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
  segmentPresentationTimeOffsetDiff: boolean
  segmentStartNumber: number
  segmentStartTime: number
  segmentDuration: number
}

export type SignupValuesType = {
  email: string
  password: string
  invitationCode: string
}

export type LoginValuesType = {
  email: string
  password: string
}
