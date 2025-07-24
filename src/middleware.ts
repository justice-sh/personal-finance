import { routes } from "./shared/constants/routes"
import { NextResponse, NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const token = request.cookies.get("access_token")?.value

  if (!token) return NextResponse.redirect(new URL(routes.login, request.url))

  // No DB lookup is needed. That bit will be handled by the AuthProvider on the client.
  // We use this to ensure a token is present before allowing access to the app.

  return NextResponse.next()
}

export const config = {
  matcher: ["/", "/budgets", "/pots", "/recurring-bills", "/transactions"],
}
