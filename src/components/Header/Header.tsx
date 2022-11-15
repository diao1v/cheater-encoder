import { Header as MantineHeader, Group } from '@mantine/core'
import Logo from './Logo'
import Nav from './Nav'
import React from 'react'

type Props = {}

const Header:React.FC = () => {
  return (
    <MantineHeader height={70} p="lg">
      <Group position="apart" spacing="xl">
        <Logo />
        <Nav />
      </Group>
    </MantineHeader>
  )
}

export default Header
