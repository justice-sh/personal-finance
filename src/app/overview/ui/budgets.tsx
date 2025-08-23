"use client"

import { cn } from "@/shared/lib/utils"
import { PotSummary } from "./pot-summary"
import { SectionHeader } from "./section-header"
import { color2Css } from "@/shared/utils/color"
import { useBudgets } from "@/shared/data/budget"
import { routes } from "@/shared/constants/routes"
import { BudgetPieChart } from "@/shared/components/budget-pie-chart"

export function Budgets({ className }: { className?: string }) {
  const { data } = useBudgets()

  const budgets = data.slice(0, 4)

  return (
    <section className={cn("", className)}>
      <SectionHeader title="Budgets" cta={{ href: routes.budgets }} />

      <div className="max-sm-5:flex-col flex items-center gap-4">
        <BudgetPieChart
          data={budgets.map((b) => ({ amount: b.spent, name: b.category, fill: color2Css(b.color) }))}
          limit={data.reduce((acc, budget) => acc + budget.maxSpend, 0)}
          spent={data.reduce((acc, budget) => acc + budget.spent, 0)}
          currency={budgets[0]?.currency}
          innerRadius={65}
          styles={{ container: "mx-auto max-w-[240px]", chartContainer: "max-w-[240px]" }}
        />

        <div className="sm-5:grid-cols-1 sm-5:w-fit grid w-full grid-cols-2 gap-4">
          {budgets.map((budget) => (
            <PotSummary
              key={budget.category}
              amount={budget.spent}
              currency={budget.currency}
              color={budget.color}
              title={budget.category}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
