import { cn } from "../lib/utils"
import { Loader2 } from "lucide-react"

type Props = {
  isEmpty?: boolean
  className?: string
  isLoading?: boolean
  tag?: "div" | "section"
  ref?: React.Ref<HTMLDivElement>

  children?: React.ReactNode
  emptyState?: React.ReactNode

  styles?: { loading?: string; empty?: string }
}

export function ConditionalRenderer({
  className,
  tag = "div",
  isLoading,
  isEmpty,
  children,
  styles,
  ref,
  emptyState = "Nothing to show...",
}: Props) {
  const Tag = tag

  if (isLoading) {
    return (
      <Tag className={cn("flex items-center justify-center", styles?.loading)}>
        <Loader2 className="size-8 animate-spin" />
      </Tag>
    )
  }

  if (isEmpty) return <Tag className={cn("text-preset-2 flex items-center justify-center", styles?.empty)}>{emptyState}</Tag>

  return (
    <Tag className={className} ref={ref}>
      {children}
    </Tag>
  )
}
