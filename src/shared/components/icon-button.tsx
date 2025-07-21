import React from "react"
import { Button, ButtonProps } from "./ui/button"
import { IconRenderer, IconRendererProps } from "./icon-renderer"
import { cn } from "../lib/utils"

interface Props extends ButtonProps, Pick<IconRendererProps, "icon"> {
  className?: string
  children?: React.ReactNode
}

export function IconButton({ icon, className, children, variant = "ghost", ...props }: Props) {
  return (
    <Button {...props} size="icon" className={cn("aspect-square h-full w-auto", className)} data-slot="icon" variant={variant}>
      <IconRenderer icon={icon}>{children}</IconRenderer>
    </Button>
  )
}
