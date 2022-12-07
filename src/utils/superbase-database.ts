import { manifestValuesType } from '../../helper/types'

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
    .update(manifestValues)
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

export const countManifestsInSupabase = async (supabaseBrowserClient: any) => {
  return await supabaseBrowserClient
    .from('manifests')
    .select('manifestId', { count: 'exact' })
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

// For server side Auth
// const supabaseServerUrl = process.env.SUPABASE_URL!
// const supabaseServerRoleKey = process.env.SUPABAE_SERVER_ROLE_KEY!
// const supabaseServerRole = createClient(supabaseServerUrl, supabaseServerRoleKey)

// export const serverSideUserSignup = async (
//   email: string,
//   password: string,
//   invitationCode: string
// ) => {
//   return await supabaseServerRole.auth.admin.createUser({
//     email,
//     password,
//     user_metadata: { invitationCode },
//   })
// }

type ManifestsResponse = Awaited<
  ReturnType<typeof getManifestValuesFromSupabase>
>
export type ManifestResponseSuccess = ManifestsResponse['data']
export type ManifestsResponseError = ManifestsResponse['error']
