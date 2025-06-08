import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    console.log("Login request body:", body)
    const { email, password } = body

    // Mock validation
    if (!email || !password) {
      console.log("Missing credentials:", { email, password })
      return NextResponse.json({ error: "Missing credentials" }, { status: 400 })
    }

    // Mock successful login
    const response = NextResponse.json({
      success: true,
      user: {
        id: "mock_user_123",
        email,
      },
    })

    // Set auth cookie
    response.cookies.set("auth_token", "mock_token_123", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      path: "/",
    })

    return response
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
