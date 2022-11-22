import React from 'react'
import { SegmentedControl } from '@mantine/core'

type Props = {
  eventType: 'live' | 'vod' | 'live-to-vod'
  setEventType: (value: 'live' | 'vod' | 'live-to-vod') => void
}

const EventTypeSwitcher: React.FC<Props> = ({ eventType, setEventType }) => {
  return (
    <SegmentedControl
      value={eventType}
      onChange={setEventType}
      color="orange"
      my={100}
      size="lg"
      data={[
        { label: 'Live Event', value: 'live' },
        { label: 'Video On Demand Event', value: 'vod' },
        { label: 'Live to VoD Event', value: 'live-to-vod' },
      ]}
    />
  )
}

export default EventTypeSwitcher
