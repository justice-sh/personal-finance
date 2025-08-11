import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@radix-ui/react-select"
import { cn } from "@/shared/lib/utils"
import { Color } from "@/shared/types/color.type"
import { capitalize } from "@/shared/utils/str.util"
import { CreateBudget } from "@/shared/types/budget"
import { CustomFieldApi } from "@/shared/types/form.type"
import { color2Tailwind } from "@/shared/utils/color.util"
import { FieldWrapper } from "@/shared/components/form/ui/field-wrapper"

export function ColorTagSelectField(field: CustomFieldApi<CreateBudget, "color">) {
  return (
    <FieldWrapper field={field} label="Theme">
      <Select onValueChange={(value) => field.handleChange(value as Color)} defaultValue={field.state.value}>
        <SelectTrigger>
          <SelectValue placeholder="Select theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Select theme</SelectLabel>
            {Object.values(Color).map((symbol) => (
              <SelectItem key={symbol} value={symbol}>
                <div className="flex items-center gap-3 capitalize">
                  <div className={cn(color2Tailwind(symbol), "size-4 rounded-full")}></div>
                  <div className="">{symbol.split("_").map(capitalize).join(" ")}</div>
                </div>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </FieldWrapper>
  )
}
