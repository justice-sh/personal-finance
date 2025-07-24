"use client"

import AppLayout from "./app-layout"
import { LayoutProps } from "./types"
import AuthLayout from "./auth-layout"
import { usePathname } from "next/navigation"
import { routes } from "@/shared/constants/routes"
import { queryClient } from "@/shared/lib/ts-query-client"
import { QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

export default function LayoutManager({ children, defaultOpen }: LayoutProps) {
  const pathname = usePathname()

  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route))

  const Layout = isAuthRoute ? AuthLayout : AppLayout

  return (
    <QueryClientProvider client={queryClient}>
      <Layout defaultOpen={defaultOpen}>{children}</Layout>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

const authRoutes = [routes.login, routes.register]
