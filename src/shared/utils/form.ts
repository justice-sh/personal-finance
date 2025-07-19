import { z, ZodType } from "zod"

export function formValidatorUtil<S extends ZodType, T extends z.infer<S>>(schema: S, value: T) {
  const result = schema.safeParse(value)
  if (result.success) return undefined

  const fields = result.error.issues.reduce(
    (acc, detail) => {
      const path = detail.path.join(".")
      acc[path] = `${detail.message} at ${path}`
      return acc
    },
    {} as Record<string, string>,
  ) as { [K in keyof T]: string }

  return { fields }
}
