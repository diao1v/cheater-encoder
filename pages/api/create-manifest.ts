// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { addManifestValuesToSupabse } from '../../utils/superbase'
import { putManifestValuesToCache } from '../../utils/cache'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const manifestBody = req.body

  let { data, error } = await addManifestValuesToSupabse(manifestBody)

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
