"use client"

import React from "react"
import { toast } from "sonner"
import { X } from "lucide-react"
import { prettifyError } from "zod"
import { cn } from "@/shared/lib/utils"
import { BudgetDialogProps } from "./types"
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
import { CreateBudget } from "@/shared/types/budget"
import { Form } from "@/shared/components/form/form"
import { MaxSpendField } from "./ui/max-spend-field"
import { refreshBudgets } from "@/shared/data/budget"
import SubmitForm from "@/shared/components/form/submit"
import { formValidator } from "@/shared/utils/form.util"
import { ColorTagSelectField } from "./ui/color-tag-field"
import { getErrorMessage } from "@/shared/utils/error-util"
import { budgetAPI } from "@/shared/services/apis/budget.api"
import { InputField } from "@/shared/components/form/input-field"
import { AlertDialogDescription } from "@radix-ui/react-alert-dialog"
import { AddBudgetSchema, EditBudgetSchema } from "@/shared/schemas/budget"

const BudgetDialog = (props: BudgetDialogProps) => {
  const dProps = getProps(props)

  const form = useForm({
    defaultValues: dProps.defaultValues,
    validators: { onChange: formValidator(dProps.schema) },
    onSubmit: async ({ value }) => {
      try {
        const resp = await dProps.apiCall(value)
        await refreshBudgets()
        toast.success(resp.message)
      } catch (error) {
        toast.error(dProps.errorTitle, { description: getErrorMessage(error) })
      }
    },
  })

  return (
    <AlertDialog>
      <AlertDialogTrigger className={cn(dProps.styles?.trigger, props.styles?.trigger)}>{dProps.name}</AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader className="flex w-full flex-row items-center justify-between">
          <AlertDialogTitle className="sm:text-preset-1 text-gray-900">{dProps.title}</AlertDialogTitle>

          <AlertDialogCancel className="max-h-8 max-w-8 rounded-full border-gray-500 p-0">
            <X className="size-4 text-gray-500" />
          </AlertDialogCancel>
        </AlertDialogHeader>

        <AlertDialogDescription className="text-preset-4 text-gray-500">{dProps.description}</AlertDialogDescription>

        <Form className="grid gap-4">
          <form.Field
            name="category"
            children={(field) => <InputField field={field} placeholder="E.g. entertainment" label="Budget Category" />}
          />

          <form.Field
            name="maxSpend"
            validators={{
              onChangeListenTo: ["currency"],
              onChange: ({ fieldApi, value: maxSpend }) => {
                const { currency } = fieldApi.form.state.values
                const result = dProps.schema.pick({ currency: true, maxSpend: true }).safeParse({ currency, maxSpend })
                return result.success ? undefined : prettifyError(result.error)
              },
            }}
            children={(field) => <MaxSpendField mode={props.mode} field={field} form={form} />}
          />

          <form.Field name="color" children={ColorTagSelectField} />

          <AlertDialogFooter className="mt-4">
            <SubmitForm form={form} label={dProps.buttonLabel} />
          </AlertDialogFooter>
        </Form>
      </AlertDialogContent>
    </AlertDialog>
  )
}

function getProps(props: BudgetDialogProps): DProps {
  if (props.mode === "add") {
    return {
      name: "+ Add Budget",
      title: "Add New Budget",
      description: "Choose a category to set a spending budget. These categories can help you monitor spending.",
      buttonLabel: "Add Budget",
      schema: AddBudgetSchema,
      errorTitle: "Failed to create budget",
      apiCall: budgetAPI.createBudget,
      styles: {
        trigger: "btn btn-default btn-size-lg",
      },
      defaultValues: {} as CreateBudget,
    }
  } else {
    return {
      name: "Edit Budget",
      title: "Edit Budget",
      description: "As your budgets change, feel free to update your spending limits.",
      buttonLabel: "Save Changes",
      schema: EditBudgetSchema,
      errorTitle: "Failed to update budget",
      apiCall: (value: Partial<CreateBudget>) => budgetAPI.updateBudget(props.budget.id, value),
      defaultValues: props.budget,
    }
  }
}

interface DProps {
  name: string
  title: string
  description: string
  buttonLabel: string
  schema: typeof AddBudgetSchema | typeof EditBudgetSchema
  errorTitle: string
  apiCall: typeof budgetAPI.createBudget
  styles?: {
    trigger?: string
  }
  defaultValues: CreateBudget
}

export default BudgetDialog
