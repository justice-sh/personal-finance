import { AnyFieldApi, FormApi, ReactFormExtendedApi } from "@tanstack/react-form"

export interface FormFieldProps extends Omit<React.ComponentProps<"input">, "form" | "name" | "list"> {
  label?: string
  styles?: FormFieldStyles
  isNested?: boolean
  field: AnyFieldApi
}

export type FormFieldStyles = {
  label?: string
  input?: string
  wrapper?: string
  error?: string
}

export type RFormApi<T> = FormApi<T, any, any, any, any, any, any, any, any, any>

export type RForm<T> = ReactFormExtendedApi<T, any, any, any, any, any, any, any, any, any>

// export type RFieldApi<TForm, TName extends DeepKeys<TForm>> = FieldApi<
//   TForm,
//   TName,
//   any,
//   any,
//   any,
//   any,
//   any,
//   any,
//   any,
//   any,
//   any,
//   any,
//   any,
//   any,
//   any,
//   any,
//   any,
//   any,
//   any
// >
