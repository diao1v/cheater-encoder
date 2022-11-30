import React from 'react'
import { Button, Group } from '@mantine/core'
import Auth from '../Auth'
import { openModal } from '../../ui/modal/Modal'

const Nav: React.FC = () => {
  return (
    <Group position="right">
      <Button variant="gradient" gradient={{ from: 'orange', to: 'red' }}>
        Account
      </Button>
      <Button
        variant="gradient"
        gradient={{ from: 'teal', to: 'lime', deg: 105 }}
        onClick={() => {
          openModal({
            children: <Auth type="signup" />,
          })
        }}
      >
        Sign Up
      </Button>
      <Button
        variant="gradient"
        gradient={{ from: 'indigo', to: 'cyan' }}
        onClick={() => {
          openModal({
            children: <Auth type="login" />,
          })
        }}
      >
        Login
      </Button>
      <Button variant="outline" gradient={{ from: 'indigo', to: 'cyan' }}>
        Logout
      </Button>
    </Group>
  )
}

export default Nav
