"use client"

import React from "react"
import BudgetCard from "./ui/budget-card"
import BudgetDialog from "./ui/budget-dialog"
import { useBudgets } from "@/shared/data/budget"
import SpendingSummary from "./ui/spending-summary"
import { PageLayer } from "@/shared/components/page-layer"
import { ConditionalRenderer } from "@/shared/components/conditional-renderer"

const BudgetsPage = () => {
  const { data: budgets, isLoading } = useBudgets()

  return (
    <PageLayer
      title="Budgets"
      cta={<BudgetDialog mode="add" />}
      className="lg-2:grid-cols-[428px_1fr] md-9:grid-cols-2 grid gap-6"
    >
      <SpendingSummary budgets={budgets} />

      <ConditionalRenderer className="@container" isEmpty={budgets.length === 0} isLoading={isLoading}>
        <section className="@min-md-5:grid-cols-2 grid gap-6">
          {budgets.map((budget) => (
            <BudgetCard key={budget.category} budget={budget} />
          ))}
        </section>
      </ConditionalRenderer>
    </PageLayer>
  )
}

export default BudgetsPage
