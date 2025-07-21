import { ConfigData, EnvData } from "./type"
import { EnvSchema } from "@/shared/schemas/env"
import { ExactPathForValue } from "@/shared/types/util"

export const configUtil = {
  validate: validateEnv,
  get<R, K extends ExactPathForValue<ConfigData, R>>(selector: (env: ConfigData) => R): R {
    const data = transformEnv()
    return selector(data)
  },
}

function validateEnv() {
  const envData = EnvSchema.safeParse(process.env)
  if (envData.success) return envData.data

  const message = `Env validation error: ${envData.error.issues.map((issue) => `${issue.message} at ${issue.path.join(".")}`).join("\n")}`
  throw new Error(message)
}

const transformEnv = (): ConfigData => {
  const env = process.env as unknown as EnvData

  const data: ConfigData = {
    NEXT_PUBLIC_API_URL: env.NEXT_PUBLIC_API_URL,
  }

  return data
}
