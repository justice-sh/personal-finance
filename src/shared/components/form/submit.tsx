import { ZodType } from "zod"
import { Button } from "../ui/button"
import { CustomForm } from "@/shared/types/form.type"

export default function SubmitForm({ form, label, schema }: { form: CustomForm<any>; label: string; schema?: ZodType }) {
  return (
    <form.Subscribe
      selector={({ isSubmitting }) => {
        return { isValid: schema?.safeParse(form.state.values).success, isSubmitting }
      }}
      children={({ isValid, isSubmitting }) => {
        return (
          <Button
            type="submit"
            size="lg"
            className="w-full"
            disabled={!isValid}
            isLoading={isSubmitting}
            onClick={form.handleSubmit}
          >
            {label}
          </Button>
        )
      }}
    />
  )
}
