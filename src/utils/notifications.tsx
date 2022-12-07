import {
  showNotification as mantineShowNotification,
  updateNotification as mantineUpdateNotification,
} from '@mantine/notifications'
import { IconCheck, IconX } from '@tabler/icons'

type notificationType = {
  id: string
  type: 'success' | 'error' | 'loading'
  title: string
  message: string
  autoClose?: boolean | number
}

export const showNotification = ({
  id,
  type,
  title,
  message,
  autoClose = true,
}: notificationType) => {
  if (type === 'loading') {
    mantineShowNotification({
      id: id,
      title: title,
      message: message,
      loading: true,
      autoClose: false,
      disallowClose: true,
    })
  }

  if (type === 'success') {
    mantineShowNotification({
      id,
      title: title,
      message: message,
      color: 'teal',
      icon: <IconCheck size={16} />,
      autoClose: autoClose,
    })
  }

  if (type === 'error') {
    mantineShowNotification({
      title: title,
      message: message,
      color: 'red',
      icon: <IconX size={16} />,
      autoClose: autoClose,
    })
  }
}

export const updateNotification = ({
  id,
  type,
  title,
  message,
}: notificationType) => {
  if (type === 'loading') {
    mantineUpdateNotification({
      id: id,
      title: title,
      message: message,
      loading: true,
      autoClose: false,
      disallowClose: true,
    })
  }

  if (type === 'success') {
    mantineUpdateNotification({
      id,
      title: title,
      message: message,
      color: 'teal',
      icon: <IconCheck size={16} />,
      autoClose: 2500,
    })
  }

  if (type === 'error') {
    mantineUpdateNotification({
      id,
      title: title,
      message: message,
      color: 'red',
      icon: <IconX size={16} />,
      autoClose: 2500,
    })
  }
}
