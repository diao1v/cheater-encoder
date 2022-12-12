import { useQuery } from '@tanstack/react-query'
import { countManifestsInSupabase } from '../utils/supabase-database'

export const useManifestCount = (supabaseClient: any) => {
  return useQuery(
    ['manifestCount'],
    () => countManifestsInSupabase(supabaseClient),
    {
      keepPreviousData: true,
    }
  )
}
