import React from 'react'
import { Text } from '@mantine/core'
import { IconBrandAppleArcade } from '@tabler/icons'

const Logo: React.FC = () => {
  return (
    <div className="flex flex-row justify-start">
      <IconBrandAppleArcade size={30} />
      <Text size="xl" weight="bold" ml={4}>
        Cheater Encoder
      </Text>
    </div>
  )
}

export default Logo
