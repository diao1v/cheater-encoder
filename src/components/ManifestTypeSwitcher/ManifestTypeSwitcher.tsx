import React from 'react'
import { SegmentedControl, Stack, Tooltip, Divider, Title } from '@mantine/core'

type Props = {
  protocalType: 'dash' | 'hls'
  setProtocalType: (value: 'dash' | 'hls') => void
  eventType: 'live' | 'vod' | 'live-to-vod'
  setEventType: (value: 'live' | 'vod' | 'live-to-vod') => void
}

const ManifestTypeSwitcher: React.FC<Props> = ({
  protocalType,
  setProtocalType,
  eventType,
  setEventType,
}) => {
  return (
    <Stack mt={100} spacing={10} sx={{ textAlign: 'center' }}>
      <Title
        order={2}
        variant="gradient"
        gradient={{ from: '#373A40', to: '#868E96', deg: 60 }}
      >
        Choose Protocal Type
      </Title>
      <Tooltip
        width={300}
        multiline={true}
        label="Currently, this tool can be only used for generate DASH manifest. The generation of HLS manifest is under construction"
        position="top-end"
      >
        <SegmentedControl
          value={protocalType}
          onChange={setProtocalType}
          color="orange"
          size="lg"
          data={[
            { label: 'DASH', value: 'dash' },
            { label: 'HLS', value: 'hls', disabled: true },
          ]}
        />
      </Tooltip>
      <Divider my={70} variant="dashed" />
      <Title
        order={2}
        variant="gradient"
        gradient={{ from: '#373A40', to: '#868E96', deg: 60 }}
      >
        Choose Event Type
      </Title>
      <SegmentedControl
        value={eventType}
        onChange={setEventType}
        color="orange"
        size="lg"
        data={[
          { label: 'Live Event', value: 'live' },
          { label: 'Video On Demand Event', value: 'vod' },
          { label: 'Live to VoD Event', value: 'live-to-vod' },
        ]}
      />
    </Stack>
  )
}

export default ManifestTypeSwitcher
