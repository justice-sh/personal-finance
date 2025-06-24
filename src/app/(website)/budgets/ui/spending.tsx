import clsx from "clsx"
import React from "react"

type SpendingProps = {
  options: { color: string; name: string; priceOf: string; priceOut: string }[]
}

const Spending = ({ options }: SpendingProps) => {
  return (
    <div className="col-span-1 flex h-min w-full flex-col gap-y-6">
      <h2 className="text-preset-2">Spending Summary</h2>
      <ul className="flex flex-col divide-y divide-gray-100">
        {options.map((value) => (
          <li key={value.name} className="flex h-min flex-col items-center py-4">
            <div className="flex w-full items-center justify-between">
              <div className="flex items-center gap-x-4">
                <div className={clsx("h-[1.32rem] w-1 rounded-[0.5rem] bg-blue-500", value.color)}></div>
                <p className="text-preset-4 text-gray-500">{value.name}</p>
              </div>
              <div className="flex items-center gap-x-2">
                <p className="text-preset-3 text-gray-900">${value.priceOf}</p>
                <p className="text-preset-5 text-nowrap text-gray-500">of ${value.priceOut}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Spending
