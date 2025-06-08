"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"

export function PreventBackButton() {
  const router = useRouter()

  useEffect(() => {
    // Push a new entry into the history stack
    window.history.pushState(null, "", window.location.href)

    // Handle the popstate event
    const handlePopState = (event: PopStateEvent) => {
      // Prevent the default back behavior
      event.preventDefault()
      // Push another entry to keep the user on the current page
      window.history.pushState(null, "", window.location.href)
    }

    // Add the event listener
    window.addEventListener("popstate", handlePopState)

    // Cleanup
    return () => {
      window.removeEventListener("popstate", handlePopState)
    }
  }, [])

  return null
}
