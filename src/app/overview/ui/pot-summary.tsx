import { cn } from "@/shared/lib/utils"
import { formatAmount } from "@/shared/utils/formatAmount"

type PotBarColor = "green" | "cyan" | "yellow" | "navy"

export type PotSummaryProps = { barColor: PotBarColor; title: string; amount: number }

export const PotSummary = ({ barColor, title, amount }: PotSummaryProps) => {
  const styles = {
    green: "bg-secondary-green",
    cyan: "bg-secondary-cyan",
    yellow: "bg-secondary-yellow",
    navy: "bg-secondary-navy",
  } satisfies Record<PotBarColor, string>

  return (
    <div className="relative z-10 flex flex-col gap-1 pl-3">
      <p className="text-preset-5 text-gray-500">{title}</p>
      <p className="text-preset-4-bold text-gray-900">{formatAmount(amount, "USD", { maximumFractionDigits: 0 })}</p>
      <div className={cn("absolute top-0 left-0 h-full w-1 rounded-md", styles[barColor])} />
    </div>
  )
}
