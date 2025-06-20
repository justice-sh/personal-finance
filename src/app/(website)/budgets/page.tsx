"use client"
import React from "react"
import Summary from "@/app/(website)/budgets/ui/summary"
import EnligtedCards from "@/app/(website)/budgets/ui/enlighted-cards"

const Summaries = [
  { color: "bg-secondary-green", name: "Entertainment", priceOf: "15.00", priceOut: "50.00", range: 90 },
  { color: "bg-secondary-yellow", name: "Bills", priceOf: "150.00", priceOut: "750.00", range: 50 },
  { color: "bg-secondary-navy", name: "Dinning Out", priceOf: "133.00", priceOut: "75.00", range: 20 },
  { color: "bg-secondary-cyan", name: "Personnal Care", priceOf: "40.00", priceOut: "100.00", range: 30 },
]

const Data = [
  { name: "Group A", value: 50, color: "#277c78" },
  { name: "Group B", value: 150, color: "#f2cdac" },
  { name: "Group C", value: 150, color: "#626070" },
  { name: "Group D", value: 650, color: "#82c9d7" },
]

const Next = [
  { name: "James Thompson", value: "24", date: "11 Aug 2024" },
  { name: "Adams Smith", value: "28", date: "11 Dec 2022" },
  { name: "Plum Maths", value: "50", date: "1 Nov 2000" },
]
const BudgetsPage = () => {
  return (
    <section className="grid gap-6 sm:grid-cols-1 lg:grid-cols-[41.4%_58.6%]">
      <Summary summaries={Summaries} data={Data} />
      <div className="col-span-1 h-full w-full space-y-6">
        {Summaries.map((value) => (
          <EnligtedCards
            key={value.name}
            color={value.color}
            name={value.name}
            priceOf={value.priceOf}
            priceOut={value.priceOut}
            range={value.range}
            next={Next}
          />
        ))}
      </div>
    </section>
  )
}

export default BudgetsPage
