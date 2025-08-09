import { cn } from "@/shared/lib/utils"
import { Color } from "@/shared/types/color.type"
import { Currency } from "@/shared/types/currency"
import { color2Tailwind } from "@/shared/utils/color.util"
import { formatAmount } from "@/shared/utils/formatAmount"

export type PotSummaryProps = { color: Color; title: string; amount: number }

export const PotSummary = ({ color, title, amount }: PotSummaryProps) => {
  return (
    <div className="relative z-10 flex flex-col gap-1 pl-3">
      <p className="text-preset-5 text-gray-500">{title}</p>
      <p className="text-preset-4-bold text-gray-900">{formatAmount(amount, Currency.USD, { maximumFractionDigits: 0 })}</p>
      <div className={cn("absolute top-0 left-0 h-full w-1 rounded-md", color2Tailwind(color))} />
    </div>
  )
}
