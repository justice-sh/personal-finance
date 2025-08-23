"use client"

import { cn } from "@/shared/lib/utils"
import { SectionHeader } from "./section-header"
import { routes } from "@/shared/constants/routes"
import { useTransactions } from "@/shared/data/transaction"
import { TransactionSortBy } from "@/shared/enums/transaction"
import { TransactionResponse } from "@/shared/types/transaction"
import { parseTransactionType } from "@/shared/utils/transaction"
import { TransactionDate } from "@/shared/components/transaction/tx-date"
import { TransactionAvatar } from "@/shared/components/transaction/tx-avatar"
import { TransactionAmount } from "@/shared/components/transaction/tx-amount"

export function Transactions({ className }: { className?: string }) {
  const { data } = useTransactions({ limit: 5, sortBy: TransactionSortBy.LATEST })

  return (
    <section className={cn(className, "@container pb-3")}>
      <SectionHeader title="Transactions" cta={{ href: routes.transactions, label: "View All" }} />

      <div className="divide-y divide-gray-100 [&>*]:first-of-type:pt-0">
        {data.transactions.map((tx) => (
          <TransactionItem key={tx.id} tx={tx} />
        ))}
      </div>
    </section>
  )
}

interface TransactionItemProps {
  tx: TransactionResponse["transactions"][number]
  className?: string
}

const TransactionItem = ({ tx }: TransactionItemProps) => {
  return (
    <>
      <TransactionItemDesktop tx={tx} className="@max-xs-4:hidden py-2.5" />
      <TransactionItemMobile tx={tx} className="@min-xs-4:hidden py-2.5" />
    </>
  )
}

const TransactionItemDesktop = ({ tx, className }: TransactionItemProps) => {
  return (
    <div className={cn("flex items-center justify-between", className)}>
      <div className="flex items-center gap-4">
        <TransactionAvatar avatar={tx.avatarUrl} />
        <p className="text-preset-4-bold text-gray-900 capitalize">{tx.category}</p>
      </div>

      <div className="flex flex-col items-center gap-2">
        <TransactionAmount className="text-preset-4-bold" amount={tx.amount} type={parseTransactionType(tx.type)} />
        <TransactionDate date={tx.createdAt} />
      </div>
    </div>
  )
}

const TransactionItemMobile = ({ tx, className }: TransactionItemProps) => {
  return (
    <div className={cn("flex gap-2", className)}>
      <TransactionAvatar avatar={tx.avatarUrl} />

      <div className="flex flex-col gap-2">
        <p className="text-preset-4-bold text-gray-900 capitalize">{tx.category}</p>
        <TransactionAmount className="text-preset-4-bold" amount={tx.amount} type={parseTransactionType(tx.type)} />
        <TransactionDate date={tx.createdAt} />
      </div>
    </div>
  )
}
