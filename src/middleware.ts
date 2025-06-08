import type { NextRequest } from "next/server"
import { NextResponse } from "next/server"

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get("auth_token")
  const isAuthPage = request.nextUrl.pathname.startsWith("/login") || request.nextUrl.pathname.startsWith("/register")
  const isAuthenticated = !!authToken

  // If user is authenticated and tries to access auth pages, redirect to home
  if (isAuthenticated && isAuthPage) {
    return NextResponse.redirect(new URL("/home", request.url))
  }

  // If user is not authenticated and tries to access protected pages, redirect to login
  if (!isAuthenticated && !isAuthPage) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
