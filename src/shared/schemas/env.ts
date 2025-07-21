import z from "zod"

export const EnvSchema = z.object({
  NEXT_PUBLIC_API_URL: z.url("Invalid API URL"),
})
