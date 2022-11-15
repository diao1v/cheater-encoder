import cache from 'memory-cache'
import { CACHE_TIME } from '../helper/constants'

export const putToCache = (key: string, value: string) => {
  cache.put(key, value, CACHE_TIME)
} 

export const getFromCache = (key: string) => {
  return cache.get(key)
}


