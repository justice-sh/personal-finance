import { RecurringBills } from "./ui/recurring-bills"
import { Transactions } from "./ui/transactions"
import { BalanceCard } from "./ui/balance-card"
import { cn } from "@/shared/lib/utils"
import { Pots } from "./ui/pots"

export default function OverviewPage() {
  const styles = {
    section: "bg-white p-7 rounded-xl",
  }

  return (
    <main className="@container flex flex-col gap-6">
      <header className="text-preset-1">Overview</header>

      <section className="@min-md-1:grid-cols-3 @min-sm-5:grid-cols-2 grid gap-6">
        <BalanceCard title="Current Balance" balance={4000} currency="USD" isStart />
        <BalanceCard title="Income" balance={4000} currency="USD" />
        <BalanceCard title="Expense" balance={4000} currency="USD" />
      </section>

      <section className="@min-md-3:grid-cols-[1fr_428px] grid gap-6">
        <section className="@container flex flex-col gap-6">
          <Pots className={cn("w-full", styles.section)} />
          <Transactions className={cn("", styles.section)} />
        </section>

        <section className="flex flex-col gap-6">
          {/* <div className="h-[416px]">6</div> */}
          <RecurringBills className={cn("", styles.section)} />
        </section>
      </section>
    </main>
  )
}
