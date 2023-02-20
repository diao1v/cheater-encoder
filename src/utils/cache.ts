import cache from 'memory-cache'
import { CACHE_TIME } from '../helpers/constants'
import { manifestValuesType } from '../helpers/types'

export const putManifestValuesToCache = (
  key: string,
  manifestValues: manifestValuesType
) => {
  cache.put(key, manifestValues, CACHE_TIME)
}

export const getManifestValuesFromCache = (key: string) => {
  return cache.get(key)
}

export const patchManifestValuesInCache = (
  key: string,
  property: string,
  value: any
) => {
  const manifestValues = getManifestValuesFromCache(key)
  if (manifestValues) {
    manifestValues[property] = value
    putManifestValuesToCache(key, manifestValues)
  }
}
