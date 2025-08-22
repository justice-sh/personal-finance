import {
  Select,
  SelectItem,
  SelectValue,
  SelectGroup,
  SelectLabel,
  SelectTrigger,
  SelectContent,
} from "@/shared/components/ui/select"
import { BudgetDialogProps } from "../types"
import { CreateBudget } from "@/shared/types/budget"
import { InputField } from "@/shared/components/form/input-field"
import { Currency, CurrencySymbol } from "@/shared/enums/currency"
import { CustomFieldApi, CustomForm } from "@/shared/types/form"
import { FieldWrapper } from "@/shared/components/form/ui/field-wrapper"

export function MaxSpendField({
  form,
  field,
  mode,
}: {
  mode: BudgetDialogProps["mode"]
  form: CustomForm<CreateBudget>
  field: CustomFieldApi<CreateBudget, "maxSpend">
}) {
  return (
    <FieldWrapper field={field} label="Maximum Spend">
      <div className="input-container">
        <form.Field
          name="currency"
          defaultValue={Currency.NGN}
          defaultMeta={{ isBlurred: true, isDirty: true, isTouched: true }} // I've set these because we have default value
          children={SelectCurrencyField}
        />

        <InputField
          isNested
          field={field}
          type="number"
          placeholder="E.g. 2000"
          min={0}
          className="flex-1 pl-0"
          disabled={mode === "edit"}
          onChange={(value) => parseInt(value)}
        />
      </div>
    </FieldWrapper>
  )
}

function SelectCurrencyField(field: CustomFieldApi<CreateBudget, "currency">) {
  return (
    <Select onValueChange={(value) => field.handleChange(value as Currency)} defaultValue={field.state.value}>
      <SelectTrigger isNested hideIcon>
        <SelectValue placeholder={CurrencySymbol.NGN} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Select Currency</SelectLabel>
          {Object.values(Currency).map((currency) => (
            <SelectItem key={currency} value={currency}>
              {CurrencySymbol[currency]}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
