import React from "react"
import { cn } from "@/shared/lib/utils"
import { Budget } from "@/shared/types/budget"
import { formatAmount } from "@/shared/utils/formatAmount"
import { color2Css, color2Tailwind } from "@/shared/utils/color.util"
import { BudgetPieChart } from "@/shared/components/budget-pie-chart"
import { ConditionalRenderer } from "@/shared/components/conditional-renderer"

const SpendingSummary = ({ budgets }: { budgets: Budget[] }) => {
  return (
    <div className="flex h-fit flex-col gap-8 rounded-[0.75rem] bg-white px-5 py-6 sm:flex-row sm:p-8 lg:flex-col">
      <div className="flex h-[17.5rem] w-full items-center justify-center">
        <BudgetPieChart
          limit={budgets.reduce((acc, budget) => acc + (budget.maxSpend || 0), 0)}
          spent={budgets.reduce((acc, budget) => acc + (budget.spent || 0), 0)}
          data={budgets.map((budget) => ({ amount: budget.spent, name: budget.category, fill: color2Css(budget.color) }))}
          currency={budgets[0]?.currency}
        />
      </div>

      <div className="">
        <h2 className="text-preset-2 mb-2">Spending Summary</h2>

        <ConditionalRenderer className="divide divide-y divide-gray-100" isEmpty={budgets.length === 0}>
          {budgets.map((budget) => (
            <SummaryItem key={budget.category} budget={budget} />
          ))}
        </ConditionalRenderer>
      </div>
    </div>
  )
}

const SummaryItem = ({ budget }: { budget: Budget }) => {
  return (
    <div key={budget.category} className="flex h-min flex-col items-center py-4">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-x-4">
          <div className={cn("h-[1.32rem] w-1 rounded-[0.5rem] bg-blue-500", color2Tailwind(budget.color))} />
          <p className="text-preset-4 text-gray-500 capitalize">{budget.category}</p>
        </div>
        <div className="flex items-center gap-x-2">
          <p className="text-preset-3 text-gray-900">{formatAmount(budget.spent, budget.currency)}</p>
          <p className="text-preset-5 text-nowrap text-gray-500">of {formatAmount(budget.maxSpend, budget.currency)}</p>
        </div>
      </div>
    </div>
  )
}

export default SpendingSummary
