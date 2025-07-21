import requestLogger from "./request-logger"

const logger = {
  request: requestLogger,
  // log: (message: string, ...params: Param[]) => {
  //   console.log(message, ...params)
  // },
  // error: (message: string, ...params: Param[]) => {
  //   console.log(message, ...params)
  // },
  // success: (message: string, ...params: Param[]) => {
  //   console.log(message, ...params)
  // },
}

export default logger
