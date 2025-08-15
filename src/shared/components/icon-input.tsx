import { cn } from "../lib/utils"
import { Input } from "./ui/input"
import { IconRenderer, IconRendererProps } from "./icon-renderer"

interface IconInputProps extends React.ComponentProps<"input">, Required<Pick<IconRendererProps, "icon">> {
  isInvalid?: boolean
}

export function IconInput({ className, isInvalid, icon, ...props }: IconInputProps) {
  return (
    <div
      aria-invalid={isInvalid}
      className={cn("input-container flex flex-1 items-center justify-between gap-0 px-0", className)}
    >
      <Input {...props} isNested className={cn("input-text h-full w-full border-none px-4 ring-0 outline-none")} />

      <IconRenderer icon={icon} />
    </div>
  )
}
