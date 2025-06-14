import { cn } from "@/shared/lib/utils"
import { ArrowBigLeft, ArrowBigRight, Option } from "lucide-react"
import React from "react"

type Props = {
  next: {
    name: string
    value: string
    date: string
  }[]
}

const LatestEnligted = ({ next }: Props) => {
  return (
    <div className="col-span-1 flex h-min w-full flex-col gap-y-5 rounded-[0.75rem] bg-[#F2F3F7] p-5">
      <div className="flex items-center justify-between">
        <h2 className="text-preset-3">Latest Spending</h2>
        <span className="flex items-center gap-x-3">
          <p className="text-preset-4 text-gray-500">See All</p> <ArrowBigRight className="size-3" />
        </span>
      </div>
      <ul className="flex flex-col gap-y-[0.719rem]">
        {next.map((value, index) => (
          <li key={value.date} className="bg-gren-600 flex h-min flex-col items-center gap-y-[0.719rem]">
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center gap-x-4">
                <div className="size-8 rounded-full bg-blue-500"></div>
                <p className="text-preset-5-bold">{value.name}</p>
              </div>
              <div className="flex flex-col items-end justify-between gap-x-2">
                <p className="text-preset-5-bold">${value.value}.00</p>
                <p className="text-preset-5 text-gray-500">{value.date}</p>
              </div>
            </div>
            <div className={cn("h-0.5 w-full bg-black/50", { hidden: index === 2 })} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default LatestEnligted
