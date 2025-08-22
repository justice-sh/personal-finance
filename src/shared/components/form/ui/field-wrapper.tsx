import React from "react"
import { Label } from "../../ui/label"
import { cn } from "@/shared/lib/utils"
import { FieldInfo } from "./field-info"
import { FormFieldProps } from "@/shared/types/form"
import { capitalize } from "@/shared/utils/string"

type Props = Pick<FormFieldProps, "id" | "styles" | "label" | "field" | "children" | "isNested">

export function FieldWrapper({ id, styles, label, field, children, isNested }: Props) {
  if (isNested) return children

  id = id || field.name
  label = capitalize(label || field.name || id)

  return (
    <div className={cn("flex flex-col gap-1", styles?.wrapper)}>
      {label && (
        <Label htmlFor={id} className={cn("text-preset-5-bold mb-1 text-gray-500", styles?.label)}>
          {label}
        </Label>
      )}
      {children}
      <FieldInfo field={field} className={styles?.error} />
    </div>
  )
}
