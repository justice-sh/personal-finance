import { useQuery } from "@tanstack/react-query"
import { useDebounce } from "../hooks/use-debounce"
import { TransactionParam } from "../types/transaction"
import { TransactionSortBy } from "../enums/transaction"
import { useQueryParams } from "../hooks/use-query-params"
import { transactionAPI } from "../services/apis/transaction"

export const useTransactions = (params?: Partial<TransactionParam>) => {
  const debouncedParams = useDebounce(params, 500)

  const { data, isLoading } = useQuery({
    queryKey: ["transactions", debouncedParams],
    queryFn: () => transactionAPI.getTransactions(debouncedParams),
    initialData: { transactions: [], meta: { limit: 0, offset: 0, total: 0 } },
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

export const useTransactionsQueryParams = (defaultParams?: Partial<TransactionParam>) => {
  const [queryParams, setQueryParams] = useQueryParams<TransactionParam>({
    query: "",
    offset: 0,
    sortBy: TransactionSortBy.LATEST,
    category: "all",
    limit: 6,
    ...defaultParams,
  })

  return [queryParams, setQueryParams] as const
}
