import { useQuery } from "@tanstack/react-query"
import { transactionAPI } from "../services/apis/transaction"

const queryKey = ["user-transactions"]
const queryFn = transactionAPI.getTransactions

export const useTransactions = () => {
  const { data = [], isLoading } = useQuery({ queryKey, queryFn })
  return { data, isLoading }
}
