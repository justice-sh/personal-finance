"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useUserData } from "@/shared/data/user.data"
import { performSignOut } from "@/shared/utils/sign-out"

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const { error, status, isLoading } = useUserData()

  useEffect(() => {
    if (error) {
      performSignOut(router).catch(console.error)
    }
  }, [error, status])

  if (isLoading || status === "error") {
    return <div className="text-preset-1 flex min-h-[100vh] items-center justify-center ring-1">Loading...</div>
  }

  return <>{children}</>
}
