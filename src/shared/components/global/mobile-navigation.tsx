"use client"

import NavigationItem from "@/shared/components/global/navigation-item"
import { navigationItems } from "@/shared/lib/constants/navigation"
import { cn } from "@/shared/lib/utils"

export default function MobileNavigation({ className }: { className?: string }) {
  return (
    <nav className={cn("bg-sidebar grid h-[52px] grid-cols-5 px-4 py-3 sm:h-[74px]", className)}>
      {navigationItems.map((item) => (
        <NavigationItem key={item.url} item={item} className="max-w-[108px]" />
      ))}
    </nav>
  )
}
