import { cn } from "../../lib/utils"
import { Currency } from "../../types/currency"
import { StringNumericLiteral } from "../../types/number"
import { formatAmount } from "../../utils/formatAmount"

export function TransactionAmount({
  amount,
  currency,
  className,
  type,
}: {
  amount: StringNumericLiteral
  currency?: Currency
  className?: string
  type: "income" | "expense"
}) {
  const sign = type === "expense" ? "-" : "+"

  const formattedAmount = sign + formatAmount(amount, currency)

  const color = type === "expense" ? "text-gray-900" : "text-secondary-green"

  return <p className={cn("text-preset-5-bold", color, className)}>{formattedAmount}</p>
}
