import { configUtil } from "@/shared/utils/config"

export const BaseUrl = configUtil.get((env) => env.NEXT_PUBLIC_API_URL)
