import { useQuery } from '@tanstack/react-query'
import { countManifestsInSupabase } from '../src/utils/superbase-database'

export const useManifestCount = () => {
  return useQuery(['manifestCount'], () => countManifestsInSupabase())
}
