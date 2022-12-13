// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { addManifestValuesToSupabse } from '../../src/utils/supabase-database'
import { putManifestValuesToCache } from '../../src/utils/cache'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
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

  if (!session)
    return res.status(401).json({
      error: 'not_authenticated',
      description:
        'The user does not have an active session or is not authenticated',
    })

  const manifestBody = req.body

  let { data, error } = await addManifestValuesToSupabse(
    supabaseServerClient,
    manifestBody
  )

  if (error) {
    console.log(error)
    return res.status(500).json({ error: error.message })
  }
  if (data?.length === 0) {
    return res
      .status(204)
      .json({ message: 'Manifest saved to database; No return data' })
  }

  putManifestValuesToCache(manifestBody.manifestId, manifestBody)
  res.status(201).json({ manifestId: manifestBody.manifestId })
}
