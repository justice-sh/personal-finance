import { AnyFieldApi, DeepKeys, DeepValue, FieldApi, FormApi, ReactFormExtendedApi } from "@tanstack/react-form"

type Value = string | number | object | boolean | Value[]

export interface FormFieldProps extends Omit<React.ComponentProps<"input">, "form" | "name" | "list" | "onChange"> {
  label?: string
  styles?: FormFieldStyles
  isNested?: boolean
  field: AnyFieldApi
  onChange?: (value: string) => Value
}

export type FormFieldStyles = {
  label?: string
  input?: string
  wrapper?: string
  error?: string
}

export type CustomFormApi<T> = FormApi<T, any, any, any, any, any, any, any, any, any>

export type CustomForm<T> = ReactFormExtendedApi<T, any, any, any, any, any, any, any, any, any>

export type CustomFieldApi<TForm, TName extends DeepKeys<TForm>> = FieldApi<
  TForm,
  TName,
  DeepValue<TForm, TName>,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any,
  any
>
