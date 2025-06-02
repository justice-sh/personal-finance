import type { AnyFieldApi } from "@tanstack/react-form"
import { cn } from "@/shared/lib/utils"

export function FieldInfo({ field, className }: { field: AnyFieldApi; className?: string }) {
  return (
    <>
      {field.state.meta.isTouched && field.state.meta.isBlurred && !field.state.meta.isValid ? (
        <em className={cn("text-destructive text-sm", className)}>{field.state.meta.errors.join(", ")}</em>
      ) : null}
      {/* {field.state.meta.isValidating ? "Validating..." : null} */}
    </>
  )
}
