import { Currency } from "../enums/currency"
import { TransactionStatus, TransactionType } from "../enums/transaction"

export type TransactionTypeUnion = "income" | "expense"

export type TransactionResponse = {
  id: string
  type: TransactionType
  amount: number
  status: TransactionStatus
  category: string
  createdAt: Date
  description: string
  avatarUrl?: string
  currency: Currency
}
