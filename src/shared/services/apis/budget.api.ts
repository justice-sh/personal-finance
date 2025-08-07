import securedClient from "../api-client/secured-client"
import { SuccessResponse } from "@/shared/types/api.type"
import { Budget, CreateBudget } from "@/shared/types/budget"

const getBudgets = async () => {
  const resp = await securedClient.get<SuccessResponse<Budget[]>>("/budgets")
  return resp.data.data
}

const createBudget = async (data: CreateBudget) => {
  const resp = await securedClient.post<SuccessResponse<Budget>>("/budgets", data)
  return resp.data
}

export const budgetAPI = {
  getBudgets,
  createBudget,
}
