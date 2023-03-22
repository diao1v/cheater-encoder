import { manifestValuesType } from '../helpers/types'
import { writeFileSync, existsSync, mkdirSync } from 'fs'
import {
  createDefaultLiveManifestContent,
  createDefaultVodManifestContent,
} from '../helpers/manifest-template'
import path from 'path'
import { putManifestValuesToCache } from './cache'
import { calculateNewManifestValues } from './manifest-calculation'

export const createManifestFile = (
  manifestValues: manifestValuesType,
  currentTime: string
): string | null => {
  // calculate the manifest values base on the time passed
  const calculatedManifestValues = calculateNewManifestValues(
    manifestValues,
    currentTime
  )
  putManifestValuesToCache(
    manifestValues.manifestId as string,
    calculatedManifestValues
  )

  // create manifest content
  const manifestContent =
    calculatedManifestValues.manifestType === 'static'
      ? createDefaultVodManifestContent(calculatedManifestValues, currentTime)
      : createDefaultLiveManifestContent(calculatedManifestValues, currentTime)

  const dir = path.join(process.cwd(), 'tmp', manifestValues.manifestId)
  let filePath: string | null = null

  try {
    if (!existsSync(dir)) {
      mkdirSync(dir)
    }

    filePath = path.join(dir, 'manifest.mpd')
    writeFileSync(filePath, manifestContent)
  } catch (error) {
    console.error(
      "Error: couldn't create manifest file, id: ",
      manifestValues.manifestId
    )
  }

  return filePath
}
