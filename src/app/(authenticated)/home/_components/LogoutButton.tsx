"use client"

import { Button } from "@/shared/components/ui/button"
import { AuthEvent } from "@/shared/constants/stateMachine"
import { AuthContext } from "@/shared/providers/AuthProvider"
import { useRouter } from "next/navigation"

export function LogoutButton() {
  const router = useRouter()
  const actor = AuthContext.useActorRef()

  const handleLogout = () => {
    console.log("Logout button clicked, sending LOGOUT event")
    actor.send({ type: AuthEvent.LOGOUT })
    console.log("LOGOUT event sent, redirecting to login page")
    router.push("/login")
  }

  return (
    <Button variant="destructive" onClick={handleLogout}>
      Logout
    </Button>
  )
}
