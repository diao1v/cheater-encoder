import React from 'react'
import { SegmentedControl } from '@mantine/core'

type Props = {
  manifestType: string
  setManifestType: (value: string) => void
}

const TypeSwitcher: React.FC<Props> = ({ manifestType, setManifestType }) => {
  return (
    <SegmentedControl
      value={manifestType}
      onChange={setManifestType}
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

export default TypeSwitcher
