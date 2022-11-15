import React from 'react'
import { Button, Group } from '@mantine/core'

const Nav: React.FC = () => {
  return (
    <Group position="right">
      <Button variant="gradient" gradient={{ from: 'indigo', to: 'cyan' }}>
        Login
      </Button>
      <Button variant="outline" gradient={{ from: 'indigo', to: 'cyan' }}>
        Logout
      </Button>
    </Group>
  )
}

export default Nav
