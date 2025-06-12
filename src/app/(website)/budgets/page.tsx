"use client"
import React from "react"
import Summary from "./_components/summary"
import EnligtedCards from "./_components/enligted-cards"

const BudgetsPage = () => {
  return (
    <section className="grid gap-6 sm:grid-cols-1 lg:grid-cols-[41.4%_58.6%]">
      <Summary />
      <div className="col-span-1 h-full w-full space-y-6">
        <EnligtedCards />
        <EnligtedCards />
        <EnligtedCards />
        <EnligtedCards />
        <EnligtedCards />
      </div>
    </section>
  )
}

export default BudgetsPage
