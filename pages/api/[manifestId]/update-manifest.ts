import type { NextApiRequest, NextApiResponse } from 'next'
import { patchManifestValuesInCache } from '../../../utils/cache'
import {
  putManifestValuesToSupabase,
  patchManifestValueToSupabase,
} from '../../../utils/superbase'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'PATCH' && req.method !== 'PUT') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { manifestId } = req.query
  const { liveToVod } = req.body

  // update the manifest as a whole
  if (req.method === 'PUT') {
  }

  // update single manifest value
  if (req.method === 'PATCH') {
    let { error } = await patchManifestValueToSupabase(
      manifestId as string,
      'liveToVod',
      liveToVod
    )
    
    if (error) {
      return res.status(500).json({ error: error.message })
    }
    
    patchManifestValuesInCache(manifestId as string, 'liveToVod', liveToVod)
    res.status(200).json({ message: 'Manifest updated' })
  }
}
export default handler
