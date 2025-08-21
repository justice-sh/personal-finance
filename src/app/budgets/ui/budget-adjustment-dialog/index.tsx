"use client"

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
import { useForm } from "@tanstack/react-form"
import { Form } from "@/shared/components/form/form"
import { refreshBudgets } from "@/shared/data/budget"
import SubmitForm from "@/shared/components/form/submit"
import { formValidator } from "@/shared/utils/form.util"
import { formatAmount } from "@/shared/utils/formatAmount"
import { getErrorMessage } from "@/shared/utils/error-util"
import { AdjustBudgetSchema } from "@/shared/schemas/budget"
import { AdjustBudget, Budget } from "@/shared/types/budget"
import { budgetAPI } from "@/shared/services/apis/budget.api"
import { AdjustmentTypeField } from "./ui/adjustment-type-field"
import { InputField } from "@/shared/components/form/input-field"
import { AlertDialogDescription } from "@radix-ui/react-alert-dialog"

type Props = { budget: Budget; styles?: { trigger?: string } }

const BudgetAdjustmentDialog = ({ budget, styles }: Props) => {
  const form = useForm({
    defaultValues: {} as AdjustBudget,
    validators: { onChange: formValidator(AdjustBudgetSchema) },
    onSubmit: async ({ value }) => {
      try {
        const resp = await budgetAPI.adjustBudget(budget.id, value)
        await refreshBudgets()
        toast.success(resp.message)
      } catch (error) {
        toast.error("Failed to adjust budget", { description: getErrorMessage(error) })
      }
    },
  })

  return (
    <AlertDialog>
      <AlertDialogTrigger className={cn(styles?.trigger)}>Adjust Budget</AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader className="flex w-full flex-row items-center justify-between">
          <AlertDialogTitle className="sm:text-preset-2 text-gray-900">Adjust {budget.category}</AlertDialogTitle>

          <AlertDialogCancel className="max-h-8 max-w-8 rounded-full border-gray-500 p-0">
            <X className="size-4 text-gray-500" />
          </AlertDialogCancel>
        </AlertDialogHeader>

        <AlertDialogDescription className="text-preset-4 text-gray-500">
          Increase or decrease budget amount. <br />
          Available balance: <span className="font-bold">{formatAmount(budget.currentAmount, budget.currency)}</span>
        </AlertDialogDescription>

        <Form className="grid gap-4">
          <form.Field name="type" children={AdjustmentTypeField} />

          <form.Field
            name="amount"
            children={(field) => (
              <InputField
                field={field}
                label="By amount"
                type="number"
                placeholder="E.g. 2000"
                min={0}
                onChange={(value) => parseInt(value)}
              />
            )}
          />

          <form.Field
            name="reason"
            children={(field) => <InputField field={field} type="text" placeholder="Reason for adjustment (optional)" />}
          />
          <AlertDialogFooter className="mt-4">
            <SubmitForm form={form} schema={AdjustBudgetSchema} label="Save Changes" />
          </AlertDialogFooter>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default BudgetAdjustmentDialog
