"use client"

import {
  Sidebar,
  useSidebar,
  SidebarMenu,
  SidebarGroup,
  SidebarFooter,
  SidebarHeader,
  SidebarContent,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroupContent,
} from "@/shared/components/ui/sidebar"
import { cn } from "@/shared/lib/utils"
import Logo from "@/shared/components/logo"
import { AppSidebarTrigger } from "./trigger"
import { navigationItems } from "@/shared/constants/navigation"
import NavigationItem from "@/shared/components/navigation-item"

export default function AppSidebar({ className }: { className?: string }) {
  return (
    <Sidebar className={cn(className, "bg-sidebar rounded-se-lg rounded-ee-lg py-4")} collapsible="icon">
      <SidebarHeader>
        <SidebarLogo />
      </SidebarHeader>

      <SidebarContent className="mt-10 px-0">
        <SidebarGroup className="pr-3 pl-0">
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => {
                const Item = item.Element || NavigationItem
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Item key={item.url} item={item} />
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
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

const SidebarLogo = () => {
  const { state } = useSidebar()
  return <Logo state={state} />
}
