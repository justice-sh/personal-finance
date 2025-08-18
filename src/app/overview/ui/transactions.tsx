import { cn } from "@/shared/lib/utils"
import { SectionHeader } from "./section-header"
import { routes } from "@/shared/constants/routes"
import { TransactionTypeUnion } from "@/shared/types/transaction"
import { TransactionDate } from "@/shared/components/transaction/tx-date"
import { TransactionAvatar } from "@/shared/components/transaction/tx-avatar"
import { TransactionAmount } from "@/shared/components/transaction/tx-amount"

export function Transactions({ className }: { className?: string }) {
  return (
    <section className={cn(className, "pb-3")}>
      <SectionHeader title="Transactions" cta={{ href: routes.transactions, label: "View All" }} />

      <div className="divide-y divide-gray-100 [&>*]:first-of-type:pt-0">
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
  type: TransactionTypeUnion
}

const TransactionItem = ({ name, image, amount, date, type }: TransactionItemProps) => {
  return (
    <div className="flex items-center justify-between py-2.5">
      <div className="flex items-center gap-4">
        <TransactionAvatar avatar={image} />
        <p className="text-preset-4-bold text-gray-900">{name}</p>
      </div>

      <div className="flex flex-col items-center gap-2">
        <TransactionAmount className="text-preset-4-bold" amount={amount} type={type} />
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
  {
    name: "Something",
    image: "/images/avatars/user-3.png",
    amount: 1200,
    date: "2023-03-03",
    type: "income",
  },
  {
    name: "Anotherthing",
    image: "/images/avatars/user-3.png",
    amount: 1200,
    date: "2023-03-03",
    type: "income",
  },
]
