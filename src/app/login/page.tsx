"use client"

import z from "zod"
import { toast } from "sonner"
import { useEffect } from "react"
import { CustomForm } from "@/shared/types/form.type"
import { useForm } from "@tanstack/react-form"
import { routes } from "@/shared/constants/routes"
import { Form } from "@/shared/components/form/form"
import { authAPI } from "@/shared/services/apis/auth"
import { Button } from "@/shared/components/ui/button"
import { formValidator } from "@/shared/utils/form.util"
import { PasswordSchema } from "@/shared/schemas/password"
import { AuthLayer } from "@/shared/components/auth-layer"
import { prefetchUserData } from "@/shared/data/user"
import { getErrorMessage } from "@/shared/utils/error-util"
import { useRouter, useSearchParams } from "next/navigation"
import { InputField } from "@/shared/components/form/input-field"
import { PasswordField } from "@/shared/components/form/password-field"

const schema = z.object({
  email: z.email("Invalid email address").nonempty("Email is required"),
  password: PasswordSchema().nonempty("Password is required"),
})

type FormData = z.infer<typeof schema>

export default function LoginPage() {
  const router = useRouter()

  useEffect(() => {
    router.prefetch(routes.overview)
  }, [router])

  const searchParams = useSearchParams()

  // For sharing login link with test account credentials
  const email = searchParams.get("email") ?? undefined
  const password = searchParams.get("password") ?? undefined

  const form = useForm({
    defaultValues: { email, password } as FormData,
    validators: { onChange: formValidator(schema) },
    onSubmit: async (data) => {
      try {
        const resp = await authAPI.login(data.value)
        toast.success(resp.message)
        await prefetchUserData()
        router.push(routes.overview)
      } catch (error) {
        toast.error("Login Failed", { description: getErrorMessage(error) })
      }
    },
  })

  useSetInitialFieldState(form, { email, password })

  return (
    <AuthLayer title="Login" footer={{ text: "Need to create an account?", action: "Sign Up", href: routes.register }}>
      <Form className="grid gap-5">
        <form.Field
          name="email"
          children={(field) => <InputField field={field} label="Email" placeholder="you@mail.com" />}
        />
        <form.Field
          name="password"
          children={(field) => <PasswordField field={field} label="Password" placeholder="******" />}
        />

        <form.Subscribe
          selector={({ fieldMeta, isSubmitting }) => {
            const isFormValid = Object.values(fieldMeta).map((meta) => meta.isDirty && meta.isValid)
            const isValid = isFormValid.length ? isFormValid.every(Boolean) : false
            return { isValid, isSubmitting }
          }}
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

// This is needed especially when the pre-filled state is complete, so that the submit button will be enabled.
function useSetInitialFieldState(form: CustomForm<FormData>, initialData: Partial<FormData>) {
  const { email, password } = initialData

  useEffect(() => {
    if (Object.values(initialData).length === 0) return

    const keys = Object.keys(initialData) as (keyof FormData)[]

    for (const key of keys) {
      const value = initialData[key]
      if (!value) continue

      const meta = form.getFieldMeta(key)
      if (meta) form.setFieldMeta(key, { ...meta, isDirty: true, isTouched: true, isBlurred: true })
    }

    form.validate("change")

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, password])
}
