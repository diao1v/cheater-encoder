import axios from 'axios'
import { manifestValues } from '../helper/types'

export const poster = (manifestBody: manifestValues) => {
  return axios.post('/api/create-manifest', manifestBody)
}
