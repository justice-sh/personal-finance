"use client"

import { Button } from "@/shared/components/ui/button"
import { ApiRoutes, Routes } from "@/shared/constants/routes"
import { AuthEvent } from "@/shared/constants/stateMachine"
import { AuthContext } from "@/shared/providers/AuthProvider"
import { useRouter } from "next/navigation"

export function LogoutButton() {
  const router = useRouter()
  const actor = AuthContext.useActorRef()

  const handleLogout = async () => {
    try {
      // Call the logout API endpoint
      await fetch(ApiRoutes.AUTH_LOGOUT, {
        method: "POST",
      })

      // Send logout event to state machine
      actor.send({ type: AuthEvent.LOGOUT })

      // Redirect to login page
      router.replace(Routes.LOGIN)
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  return (
    <Button variant="destructive" onClick={handleLogout}>
      Logout
    </Button>
  )
}
