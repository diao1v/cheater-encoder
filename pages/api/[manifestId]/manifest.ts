import type { NextApiRequest, NextApiResponse } from 'next'
import supabase from '../../../helper/superbase-client'
import cache from 'memory-cache'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const { manifestId } = req.query
  const cachedResponse = cache.get(manifestId)

  if (cachedResponse) {
    console.log('cache hit')
    return res.status(200).json({ data: cachedResponse })
  }

  const { data: manifests, error } = await supabase
    .from('manifests')
    .select('*')
    .eq('manifestId', manifestId)

  if (error) {
    console.log(error)
    return res.status(500).json({ error: error.message })
  }

  if (!manifests || manifests.length === 0) {
    return res.status(404).json({ error: 'Manifest not found' })
  }
  
  return res.status(200).json({ data: manifests })
}

export default handler
