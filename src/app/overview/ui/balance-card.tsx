import { cn } from "@/shared/lib/utils"
import { formatAmount } from "@/shared/utils/formatAmount"

export const BalanceCard = ({
  title,
  balance,
  currency,
  isStart,
}: {
  title: string
  balance: number
  currency: "NGN" | "USD"
  isStart?: boolean
}) => {
  return (
    <div className={cn("flex h-[119px] flex-col justify-center gap-3 rounded-lg bg-white px-5", isStart && "bg-gray-900")}>
      <h3 className={cn("text-preset-4 text-gray-500", isStart && "text-white")}>{title}</h3>
      <p className={cn("text-preset-1 text-gray-900", isStart && "text-white")}>{formatAmount(balance, currency)}</p>
    </div>
  )
}
