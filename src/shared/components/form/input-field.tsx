import { Input } from "../ui/input"
import { cn } from "@/shared/lib/utils"
import { FieldWrapper } from "./ui/field-wrapper"
import { FormFieldProps } from "@/shared/types/form"

export function InputField(props: FormFieldProps) {
  const { field, label, styles, withWrapper, className, onChange = (e) => e.target.value, ...rest } = props

  return (
    <FieldWrapper {...props}>
      <Input
        {...rest}
        id={props.id}
        name={field.name}
        onBlur={field.handleBlur}
        value={field.state.value || ""}
        className={cn(className, styles?.input)}
        onChange={(e) => field.handleChange(onChange(e))}
      />
    </FieldWrapper>
  )
}
