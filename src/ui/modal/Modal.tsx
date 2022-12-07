import { openModal as MantineOpenModal } from '@mantine/modals'

type OpenModalParams = {
  children: React.ReactNode
}

export const openModal = ({ children }: OpenModalParams) =>
  MantineOpenModal({
    children,
    sx: {
      '& .mantine-Modal-modal': {
        margin: 'auto',
      },
      '& .mantine-Modal-body': {
        marginTop: '-40px',
      },
    },
  })
