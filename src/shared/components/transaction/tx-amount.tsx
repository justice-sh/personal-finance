import { cn } from "../../lib/utils"
import { Currency } from "../../enums/currency"
import { formatAmount } from "../../utils/formatAmount"

export function TransactionAmount({
  amount,
  currency,
  className,
  type,
}: {
  amount: number
  currency?: Currency
  className?: string
  type: "income" | "expense"
}) {
  if (type === "expense") amount = -1 * amount

  const formattedAmount = formatAmount(amount, currency, { signDisplay: "always" })

  const color = type === "expense" ? "text-gray-900" : "text-secondary-green"

  return <p className={cn("text-preset-5-bold", color, className)}>{formattedAmount}</p>
}
