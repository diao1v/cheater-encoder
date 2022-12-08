import React from 'react'
import { IconListDetails, IconLogout } from '@tabler/icons'
import { Menu, Text } from '@mantine/core'
import { AxiosError } from 'axios'
import { useMutation } from '@tanstack/react-query'
import { showNotification } from '../../utils/notifications'
import { userLogoutPoster } from '../../utils/http-request'
import { useRouter } from 'next/router'

type Props = {
  children: React.ReactNode
}

type ErrorType = {
  message: string
}

const AccountMenu: React.FC<Props> = ({ children }) => {
  const router = useRouter()

  const {
    mutate: logout,
    error: logoutError,
    isLoading: logoutLoading,
  } = useMutation(userLogoutPoster, {
    onSuccess: (data) => {
      showNotification({
        id: 'logout',
        type: 'success',
        title: 'Logout success',
        autoClose: 3000,
        message: 'You have successfully logged out',
      })
      router.reload()
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
    <Menu shadow="md" width={200}>
      <Menu.Target>{children}</Menu.Target>

      <Menu.Dropdown>
        <Menu.Item icon={<IconListDetails size={14} />}>
          Defailt Settings
        </Menu.Item>
        <Menu.Item icon={<IconLogout size={14} />} onClick={logoutHandler}>
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  )
}

export default AccountMenu
