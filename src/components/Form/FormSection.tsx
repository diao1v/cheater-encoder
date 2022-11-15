import React, { useState } from 'react'
import { Collapse, Title, Group, Stack, Divider, Box } from '@mantine/core'
import { IconChevronDown, IconChevronUp } from '@tabler/icons'

type Props = {
  title: string
  children: React.ReactNode
}

const FormSection: React.FC<Props> = ({ title, children }) => {
  const [opened, setOpened] = useState(true)

  return (
    <Box sx={{ maxWidth: '90%' }} mx="auto">
      <Stack spacing="md" mt={20} mb={40}>
        <Group
          position="apart"
          spacing="xl"
          onClick={() => setOpened((prev) => !prev)}
          sx={{ cursor: 'pointer' }}
        >
          <Title order={4}>{title}</Title>
          {opened ? <IconChevronUp /> : <IconChevronDown />}
        </Group>
        <Divider my={'0'} />
        <Collapse
          in={opened}
          transitionDuration={200}
          transitionTimingFunction="linear"
        >
          {children}
        </Collapse>
      </Stack>
    </Box>
  )
}

export default FormSection
