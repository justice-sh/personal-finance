"use client"

import React from "react"

const Page = () => {
  const handleAddCookies = (name: string, value: string, days: number = 7) => {
    const expires = new Date(Date.now() + days * 864e5).toUTCString()
    document.cookie = `${name}=${encodeURIComponent(value)}: expires=${expires}`
  }

  const handleRemoveCookies = (name: string) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/`
  }

  return (
    <div className="flex gap-x-2">
      <button onClick={() => handleAddCookies("token", "abc123")} className="rounded-md bg-blue-200 p-3">
        Add Cookies
      </button>
      <button onClick={() => handleRemoveCookies("token")} className="rounded-md bg-red-400 p-3">
        Remove Cookies
      </button>
    </div>
  )
}

export default Page
