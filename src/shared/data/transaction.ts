import { useQuery } from "@tanstack/react-query"
import { useDebounce } from "../hooks/use-debounce"
import { TransactionParam } from "../types/transaction"
import { transactionAPI } from "../services/apis/transaction"

export const useTransactions = (params?: TransactionParam) => {
  const debouncedParams = useDebounce(params, 500)

  const { data, isLoading } = useQuery({
    queryKey: ["transactions", debouncedParams],
    queryFn: () => transactionAPI.getTransactions(debouncedParams),
    initialData: { data: [], meta: { limit: 0, offset: 0, total: 0 } },
  })

  return { data, isLoading }
}

export const useTransactionSortBy = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["transactions", "sort-by"],
    queryFn: transactionAPI.getSortBy,
    initialData: [],
  })

  return { data, isLoading }
}
