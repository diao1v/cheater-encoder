import axios from 'axios'
import {
  manifestValuesType,
  SignupValuesType,
  LoginValuesType,
  formValuesType,
} from '../helper/types'

export const manifestCreationPoster = (manifestBody: manifestValuesType) => {
  return axios.post('/api/create-manifest', manifestBody)
}

export const manifestUpdatePutor = (manifestBody: manifestValuesType) => {
  const manifestId = manifestBody.manifestId
  return axios.put(`api/${manifestId}/update-manifest`, manifestBody)
}

export const manifestLiveToVodPatcher = ({
  manifestId,
  liveToVod,
}: {
  manifestId: string
  liveToVod: boolean
}) => {
  return axios.patch(`api/${manifestId}/update-manifest`, { liveToVod })
}

export const userLoginPoster = (loginValues: LoginValuesType) => {
  return axios.post('/api/account/login', loginValues)
}

export const userSignupPoster = (signupValues: SignupValuesType) => {
  return axios.post('/api/account/signup', signupValues)
}

export const userLogoutPoster = () => {
  return axios.post('/api/account/logout')
}

export const defaultValuesGetter = () => {
  return axios.get('/api/default-values')
}

export const defaultValuesPoster = (
  defaultValues: formValuesType
) => {
  return axios.post('/api/default-values', defaultValues)
}
