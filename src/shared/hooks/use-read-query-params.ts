// src/shared/lib/hooks/use-read-query-params.ts
import { useSearchParams } from "next/navigation"
import { useMemo } from "react"

// A helper type to infer the expected shape of the default values
// This guides the runtime type conversion.
type QueryParamDefaults<T> = {
  [K in keyof T]: T[K] extends string | undefined
    ? string | undefined
    : T[K] extends number | undefined
      ? number | undefined
      : T[K] extends boolean | undefined
        ? boolean | undefined
        : any // Fallback for other types, though URLSearchParams are generally strings
}

/**
 * A custom hook to read and parse URL search parameters into a type-safe object.
 *
 * @template TParams An interface or type defining the structure of your search parameters
 * (e.g., `{ query?: string; page?: number; isActive?: boolean; }`).
 * @param {QueryParamDefaults<TParams>} defaultValues An object providing default values
 * and type hints for conversion. Each key in this
 * object should correspond to a parameter in TParams.
 * The type of the default value helps the hook
 * determine how to parse the string from the URL.
 * Use `undefined` if there's no default but you
 * want to specify the type.
 *
 * @returns {TParams} An object containing the parsed search parameters,
 * with values converted to their respective types (string, number, boolean).
 * If a parameter is not found in the URL, its corresponding default value is used.
 */
export function useReadQueryParams<TParams extends Record<string, any>>(defaultValues: QueryParamDefaults<TParams>): TParams {
  const searchParams = useSearchParams()

  const parsedParams = useMemo(() => {
    const params: Partial<TParams> = {}

    for (const key in defaultValues) {
      if (Object.prototype.hasOwnProperty.call(defaultValues, key)) {
        const paramValue = searchParams.get(key)
        const defaultValue = defaultValues[key]

        if (paramValue === null) {
          // If the parameter is not in the URL, use the default value
          // This handles cases where `defaultValue` is `undefined`
          params[key as keyof TParams] = defaultValue as TParams[keyof TParams]
          continue
        }

        // Perform type conversion based on the type of the default value
        if (typeof defaultValue === "boolean") {
          // If default value is boolean, parse as boolean
          params[key as keyof TParams] = (paramValue === "true") as TParams[keyof TParams]
        } else if (typeof defaultValue === "number") {
          // If default value is number, parse as number
          const numValue = Number(paramValue)
          params[key as keyof TParams] = (isNaN(numValue) ? defaultValue : numValue) as TParams[keyof TParams]
        } else {
          // Otherwise, treat as string
          params[key as keyof TParams] = paramValue as TParams[keyof TParams]
        }
      }
    }
    return params as TParams
  }, [searchParams, defaultValues]) // Re-memoize if searchParams or defaultValues change

  return parsedParams
}
