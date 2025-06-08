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
  useSidebar,
} from "@/shared/components/ui/sidebar"
import ArrowFatLinesLeftIcon from "@/shared/icons/arrow-fat-lines-left"
import Logo from "@/shared/components/logo"
import { cn } from "@/shared/lib/utils"
import { usePathname } from "next/navigation"
import { navigationItems } from "@/shared/constants/navigation"
import NavigationItem from "@/shared/components/navigation-item"

export default function AppSidebar({ className }: { className?: string }) {
  const { state } = useSidebar()

  const pathname = usePathname()

  const isCollapsed = state === "collapsed"

  return (
    <Sidebar className={cn(className, "bg-sidebar py-4")} collapsible="icon">
      <SidebarHeader>
        <Logo state={state} />
      </SidebarHeader>

      <SidebarContent className="mt-10 px-0">
        <SidebarGroup className="pr-3 pl-0">
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title} className="">
                  <SidebarMenuButton asChild>
                    <NavigationItem key={item.url} item={item} pathname={pathname} />
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="pr-3 pl-0">
        <AppSidebarTrigger isCollapsed={isCollapsed} />
      </SidebarFooter>
    </Sidebar>
  )
}

const AppSidebarTrigger = ({ isCollapsed }: { isCollapsed: boolean }) => {
  const { toggleSidebar } = useSidebar()

  return (
    <div className="cursor-pointer" onClick={toggleSidebar}>
      <SidebarMenuButton asChild>
        <NavigationItem
          pathname=""
          item={{
            title: "Minimize menu",
            Icon: (props) => (
              <ArrowFatLinesLeftIcon
                {...props}
                data-rotate={isCollapsed}
                className={cn(props.className, "transition-transform duration-500 data-[rotate=true]:rotate-180")}
              />
            ),
          }}
        />
      </SidebarMenuButton>
      <span className="sr-only">Toggle Sidebar</span>
    </div>
  )
}
