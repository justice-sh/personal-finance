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
    <section className="bg-beige-100 rounded-lg p-4 pb-3">
      <header className="mb-6 flex items-center justify-between gap-4">
        <h3 className="text-preset-3 xs-5:text-preset-2">Latest Spending</h3>
        <DetailsLink href={routes.transactions} label="See All" />
      </header>

      <ConditionalRenderer
        className="divide-y divide-gray-200 [&>*]:first-of-type:pt-0"
        isEmpty={data.transactions.length === 0}
        emptyState="No transactions found"
        isLoading={isLoading}
      >
        {data.transactions.map((item) => (
          <TransactionItem key={item.id} {...item} />
        ))}
      </ConditionalRenderer>
    </section>
  )
}

const TransactionItem = ({
  category,
  avatarUrl,
  currency,
  amount,
  createdAt,
  type,
}: TransactionResponse["transactions"][number]) => {
  return (
    <div className="flex items-center justify-between py-2.5">
      <div className="flex items-center gap-4">
        <TransactionAvatar avatar={avatarUrl} />
        <p className="text-preset-5-bold text-gray-900">{category}</p>
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
