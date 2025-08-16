import { cn } from "@/shared/lib/utils"
import { PotSummary } from "./pot-summary"
import { Color } from "@/shared/enums/color"
import { SectionHeader } from "./section-header"
import { routes } from "@/shared/constants/routes"
import { Currency } from "@/shared/enums/currency"
import { color2Css } from "@/shared/utils/color.util"
import { BudgetPieChart } from "@/shared/components/budget-pie-chart"

export function Budgets({ className }: { className?: string }) {
  const budgets = [
    { title: "Entertainment", amount: 50, color: Color.GREEN },
    { title: "Bills", amount: 750, color: Color.CYAN },
    { title: "Dinning Out", amount: 75, color: Color.YELLOW },
    { title: "Personal Care", amount: 100, color: Color.NAVY },
  ]

  return (
    <section className={cn("", className)}>
      <SectionHeader title="Budgets" cta={{ href: routes.budgets }} />

      <div className="max-sm-5:flex-col flex items-center gap-4">
        <BudgetPieChart
          data={budgets.map((b) => ({ amount: b.amount, name: b.title, fill: color2Css(b.color) }))}
          limit={957}
          spent={400}
          currency={Currency.USD}
          className="mx-auto"
        />

        <div className="sm-5:grid-cols-1 sm-5:w-fit grid w-full grid-cols-2 gap-4">
          {budgets.map((budget) => (
            <PotSummary key={budget.title} {...budget} />
          ))}
        </div>
      </div>
    </section>
  )
}
