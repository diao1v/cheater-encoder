import React from 'react'
import { Text, Group } from '@mantine/core'
import { IconBrandAppleArcade } from '@tabler/icons'

const Logo: React.FC = () => {
  return (
    <Group spacing={0}>
      <IconBrandAppleArcade size={30} />
      <Text size="xl" weight="bold" ml={4}>
        Cheater Encoder
      </Text>
    </Group>
  )
}

export default Logo
