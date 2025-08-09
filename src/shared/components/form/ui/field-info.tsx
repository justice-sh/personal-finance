import { cn } from "@/shared/lib/utils"
import type { AnyFieldApi } from "@tanstack/react-form"

export function FieldInfo({ field, className }: { field: AnyFieldApi; className?: string }) {
  const canShow = field.state.meta.isTouched && field.state.meta.isBlurred && !field.state.meta.isValid

  if (!canShow) return null

  return (
    <div className="block">
      {field.state.meta.errors.map((error, i) => (
        <p className={cn("text-destructive text-preset-5", className)} key={i}>
          {error}
        </p>
      ))}
    </div>
  )
}
