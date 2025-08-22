import { cn } from "@/shared/lib/utils"
import { Budget } from "@/shared/types/budget"
import { routes } from "@/shared/constants/routes"
import { useTransactions } from "@/shared/data/transaction"
import { DetailsLink } from "@/shared/components/details-link"
import { TransactionResponse } from "@/shared/types/transaction"
import { parseTransactionType } from "@/shared/utils/transaction"
import { TransactionDate } from "@/shared/components/transaction/tx-date"
import { TransactionAvatar } from "@/shared/components/transaction/tx-avatar"
import { TransactionAmount } from "@/shared/components/transaction/tx-amount"
import { ConditionalRenderer } from "@/shared/components/conditional-renderer"
import { TransactionSortBy, TransactionType } from "@/shared/enums/transaction"

export function BudgetTransactions({ budget }: { budget: Budget }) {
  const { data, isLoading } = useTransactions({
    limit: 3,
    budgetId: budget.id,
    type: TransactionType.SPEND,
    sortBy: TransactionSortBy.LATEST,
  })

  return (
    <section className="bg-beige-100 @container rounded-lg p-4 pb-3">
      <header className="mb-6 flex items-center justify-between gap-4">
        <h3 className="text-preset-3 sm-2:text-preset-2">Latest Spending</h3>
        <DetailsLink href={routes.transactions} label="See All" />
      </header>

      <ConditionalRenderer
        className="divide-y divide-gray-200 [&>*]:first-of-type:pt-0"
        isEmpty={data.transactions.length === 0}
        emptyState="No transactions found"
        isLoading={isLoading}
      >
        {data.transactions.map((item) => (
          <TransactionItem key={item.id} tx={item} />
        ))}
      </ConditionalRenderer>
    </section>
  )
}

const TransactionItem = ({ tx }: TxItemProps) => {
  return (
    <>
      <TransactionItemDesktop tx={tx} className="@max-xs-4:hidden py-2.5" />
      <TransactionItemMobile tx={tx} className="@min-xs-4:hidden py-2.5" />
    </>
  )
}

const TransactionItemDesktop = ({ tx, className }: TxItemProps) => {
  const { category, description, avatarUrl, currency, amount, createdAt, type } = tx
  return (
    <div className={cn("flex items-center justify-between", className)}>
      <div className="flex items-center gap-4">
        <TransactionAvatar avatar={avatarUrl} fallback={category.substring(0, 2).toUpperCase()} />
        <p className="text-preset-5-bold text-gray-900 capitalize">{description}</p>
      </div>

      <div className="flex flex-col items-center gap-2">
        <TransactionAmount
          className="text-preset-5-bold"
          amount={amount}
          currency={currency}
          type={parseTransactionType(type)}
        />
        <TransactionDate date={createdAt} />
      </div>
    </div>
  )
}

const TransactionItemMobile = ({ tx, className }: TxItemProps) => {
  const { description, currency, amount, createdAt, type } = tx
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <p className="text-preset-5-bold text-gray-900 capitalize">{description}</p>
      <TransactionAmount
        className="text-preset-5-bold"
        amount={amount}
        currency={currency}
        type={parseTransactionType(type)}
      />
      <TransactionDate date={createdAt} />
    </div>
  )
}

type TxItemProps = {
  tx: TransactionResponse["transactions"][number]
  className?: string
}
