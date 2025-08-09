import { prettifyError, z, ZodType } from "zod"
import { RFormApi } from "../types/form"
import { AnyFieldApi, AnyFieldMeta, DeepKeys, FieldApi } from "@tanstack/react-form"

export function formValidator<S extends ZodType>(schema: S) {
  return <T extends z.infer<S>>({ value, formApi }: { formApi: RFormApi<T>; value: T }) => {
    const result = schema.safeParse(value)
    if (result.success) return undefined

    const fields = result.error.issues.reduce(
      (acc, detail) => {
        const path = detail.path.join(".")

        const { isDirty, isTouched } = formApi.getFieldMeta(path) ?? {}
        if (!isDirty || !isTouched) return acc

        acc[path] = detail.message
        if (detail.path.length > 1) acc[path] += ` ~ at ${path}`

        return acc
      },
      {} as Record<string, string>,
    ) as { [K in keyof T]: string }

    return { fields }
  }
}

export function isFormValid(fieldMeta: Record<DeepKeys<any>, AnyFieldMeta>) {
  console.log(fieldMeta)
  const isFormValid = Object.values(fieldMeta).map((meta) => meta.isDirty && meta.isValid)
  const isValid = isFormValid.length ? isFormValid.every(Boolean) : false
  return isValid
}

export function prefixedFieldOnChange<S extends ZodType, T extends z.infer<S>>(schema: S, value: T, fieldApi: AnyFieldApi) {
  const result = schema.safeParse(value)
  fieldApi.setMeta({ ...fieldApi.state.meta, isTouched: true, isBlurred: true, isDirty: true })
  if (result.success) return undefined
  return prettifyError(result.error)
}
