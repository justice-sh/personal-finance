import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  const classes = clsx(...inputs)

  return (twMerge(removeTextPresets(classes)) + " " + extractTextPresets(classes)).trim()
}

/**
 * Extracts text presets from a string.
 * @param input The input string.
 * @returns A space-separated string of text presets.
 *
 * Why this function?
 * This function extracts text presets from a string and returns them as a space-separated string.
 * Issue: if you passed "text-preset-4 text-gray-500", twMerge would remove "text-preset-4" probably because of the text- prefix.
 * This is a workaround to ensure that text presets are preserved in the final class string.
 */
function extractTextPresets(input: string): string {
  if (!input.includes("text-preset-")) return ""

  return twMerge(
    input
      .split(" ")
      .filter((input) => input.includes("text-preset-"))
      .join(" "),
  )
}

/**
 * Removes text presets from a string.
 * @param input The input string.
 * @returns A string with text presets removed.
 *
 * Why this function?
 * This function removes text presets from a string to avoid duplication in the final class string.
 */
function removeTextPresets(input: string): string {
  return input
    .split(" ")
    .filter((input) => !input.includes("text-preset-"))
    .join(" ")
}
