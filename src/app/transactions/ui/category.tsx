import { Label } from "@/shared/components/ui/label"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/shared/components/ui/select"
import { useSectionMobile } from "../hooks/use-section-mobile"
import { cn } from "@/shared/lib/utils"
import { TypcnFilter } from "@/shared/icons/typcn-filter"

type Props = { category: string; setCategory: (value: string) => void; parentRef: React.RefObject<HTMLDivElement | null> }

export function Category({ category, setCategory, parentRef }: Props) {
  const isMobile = useSectionMobile(parentRef)

  return (
    <div className="flex w-auto items-center gap-2">
      {!isMobile && (
        <Label htmlFor="sort-by" className="text-sm font-medium">
          Sort by
        </Label>
      )}
      <Select onValueChange={setCategory} value={category}>
        <SelectTrigger
          showIcon={!isMobile}
          className={cn("@min-md-1:min-w-[100px] w-auto", isMobile && "size-auto! border-transparent p-0")}
        >
          {isMobile ? <TypcnFilter className="m-0 size-11 text-gray-900" /> : <SelectValue />}
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Category:</SelectLabel>
            <SelectItem value="all">All Transactions</SelectItem>
            <SelectItem value="entertainment">Entertainment</SelectItem>
            <SelectItem value="bills">Bills</SelectItem>
            <SelectItem value="groceries">Groceries</SelectItem>
            <SelectItem value="dining-out">Dining Out</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}
