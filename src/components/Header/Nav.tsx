import React from 'react'
import { Button, Group } from '@mantine/core'
import Auth from '../Auth'
import AccountMenu from './AccountMenu'
import { openModal } from '../../ui/modal/Modal'
import Link from 'next/link'
import { useUser } from '@supabase/auth-helpers-react'


const Nav: React.FC = () => {
  const user = useUser()
  return (
    <Group position="right">
      {user ? (
        <>
          <Link href={'/create-manifest'} passHref>
            <Button
              variant="gradient"
              gradient={{ from: 'teal', to: 'blue' }}
            >
              Create Manifest
            </Button>
          </Link>
          <AccountMenu>
            <Button variant="gradient" gradient={{ from: 'red', to: 'yellow' }}>
              Account
            </Button>
          </AccountMenu>
        </>
      ) : (
        <>
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
        </>
      )}
    </Group>
  )
}

export default Nav
