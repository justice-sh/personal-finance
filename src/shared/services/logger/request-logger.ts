import { getRequestErrorMessage } from "../api-client/utils"
import type { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios"

export default function requestLogger({ requestEntity, type }: RequestLoggerParams) {
  if (process.env.NODE_ENV === "production") return

  if (type === "request") {
    logRequest(requestEntity)
  } else if (type === "response") {
    logResponse(requestEntity)
  } else {
    logError(requestEntity)
  }
}

const logRequest = (config: InternalAxiosRequestConfig) => {
  console.log(
    `🚀 %c${config.method} %crequest to: %c${config.url}\n✉%c:`,
    "color:orange;",
    "color:black;",
    "color:green;",
    "color:black;",
    `params: ${JSON.stringify(config?.data)}`,
  )
}

const logResponse = (response: AxiosResponse) => {
  console.log(
    `✅ %csuccess %c${response.config.method} %crequest to: %c${response.config.url}\n✉%c:`,
    "color:green;font-size:15px;",
    "color:orange;",
    "color:black;",
    "color:green;",
    "color:black;",
    `params: ${response.config.data}`,
    "\n",
    " response 👉",
    response.data,
  )
}

const logError = (error: AxiosError) => {
  console.log(
    `⛔ %cerror %c${error?.config?.method} %crequest to: %c${error?.config?.url}\n✉%c:`,
    "color:red;font-size:15px;",
    "color:orange;",
    "color:black;",
    "color:green;",
    "color:black;",
    `params: ${error?.config?.data}`,
    "\n",
    " message 👉",
    getRequestErrorMessage(error),
  )
}

//  ============= TYPE DEFINISTIONS ===========

export type RequestLoggerParams =
  | {
      requestEntity: InternalAxiosRequestConfig
      type: "request"
    }
  | {
      requestEntity: AxiosResponse
      type: "response"
    }
  | {
      requestEntity: AxiosError
      type: "error"
    }
