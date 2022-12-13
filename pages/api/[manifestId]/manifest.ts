import type { NextApiRequest, NextApiResponse } from 'next'
import {
  putManifestValuesToCache,
  getManifestValuesFromCache,
} from '../../../src/utils/cache'
import {
  getManifestValuesFromSupabase,
  putManifestValuesToSupabase,
} from '../../../src/utils/supabase-database'
import { createManifestFile } from '../../../src/utils/manifest-creation'
import { statSync, createReadStream } from 'fs'
import { manifestValuesType } from '../../../src/helper/types'
import { getCurrentTime, getUnixTime } from '../../../src/utils/time-conversion'
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  const supabaseServerClient = createServerSupabaseClient({
    req,
    res,
  })

  let manifestValues: manifestValuesType

  const { manifestId } = req.query

  // get manifest values from cache or database
  manifestValues = getManifestValuesFromCache(manifestId as string)

  if (!manifestValues) {
    const { data: manifests, error: fetchFromSupabaseError } =
      await getManifestValuesFromSupabase(
        supabaseServerClient,
        manifestId as string
      )

    if (fetchFromSupabaseError) {
      return res.status(500).json({ error: fetchFromSupabaseError.message })
    }

    if (manifests.length === 0) {
      return res.status(404).json({ error: 'Manifest not found in database' })
    }

    manifestValues = manifests[0]

    putManifestValuesToCache(manifestId as string, manifestValues)
  }

  // if the player call this api the first time
  // the manifest available time will be set to the current time
  // and set the playStarted to true
  const currentTime = getCurrentTime()
  if (manifestValues.playStarted === false) {
    manifestValues.availabilityStartTime = currentTime
    manifestValues.playStarted = true
    putManifestValuesToCache(manifestId as string, manifestValues)

    const { error: putToSupabaseError } = await putManifestValuesToSupabase(
      supabaseServerClient,
      {
        manifestId: manifestId as string,
        manifestValues,
      }
    )
    if (putToSupabaseError) {
      return res.status(404).json({ error: putToSupabaseError.message })
    }
  }

  // check whether the live is still available
  const currentUnixTime = getUnixTime(currentTime)
  const manifestAvailableTime = getUnixTime(
    manifestValues.availabilityStartTime
  )
  if (currentUnixTime - manifestAvailableTime > manifestValues.liveDuration) {
    return res.status(403).json({ error: 'The Live event has been ended' })
  }

  // create the manifest file
  const manifestPath = createManifestFile(manifestValues, currentTime)

  if (!manifestPath) {
    return res
      .status(500)
      .json({ error: 'Manifest file could not be created on server' })
  }

  // create buffer and return the manifest through the response
  // ref: https://github.com/vercel/next.js/discussions/15453#discussioncomment-41926
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
