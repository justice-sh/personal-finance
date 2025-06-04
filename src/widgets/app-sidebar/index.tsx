import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader } from "@/shared/components/ui/sidebar"
import { cn } from "@/shared/lib/utils"

export function AppSidebar({ className }: { className?: string }) {
  return (
    <Sidebar className={cn("", className)}>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}
