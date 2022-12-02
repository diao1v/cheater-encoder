import React from 'react'
import { Button, Group } from '@mantine/core'
import Auth from '../Auth'
import { openModal } from '../../ui/modal/Modal'
import { AxiosError } from 'axios'
import { useMutation } from '@tanstack/react-query'
import { showNotification } from '../../../utils/notifications'
import { userLogoutPoster } from '../../../utils/http-request'

type ErrorType = {
  message: string
}

const Nav: React.FC = () => {
  const {
    mutate: logout,
    error: logoutError,
    isLoading: logoutLoading,
  } = useMutation(userLogoutPoster, {
    onSuccess: (data) => {
      console.log(data)
      showNotification({
        id: 'logout',
        type: 'success',
        title: 'Logout success',
        autoClose: 3000,
        message: 'You have successfully logged out',
      })
    },
    onError: (error: AxiosError) => {
      console.log(error)
      showNotification({
        id: 'logout',
        type: 'error',
        title: 'Error',
        autoClose: 5000,
        message:
          (error.response?.data as ErrorType).message ??
          'Something went wrong. Could not logout',
      })
    },
  })

  const logoutHandler = () => {
    logout()
  }

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
      <Button
        variant="outline"
        gradient={{ from: 'indigo', to: 'cyan' }}
        onClick={logoutHandler}
      >
        Logout
      </Button>
    </Group>
  )
}

export default Nav
