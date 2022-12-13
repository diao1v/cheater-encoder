import type { NextApiRequest, NextApiResponse } from 'next'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'
import {
  updateUserDefaultValues,
  getUserDefaultValues,
  insertUserDefaultValues,
} from '../../src/utils/supabase-database'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST' && req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const supabaseServerClient = createServerSupabaseClient({
    req,
    res,
  })

  // Check if we have a session
  const {
    data: { session },
  } = await supabaseServerClient.auth.getSession()

  if (!session) {
    return res.status(401).json({
      error: 'not_authenticated',
      description:
        'The user does not have an active session or is not authenticated',
    })
  }

  const userId = session.user.id

  if (req.method === 'GET') {
    const { data, error } = await getUserDefaultValues(
      supabaseServerClient,
      userId
    )

    if (error) {
      return res.status(500).json({ error: error.message })
    }

    return res.status(200).json(data)
  }

  if (req.method === 'POST') {
    const defaultValues = req.body

    // check if user has default values
    const { data: userDefaultValues, error: findValueError } =
      await getUserDefaultValues(supabaseServerClient, userId)

    if (findValueError) {
      return res.status(500).json({ error: findValueError.message })
    }

    // insert default values if user doesn't have any
    if (!userDefaultValues[0]) {
      const { error: insertError } = await insertUserDefaultValues(
        supabaseServerClient,
        userId,
        defaultValues
      )

      if (insertError) {
        return res.status(500).json({ error: insertError.message })
      }

      return res.status(200).json({ message: 'Default values created' })
    }

    // update default values if user already has one
    const { error: updateError } = await updateUserDefaultValues(
      supabaseServerClient,
      userId,
      defaultValues
    )

    if (updateError) {
      return res.status(500).json({ error: updateError.message })
    }

    return res.status(200).json({ message: 'Default values updated' })
  }
}

export default handler
