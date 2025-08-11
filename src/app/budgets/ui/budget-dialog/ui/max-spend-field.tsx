import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
} from "@/shared/components/ui/select"
import { CreateBudget } from "@/shared/types/budget"
import { CurrencySymbol } from "@/shared/enums/currency"
import { InputField } from "@/shared/components/form/input-field"
import { CustomFieldApi, CustomForm } from "@/shared/types/form.type"
import { FieldWrapper } from "@/shared/components/form/ui/field-wrapper"

export function MaxSpendField({
  form,
  field,
}: {
  form: CustomForm<CreateBudget>
  field: CustomFieldApi<CreateBudget, "maxSpend">
}) {
  return (
    <FieldWrapper field={field} label="Maximum Spend">
      <div className="input-container gap-2">
        <form.Field
          name="currency"
          defaultValue={CurrencySymbol.NGN}
          defaultMeta={{ isBlurred: true, isDirty: true, isTouched: true }} // I've set these because we have default value
          children={SelectCurrencyField}
        />

        <InputField
          isNested
          field={field}
          type="number"
          placeholder="E.g. 2000"
          min={0}
          className="flex-1"
          onChange={(value) => parseInt(value)}
        />
      </div>
    </FieldWrapper>
  )
}

function SelectCurrencyField(field: CustomFieldApi<CreateBudget, "currency">) {
  return (
    <Select onValueChange={(value) => field.handleChange(value as CurrencySymbol)} defaultValue={field.state.value}>
      <SelectTrigger isNested hideIcon>
        <SelectValue placeholder={CurrencySymbol.NGN} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Select Currency</SelectLabel>
          {Object.values(CurrencySymbol).map((symbol) => (
            <SelectItem key={symbol} value={symbol} className="">
              {symbol}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
