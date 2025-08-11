import * as React from "react"
import { cn } from "@/shared/lib/utils"
import { LoaderIcon } from "lucide-react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

const buttonVariants = cva("btn", {
  variants: {
    variant: {
      default: "btn-default",
      destructive: "btn-destructive",
      outline: "btn-outline",
      secondary: "btn-secondary",
      ghost: "btn-ghost",
      link: "btn-link",
    },
    size: {
      default: "btn-size-default",
      sm: "btn-size-sm",
      lg: "btn-size-lg",
      icon: "btn-size-icon",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "default",
  },
})

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {
  asChild?: boolean
  isLoading?: boolean
}

const Button = ({
  ref,
  className,
  variant,
  size,
  asChild = false,
  isLoading,
  children,
  ...props
}: ButtonProps & {
  ref?: React.RefObject<HTMLButtonElement>
}) => {
  const Comp = asChild ? Slot : "button"
  if (isLoading) props.disabled = true
  return (
    <Comp className={cn(buttonVariants({ variant, size }), "flex items-center gap-3", className)} ref={ref} {...props}>
      {children} {isLoading && <LoaderIcon className="animate-spin" />}
    </Comp>
  )
}
Button.displayName = "Button"

export { Button, buttonVariants }
