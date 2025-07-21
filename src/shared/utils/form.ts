import { z, ZodType } from "zod"
import { RFormApi } from "../types/form"

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
