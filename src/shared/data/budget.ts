import { Budget } from "../types/budget"
import { useQuery } from "@tanstack/react-query"
import { queryClient } from "../lib/ts-query-client"
import { budgetAPI } from "../services/apis/budget.api"

const queryKey = ["user-budgets"]
const queryFn = budgetAPI.getBudgets

export const useBudgets = () => {
  const { data = [], isLoading } = useQuery({ queryKey, queryFn })
  return { data, isLoading }
}

export const addBudgetToState = (budget: Budget) => {
  const budgets = queryClient.getQueryData<Budget[]>(queryKey) ?? []
  queryClient.setQueryData<Budget[]>(queryKey, [...budgets, budget])
}

export const updateBudgetInState = (budget: Budget) => {
  const budgets = queryClient.getQueryData<Budget[]>(queryKey) ?? []
  const index = budgets.findIndex((b) => b.id === budget.id)
  if (index !== -1) {
    budgets[index] = budget
    queryClient.setQueryData<Budget[]>(queryKey, budgets)
  }
}
