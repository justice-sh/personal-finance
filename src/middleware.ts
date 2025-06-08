import { Routes } from "@/shared/constants/routes"
import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get("auth_token")
  const isAuthPage = request.nextUrl.pathname.startsWith(Routes.LOGIN) || request.nextUrl.pathname.startsWith(Routes.REGISTER)
  const isAuthenticated = !!authToken

  // If user is authenticated and tries to access auth pages, redirect to home
  if (isAuthenticated && isAuthPage) {
    return NextResponse.redirect(new URL(Routes.HOME, request.url))
  }

  // If user is not authenticated and tries to access protected pages, redirect to login
  if (!isAuthenticated && !isAuthPage) {
    return NextResponse.redirect(new URL(Routes.LOGIN, request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
