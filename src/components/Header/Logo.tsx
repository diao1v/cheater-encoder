import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Logo: React.FC = () => {
  return (
    <Link href="/">
      <Image src="/assets/images/logo.png" alt="logo" width="300" height="64" />
    </Link>
  )
}

export default Logo
