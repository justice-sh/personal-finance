import { cn } from "@/shared/lib/utils"
import { Color } from "@/shared/enums/color"
import { Currency } from "@/shared/enums/currency"
import { color2Tailwind } from "@/shared/utils/color"
import { formatAmount } from "@/shared/utils/formatAmount"

export type PotSummaryProps = { color: Color; title: string; amount: number; currency: Currency }

export const PotSummary = ({ color, title, amount, currency }: PotSummaryProps) => {
  return (
    <div className="relative z-10 flex flex-col gap-1 pl-3">
      <p className="text-preset-5 truncate text-gray-500 capitalize">{title}</p>
      <p className="text-preset-4-bold text-gray-900">{formatAmount(amount, currency, { maximumFractionDigits: 0 })}</p>
      <div className={cn("absolute top-0 left-0 h-full w-1 rounded-md", color2Tailwind(color))} />
    </div>
  )
}
