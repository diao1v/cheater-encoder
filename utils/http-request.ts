import axios from 'axios'
import { manifestValuesType } from '../helper/types'

export const poster = (manifestBody: manifestValuesType) => {
  return axios.post('/api/create-manifest', manifestBody)
}

export const putor = (manifestBody: manifestValuesType) => {
  const manifestId = manifestBody.manifestId
  return axios.put(`api/${manifestId}/update-manifest`, manifestBody)
}
