"use client"

import { Label } from "@/shared/components/ui/label"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/shared/components/ui/select"
import SortAscendingFillIcon from "@/shared/icons/sort-ascending-fill"
import { cn } from "@/shared/lib/utils"
import { useSectionMobile } from "../hooks/use-section-mobile"

type Props = { sortBy: string; setSortBy: (value: string) => void; parentRef: React.RefObject<HTMLDivElement | null>; className?: string }

export function SortBy({ sortBy, setSortBy, parentRef, className }: Props) {
  const isMobile = useSectionMobile(parentRef)

  return (
    <div className={cn("flex w-auto items-center gap-2", className)}>
      {!isMobile && (
        <Label htmlFor="sort-by" className="text-sm font-medium">
          Sort by
        </Label>
      )}
      <Select onValueChange={setSortBy} value={sortBy}>
        <SelectTrigger
          showIcon={!isMobile}
          className={cn("@min-md-1:min-w-[100px] w-auto", isMobile && "size-auto! border-transparent p-0")}
        >
          {isMobile ? <SortAscendingFillIcon className="m-0 size-11 text-gray-900" /> : <SelectValue />}
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Sort by:</SelectLabel>
            <SelectItem value="latest">Latest</SelectItem>
            <SelectItem value="oldest">Oldest</SelectItem>
            <SelectItem value="a-2-z">A to Z</SelectItem>
            <SelectItem value="z-2-a">Z to A</SelectItem>
            <SelectItem value="highest">Highest</SelectItem>
            <SelectItem value="lowest">Lowest</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
