import { FormFieldProps } from "@/shared/types/form"
import { FieldWrapper } from "./ui/field-wrapper"
import { cn } from "@/shared/lib/utils"
import { Input } from "../ui/input"

export function InputField({ field, label, styles, className, ...props }: FormFieldProps) {
  if (!props.id) props.id = field.name

  return (
    <FieldWrapper field={field} label={label} id={props.id} styles={styles}>
      <Input
        {...props}
        id={props.id}
        name={field.name}
        value={field.state.value || ""}
        onBlur={field.handleBlur}
        onChange={(e) => field.handleChange(e.target.value)}
        className={cn(className, styles?.input)}
      />
    </FieldWrapper>
  )
}
