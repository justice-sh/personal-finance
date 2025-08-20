"use client"

import {
  Select,
  SelectItem,
  SelectGroup,
  SelectLabel,
  SelectValue,
  SelectTrigger,
  SelectContent,
} from "@/shared/components/ui/select"
import { cn } from "@/shared/lib/utils"
import { Label } from "@/shared/components/ui/label"
import { useTransactionSortBy } from "@/shared/data/transaction"
import SortAscendingFillIcon from "@/shared/icons/sort-ascending-fill"

type Props = {
  value: string
  setValue: (value: string) => void
  className?: string
  options?: { value: string; label: string }[]
}

export function TransactionSortBy({ value, setValue, className }: Props) {
  const { data } = useTransactionSortBy()

  return (
    <>
      <DesktopView value={value} setValue={setValue} options={data} className={cn(className, "@max-[616px]:hidden")} />
      <MobileView value={value} setValue={setValue} options={data} className={cn(className, "@min-[616px]:hidden")} />
    </>
  )
}

const DesktopView = ({ value, setValue, options = [], className }: Props) => {
  return (
    <div className={cn("flex w-auto items-center gap-2", className)}>
      <Label htmlFor="sort-by" className="text-sm font-medium">
        Sort by
      </Label>

      <Select onValueChange={setValue} value={value}>
        <SelectTrigger className={cn("w-auto min-w-[100px]")}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Sort by:</SelectLabel>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}

const MobileView = ({ value, setValue, options = [], className }: Props) => {
  return (
    <div className={className}>
      <Select onValueChange={setValue} value={value}>
        <SelectTrigger hideIcon={false} className={cn("aspect-square size-auto! w-auto border-transparent p-0")}>
          <SortAscendingFillIcon className="mx-auto size-6 text-gray-900" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Sort by:</SelectLabel>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
