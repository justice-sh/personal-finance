import { cn } from "@/shared/lib/utils"
import { SectionHeader } from "./section-header"
import { routes } from "@/shared/constants/routes"
import { Currency } from "@/shared/types/currency"
import { Color } from "@/shared/enums/color.enum"
import { formatAmount } from "@/shared/utils/formatAmount"
import TipJarLightIcon from "@/shared/icons/tip-jar-light"
import { PotSummary, PotSummaryProps } from "./pot-summary"

export function Pots({ className }: { className?: string }) {
  const pots: PotSummaryProps[] = [
    { title: "Savings", amount: 500, color: Color.Green },
    { title: "Gift", amount: 200, color: Color.Cyan },
    { title: "Concert Ticket", amount: 150, color: Color.Yellow },
    { title: "New Laptop", amount: 110, color: Color.Navy },
  ]

  const totalSavedAmount = pots.reduce((acc, pot) => acc + pot.amount, 0)

  return (
    <section className={cn("@container", className)}>
      <SectionHeader title="Pots" cta={{ href: routes.pots }} />

      <div className="@min-sm-6:grid-cols-[247px_1fr] @min-sm-6:gap-10 grid gap-5">
        <TotalSaved amount={totalSavedAmount} />

        <div className="grid grid-cols-2 gap-4">
          {pots.map((pot) => (
            <PotSummary key={pot.title} {...pot} />
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
        <p className="text-preset-1 text-gray-900">{formatAmount(amount, Currency.USD, { maximumFractionDigits: 0 })}</p>
      </div>
    </div>
  )
}
