"use client"

import { cn } from "@/shared/lib/utils"
import { formatAmount } from "@/shared/utils/formatAmount"
import { Pots } from "./ui/pots"
import { TransactionAvatar } from "@/shared/components/transaction/tx-avatar"
import { TransactionAmount } from "@/shared/components/transaction/tx-amount"
import { Transactions } from "./ui/transactions"

export default function OverviewPage() {
  const styles = {
    section: "bg-white p-8 rounded-xl",
  }

  return (
    <main className="@container flex flex-col gap-6">
      <header className="text-preset-1">Overview</header>

      <section className="@min-md-1:grid-cols-3 @min-sm-5:grid-cols-2 grid gap-6">
        <BalanceCard title="Current Balance" balance={4000} currency="USD" isStart />
        <BalanceCard title="Income" balance={4000} currency="USD" />
        <BalanceCard title="Expense" balance={4000} currency="USD" />
      </section>

      <section className="@min-md-2:grid-cols-[608px_1fr] grid gap-6">
        <section className="@container flex flex-col gap-6">
          <Pots className={cn("w-full", styles.section)} />
          <Transactions className={cn("", styles.section)} />
        </section>

        <section className="flex flex-col gap-6 [&>*]:ring-1">
          <div className="h-[416px]">6</div>
        </section>
      </section>
    </main>
  )
}

const BalanceCard = ({
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
