"use client"

import { AuthProvider } from "@/shared/providers/AuthProvider"
import { LogoutButton } from "./LogoutButton"

export function Header() {
  return (
    <AuthProvider>
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-4xl font-bold">Welcome to Your Dashboard</h1>
        <LogoutButton />
      </div>
    </AuthProvider>
  )
}
