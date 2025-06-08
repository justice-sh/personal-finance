"use client"

import { AuthFormData, AuthFormFields, authSchema } from "@/shared/components/auth/AuthFormFields"
import { AuthField, AuthMode } from "@/shared/constants/auth"
import { Routes } from "@/shared/constants/routes"
import { AuthEvent, AuthState } from "@/shared/constants/stateMachine"
import { authMachine } from "@/shared/machines/authMachine"
import { useMachine } from "@xstate/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { z } from "zod"

export function LoginFormFields() {
  const router = useRouter()
  const [state, send] = useMachine(authMachine)
  const [validationErrors, setValidationErrors] = useState<Partial<AuthFormData>>({})
  const isLoading = state.matches(AuthState.LOGGING_IN)
  const error = state.context.error

  useEffect(() => {
    if (state.matches(AuthState.AUTHENTICATED)) {
      router.replace(Routes.HOME)
    }
  }, [state, router])

  const handleSubmit = (data: { email: string; password: string }) => {
    try {
      // Validate all fields using the schema
      const validatedData = authSchema.parse(data)

      // Clear any previous validation errors
      setValidationErrors({})

      // If validation passes, send the event
      send({
        type: AuthEvent.LOGIN,
        email: validatedData.email,
        password: validatedData.password,
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
    <AuthFormFields mode={AuthMode.LOGIN} validationErrors={validationErrors} onSubmit={handleSubmit} isLoading={isLoading} error={error} />
  )
}
