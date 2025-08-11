import { routes } from "@/shared/constants/routes"
import { TransactionType } from "@/shared/types/transaction"
import { DetailsLink } from "@/shared/components/details-link"
import { TransactionDate } from "@/shared/components/transaction/tx-date"
import { TransactionAvatar } from "@/shared/components/transaction/tx-avatar"
import { TransactionAmount } from "@/shared/components/transaction/tx-amount"

export function BudgetTransactions({ className }: { className?: string }) {
  return (
    <section className="bg-beige-100 rounded-lg p-4 pb-3">
      <header className="mb-6 flex items-center justify-between gap-4">
        <h3 className="text-preset-3 xs-5:text-preset-2">Latest Spending</h3>
        <DetailsLink href={routes.transactions} label="See All" />
      </header>

      <div className="divide-y divide-gray-200 [&>*]:first-of-type:pt-0">
        {list.map((item) => (
          <TransactionItem key={item.name} {...item} />
        ))}
      </div>
    </section>
  )
}

interface TransactionItemProps {
  name: string
  image: string
  amount: number
  date: string
  type: TransactionType
}

const TransactionItem = ({ name, image, amount, date, type }: TransactionItemProps) => {
  return (
    <div className="flex items-center justify-between py-2.5">
      <div className="flex items-center gap-4">
        <TransactionAvatar avatar={image} />
        <p className="text-preset-5-bold text-gray-900">{name}</p>
      </div>

      <div className="flex flex-col items-center gap-2">
        <TransactionAmount className="text-preset-5-bold" amount={amount} type={type} />
        <TransactionDate date={date} />
      </div>
    </div>
  )
}

const list: TransactionItemProps[] = [
  {
    name: "Salary",
    image: "/images/avatars/user-1.png",
    amount: 5000,
    date: "2023-03-01",
    type: "income",
  },
  {
    name: "Groceries",
    image: "/images/avatars/user-2.png",
    amount: 150,
    date: "2023-03-02",
    type: "expense",
  },
  {
    name: "Freelance",
    image: "/images/avatars/user-3.png",
    amount: 1200,
    date: "2023-03-03",
    type: "income",
  },
]
