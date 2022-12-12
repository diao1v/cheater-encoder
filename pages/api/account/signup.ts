import type { NextApiRequest, NextApiResponse } from 'next'
import {
  checkInvitationCode,
  userSignup,
} from '../../../src/utils/supabase-database'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'

type SignupType = {
  email: string
  password: string
  invitationCode: string
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const supabaseServerClient = createServerSupabaseClient({
    req,
    res,
  })

  const { email, password, invitationCode }: SignupType = req.body

  //check if the invatation code is valid
  const { data, error } = await checkInvitationCode(
    supabaseServerClient,
    invitationCode
  )

  if (error) {
    return res
      .status(403)
      .json({ message: "couldn't verify the invitation code" })
  }

  if (data.length === 0) {
    return res.status(403).json({ message: 'Invitation code is not valid' })
  }

  //signup the user
  const { data: user, error: signupError } = await userSignup(
    supabaseServerClient,
    {
      email,
      password,
      invitationCode,
    }
  )

  if (signupError) {
    return res.status(406).json({ message: signupError.message })
  }

  return res.status(201).json({ message: 'User created successfully' })
}
export default handler
