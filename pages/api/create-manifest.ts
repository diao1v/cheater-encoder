// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import supabase from '../../utils/superbase'
import cache from 'memory-cache'
import { CACHE_TIME } from '../../helper/constants'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const manifestBody = req.body

  let { data, error } = await supabase
    .from('manifests')
    .insert([manifestBody])
    .select('*') // this is needed to return the inserted row

  if (error) {
    console.log(error)
    res.status(500).json({ error: error.message })
  } else {
    cache.put(manifestBody.manifestId, data, CACHE_TIME)
    res.status(201).json({ manifestId: manifestBody.manifestId })
  }
}
