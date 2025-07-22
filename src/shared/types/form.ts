import { FieldApi, FormApi, ReactFormExtendedApi } from "@tanstack/react-form"

export type RForm<T> = ReactFormExtendedApi<T, any, any, any, any, any, any, any, any, any>

export interface FormFieldProps extends Omit<React.ComponentProps<"input">, "form" | "name" | "list"> {
  label?: string
  styles?: FormFieldStyles
  field: FieldApi<any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any, any>
}

export type FormFieldStyles = {
  label?: string
  input?: string
  wrapper?: string
  error?: string
}

export type RFormApi<T> = FormApi<T, any, any, any, any, any, any, any, any, any>
