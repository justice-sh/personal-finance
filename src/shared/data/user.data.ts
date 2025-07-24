import { authAPI } from "../services/apis/auth"
import { useQuery } from "@tanstack/react-query"
import { queryClient } from "../lib/ts-query-client"

const queryKey = ["user-data"]

export const useUserData = () => {
  return useQuery({ queryKey, queryFn: authAPI.getUser, refetchInterval: 1000 * 10 })
}

export const clearUserData = () => queryClient.removeQueries({ queryKey })
