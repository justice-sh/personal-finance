import { cn } from "../lib/utils"
import { Input } from "./ui/input"
import { IconRenderer, IconRendererProps } from "./icon-renderer"

interface IconInputProps extends React.ComponentProps<"input">, Required<Pick<IconRendererProps, "icon">> {
  isInvalid?: boolean
}

export function IconInput({ className, isInvalid, icon, ...props }: IconInputProps) {
  return (
    <div aria-invalid={isInvalid} className={cn("input-container flex flex-1 items-center justify-between gap-1", className)}>
      <Input {...props} hasContainerStyle={false} className={cn("input-text h-full w-full border-none ring-0 outline-none")} />

      <IconRenderer icon={icon} />
    </div>
  )
}
