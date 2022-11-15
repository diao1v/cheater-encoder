import axios from 'axios'
import { manifestValues } from './types'

export const poster = (manifestBody: manifestValues) => {
  return axios.post('/api/create-manifest', manifestBody)
}
