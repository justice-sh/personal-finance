import React from "react"
import Spending from "@/app/(website)/budgets/ui/spending"
import SpendingCharts from "@/shared/components/spending-charts"

type Props = {
  summaries: {
    color: string
    name: string
    priceOf: string
    priceOut: string
  }[]
  data: {
    name: string
    value: number
    color: string
  }[]
}

const Summary = ({ summaries, data }: Props) => {
  return (
    <div className="flex h-[37.45rem] flex-col gap-8 rounded-[0.75rem] bg-white px-5 py-6 sm:h-[21.5rem] sm:flex-row sm:p-8 lg:h-[37.45rem] lg:flex-col">
      <div className="flex h-[17.5rem] w-full items-center justify-center">
        <SpendingCharts data={data} limit="330" value="120" />
      </div>
      <Spending options={summaries} />
    </div>
  )
}

export default Summary
