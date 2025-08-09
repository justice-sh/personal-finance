import React from "react"
import { cn } from "@/shared/lib/utils"
import { IconInput } from "../icon-input"
import { IconButton } from "../icon-button"
import { FieldWrapper } from "./ui/field-wrapper"
import { FormFieldProps } from "@/shared/types/form.type"
import HidePasswordIcon from "@/shared/icons/hide-password"
import ShowPasswordIcon from "@/shared/icons/show-password"

export function PasswordField({ field, label, styles, className, ...props }: FormFieldProps) {
  if (!props.id) props.id = field.name

  const [shouldHide, setShouldHide] = React.useState<boolean>(true)

  const Icon = shouldHide ? ShowPasswordIcon : HidePasswordIcon

  const togglePasswordVisibility = () => {
    setShouldHide((prev) => !prev)
  }

  return (
    <FieldWrapper field={field} label={label} id={props.id} styles={styles}>
      <IconInput
        {...props}
        icon={<IconButton onClick={togglePasswordVisibility} icon={Icon} />}
        type={shouldHide ? "password" : "text"}
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
