import z from "zod"

export const EnvSchema = z.object({
  API_URL: z.url("Invalid API URL"),
})
