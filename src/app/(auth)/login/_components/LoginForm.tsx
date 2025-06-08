"use client"

import { AUTH_MESSAGES } from "@/shared/constants/auth"
import { Routes } from "@/shared/constants/routes"
import Link from "next/link"
import { LoginFormFields } from "./LoginFormFields"

export function LoginForm() {
  return (
    <div className="mx-auto max-w-[350px] space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">{AUTH_MESSAGES.LOGIN.TITLE}</h1>
        <p className="text-gray-500 dark:text-gray-400">{AUTH_MESSAGES.LOGIN.DESCRIPTION}</p>
      </div>
      <LoginFormFields />
      <p className="text-center text-sm text-gray-500">
        Don't have an account?{" "}
        <Link href={Routes.REGISTER} className="text-primary hover:underline">
          Register
        </Link>
      </p>
    </div>
  )
}
