"use client"

import z from "zod"
import { toast } from "sonner"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "@tanstack/react-form"
import { routes } from "@/shared/constants/routes"
import { formValidator } from "@/shared/utils/form"
import { Form } from "@/shared/components/form/form"
import { authAPI } from "@/shared/services/apis/auth"
import { Button } from "@/shared/components/ui/button"
import { PasswordSchema } from "@/shared/schemas/password"
import { AuthLayer } from "@/shared/components/auth-layer"
import { getErrorMessage } from "@/shared/utils/error-util"
import { InputField } from "@/shared/components/form/input-field"

const schema = z.object({
  email: z.email("Invalid email address"),
  password: PasswordSchema(),
})

type FormData = z.infer<typeof schema>

export default function LoginPage() {
  const router = useRouter()

  useEffect(() => {
    router.prefetch(routes.overview)
  }, [router])

  const form = useForm({
    defaultValues: { email: "test@tmail.com", password: "TestPass#1" } as FormData,
    validators: { onChange: formValidator(schema) },
    onSubmit: async (data) => {
      try {
        const resp = await authAPI.login(data.value)
        toast.success(resp.message)
        router.push(routes.overview)
      } catch (error) {
        toast.error("Login failed", getErrorMessage(error))
      }
    },
  })

  return (
    <AuthLayer title="Login" footer={{ text: "Need to create an account?", action: "Sign Up", href: routes.register }}>
      <Form className="grid gap-5">
        <form.Field name="email" children={(field) => <InputField field={field} label="Email" placeholder="you@mail.com" />} />
        <form.Field name="password" children={(field) => <InputField field={field} label="Password" placeholder="******" />} />

        <form.Subscribe
          selector={({ isValid, isSubmitting }) => ({ isValid, isSubmitting })}
          children={({ isValid, isSubmitting }) => {
            return (
              <Button type="submit" size="lg" disabled={!isValid} isLoading={isSubmitting} onClick={form.handleSubmit}>
                Login
              </Button>
            )
          }}
        />
      </Form>
    </AuthLayer>
  )
}
