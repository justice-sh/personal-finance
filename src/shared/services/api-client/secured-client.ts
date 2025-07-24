import axios from "axios"
import logger from "../logger"
import { BaseUrl } from "./constants"
import publicClient from "./public-client"
import { getRequestErrorMessage, setupApiUrl } from "./utils"

const securedClient = axios.create({
  baseURL: BaseUrl,
  validateStatus: function (status) {
    return status >= 200 && status < 300 // default
  },
  withCredentials: true,
})

securedClient.interceptors.request.use(
  async function (config) {
    config.headers["timezone"] = Intl.DateTimeFormat().resolvedOptions().timeZone

    setupApiUrl(config)
    logger.request({ requestEntity: config, type: "request" })

    return config
  },
  function (error) {
    return Promise.reject(error)
  },
)

securedClient.interceptors.response.use(
  function (response) {
    logger.request({ requestEntity: response, type: "response" })
    return response
  },
  async function (error) {
    try {
      if (error.response?.status === 401 && !error.response.isRefresh) {
        error.response.isRefresh = true // mark the error as a refresh error
        await refreshSession()
        console.log("error.response.isRefresh:", error.response.isRefresh)
        return securedClient(error.config)
      } else {
        throw error
      }
    } catch (error: any) {
      error.message = getRequestErrorMessage(error)
      logger.request({ requestEntity: error, type: "error" })
      return Promise.reject(error)
    }
  },
)

async function refreshSession() {
  try {
    await publicClient.post("/auth/refresh")
  } catch (error: any) {
    throw error
  }
}

export default securedClient
