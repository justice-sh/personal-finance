import securedClient from "../api-client/secured-client"
import { SuccessResponse } from "@/shared/types/api"
import { TransactionParam, TransactionResponse, TxSortByResponse } from "@/shared/types/transaction"

const getTransactions = async (params?: Partial<TransactionParam>) => {
  const resp = await securedClient.get<SuccessResponse<TransactionResponse>>("/transactions", { params })
  return resp.data.data
}

const getSortBy = async () => {
  const resp = await securedClient.get<SuccessResponse<TxSortByResponse[]>>("/transactions/sort-by")
  return resp.data.data
}

export const transactionAPI = {
  getTransactions,
  getSortBy,
}
