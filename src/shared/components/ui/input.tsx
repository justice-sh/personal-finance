import * as React from "react"
import { cn } from "@/shared/lib/utils"

interface InputProps extends React.ComponentPropsWithoutRef<"input"> {
  hasContainerStyle?: boolean
}

function Input({ className, type, hasContainerStyle = true, ...props }: InputProps) {
  return (
    <input type={type} data-slot="input" className={cn({ "input-container": hasContainerStyle }, "input-text", className)} {...props} />
  )
}

export { Input }
