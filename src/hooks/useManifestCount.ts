import { useQuery } from '@tanstack/react-query'
import { countManifestsInSupabase } from '../utils/superbase-database'

export const useManifestCount = (supabaseClient: any) => {
  return useQuery(
    ['manifestCount'],
    () => countManifestsInSupabase(supabaseClient),
    {
      keepPreviousData: true,
    }
  )
}
