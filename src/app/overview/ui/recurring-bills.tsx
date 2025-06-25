import { cn } from "@/shared/lib/utils"
import { SectionHeader } from "./section-header"
import { formatAmount } from "@/shared/utils/formatAmount"
import { routes } from "@/shared/constants/routes"

export function RecurringBills({ className }: { className?: string }) {
  const list: BillCardProps[] = [
    { name: "Paid Bills", amount: 3000, type: "paid" },
    { name: "Total Upcoming", amount: 15000, type: "upcoming" },
    { name: "Due Soon", amount: 8000, type: "due" },
  ]

  return (
    <section className={cn("", className)}>
      <SectionHeader title="Recurring Bills" cta={{ href: routes.recurringBills }} />

      <div className="space-y-3">
        {list.map((bill, index) => (
          <BillCard key={index} {...bill} />
        ))}
      </div>
    </section>
  )
}

type BillType = "paid" | "upcoming" | "due"

type BillCardProps = { name: string; amount: number; type: BillType }

const BillCard = ({ name, amount, type }: BillCardProps) => {
  const styles = {
    paid: "border-secondary-green",
    upcoming: "border-secondary-yellow",
    due: " border-secondary-cyan",
  }

  return (
    <div className={cn("bg-beige-100 flex items-center justify-between rounded-lg border-l-4 p-4", styles[type])}>
      <p className="text-preset-4 text-gray-500">{name}</p>
      <p className="text-preset-4-bold text-gray-900">{formatAmount(amount)}</p>
    </div>
  )
}
