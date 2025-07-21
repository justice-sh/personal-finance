import z from "zod"
import { EnvSchema } from "../schemas/env"
import { ExactPathForValue } from "../types/util"

type ConfigData = z.infer<typeof EnvSchema>

const validateEnv = () => {
  const envData = EnvSchema.safeParse(process.env)

  if (envData.success) return envData.data

  const message = `Env validation error: ${envData.error.issues.map((issue) => `${issue.message} at ${issue.path.join(".")}`).join("\n")}`

  throw new Error(message)
}

const transformEnv = (): ConfigData => {
  const data = process.env as unknown as ConfigData
  return data
}

export const config = {
  validate: validateEnv,
  get<R, K extends ExactPathForValue<ConfigData, R>>(selector: (env: ConfigData) => R): R {
    const data = transformEnv()
    return selector(data)
  },
}
