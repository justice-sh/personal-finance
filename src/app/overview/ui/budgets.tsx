"use client"

import { cn } from "@/shared/lib/utils"
import { PotSummary, PotSummaryProps } from "./pot-summary"
import { SectionHeader } from "./section-header"

export function Budgets({ className }: { className?: string }) {
  const budgets: PotSummaryProps[] = [
    { title: "Entertainment", amount: 500, barColor: "green" },
    { title: "Bills", amount: 200, barColor: "cyan" },
    { title: "Dinning Out", amount: 150, barColor: "yellow" },
    { title: "Personal Care", amount: 110, barColor: "navy" },
  ]

  return (
    <section className={cn("", className)}>
      <SectionHeader title="Budgets" cta={{ href: "/budgets" }} />

      <div className="flex items-center gap-4">
        <div className="h-[240px] w-[247px] ring-1">{/* <SVGIcon /> */}</div>

        <div className="space-y-4">
          {budgets.map((budget) => (
            <PotSummary key={budget.title} {...budget} />
          ))}
        </div>
      </div>
    </section>
  )
}
