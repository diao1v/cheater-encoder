import React from 'react'
import { Text, Footer as MantineFooter, Group, Stack } from '@mantine/core'
import { IconHeart } from '@tabler/icons'

type Props = {
  manifestsCount: number | string
}

const Footer: React.FC<Props> = ({ manifestsCount }) => {
  return (
    <MantineFooter height={70} p="xs">
      <Group position="center" spacing="xl">
        <Stack spacing={0}>
          <Group position="center" spacing={1}>
            Made by Yiwei, by accident, with&nbsp;
            <IconHeart size={16} color="red" fill="red" />
          </Group>
          <Group position="center" spacing={5}>
            Total manifests has been created so far:
            <Text
              variant="gradient"
              gradient={{ from: 'indigo', to: 'cyan', deg: 45 }}
              weight={700}
            >
              {manifestsCount}
            </Text>{' '}
          </Group>
        </Stack>
      </Group>
    </MantineFooter>
  )
}

export default Footer
