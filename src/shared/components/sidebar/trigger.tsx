"use client"

import NavigationItem from "@/shared/components/global/navigation-item"
import { SidebarMenuButton, useSidebar } from "@/shared/components/ui/sidebar"
import ArrowFatLinesLeftIcon from "@/shared/icons/arrow-fat-lines-left"
import { cn } from "@/shared/lib/utils"

export const AppSidebarTrigger = () => {
  const { toggleSidebar, state } = useSidebar()

  const isCollapsed = state === "collapsed"

  return (
    <div className="cursor-pointer" onClick={toggleSidebar}>
      <SidebarMenuButton asChild>
        <NavigationItem
          item={{
            title: "Minimize menu",
            Icon: (props: any) => (
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
