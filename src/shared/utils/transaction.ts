import { TransactionType } from "../enums/transaction"

// TODO: include "unknown" type and log this hit to avoid disrupting UX.
export function parseTransactionType(type: TransactionType): "income" | "expense" {
  switch (type) {
    case TransactionType.SPEND:
    case TransactionType.TRANSFER:
    case TransactionType.WITHDRAWAL:
      return "expense"
    case TransactionType.ALLOCATION:
    case TransactionType.DEPOSIT:
      return "income"
    default:
      throw new Error(`Unknown transaction type: ${type satisfies never}`)
  }
}
