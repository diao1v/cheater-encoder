import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL!
const supabaseKey = process.env.SUPABASE_ANON_KEY!
const supabase = createClient(supabaseUrl, supabaseKey)
export default supabase

export const getManifest = async (manifestId: string) => {
  return await supabase
    .from('manifests')
    .select('*')
    .eq('manifestId', manifestId)
}

type ManifestsResponse = Awaited<ReturnType<typeof getManifest>>
export type ManifestResponseSuccess = ManifestsResponse['data']
export type ManifestsResponseError = ManifestsResponse['error']