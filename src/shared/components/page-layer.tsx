import { cn } from "../lib/utils"

type Props = {
  children: React.ReactNode
  cta?: React.ReactNode
  className?: string
  title: string
}

export function PageLayer({ children, title, cta, className }: Props) {
  return (
    <div className="flex flex-1 flex-col gap-8">
      <header className="text-preset-1 flex items-center justify-between gap-4">
        {title}
        {cta}
      </header>

      <main className={cn("flex-1", className)}>{children}</main>
    </div>
  )
}
