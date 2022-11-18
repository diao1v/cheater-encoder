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
  coloumName: string,
  updatedValue: any
) => {
  return await supabase
    .from('manifests')
    .update({ coloumName: updatedValue })
    .eq('manifestId', manifestId)
}

export const countManifestsInSupabase = async () => {
  return await supabase
    .from('manifests')
    .select('manifestId', { count: 'exact' })
}

type ManifestsResponse = Awaited<
  ReturnType<typeof getManifestValuesFromSupabase>
>
export type ManifestResponseSuccess = ManifestsResponse['data']
export type ManifestsResponseError = ManifestsResponse['error']
