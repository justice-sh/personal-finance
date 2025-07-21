import { config } from "@/shared/utils/config"

export const BaseUrl = config.get((env) => env.API_URL)
