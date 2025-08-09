import { cn } from "@/shared/lib/utils"
import { SectionHeader } from "./section-header"
import { Color } from "@/shared/types/color.type"
import { routes } from "@/shared/constants/routes"
import { BudgetsPieChart } from "./budgets-pie-chart"
import { PotSummary, PotSummaryProps } from "./pot-summary"

export function Budgets({ className }: { className?: string }) {
  const budgets: PotSummaryProps[] = [
    { title: "Entertainment", amount: 50, color: Color.Green },
    { title: "Bills", amount: 750, color: Color.Cyan },
    { title: "Dinning Out", amount: 75, color: Color.Yellow },
    { title: "Personal Care", amount: 100, color: Color.Navy },
  ]

  return (
    <section className={cn("", className)}>
      <SectionHeader title="Budgets" cta={{ href: routes.budgets }} />

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
