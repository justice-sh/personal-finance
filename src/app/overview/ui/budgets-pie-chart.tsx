"use client"

import * as React from "react"
import { Label, Pie, PieChart } from "recharts"
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/shared/components/ui/chart"
import { PotSummaryProps } from "./pot-summary"
import { getCssColorVar } from "@/shared/utils/color"
import { formatAmount } from "@/shared/utils/formatAmount"
import { cn } from "@/shared/lib/utils"

type ChartData = {
  bill: string
  amount: number
  fill: string
}

export function BudgetsPieChart({ list, className }: { list: PotSummaryProps[]; className?: string }) {
  const chartData: ChartData[] = React.useMemo(() => {
    return list.map((item) => ({ bill: item.title, amount: item.amount, fill: getCssColorVar(item.color) }))
  }, [list])

  const chartConfig = React.useMemo<ChartConfig>(() => {
    return {
      amount: {
        label: "Amount",
      },
    } satisfies ChartConfig
  }, [])

  const totalAmount = React.useMemo(() => {
    return chartData.reduce((acc, curr) => acc + curr.amount, 0)
  }, [chartData])

  return (
    <div className={cn("flex h-[240px] w-full max-w-[247px] items-center justify-center", className)}>
      <ChartContainer config={chartConfig} className="aspect-square max-h-[340px] w-full max-w-[247px]">
        <PieChart className="sm-5:scale-[1.2]">
          <ChartTooltip cursor={false} formatter={RenderTooltipValue} content={<ChartTooltipContent hideLabel />} />

          <Pie data={chartData} dataKey="amount" nameKey="bill" innerRadius={65} strokeWidth={3}>
            <Label
              content={({ viewBox }) => {
                if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                  return (
                    <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="">
                      <tspan x={viewBox.cx} y={viewBox.cy} className="text-preset-2 fill-gray-900">
                        {formatAmount(totalAmount, "USD")}
                      </tspan>

                      <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="text-preset-5 fill-gray-500">
                        of {formatAmount(975, "USD")} limit
                      </tspan>
                    </text>
                  )
                }
              }}
            />
          </Pie>
        </PieChart>
      </ChartContainer>
    </div>
  )
}

const RenderTooltipValue = (amount: number, key: string, { payload }: { payload?: ChartData }) => {
  const formattedAmount = formatAmount(Number(amount), "USD", { maximumFractionDigits: 0 })

  return (
    <div className="flex w-full items-center justify-between gap-2">
      <span className="size-2" style={{ background: payload?.fill }}></span>
      <span className="text-preset-5 mr-auto text-gray-500">{key}</span>
      <span className="text-preset-5 ml-6 text-gray-500">{formattedAmount}</span>
    </div>
  )
}
