import { Pots } from "./ui/pots"
import { Balance } from "./ui/balance"
import { Budgets } from "./ui/budgets"
import { cn } from "@/shared/lib/utils"
import { Transactions } from "./ui/transactions"
import { RecurringBills } from "./ui/recurring-bills"
import { PageLayer } from "@/shared/components/page-layer"

export default function OverviewPage() {
  const styles = {
    section: "bg-white p-4 xs-5:p-7 flex-1 rounded-xl",
  }

  return (
    <PageLayer title="Overview" className="@container flex flex-col gap-6">
      <Balance />

      <section className="@min-md-3:grid-cols-[1fr_428px] grid gap-6">
        <section className="@container flex flex-col gap-6">
          <Pots className={cn("w-full", styles.section)} />
          <Transactions className={styles.section} />
        </section>

        <section className="flex flex-col gap-6">
          <Budgets className={styles.section} />
          <RecurringBills className={styles.section} />
        </section>
      </section>
    </PageLayer>
  )
}
