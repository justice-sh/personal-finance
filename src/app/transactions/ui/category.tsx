"use client"

import { Label } from "@/shared/components/ui/label"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/shared/components/ui/select"
import { cn } from "@/shared/lib/utils"
import { TypcnFilter } from "@/shared/icons/typcn-filter"

type Props = {
  value?: string
  setValue: (value: string) => void
  className?: string
  options?: { value: string; label: string }[]
}

export function Category({ value, setValue, className }: Props) {
  const categories = [
    { value: "all", label: "All Transactions" },
    { value: "entertainment", label: "Entertainment" },
    { value: "bills", label: "Bills" },
    { value: "groceries", label: "Groceries" },
    { value: "dining-out", label: "Dining Out" },
  ]

  return (
    <>
      <DesktopView value={value} setValue={setValue} options={categories} className={cn(className, "@max-[616px]:hidden")} />
      <MobileView value={value} setValue={setValue} options={categories} className={cn(className, "@min-[616px]:hidden")} />
    </>
  )
}

const DesktopView = ({ value, setValue, options = [], className }: Props) => {
  return (
    <div className={cn("flex w-auto items-center gap-2", className)}>
      <Label htmlFor="sort-by" className="text-sm font-medium">
        Category:
      </Label>

      <Select onValueChange={setValue} value={value}>
        <SelectTrigger className={cn("w-auto min-w-[155px]")}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Category:</SelectLabel>
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
          <TypcnFilter className="mx-auto size-6 text-gray-900" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Category:</SelectLabel>
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
