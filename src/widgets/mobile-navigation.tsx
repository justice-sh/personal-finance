"use client"

import NavigationItem from "@/shared/components/navigation-item"
import { navigationItems } from "@/shared/constants/navigation"
import { cn } from "@/shared/lib/utils"

export default function MobileNavigation({ className }: { className?: string }) {
  return (
    <nav className={cn("bg-sidebar grid h-[52px] grid-cols-5 gap-3 px-6 pt-3 sm:h-[74px]", className)}>
      {navigationItems.map((item) => (
        <NavigationItem key={item.url} item={item} className="w-full" />
      ))}
    </nav>
  )
}
