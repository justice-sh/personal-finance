"use client"

import { Label } from "@/shared/components/ui/label"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/shared/components/ui/select"
import SortAscendingFillIcon from "@/shared/icons/sort-ascending-fill"
import { cn } from "@/shared/lib/utils"

type Props = { value: string; setValue: (value: string) => void; className?: string; options?: { value: string; label: string }[] }

export function SortBy({ value, setValue, className }: Props) {
  const sortOptions = [
    { value: "latest", label: "Latest" },
    { value: "oldest", label: "Oldest" },
    { value: "a-2-z", label: "A to Z" },
    { value: "z-2-a", label: "Z to A" },
    { value: "highest", label: "Highest" },
    { value: "lowest", label: "Lowest" },
  ]

  return (
    <>
      <DesktopView value={value} setValue={setValue} options={sortOptions} className={cn(className, "@max-[616px]:hidden")} />
      <MobileView value={value} setValue={setValue} options={sortOptions} className={cn(className, "@min-[616px]:hidden")} />
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
        <SelectTrigger showIcon={false} className={cn("aspect-square size-auto! w-auto border-transparent p-0")}>
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
