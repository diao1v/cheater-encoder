import React, { useState } from 'react'
import {
  Paper,
  Stack,
  CopyButton,
  Button,
  Text,
  Group,
  Input,
  Switch,
} from '@mantine/core'
import { IconLink, IconPlane, IconPlaneOff } from '@tabler/icons'

type Props = {
  manifestId: string
  manifestType: string
}

const ManifestLinkDisplay: React.FC<Props> = ({ manifestId, manifestType }) => {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  const [checked, setChecked] = useState(true)

  const manifestUrl = `${siteUrl}/api/${manifestId}/manifest`

  const switcherChangeHandler = (event: any) => {
    if (checked === false) {
      return
    }
    setChecked(event.target.checked)

    // TO-DO
    // update the manifest type in the cache and database
  }

  return (
    <Paper shadow="xs" radius="xs" p="md" sx={{ width: '90%', margin: 'auto' }}>
      <Stack my="lg" spacing="md" align="center" justify="center">
        <Text
          variant="gradient"
          gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
          size={30}
          weight={700}
          sx={{ fontFamily: 'Greycliff CF, sans-serif' }}
        >
          Your manifest URL:
        </Text>
        <Text size="sm">
          Please copy the link below and use it in your player:
        </Text>
        <Group position="center" sx={{ width: '100%' }}>
          <Input
            value={manifestUrl}
            readOnly
            icon={<IconLink />}
            sx={{ width: '80%' }}
          />
          <CopyButton value={manifestUrl}>
            {({ copied, copy }) => (
              <Button color={copied ? 'teal' : 'blue'} onClick={copy}>
                {copied ? 'Copied url' : 'Copy url'}
              </Button>
            )}
          </CopyButton>
        </Group>
        <Text size="sm" color="gray">
          Note: For Live event, the start time will be the time when player
          first request this manifest
        </Text>
        {manifestType === 'live-to-vod' && (
          <>
            <Text
              variant="gradient"
              gradient={{ from: '#ed6ea0', to: '#ec8c69', deg: 45 }}
              size={30}
              weight={700}
              mt={50}
              sx={{ fontFamily: 'Greycliff CF, sans-serif' }}
            >
              For Live To VoD conversion:
            </Text>
            <Text size="sm">
              Please don&apos;t close this page. Switch off the following
              siwtcher to mock encoder switch for your Live event
            </Text>
            <Switch
              size="xl"
              checked={checked}
              color="teal"
              onLabel="ENCODER ON"
              offLabel="ENCODER OFF"
              onChange={switcherChangeHandler}
              thumbIcon={
                checked ? (
                  <IconPlane size={12} color="teal" stroke={3} />
                ) : (
                  <IconPlaneOff size={12} color="orange" stroke={3} />
                )
              }
            />
          </>
        )}
      </Stack>
    </Paper>
  )
}

export default ManifestLinkDisplay
