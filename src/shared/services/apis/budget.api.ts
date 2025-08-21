import securedClient from "../api-client/secured-client"
import { SuccessResponse } from "@/shared/types/api.type"
import { AdjustBudget, Budget, CreateBudget, SpendBudget } from "@/shared/types/budget"

const getBudgets = async () => {
  const resp = await securedClient.get<SuccessResponse<Budget[]>>("/budgets")
  return resp.data.data
}

const createBudget = async (data: CreateBudget) => {
  const resp = await securedClient.post<SuccessResponse<Budget>>("/budgets", data)
  return resp.data
}

const updateBudget = async (id: string, data: Partial<CreateBudget>) => {
  const resp = await securedClient.put<SuccessResponse<Budget>>(`/budgets/${id}`, data)
  return resp.data
}

const deleteBudget = async (id: string) => {
  const resp = await securedClient.delete<SuccessResponse<null>>(`/budgets/${id}`)
  return resp.data
}

const adjustBudget = async (id: string, data: AdjustBudget) => {
  const resp = await securedClient.post<SuccessResponse<Budget>>(`/budgets/${id}/adjustment`, data)
  return resp.data
}

const spendBudget = async (id: string, data: SpendBudget) => {
  const resp = await securedClient.post<SuccessResponse<Budget>>(`/budgets/${id}/spend`, data)
  return resp.data
}

export const budgetAPI = {
  getBudgets,
  createBudget,
  updateBudget,
  deleteBudget,
  adjustBudget,
  spendBudget,
}
