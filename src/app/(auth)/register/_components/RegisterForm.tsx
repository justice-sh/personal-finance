"use client"

import { AuthFormData, AuthFormFields, authSchema } from "@/shared/components/auth/AuthFormFields"
import { AUTH_MESSAGES, AuthField, AuthMode } from "@/shared/constants/auth"
import { Routes } from "@/shared/constants/routes"
import { AuthEvent, AuthState } from "@/shared/constants/stateMachine"
import { authMachine } from "@/shared/machines/authMachine"
import { useMachine } from "@xstate/react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { z } from "zod"

export function RegisterForm() {
  const router = useRouter()
  const [state, send] = useMachine(authMachine)
  const [validationErrors, setValidationErrors] = useState<Partial<AuthFormData>>({})
  const isLoading = state.matches(AuthState.REGISTERING) || state.matches(AuthState.LOGGING_IN)
  const error = state.context.error

  useEffect(() => {
    if (state.matches(AuthState.AUTHENTICATED)) {
      router.replace(Routes.HOME)
    }
  }, [state, router])

  const handleSubmit = (data: { email: string; password: string; name?: string }) => {
    try {
      // Validate all fields using the schema
      const validatedData = authSchema.parse(data)

      // Clear any previous validation errors
      setValidationErrors({})

      // If validation passes, send the event
      send({
        type: AuthEvent.REGISTER,
        email: validatedData.email,
        password: validatedData.password,
        name: validatedData.name!,
      })
    } catch (error) {
      if (error instanceof z.ZodError) {
        // Convert Zod errors to validation errors
        const errors: Partial<AuthFormData> = {}
        error.errors.forEach((err) => {
          const field = err.path[0] as keyof AuthFormData
          errors[field] = err.message
        })
        setValidationErrors(errors)
      }
    }
  }

  // Handle server errors
  useEffect(() => {
    if (error) {
      try {
        const parsedError = JSON.parse(error)
        if (parsedError.errors) {
          const errors: Partial<AuthFormData> = {}
          parsedError.errors.forEach((err: { path: string[]; message: string }) => {
            const field = err.path[0] as keyof AuthFormData
            errors[field] = err.message
          })
          setValidationErrors(errors)
        }
      } catch {
        // If error is not JSON, it's a general error
        setValidationErrors({ [AuthField.EMAIL]: error })
      }
    }
  }, [error])

  return (
    <div className="mx-auto max-w-[350px] space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">{AUTH_MESSAGES.REGISTER.TITLE}</h1>
        <p className="text-gray-500 dark:text-gray-400">{AUTH_MESSAGES.REGISTER.DESCRIPTION}</p>
      </div>
      <AuthFormFields
        mode={AuthMode.REGISTER}
        validationErrors={validationErrors}
        onSubmit={handleSubmit}
        isLoading={isLoading}
        error={error}
      />
      <p className="text-center text-sm text-gray-500">
        Already have an account?{" "}
        <Link href={Routes.LOGIN} className="text-primary hover:underline">
          Login
        </Link>
      </p>
    </div>
  )
}
