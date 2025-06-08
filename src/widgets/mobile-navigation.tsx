import { cn } from "@/shared/lib/utils"

export default function MobileNavigation({ className }: { className?: string }) {
  return <nav className={cn("bg-sidebar grid grid-cols-5", className)}></nav>
}
