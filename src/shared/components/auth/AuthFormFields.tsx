"use client"

import { Input } from "@/shared/components/ui/input"
import { Label } from "@/shared/components/ui/label"
import { AUTH_MESSAGES, AuthField, AuthMode } from "@/shared/constants/auth"
import { EyeIcon, EyeOffIcon } from "lucide-react"
import { useState } from "react"
import { z } from "zod"

export const authSchema = z.object({
  [AuthField.NAME]: z.string().min(1, AUTH_MESSAGES.VALIDATION.NAME_REQUIRED).optional(),
  [AuthField.EMAIL]: z.string().min(1, AUTH_MESSAGES.VALIDATION.EMAIL_REQUIRED).email(AUTH_MESSAGES.VALIDATION.EMAIL_INVALID),
  [AuthField.PASSWORD]: z.string().min(1, AUTH_MESSAGES.VALIDATION.PASSWORD_REQUIRED).min(6, AUTH_MESSAGES.VALIDATION.PASSWORD_MIN_LENGTH),
})

export type AuthFormData = z.infer<typeof authSchema>

interface AuthFormFieldsProps {
  mode: AuthMode
  validationErrors: Partial<AuthFormData>
  onSubmit: (data: { name?: string; email: string; password: string }) => void
  isLoading: boolean
  error?: string
}

export function AuthFormFields({ mode, validationErrors, onSubmit, isLoading, error }: AuthFormFieldsProps) {
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data = {
      name: mode === AuthMode.REGISTER ? (formData.get(AuthField.NAME) as string) : undefined,
      email: formData.get(AuthField.EMAIL) as string,
      password: formData.get(AuthField.PASSWORD) as string,
    }
    onSubmit(data)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {mode === AuthMode.REGISTER && (
        <div className="grid gap-2">
          <Label htmlFor={AuthField.NAME}>Name</Label>
          <Input
            id={AuthField.NAME}
            name={AuthField.NAME}
            type="text"
            placeholder="John Doe"
            required
            aria-invalid={!!validationErrors[AuthField.NAME]}
          />
          {validationErrors[AuthField.NAME] && <p className="text-sm text-red-500">{validationErrors[AuthField.NAME]}</p>}
        </div>
      )}
      <div className="grid gap-2">
        <Label htmlFor={AuthField.EMAIL}>Email</Label>
        <Input
          id={AuthField.EMAIL}
          name={AuthField.EMAIL}
          type="email"
          placeholder="m@example.com"
          required
          aria-invalid={!!validationErrors[AuthField.EMAIL]}
        />
        {validationErrors[AuthField.EMAIL] && <p className="text-sm text-red-500">{validationErrors[AuthField.EMAIL]}</p>}
      </div>
      <div className="grid gap-2">
        <Label htmlFor={AuthField.PASSWORD}>Password</Label>
        <div className="relative">
          <Input
            id={AuthField.PASSWORD}
            name={AuthField.PASSWORD}
            type={showPassword ? "text" : "password"}
            required
            aria-invalid={!!validationErrors[AuthField.PASSWORD]}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 -translate-y-1/2"
          >
            {showPassword ? <EyeOffIcon className="h-4 w-4" /> : <EyeIcon className="h-4 w-4" />}
            <span className="sr-only">{showPassword ? "Hide password" : "Show password"}</span>
          </button>
        </div>
        {validationErrors[AuthField.PASSWORD] && <p className="text-sm text-red-500">{validationErrors[AuthField.PASSWORD]}</p>}
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
      <button
        type="submit"
        className="bg-primary text-primary-foreground hover:bg-primary/90 h-10 w-full rounded-md px-4 py-2"
        disabled={isLoading}
      >
        {isLoading ? AUTH_MESSAGES.LOADING : mode === AuthMode.LOGIN ? AUTH_MESSAGES.LOGIN.BUTTON : AUTH_MESSAGES.REGISTER.BUTTON}
      </button>
    </form>
  )
}
