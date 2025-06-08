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
import ArrowUpDownIcon from "@/shared/icons/arrow-up-down"
import ArrowBackIcon from "@/shared/icons/arrow-back"
import DollarBillIcon from "@/shared/icons/dollar-bill"
import HomeIcon from "@/shared/icons/home-icon"
import PaperBillIcon from "@/shared/icons/paper-bill"
import PieChartIcon from "@/shared/icons/pie-chart"
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
      Icon: HomeIcon,
    },
    {
      title: "Transactions",
      url: "/transactions",
      Icon: ArrowUpDownIcon,
    },
    {
      title: "Budgets",
      url: "/budgets",
      Icon: PieChartIcon,
    },
    {
      title: "Pots",
      url: "/pots",
      Icon: DollarBillIcon,
    },
    {
      title: "Recurring Bills",
      url: "/bills",
      Icon: PaperBillIcon,
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
              <ArrowBackIcon
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
