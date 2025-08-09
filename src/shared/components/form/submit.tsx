import { Button } from "../ui/button"
import { CustomForm } from "@/shared/types/form.type"
import { isFormValid } from "@/shared/utils/form.util"

export default function SubmitForm({ form, label }: { form: CustomForm<any>; label: string }) {
  return (
    <form.Subscribe
      selector={({ fieldMeta, isSubmitting }) => ({ isValid: isFormValid(fieldMeta), isSubmitting })}
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
