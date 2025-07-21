// NOTE: the file is called error-util.ts because Next requires any error.ts file to have use-client directive at the top, and since I don't want it to be a client component, I changed the file name to error-util.ts

export const getErrorMessage = (error?: any) => {
  if (!error) return "An unknown error occurred"

  let message = error.message

  if (error?.response) {
    const data = error?.response?.data
    message = typeof data === "object" ? data?.message : data
    message = message || error.message
  }

  return message
}

export function catchError<T, E extends new (message?: string) => Error>(
  promise: Promise<T>,
  errorsToCatch?: E[],
): Promise<[undefined, T] | [InstanceType<E>]> {
  return promise
    .then((data: T) => {
      return [undefined, data] as [undefined, T]
    })
    .catch((error) => {
      if (errorsToCatch === undefined || errorsToCatch.length === 0) return [error]

      if (errorsToCatch.some((e) => error instanceof e)) return [error] as [InstanceType<E>]

      throw error
    })
}
