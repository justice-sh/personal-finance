import { useQuery } from "@tanstack/react-query"
import { useDebounce } from "../hooks/use-debounce"
import { TransactionParam } from "../types/transaction"
import { transactionAPI } from "../services/apis/transaction"

const queryKey = (params?: TransactionParam) => ["transactions", params]
const queryFn = transactionAPI.getTransactions

export const useTransactions = (params?: TransactionParam) => {
  const debouncedParams = useDebounce(params, 500)

  const { data, isLoading } = useQuery({
    queryKey: queryKey(debouncedParams),
    queryFn: () => queryFn(debouncedParams),
    initialData: { data: [], meta: { limit: 0, offset: 0, total: 0 } },
  })

  return { data, isLoading }
}
