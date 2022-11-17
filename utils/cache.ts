import cache from 'memory-cache'
import { CACHE_TIME } from '../helper/constants'
import { manifestValuesType } from '../helper/types'

export const putManifestValuesToCache = (
  key: string,
  manifestValues: manifestValuesType
) => {
  cache.put(key, manifestValues, CACHE_TIME)
}

export const getManifestValuesFromCache = (key: string) => {
  return cache.get(key)
}
