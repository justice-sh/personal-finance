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
import { formValidator } from "@/shared/utils/form"
import { formatAmount } from "@/shared/utils/formatAmount"
import { getErrorMessage } from "@/shared/utils/error-util"
import { SpendBudgetSchema } from "@/shared/schemas/budget"
import { SpendBudget, Budget } from "@/shared/types/budget"
import { budgetAPI } from "@/shared/services/apis/budget"
import { InputField } from "@/shared/components/form/input-field"
import { AlertDialogDescription } from "@radix-ui/react-alert-dialog"

type Props = { budget: Budget; styles?: { trigger?: string } }

const BudgetSpendDialog = ({ budget, styles }: Props) => {
  const form = useForm({
    defaultValues: {} as SpendBudget,
    validators: { onChange: formValidator(SpendBudgetSchema) },
    onSubmit: async ({ value }) => {
      try {
        const resp = await budgetAPI.spendBudget(budget.id, value)
        await refreshBudgets()
        toast.success(resp.message)
        form.reset()
      } catch (error) {
        toast.error("Failed to spend budget", { description: getErrorMessage(error) })
      }
    },
  })

  return (
    <AlertDialog>
      <AlertDialogTrigger className={cn(styles?.trigger)}>Spend Budget</AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader className="flex w-full flex-row items-center justify-between">
          <AlertDialogTitle className="sm:text-preset-2 text-gray-900">Spend on {budget.category}</AlertDialogTitle>

          <AlertDialogCancel className="max-h-8 max-w-8 rounded-full border-gray-500 p-0">
            <X className="size-4 text-gray-500" />
          </AlertDialogCancel>
        </AlertDialogHeader>

        <AlertDialogDescription className="text-preset-4 text-gray-500">
          Spend on your budget. <br />
          Available balance: <span className="font-bold">{formatAmount(budget.currentAmount, budget.currency)}</span>
        </AlertDialogDescription>

        <Form className="grid gap-4">
          <form.Field
            name="description"
            children={(field) => <InputField field={field} type="text" placeholder="Reason for spend" />}
          />

          <form.Field
            name="amount"
            children={(field) => (
              <InputField
                field={field}
                type="number"
                placeholder="E.g. 2000"
                min={0}
                onChange={(value) => parseInt(value)}
              />
            )}
          />

          <AlertDialogFooter className="mt-4">
            <SubmitForm form={form} schema={SpendBudgetSchema} label="Save Changes" />
          </AlertDialogFooter>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default BudgetSpendDialog
