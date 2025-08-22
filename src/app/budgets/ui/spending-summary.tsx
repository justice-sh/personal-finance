import React from "react"
import { cn } from "@/shared/lib/utils"
import { Budget } from "@/shared/types/budget"
import { formatAmount } from "@/shared/utils/formatAmount"
import { color2Css, color2Tailwind } from "@/shared/utils/color"
import { BudgetPieChart } from "@/shared/components/budget-pie-chart"
import { ConditionalRenderer } from "@/shared/components/conditional-renderer"

const SpendingSummary = ({ budgets }: { budgets: Budget[] }) => {
  return (
    <section className="@container">
      <div className="@min-md-2:grid-cols-2 grid h-fit gap-8 rounded-[0.75rem] bg-white p-6">
        <section className="flex h-[17.5rem] flex-1 items-center justify-center">
          <BudgetPieChart
            limit={budgets.reduce((acc, budget) => acc + (budget.maxSpend || 0), 0)}
            spent={budgets.reduce((acc, budget) => acc + (budget.spent || 0), 0)}
            data={budgets.map((budget) => ({ amount: budget.spent, name: budget.category, fill: color2Css(budget.color) }))}
            currency={budgets[0]?.currency}
          />
        </section>

        <section className="@container flex-1">
          <h2 className="text-preset-2 mb-2">Spending Summary</h2>

          <ConditionalRenderer className="divide divide-y divide-gray-100" isEmpty={budgets.length === 0}>
            {budgets.map((budget) => (
              <SummaryItem key={budget.category} budget={budget} />
            ))}
          </ConditionalRenderer>
        </section>
      </div>
    </section>
  )
}

const SummaryItem = ({ budget }: { budget: Budget }) => {
  return (
    <>
      <SummaryItemDesktop budget={budget} className="@max-xs-5:hidden" />
      <SummaryItemMobile budget={budget} className="@min-xs-5:hidden" />
    </>
  )
}

const SummaryItemDesktop = ({ budget, className }: { budget: Budget; className?: string }) => {
  return (
    <div className={cn("flex h-min flex-col items-center py-4", className)}>
      <div className="flex w-full items-center justify-between gap-2">
        <div className="flex items-center gap-x-4">
          <div className={cn("h-[1.32rem] w-1 rounded-[0.5rem] bg-blue-500", color2Tailwind(budget.color))} />
          <p className="text-preset-4 text-gray-500 capitalize">{budget.category}</p>
        </div>
        <div className="flex items-center gap-x-2">
          <p className="text-preset-4-bold text-gray-900">{formatAmount(budget.spent, budget.currency)}</p>
          <p className="text-preset-5 text-nowrap text-gray-500">of {formatAmount(budget.maxSpend, budget.currency)}</p>
        </div>
      </div>
    </div>
  )
}

const SummaryItemMobile = ({ budget, className }: { budget: Budget; className?: string }) => {
  return (
    <div className={cn("flex h-min flex-col items-center py-4", className)}>
      <div className="flex w-full gap-2">
        <div className={cn("min-h-5 w-1 rounded-[0.5rem] bg-blue-500", color2Tailwind(budget.color))} />

        <div className="flex flex-col gap-2">
          <p className="text-preset-4-bold text-gray-900">Spent {formatAmount(budget.spent, budget.currency)}</p>
          <p className="text-preset-5 text-nowrap text-gray-500">of {formatAmount(budget.maxSpend, budget.currency)}</p>
          <p className="text-preset-4 text-gray-500 capitalize">in {budget.category}</p>
        </div>
      </div>
    </div>
  )
}

export default SpendingSummary
