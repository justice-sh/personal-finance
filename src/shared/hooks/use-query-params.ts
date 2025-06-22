import { useState, useEffect, useRef } from "react"
import { useReadQueryParams } from "./use-read-query-params" // Assuming correct path
import { useCreateQueryString } from "./use-create-query-string" // Assuming correct path
import { usePathname, useRouter } from "next/navigation"

/**
 * A generic hook to manage URL query parameters with local state and debounced updates.
 * Provides immediate feedback for input fields while updating the URL after a delay.
 *
 * NOTE: This version *does not* automatically synchronize local state with
 * external URL changes (e.g., browser back/forward buttons, or other components
 * updating different search parameters). The local state will only change
 * via calls to the returned `setQueryParamUpdates` function.
 *
 * @template TParams An interface or type defining the structure of your search parameters
 * (e.g., `{ query?: string; page?: number; isActive?: boolean; }`).
 * @param {QueryParamDefaults<TParams>} defaultValues An object providing default values
 * and type hints for how to parse query strings.
 * @param {number} [debounceTime=500] The time in milliseconds to wait before updating the URL.
 *
 * @returns {[TParams, (updates: Partial<TParams>) => void]} A tuple containing:
 * 1. The current local state of the query parameters (`params`).
 * 2. A function `setQueryParamUpdates` to update the local state and trigger a debounced URL push.
 */
export function useQueryParams<TParams extends Record<string, any>>(
  defaultValues: TParams,
  debounceTime: number = 500,
): [TParams, (updates: Partial<TParams>) => void] {
  const pathname = usePathname()
  const router = useRouter()

  const debounceTimerRef = useRef<number | null>(null) // Use 'number' for browser setTimeout ID

  const initialUrlParams = useReadQueryParams<TParams>(defaultValues)

  const [localParams, setLocalParams] = useState<TParams>(initialUrlParams)

  const createQueryString = useCreateQueryString<TParams>()

  useEffect(() => {
    return () => {
      if (debounceTimerRef.current !== null) clearTimeout(debounceTimerRef.current)
    }
  }, [])

  const setQueryParamUpdates = (updates: Partial<TParams>) => {
    if (debounceTimerRef.current !== null) clearTimeout(debounceTimerRef.current)

    const newLocalParams = { ...localParams, ...updates } as TParams

    setLocalParams(newLocalParams)

    debounceTimerRef.current = window.setTimeout(() => {
      const queryString = createQueryString(newLocalParams)
      router.push(pathname + "?" + queryString)
    }, debounceTime)
  }

  return [localParams, setQueryParamUpdates]
}
