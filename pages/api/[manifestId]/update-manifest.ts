import type { NextApiRequest, NextApiResponse } from 'next'
import {
  patchManifestValuesInCache,
  putManifestValuesToCache,
} from '../../../src/utils/cache'
import {
  putManifestValuesToSupabase,
  patchManifestValueToSupabase,
} from '../../../src/utils/supabase-database'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'PATCH' && req.method !== 'PUT') {
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

  const { manifestId } = req.query
  const { liveToVod } = req.body

  // update the manifest as a whole
  if (req.method === 'PUT') {
    const updatedManifestValues = req.body

    let { error } = await putManifestValuesToSupabase(supabaseServerClient, {
      manifestId: manifestId as string,
      manifestValues: updatedManifestValues,
    })

    if (error) {
      return res.status(500).json({ error: error.message })
    }

    putManifestValuesToCache(manifestId as string, updatedManifestValues)
    res.status(200).json({ message: 'Manifest updated' })
  }

  // update single manifest value
  if (req.method === 'PATCH') {
    let { error } = await patchManifestValueToSupabase(supabaseServerClient, {
      manifestId: manifestId as string,
      coloum: 'liveToVod',
      updatedValue: liveToVod,
    })

    if (error) {
      return res.status(500).json({ error: error.message })
    }

    patchManifestValuesInCache(manifestId as string, 'liveToVod', liveToVod)
    res.status(200).json({ message: 'Manifest updated' })
  }
}
export default handler
