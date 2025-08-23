"use client"

import { useState } from "react"
import { cn } from "@/shared/lib/utils"
import {
  Select,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectValue,
  SelectTrigger,
  SelectContent,
} from "@/shared/components/ui/select"
import { useBalance } from "@/shared/data/balance"
import { Currency } from "@/shared/enums/currency"
import { Label } from "@/shared/components/ui/label"
import { formatAmount } from "@/shared/utils/formatAmount"

export function Balance() {
  const [currency, setCurrency] = useState(Currency.NGN)
  const { data } = useBalance(currency)

  return (
    <section className="grid gap-4">
      <div className="flex items-center justify-end gap-4">
        <Label className="">Filter by </Label>
        <FilterByCurrency currency={currency} setCurrency={setCurrency} />
      </div>

      <section className="@min-md-1:grid-cols-3 @min-sm-5:grid-cols-2 grid gap-6">
        <BalanceCard title="Current Balance" balance={data.balance} currency={data.currency} isStart />
        <BalanceCard title="Income" balance={data.income} currency={data.currency} />
        <BalanceCard title="Expense" balance={data.expense} currency={data.currency} />
      </section>
    </section>
  )
}

const BalanceCard = ({
  title,
  balance,
  currency,
  isStart,
}: {
  title: string
  balance: number
  currency: Currency
  isStart?: boolean
}) => {
  return (
    <div className={cn("flex h-[119px] flex-col justify-center gap-3 rounded-lg bg-white px-5", isStart && "bg-gray-900")}>
      <h3 className={cn("text-preset-4 text-gray-500", isStart && "text-white")}>{title}</h3>
      <p className={cn("text-preset-1 text-gray-900", isStart && "text-white")}>{formatAmount(balance, currency)}</p>
    </div>
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
