import {
  Select,
  SelectItem,
  SelectValue,
  SelectGroup,
  SelectLabel,
  SelectContent,
  SelectTrigger,
} from "@/shared/components/ui/select"
import { AdjustBudget } from "@/shared/types/budget"
import { CustomFieldApi } from "@/shared/types/form"
import { BudgetAdjustmentType } from "@/shared/enums/budget"
import { FieldWrapper } from "@/shared/components/form/ui/field-wrapper"

export function AdjustmentTypeField(field: CustomFieldApi<AdjustBudget, "type">) {
  return (
    <FieldWrapper field={field} label="Adjustment Type">
      <Select onValueChange={(value) => field.handleChange(value as BudgetAdjustmentType)} defaultValue={field.state.value}>
        <SelectTrigger>
          <SelectValue placeholder="Select adjustment type" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Select adjustment type</SelectLabel>
            {Object.values(BudgetAdjustmentType).map((type) => (
              <SelectItem key={type} value={type}>
                <div className="capitalize">{type.toLowerCase()} budget</div>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </FieldWrapper>
  )
}
