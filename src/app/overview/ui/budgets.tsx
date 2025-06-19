import { cn } from "@/shared/lib/utils"
import { PotSummary, PotSummaryProps } from "./pot-summary"
import { SectionHeader } from "./section-header"
import { BudgetsPieChart } from "./budgets-pie-chart"

export function Budgets({ className }: { className?: string }) {
  const budgets: PotSummaryProps[] = [
    { title: "Entertainment", amount: 50, color: "green" },
    { title: "Bills", amount: 750, color: "cyan" },
    { title: "Dinning Out", amount: 75, color: "yellow" },
    { title: "Personal Care", amount: 100, color: "navy" },
  ]

  return (
    <section className={cn("", className)}>
      <SectionHeader title="Budgets" cta={{ href: "/budgets" }} />

      <div className="max-sm-5:flex-col flex items-center gap-4">
        <BudgetsPieChart list={budgets} className="mx-auto" />

        <div className="sm-5:grid-cols-1 sm-5:w-fit grid w-full grid-cols-2 gap-4">
          {budgets.map((budget) => (
            <PotSummary key={budget.title} {...budget} />
          ))}
        </div>
      </div>
    </section>
  )
}
