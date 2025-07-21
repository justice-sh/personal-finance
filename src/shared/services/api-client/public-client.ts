import logger from "../logger"
import { BaseUrl } from "./constants"
import axios, { AxiosError } from "axios"
import { getRequestErrorMessage, setupApiUrl } from "./utils"

const publicClient = axios.create({
  baseURL: BaseUrl,
  validateStatus: function (status) {
    return status >= 200 && status < 300 // default
  },
  withCredentials: true,
})

publicClient.interceptors.request.use(
  function (config) {
    setupApiUrl(config)

    logger.request({ requestEntity: config, type: "request" })

    return config
  },
  function (error: AxiosError<any>) {
    error.message = getRequestErrorMessage(error)
    logger.request({ requestEntity: error, type: "error" })
    return Promise.reject(error)
  },
)

publicClient.interceptors.response.use(
  async function (response) {
    logger.request({ requestEntity: response, type: "response" })
    return response
  },
  function (error: AxiosError<any>) {
    error.message = getRequestErrorMessage(error)
    logger.request({ requestEntity: error, type: "error" })
    return Promise.reject(error)
  },
)

export default publicClient
