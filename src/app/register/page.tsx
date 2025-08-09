"use client"

import z from "zod"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { useForm } from "@tanstack/react-form"
import { routes } from "@/shared/constants/routes"
import { Form } from "@/shared/components/form/form"
import { userAPI } from "@/shared/services/apis/user"
import { Button } from "@/shared/components/ui/button"
import { PasswordSchema } from "@/shared/schemas/password"
import { AuthLayer } from "@/shared/components/auth-layer"
import { getErrorMessage } from "@/shared/utils/error-util"
import { InputField } from "@/shared/components/form/input-field"
import { formValidator, isFormValid } from "@/shared/utils/form.util"
import { PasswordField } from "@/shared/components/form/password-field"

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email("Invalid email address"),
  password: PasswordSchema(),
})

type FormData = z.infer<typeof schema>

export default function Page() {
  const router = useRouter()

  const form = useForm({
    defaultValues: {} as FormData,
    validators: { onChange: formValidator(schema) },
    onSubmit: async (data) => {
      try {
        const resp = await userAPI.signUp(data.value)
        toast.success(resp.message)
        router.push(`${routes.login}?email=${data.value.email}`)
      } catch (error) {
        toast.error("Sign Up Failed", { description: getErrorMessage(error) })
      }
    },
  })

  return (
    <AuthLayer title="Sign Up" footer={{ text: "Already have an account?", action: "Login", href: routes.login }}>
      <Form className="grid gap-5">
        <form.Field name="name" children={(field) => <InputField field={field} label="Name" placeholder="John Doe" />} />
        <form.Field
          name="email"
          children={(field) => <InputField field={field} label="Email" placeholder="you@mail.com" />}
        />
        <form.Field
          name="password"
          children={(field) => <PasswordField field={field} label="Password" placeholder="******" />}
        />

        <form.Subscribe
          selector={({ fieldMeta, isSubmitting }) => ({ isValid: isFormValid(fieldMeta), isSubmitting })}
          children={({ isValid, isSubmitting }) => {
            return (
              <Button type="submit" size="lg" disabled={!isValid} isLoading={isSubmitting} onClick={form.handleSubmit}>
                Create Account
              </Button>
            )
          }}
        />
      </Form>
    </AuthLayer>
  )
}
