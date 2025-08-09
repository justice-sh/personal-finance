"use client"

import React from "react"
import { toast } from "sonner"
import { X } from "lucide-react"
import z, { prettifyError } from "zod"
import { cn } from "@/shared/lib/utils"
import {
  AlertDialog,
  AlertDialogTitle,
  AlertDialogCancel,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogTrigger,
} from "@/shared/components/ui/alert-dialog"
import { Color } from "@/shared/types/color"
import { useForm } from "@tanstack/react-form"
import { Form } from "@/shared/components/form/form"
import { Button } from "@/shared/components/ui/button"
import { CurrencySymbol } from "@/shared/types/currency"
import { getErrorMessage } from "@/shared/utils/error-util"
import { addBudgetToState } from "@/shared/data/budget.data"
import { budgetAPI } from "@/shared/services/apis/budget.api"
import { InputField } from "@/shared/components/form/input-field"
import { AlertDialogDescription } from "@radix-ui/react-alert-dialog"
import { formValidator, isFormValid } from "@/shared/utils/form.util"

const schema = z.object({
  color: z.enum(Color, { message: "Invalid color" }),
  category: z.string().nonempty("Category is required"),
  maxAmount: z.object({
    prefix: z.string().min(1, "Prefix error"),
    value: z.number().min(0, "Maximum amount must be a positive number"),
  }),
})

type FormData = z.infer<typeof schema>

const AddBudgetDialog = () => {
  const form = useForm({
    defaultValues: {} as FormData,
    validators: { onChange: formValidator(schema) },
    onSubmit: async ({ value }) => {
      try {
        const resp = await budgetAPI.createBudget({
          category: value.category,
          color: value.color,
          maxAmount: value.maxAmount.value,
        })
        addBudgetToState(resp.data)
        toast.success(resp.message)
      } catch (error) {
        toast.error("Failed to create budget", { description: getErrorMessage(error) })
      }
    },
  })

  return (
    <AlertDialog>
      <AlertDialogTrigger className={cn("btn btn-default btn-size-lg")}>+ Add Budget</AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader className="flex w-full flex-row items-center justify-between">
          <AlertDialogTitle className="sm:text-preset-1 text-gray-900">Add New Budget</AlertDialogTitle>

          <AlertDialogCancel className="max-h-8 max-w-8 rounded-full border-gray-500 p-0">
            <X className="size-4 text-gray-500" />
          </AlertDialogCancel>
        </AlertDialogHeader>

        <AlertDialogDescription className="text-preset-4 text-gray-500">
          Choose a category to set a spending budget. These categories can help you monitor spending.
        </AlertDialogDescription>

        <Form className="grid gap-4">
          <form.Field name="category" children={(field) => <InputField field={field} label="Budget Category" />} />

          <form.Field
            name="maxAmount"
            defaultValue={{ prefix: CurrencySymbol.USD, value: 0 }}
            defaultMeta={{ isBlurred: true, isDirty: true, isTouched: true }}
            validators={{
              onChangeListenTo: ["maxAmount.prefix", "maxAmount.value"],
              onChange: ({ value }) => {
                const result = schema.pick({ maxAmount: true }).safeParse({ maxAmount: value })
                return result.success ? undefined : prettifyError(result.error)
              },
            }}
            children={() => (
              <div className="input-container flex gap-2">
                <form.Field
                  name="maxAmount.prefix"
                  defaultMeta={{ isBlurred: true, isDirty: true, isTouched: true }}
                  children={(field) => <div className="input-text">{field.state.value as any}</div>}
                />

                <form.Field
                  name="maxAmount.value"
                  children={(field) => (
                    <InputField
                      isNested
                      field={field}
                      type="number"
                      min={0}
                      className="flex-1"
                      onChange={(value) => parseInt(value)}
                    />
                  )}
                />
              </div>
            )}
          />

          <form.Field name="color" children={(field) => <InputField field={field} label="Theme" />} />

          <AlertDialogFooter className="h-[3.32rem]">
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
                    Add Budget
                  </Button>
                )
              }}
            />
          </AlertDialogFooter>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default AddBudgetDialog
