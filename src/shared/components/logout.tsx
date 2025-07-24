"use client"

import { LogOutIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import NavigationItem from "./navigation-item"
import { performSignOut } from "../utils/sign-out"

export function Logout(props: React.ComponentProps<typeof NavigationItem>) {
  const router = useRouter()

  const action = () => {
    performSignOut(router)
  }

  return <NavigationItem {...props} item={{ Icon: LogOutIcon, action, title: "Logout" }} />
}
