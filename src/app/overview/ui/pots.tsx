import { cn } from "@/shared/lib/utils"
import { SectionHeader } from "./section-header"
import { formatAmount } from "@/shared/utils/formatAmount"
import TipJarLightIcon from "@/shared/icons/tip-jar-light"

export function Pots({ className }: { className?: string }) {
  const pots: SummaryItemProps[] = [
    { title: "Savings", amount: 500, barColor: "green" },
    { title: "Gift", amount: 200, barColor: "cyan" },
    { title: "Concert Ticket", amount: 150, barColor: "yellow" },
    { title: "New Laptop", amount: 110, barColor: "navy" },
  ]

  const totalSavedAmount = pots.reduce((acc, pot) => acc + pot.amount, 0)

  return (
    <section className={cn("@container space-y-5", className)}>
      <SectionHeader title="Pots" cta={{ href: "/pots" }} />

      <div className="@min-sm-7:grid-cols-[247px_1fr] grid gap-5">
        <TotalSaved amount={totalSavedAmount} />

        <div className="grid grid-cols-2 gap-4">
          {pots.map((pot) => (
            <SummaryItem key={pot.title} {...pot} />
          ))}
        </div>
      </div>
    </section>
  )
}

const TotalSaved = ({ amount }: { amount: number }) => {
  return (
    <div className="bg-beige-100 flex gap-4 rounded-lg p-4">
      <div className="flex w-10 items-center justify-center">
        <TipJarLightIcon className="text-secondary-green" />
      </div>
      <div className="flex flex-col justify-center gap-2">
        <p className="text-preset-4 text-gray-500">Total saved</p>
        <p className="text-preset-1 text-gray-900">{formatAmount(amount, "USD", { maximumFractionDigits: 0 })}</p>
      </div>
    </div>
  )
}

type BarColor = "green" | "cyan" | "yellow" | "navy"

type SummaryItemProps = { barColor: BarColor; title: string; amount: number }

const SummaryItem = ({ barColor, title, amount }: SummaryItemProps) => {
  const styles = {
    green: "bg-secondary-green",
    cyan: "bg-secondary-cyan",
    yellow: "bg-secondary-yellow",
    navy: "bg-secondary-navy",
  } satisfies Record<BarColor, string>

  return (
    <div className="relative z-10 flex flex-col gap-1 pl-3">
      <p className="text-preset-5 text-gray-500">{title}</p>
      <p className="text-preset-4-bold text-gray-900">{formatAmount(amount, "USD", { maximumFractionDigits: 0 })}</p>
      <div className={cn("absolute top-0 left-0 h-full w-1 rounded-md", styles[barColor])} />
    </div>
  )
}
