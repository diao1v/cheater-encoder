import type { NextApiRequest, NextApiResponse } from 'next'
import { putToCache, getFromCache } from '../../../utils/cache'
import { getManifest } from '../../../utils/superbase'
import { createManifestFile } from '../../../helper/manifest-creation'
import { statSync, createReadStream } from 'fs'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  let manifestValues

  const { manifestId } = req.query
  const cachedResponse = getFromCache(manifestId as string)

  if (cachedResponse) {
    console.log('cache hit')
    manifestValues = cachedResponse
  }

  const { data: manifests, error } = await getManifest(manifestId as string)

  if (error) {
    console.log(error)
    return res.status(500).json({ error: error.message })
  }

  if (manifests.length === 0) {
    return res.status(404).json({ error: 'Manifest not found' })
  }

  manifestValues = manifests[0]

  putToCache(manifestId as string, manifestValues)

  const manifestPath = createManifestFile(manifestValues)

  // ref: https://github.com/vercel/next.js/discussions/15453#discussioncomment-41926

  if (!manifestPath) {
    return res.status(500).json({ error: 'Manifest not found' })
  }

  try {
    const manifestBuffer = createReadStream(manifestPath)
    const stat = statSync(manifestPath)


    await new Promise(function (resolve) {
      res.writeHead(200, {
        'Content-Type': 'application/dash+xml',
        'Content-Length': stat.size,
        'Content-disposition': 'attachment; filename=manifest.mpd',
      })
      manifestBuffer.pipe(res)
      manifestBuffer.on('end', resolve)
      manifestBuffer.on('error', function (err) {
        if (err.name === 'ENOENT') {
          res.status(400).json({
            error: true,
            message: 'Sorry we could not find the file you requested!',
          })
          res.end()
        } else {
          res
            .status(500)
            .json({ error: true, message: 'Sorry, something went wrong!' })
          res.end()
        }
      })
    })
  } catch (err) {
    res.status(400).json({ error: true, message: err })
    res.end()
  }
}

export default handler
