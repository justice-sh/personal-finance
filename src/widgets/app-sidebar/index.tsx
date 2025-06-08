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
  SidebarTrigger,
  useSidebar,
} from "@/shared/components/ui/sidebar"
import ArrowsDownUpIcon from "@/shared/icons/arrows-down-up"
import ArrowFatLinesLeftIcon from "@/shared/icons/arrow-fat-lines-left"
import JarFillIcon from "@/shared/icons/jar-fill"
import HouseIcon from "@/shared/icons/house-icon"
import ReceiptIcon from "@/shared/icons/receipt"
import ChartDonutIcon from "@/shared/icons/chart-donut"
import Logo from "@/shared/components/logo"
import Link from "next/link"
import { cn } from "@/shared/lib/utils"

export function AppSidebar({ className }: { className?: string }) {
  const { state } = useSidebar()

  const isCollapsed = state === "collapsed"

  const items = [
    {
      title: "Overview",
      url: "/",
      Icon: HouseIcon,
    },
    {
      title: "Transactions",
      url: "/transactions",
      Icon: ArrowsDownUpIcon,
    },
    {
      title: "Budgets",
      url: "/budgets",
      Icon: ChartDonutIcon,
    },
    {
      title: "Pots",
      url: "/pots",
      Icon: JarFillIcon,
    },
    {
      title: "Recurring Bills",
      url: "/bills",
      Icon: ReceiptIcon,
    },
  ]

  return (
    <Sidebar className={cn("p-4 transition-all duration-500", className, isCollapsed && "px-0")} collapsible="icon">
      <SidebarHeader>
        <Logo state={state} className="px-2" />
      </SidebarHeader>

      <SidebarContent className="mt-10">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title} className="group/item">
                  <SidebarMenuButton asChild>
                    <Link href={item.url} className="text-preset-3 h-auto">
                      <item.Icon className="group-hover/item:fill-secondary-green!" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarTrigger className="w-full">
          <SidebarMenuButton asChild>
            <div className="text-preset-3 group/item flex h-auto w-auto cursor-pointer justify-start">
              <ArrowFatLinesLeftIcon
                data-rotate={isCollapsed}
                className="group-hover/item:fill-secondary-green! transition-transform duration-500 data-[rotate=true]:rotate-180"
              />
              <span>Minimize Menu</span>
            </div>
          </SidebarMenuButton>
        </SidebarTrigger>
      </SidebarFooter>
    </Sidebar>
  )
}
