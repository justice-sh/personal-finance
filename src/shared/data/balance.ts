import { Currency } from "../enums/currency"
import { useQuery } from "@tanstack/react-query"
import { balanceAPI } from "../services/apis/balance"

export const useBalance = (currency: Currency) => {
  return useQuery({
    queryKey: ["balance", currency],
    queryFn: () => balanceAPI.getBalance(currency),
    initialData: { balance: 0, currency, expense: 0, income: 0 },
  })
}
