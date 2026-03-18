import { useQuery } from '@tanstack/react-query'
import { userService } from '../services/api'

export const USERS_QUERY_KEY = 'users'
export const USER_QUERY_KEY = 'user'

export function useUsers({ page, limit, search }) {
  return useQuery({
    queryKey: [USERS_QUERY_KEY, { page, limit, search }],
    queryFn: () => userService.getUsers({ page, limit, search }),
    placeholderData: (prev) => prev, // keep previous data while fetching
    staleTime: 1000 * 60 * 2, // 2 minutes
    gcTime: 1000 * 60 * 10,   // 10 minutes
    retry: 2,
  })
}

export function useUser(id) {
  return useQuery({
    queryKey: [USER_QUERY_KEY, id],
    queryFn: () => userService.getUserById(id),
    enabled: !!id,
    staleTime: 1000 * 60 * 5,
    retry: 2,
  })
}
