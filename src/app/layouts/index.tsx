"use client"

import AppLayout from "./app-layout"
import { LayoutProps } from "./types"
import AuthLayout from "./auth-layout"
import { usePathname } from "next/navigation"
import { routes } from "@/shared/constants/routes"

export default function LayoutManager({ children, defaultOpen }: LayoutProps) {
  const pathname = usePathname()

  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route))

  const Layout = isAuthRoute ? AuthLayout : AppLayout

  return <Layout defaultOpen={defaultOpen}>{children}</Layout>
}

const authRoutes = [routes.login, routes.register]
