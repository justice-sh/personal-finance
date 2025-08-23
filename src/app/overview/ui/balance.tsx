"use client"

import { useState } from "react"
import {
  Select,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectValue,
  SelectTrigger,
  SelectContent,
} from "@/shared/components/ui/select"
import { cn } from "@/shared/lib/utils"
import { useBalance } from "@/shared/data/balance"
import { Currency } from "@/shared/enums/currency"
import { Label } from "@/shared/components/ui/label"
import { formatAmount } from "@/shared/utils/formatAmount"
import { ConditionalRenderer } from "@/shared/components/conditional-renderer"

// TODO: add date filter, to filter currency from date, to date

export function Balance() {
  const [currency, setCurrency] = useState(Currency.NGN)
  const { data, isFetching } = useBalance(currency)

  return (
    <section className="grid gap-4">
      <div className="flex items-center justify-end gap-4">
        <Label className="">Filter by </Label>
        <FilterByCurrency currency={currency} setCurrency={setCurrency} />
      </div>

      <section className="@min-md-1:grid-cols-3 @min-sm-5:grid-cols-2 grid gap-6">
        <BalanceCard
          title="Current Balance"
          balance={data.balance}
          currency={data.currency}
          isStart
          isLoading={isFetching}
        />
        <BalanceCard title="Income" balance={data.income} currency={data.currency} isLoading={isFetching} />
        <BalanceCard title="Expense" balance={data.expense} currency={data.currency} isLoading={isFetching} />
      </section>
    </section>
  )
}

const BalanceCard = ({
  title,
  balance,
  currency,
  isStart,
  isLoading,
}: {
  title: string
  balance: number
  currency: Currency
  isStart?: boolean
  isLoading?: boolean
}) => {
  const styles = {
    container: cn("h-[119px] @container rounded-lg bg-white", isStart && "bg-gray-900 text-white"),
  }

  if (balance > 0) isLoading = false

  return (
    <ConditionalRenderer isLoading={isLoading} className={styles.container} styles={{ loading: styles.container }}>
      <div className="flex h-full flex-col justify-center gap-3 px-5">
        <h3 className={cn("text-preset-4 text-gray-500", isStart && "text-white")}>{title}</h3>
        <p className={cn("@min-xs-1:text-preset-1 text-preset-2 text-gray-900", isStart && "text-white")}>
          {formatAmount(balance, currency)}
        </p>
      </div>
    </ConditionalRenderer>
  )
}

function FilterByCurrency({ currency, setCurrency }: { currency: Currency; setCurrency: (currency: Currency) => void }) {
  return (
    <Select onValueChange={(value) => setCurrency(value as Currency)} defaultValue={currency}>
      <SelectTrigger className="max-w-[80px]">
        <SelectValue placeholder="Select currency" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Select currency</SelectLabel>
          {Object.values(Currency).map((currency) => (
            <SelectItem key={currency} value={currency}>
              {currency}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
