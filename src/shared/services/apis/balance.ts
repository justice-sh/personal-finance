import { Balance } from "@/shared/types/balance"
import { Currency } from "@/shared/enums/currency"
import { SuccessResponse } from "@/shared/types/api"
import securedClient from "../api-client/secured-client"

const getBalance = async (currency: Currency) => {
  const resp = await securedClient.get<SuccessResponse<Balance>>(`/balances/${currency}`)
  return resp.data.data
}

export const balanceAPI = {
  getBalance,
}
