import type { NextApiRequest, NextApiResponse } from 'next'
import { userLogin } from '../../../utils/superbase'

type LoginType = {
  email: string
  password: string
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  // login user
  const loginData: LoginType = req.body

  const { data: user, error } = await userLogin(
    loginData.email,
    loginData.password
  )

  if (error) {
    return res.status(401).json({ message: error.message })
  }

  console.log('user', user)

  return res.status(200).json({ message: 'User logged in successfully' })
}
export default handler
