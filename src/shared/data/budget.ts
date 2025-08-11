import { useQuery } from "@tanstack/react-query"
import { queryClient } from "../lib/ts-query-client"
import { budgetAPI } from "../services/apis/budget.api"

const queryKey = ["user-budgets"]
const queryFn = budgetAPI.getBudgets

export const useBudgets = () => {
  const { data = [], isLoading } = useQuery({ queryKey, queryFn })
  return { data, isLoading }
}

export const refreshBudgets = () => {
  return queryClient.invalidateQueries({ queryKey })
}
