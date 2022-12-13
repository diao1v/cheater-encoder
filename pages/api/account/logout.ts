import type { NextApiRequest, NextApiResponse } from 'next'
import { userLogout } from '../../../src/utils/supabase-database'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const supabaseServerClient = createServerSupabaseClient({
    req,
    res,
  })

  const { error } = await userLogout(supabaseServerClient)

  if (error) {
    return res.status(401).json({ message: error.message })
  }

  return res.status(200).json({ message: 'User logged out successfully' })
}
export default handler
