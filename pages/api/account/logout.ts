import type { NextApiRequest, NextApiResponse } from 'next'
import { userLogout } from '../../../utils/superbase'


const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }


  const { error } = await userLogout()

  if (error) {
    return res.status(401).json({ message: error.message })
  }

  return res.status(200).json({ message: 'User logged out successfully' })
}
export default handler
