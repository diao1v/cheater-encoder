import { manifestValuesType, formValuesType } from '../helpers/types'

export const addManifestValuesToSupabse = async (
  supabaseServerClient: any,
  manifestValues: manifestValuesType
) => {
  return await supabaseServerClient
    .from('manifests')
    .insert([manifestValues])
    .select('*') // this is needed to return the inserted row
}

export const getManifestValuesFromSupabase = async (
  supabaseServerClient: any,
  manifestId: string
) => {
  return await supabaseServerClient
    .from('manifests')
    .select('*')
    .eq('manifestId', manifestId)
}

export const putManifestValuesToSupabase = async (
  supabaseServerClient: any,
  {
    manifestId,
    manifestValues,
  }: { manifestId: string; manifestValues: manifestValuesType }
) => {
  return await supabaseServerClient
    .from('manifests')
    .update({ ...manifestValues })
    .eq('manifestId', manifestId)
}

export const patchManifestValueToSupabase = async (
  supabaseServerClient: any,
  {
    manifestId,
    coloum,
    updatedValue,
  }: { manifestId: string; coloum: string; updatedValue: any }
) => {
  return await supabaseServerClient
    .from('manifests')
    .update({ [coloum]: updatedValue })
    .eq('manifestId', manifestId)
}

export const checkInvitationCode = async (
  supabaseServerClient: any,
  invitationCode: string
) => {
  console.log('invitationCode', invitationCode)
  return await supabaseServerClient
    .from('invitationCodes')
    .select('*')
    .eq('code', invitationCode)
}

export const userSignup = async (
  supabaseServerClient: any,
  {
    email,
    password,
    invitationCode,
  }: { email: string; password: string; invitationCode: string }
) => {
  return await supabaseServerClient.auth.signUp({
    email,
    password,
    options: {
      data: {
        invitationCode,
      },
    },
  })
}

export const userLogin = async (
  supabaseServerClient: any,
  { email, password }: { email: string; password: string }
) => {
  return await supabaseServerClient.auth.signInWithPassword({ email, password })
}

export const userLogout = async (supabaseServerClient: any) => {
  return await supabaseServerClient.auth.signOut()
}

export const getLoggedinUser = async (supabaseServerClient: any) => {
  return await supabaseServerClient.auth.getUser()
}

export const getUserDefaultValues = async (
  supabaseServerClient: any,
  userId: string
) => {
  return await supabaseServerClient
    .from('defaultValues')
    .select('*')
    .eq('userId', userId)
}

export const insertUserDefaultValues = async (
  supabaseServerClient: any,
  userId: string,
  defaultValues: formValuesType
) => {
  return await supabaseServerClient
    .from('defaultValues')
    .insert({ userId, ...defaultValues })
}

export const updateUserDefaultValues = async (
  supabaseServerClient: any,
  userId: string,
  updatedDefaultValues: formValuesType
) => {
  return await supabaseServerClient
    .from('defaultValues')
    .update({ ...updatedDefaultValues })
    .eq('userId', userId)
}

// Supabase browser client
export const countManifestsInSupabase = async (supabaseBrowserClient: any) => {
  return await supabaseBrowserClient
    .from('manifests')
    .select('manifestId', { count: 'exact' })
}

type ManifestsResponse = Awaited<
  ReturnType<typeof getManifestValuesFromSupabase>
>
export type ManifestResponseSuccess = ManifestsResponse['data']
export type ManifestsResponseError = ManifestsResponse['error']
