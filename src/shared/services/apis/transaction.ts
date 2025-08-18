import securedClient from "../api-client/secured-client"
import { SuccessResponse } from "@/shared/types/api.type"
import { TransactionResponse } from "@/shared/types/transaction"

const getTransactions = async () => {
  const resp = await securedClient.get<SuccessResponse<TransactionResponse[]>>("/transactions")
  return resp.data.data
}

export const transactionAPI = {
  getTransactions,
}
