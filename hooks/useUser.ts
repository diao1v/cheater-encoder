import { useQuery } from '@tanstack/react-query'
import { getLoggedinUser } from '../src/utils/superbase-database'

export const useUser = () => {
  return useQuery(['user'], () => getLoggedinUser())
}
