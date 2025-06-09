"use client"

import NavigationItem from "@/shared/components/navigation-item"
import { navigationItems } from "@/shared/constants/navigation"
import { cn } from "@/shared/lib/utils"
import { usePathname } from "next/navigation"

export default function MobileNavigation({ className }: { className?: string }) {
  const pathname = usePathname()

  return (
    <nav className={cn("bg-sidebar grid max-h-[52px] grid-cols-5 gap-2 px-4 py-2 sm:max-h-[74px]", className)}>
      {navigationItems.map((item) => (
        <NavigationItem key={item.url} item={item} pathname={pathname} className="max-w-[108px]" />
      ))}
    </nav>
  )
}
