"use client"

import { cn } from "@/shared/lib/utils"
import { useBalance } from "@/shared/data/balance"
import { Currency } from "@/shared/enums/currency"
import { formatAmount } from "@/shared/utils/formatAmount"

export function Balance() {
  const { data } = useBalance(Currency.NGN)

  return (
    <section className="@min-md-1:grid-cols-3 @min-sm-5:grid-cols-2 grid gap-6">
      <BalanceCard title="Current Balance" balance={data.balance} currency={data.currency} isStart />
      <BalanceCard title="Income" balance={data.income} currency={data.currency} />
      <BalanceCard title="Expense" balance={data.expense} currency={data.currency} />
    </section>
  )
}

export const BalanceCard = ({
  title,
  balance,
  currency,
  isStart,
}: {
  title: string
  balance: number
  currency: Currency
  isStart?: boolean
}) => {
  return (
    <div className={cn("flex h-[119px] flex-col justify-center gap-3 rounded-lg bg-white px-5", isStart && "bg-gray-900")}>
      <h3 className={cn("text-preset-4 text-gray-500", isStart && "text-white")}>{title}</h3>
      <p className={cn("text-preset-1 text-gray-900", isStart && "text-white")}>{formatAmount(balance, currency)}</p>
    </div>
  )
}
