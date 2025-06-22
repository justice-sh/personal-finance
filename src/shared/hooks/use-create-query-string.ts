// src/shared/lib/hooks/use-create-query-string.ts
import { useCallback } from "react"
import { useSearchParams } from "next/navigation"

/**
 * A custom hook to generate a new URL query string based on current search parameters.
 * Provides a memoized function to safely update or delete specified query parameters.
 *
 * @template TParams An interface or type defining the structure of your search parameters
 * (e.g., `{ query: string; page: number; isActive?: boolean; }`).
 * Note: All values will be converted to strings in the URL.
 *
 * @returns A function `(updates: Partial<TParams>) => string` that takes an object
 * where keys are parameter names and values are the new values.
 * If a value is `null` or `undefined`, the corresponding parameter is removed.
 */
export function useCreateQueryString<TParams extends Record<string, any>>() {
  const searchParams = useSearchParams()

  const createQueryString = useCallback(
    (updates: Partial<TParams>) => {
      // Create a *new* URLSearchParams instance from the current searchParams
      const params = new URLSearchParams(searchParams.toString())

      // Iterate over the updates object
      for (const [key, value] of Object.entries(updates)) {
        // Ensure the key is treated as a string for URLSearchParams
        const paramName = key as string

        // If the value is null or undefined, delete the parameter
        if (value === null || value === "" || typeof value === "undefined") {
          params.delete(paramName)
        } else {
          // Convert the value to a string and set it
          params.set(paramName, String(value))
        }
      }

      return params.toString() // Return the new query string
    },
    [searchParams], // Dependency array: recreate function if searchParams object changes
  )

  return createQueryString
}
