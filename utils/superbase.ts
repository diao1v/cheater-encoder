import { createClient } from '@supabase/supabase-js'
import { manifestValuesType } from '../helper/types'

const supabaseUrl = process.env.SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)
export default supabase

export const addManifestValuesToSupabse = async (
  manifestValues: manifestValuesType
) => {
  return await supabase.from('manifests').insert([manifestValues]).select('*') // this is needed to return the inserted row
}

export const getManifestValuesFromSupabase = async (manifestId: string) => {
  return await supabase
    .from('manifests')
    .select('*')
    .eq('manifestId', manifestId)
}

export const putManifestValuesToSupabase = async (
  manifestId: string,
  manifestValues: manifestValuesType
) => {
  return await supabase
    .from('manifests')
    .update(manifestValues)
    .eq('manifestId', manifestId)
}

export const patchManifestValueToSupabase = async (
  manifestId: string,
  coloum: string,
  updatedValue: any
) => {
  return await supabase
    .from('manifests')
    .update({ [coloum]: updatedValue })
    .eq('manifestId', manifestId)
}

export const countManifestsInSupabase = async () => {
  return await supabase
    .from('manifests')
    .select('manifestId', { count: 'exact' })
}

export const checkInvitationCode = async (invitationCode: string) => {
  console.log('invitationCode', invitationCode)
  return await supabase
    .from('invitationCodes')
    .select('*')
    .eq('code', invitationCode)
}

export const userSignup = async (
  email: string,
  password: string,
  invitationCode: string
) => {
  return await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        invitationCode,
      },
    },
  })
}

export const userLogin = async (email: string, password: string) => {
  return await supabase.auth.signInWithPassword({ email, password })
}

export const userLogout = async () => {
  return await supabase.auth.signOut()
}

// For server side Auth
const supabaseServerRoleKey = process.env.SUPABAE_SERVER_ROLE_KEY!
const supabaseServerRole = createClient(supabaseUrl, supabaseServerRoleKey)

export const serverSideUserSignup = async (
  email: string,
  password: string,
  invitationCode: string
) => {
  return await supabaseServerRole.auth.admin.createUser({
    email,
    password,
    user_metadata: { invitationCode },
  })
}

type ManifestsResponse = Awaited<
  ReturnType<typeof getManifestValuesFromSupabase>
>
export type ManifestResponseSuccess = ManifestsResponse['data']
export type ManifestsResponseError = ManifestsResponse['error']
