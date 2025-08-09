import * as React from "react"
import { cn } from "@/shared/lib/utils"

interface InputProps extends React.ComponentPropsWithoutRef<"input"> {
  isNested?: boolean
}

function Input({ className, type, isNested, ...props }: InputProps) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn({ "input-container": !isNested }, "input-text", className)}
      {...props}
    />
  )
}

export { Input }
