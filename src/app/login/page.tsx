"use client"

import z from "zod"
import { useRouter } from "next/navigation"
import { useForm } from "@tanstack/react-form"
import { routes } from "@/shared/constants/routes"
import { formValidator } from "@/shared/utils/form"
import { Form } from "@/shared/components/form/form"
import { Button } from "@/shared/components/ui/button"
import { PasswordSchema } from "@/shared/schemas/password"
import { AuthLayer } from "@/shared/components/auth-layer"
import { InputField } from "@/shared/components/form/input-field"

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.object({ value: z.email("Invalid email address") }),
  password: PasswordSchema(),
})

type FormData = z.infer<typeof schema>

export default function LoginPage() {
  const router = useRouter()

  const form = useForm({
    defaultValues: {} as FormData,
    validators: { onChange: formValidator(schema) },
    onSubmit: (data) => {
      console.log("Form submitted with data:", data.value)
      router.push(routes.overview)
    },
  })

  return (
    <AuthLayer title="Login" footer={{ text: "Need to create an account?", action: "Sign Up", href: routes.register }}>
      <Form className="grid gap-5">
        <form.Field name="name" children={(field) => <InputField field={field} label="Name" placeholder="John Doe" />} />
        <form.Field name="email.value" children={(field) => <InputField field={field} label="Email" placeholder="you@mail.com" />} />
        <form.Field name="password" children={(field) => <InputField field={field} label="Password" placeholder="******" />} />

        <form.Subscribe
          selector={(state) => ({ isValid: state.isValid && state.isDirty, isSubmitting: state.isSubmitting })}
          children={(state) => {
            return (
              <Button type="submit" size="lg" disabled={!state.isValid} isLoading={state.isSubmitting} onClick={form.handleSubmit}>
                Login
              </Button>
            )
          }}
        />
      </Form>
    </AuthLayer>
  )
}
