import type { AxiosError, InternalAxiosRequestConfig } from "axios"

export const setupApiUrl = (config: InternalAxiosRequestConfig<unknown>) => {
  const isExternalUrl = config.url?.startsWith("http://") || config.url?.startsWith("https://")

  if (isExternalUrl) {
    config.baseURL = ""
  } else {
    // Remove first slash in the url
    if (config.url && config.url[0] === "/") config.url = config.url.substring(1)
  }

  return config
}

export const getRequestErrorMessage = (error: AxiosError<unknown>) => {
  const data = error?.response?.data as Record<string, string>
  const message = typeof data === "object" ? data?.message : data
  return message || error.message
}
