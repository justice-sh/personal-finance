"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/shared/components/ui/sidebar"
import Logo from "@/shared/components/global/logo"
import { cn } from "@/shared/lib/utils"
import { navigationItems } from "@/shared/lib/constants/navigation"
import NavigationItem from "@/shared/components/global/navigation-item"
import { AppSidebarTrigger } from "./trigger"

export default function AppSidebar({ className }: { className?: string }) {
  return (
    <Sidebar className={cn(className, "bg-sidebar py-4")} collapsible="icon">
      <SidebarHeader>
        <Logo />
      </SidebarHeader>

      <SidebarContent className="mt-10 px-0">
        <SidebarGroup className="pr-3 pl-0">
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title} className="">
                  <SidebarMenuButton asChild>
                    <NavigationItem key={item.url} item={item} />
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="pr-3 pl-0">
        <AppSidebarTrigger />
      </SidebarFooter>
    </Sidebar>
  )
}
