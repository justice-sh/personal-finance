import React from "react"
import { cn } from "../lib/utils"
import { Button, ButtonProps } from "./ui/button"
import { IconRenderer, IconRendererProps } from "./icon-renderer"

interface Props extends ButtonProps, Pick<IconRendererProps, "icon"> {
  className?: string
  children?: React.ReactNode
}

export function IconButton({ icon, className, children, variant = "ghost", ...props }: Props) {
  return (
    <Button {...props} size="icon" className={cn("m-0", className)} data-slot="icon" variant={variant}>
      <IconRenderer icon={icon}>{children}</IconRenderer>
    </Button>
  )
}
