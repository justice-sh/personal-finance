import securedClient from "../api-client/secured-client"
import { SuccessResponse } from "@/shared/types/api.type"
import { TransactionParam, TransactionResponse } from "@/shared/types/transaction"

const getTransactions = async (params?: TransactionParam) => {
  const resp = await securedClient.get<SuccessResponse<TransactionResponse>>("/transactions", { params })
  return resp.data.data
}

export const transactionAPI = {
  getTransactions,
}
