"use client"

import * as React from "react"
import { cn } from "@/shared/lib/utils"
import { Pie, PieChart } from "recharts"
import { Currency } from "@/shared/enums/currency"
import { formatAmount } from "@/shared/utils/formatAmount"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/shared/components/ui/chart"

type Props = { data: ChartData[]; className?: string; limit: number; spent: number; currency: Currency }

type ChartData = {
  name: string
  amount: number
  /**
   * `fill` - should be any css color or css variable, E.g.: `red` | `var(--color-name)` | `#fff`
   */
  fill: string
}

const dataKey: keyof ChartData = "amount"
const nameKey: keyof ChartData = "name"

export function BudgetPieChart({ data, limit, spent, currency, className }: Props) {
  const chartConfig = React.useMemo<ChartConfig>(() => {
    return { amount: { label: "Amount" } } satisfies ChartConfig
  }, [])

  if (!spent) data = [{ name: "No Data", amount: 1, fill: "var(--gray-300)" }]

  return (
    <div
      className={cn("relative z-10 flex h-[240px] w-full max-w-[247px] items-center justify-center", className, "relative")}
    >
      <ChartContainer config={chartConfig} className="relative z-50 aspect-square max-h-[340px] w-full max-w-[247px]">
        <PieChart className="sm-5:scale-[1.2]">
          <ChartTooltip cursor={false} formatter={tooltipFormatter(currency)} content={<ChartTooltipContent hideLabel />} />
          <Pie data={data} dataKey={dataKey} nameKey={nameKey} innerRadius={65} strokeWidth={3} />
        </PieChart>
      </ChartContainer>

      <div className="absolute flex flex-col items-center justify-center">
        <p className="text-preset-2 fill-gray-900">{formatAmount(spent, currency, { maximumFractionDigits: 0 })}</p>
        <p className="text-preset-5 fill-gray-500">of {formatAmount(limit, currency, { maximumFractionDigits: 0 })} limit</p>
      </div>
    </div>
  )
}

function tooltipFormatter(currency: Currency) {
  const FormatTooltip = (amount: number, key: string, { payload }: { payload?: ChartData }) => {
    return (
      <div className="flex w-full items-center justify-between gap-2">
        <span className="size-2" style={{ background: payload?.fill }} />
        <span className="text-preset-5 mr-auto text-gray-500 capitalize">{key}</span>
        <span className="text-preset-5 ml-6 text-gray-500">
          {formatAmount(amount, currency, { maximumFractionDigits: 0 })}
        </span>
      </div>
    )
  }

  return FormatTooltip
}
