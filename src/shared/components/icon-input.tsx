import { cn } from "../lib/utils"
import { IconRenderer, IconRendererProps } from "./icon-renderer"
import { Input } from "./ui/input"

interface IconInputProps extends React.ComponentProps<"input">, Required<Pick<IconRendererProps, "icon">> {
  isInvalid?: boolean
}

export function IconInput({ className, isInvalid, icon, ...props }: IconInputProps) {
  return (
    <div aria-invalid={isInvalid} className={cn("input-container flex items-center justify-between gap-4", className)}>
      <Input {...props} hasContainerStyle={false} className={cn("input-text h-full w-full border-none ring-0 outline-none")} />

      <IconRenderer icon={icon} />
    </div>
  )
}
