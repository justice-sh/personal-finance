import React from "react"
import Spending from "./spending"
import SpendingCharts from "./spending-charts"

type Props = {}
const Summaries = [
  { color: "bg-red-200", name: "Entertainment", priceOf: "15.00", priceOut: "50.00" },
  { color: "bg-blue-200", name: "Bills", priceOf: "150.00", priceOut: "750.00" },
  { color: "bg-yellow-200", name: "Dinning Out", priceOf: "133.00", priceOut: "75.00" },
  { color: "bg-green-200", name: "Personnal Care", priceOf: "40.00", priceOut: "100.00" },
]

const Summary = (props: Props) => {
  return (
    <div className="flex h-[37.45rem] flex-col gap-8 rounded-[0.75rem] bg-white px-5 py-6 sm:h-[21.5rem] sm:flex-row sm:p-8 lg:h-[37.45rem] lg:flex-col">
      <div className="flex h-[17.5rem] w-full items-center justify-center">
        <SpendingCharts />
      </div>
      <Spending options={Summaries} />
    </div>
  )
}

export default Summary
