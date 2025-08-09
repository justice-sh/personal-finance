"use client"

import z from "zod"
import React from "react"
import { toast } from "sonner"
import { X } from "lucide-react"
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
import { PrefixedInputField } from "@/shared/components/form/prefixed-input-field"
import { formValidator, isFormValid, prefixedFieldOnChange } from "@/shared/utils/form.util"

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
            validators={{
              onChangeListenTo: ["maxAmount.prefix", "maxAmount.value"],
              onChange: (e) => prefixedFieldOnChange(schema.pick({ maxAmount: true }), { maxAmount: e.value }, e.fieldApi),
            }}
            children={(field) => (
              <PrefixedInputField
                label="Maximum Spend"
                form={form}
                field={field}
                prefixProps={{ name: "maxAmount.prefix" }}
                valueProps={{ name: "maxAmount.value", onChange: (e) => parseInt(e.target.value) }}
              />
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
