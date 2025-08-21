import { Currency } from "../enums/currency"
import { TransactionSortBy, TransactionStatus, TransactionType } from "../enums/transaction"

export type TransactionTypeUnion = "income" | "expense"

export type TransactionResponse = {
  transactions: {
    id: string
    type: TransactionType
    amount: number
    status: TransactionStatus
    category: string
    createdAt: Date
    description: string
    avatarUrl?: string
    currency: Currency
  }[]
  meta: {
    total: number
    limit: number
    offset: number
  }
}

export type TransactionParam = {
  limit: number
  offset: number
  query?: string
  budgetId?: string
  category?: string
  type?: TransactionType
  sortBy?: TransactionSortBy
  status?: TransactionStatus
}

export type TxSortByResponse = { value: TransactionSortBy; label: string }
