"use client"

import { authMachine } from "@/shared/machines/authMachine"
import { createActorContext } from "@xstate/react"

export const AuthContext = createActorContext(authMachine)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return <AuthContext.Provider>{children}</AuthContext.Provider>
}
