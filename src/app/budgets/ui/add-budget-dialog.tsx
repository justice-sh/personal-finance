"use client"

import React from "react"
import { toast } from "sonner"
import { X } from "lucide-react"
import z, { prettifyError } from "zod"
import { cn } from "@/shared/lib/utils"
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
} from "@/shared/components/ui/select"
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
import { Color } from "@/shared/types/color.type"
import { Form } from "@/shared/components/form/form"
import { capitalize } from "@/shared/utils/str.util"
import { Button } from "@/shared/components/ui/button"
import { CurrencySymbol } from "@/shared/types/currency"
import { color2Tailwind } from "@/shared/utils/color.util"
import { getErrorMessage } from "@/shared/utils/error-util"
import { addBudgetToState } from "@/shared/data/budget.data"
import { budgetAPI } from "@/shared/services/apis/budget.api"
import { InputField } from "@/shared/components/form/input-field"
import { AlertDialogDescription } from "@radix-ui/react-alert-dialog"
import { formValidator, isFormValid } from "@/shared/utils/form.util"
import { CustomFieldApi, CustomForm } from "@/shared/types/form.type"
import { FieldWrapper } from "@/shared/components/form/ui/field-wrapper"

const schema = z.object({
  color: z.enum(Color, { message: "Invalid color" }),
  category: z.string().nonempty("Category is required"),
  maxAmount: z.object({
    currency: z.enum(CurrencySymbol),
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
        console.log(value)
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
          <form.Field
            name="category"
            children={(field) => <InputField field={field} placeholder="E.g. entertainment" label="Budget Category" />}
          />

          <form.Field
            name="maxAmount"
            defaultMeta={{ isBlurred: true, isDirty: true, isTouched: true }}
            validators={{
              onChangeListenTo: ["maxAmount.currency", "maxAmount.value"],
              onChange: ({ value }) => {
                const result = schema.pick({ maxAmount: true }).safeParse({ maxAmount: value })
                return result.success ? undefined : prettifyError(result.error)
              },
            }}
            children={(field) => <MaxAmountField field={field} form={form} />}
          />

          <form.Field name="color" children={ColorTagSelectField} />

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

function MaxAmountField({ form, field }: { form: CustomForm<FormData>; field: CustomFieldApi<FormData, "maxAmount"> }) {
  return (
    <FieldWrapper field={field} label="Maximum Spend">
      <div className="input-container gap-2">
        <form.Field
          name="maxAmount.currency"
          defaultValue={CurrencySymbol.NGN}
          defaultMeta={{ isBlurred: true, isDirty: true, isTouched: true }} // I've set these because we have default value
          children={SelectCurrencyField}
        />

        <form.Field name="maxAmount.value" children={AmountInputField} />
      </div>
    </FieldWrapper>
  )
}

function SelectCurrencyField(field: CustomFieldApi<FormData, "maxAmount.currency">) {
  return (
    <Select onValueChange={(value) => field.handleChange(value as CurrencySymbol)} defaultValue={field.state.value}>
      <SelectTrigger isNested hideIcon>
        <SelectValue placeholder={CurrencySymbol.NGN} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Select Currency</SelectLabel>
          {Object.values(CurrencySymbol).map((symbol) => (
            <SelectItem key={symbol} value={symbol} className="">
              {symbol}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

function AmountInputField(field: CustomFieldApi<FormData, "maxAmount.value">) {
  return (
    <InputField
      isNested
      field={field}
      type="number"
      placeholder="E.g. 2000"
      min={0}
      className="flex-1"
      onChange={(value) => parseInt(value)}
    />
  )
}

function ColorTagSelectField(field: CustomFieldApi<FormData, "color">) {
  return (
    <FieldWrapper field={field} label="Theme">
      <Select onValueChange={(value) => field.handleChange(value as Color)} defaultValue={field.state.value}>
        <SelectTrigger>
          <SelectValue placeholder="Select theme" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Select theme</SelectLabel>
            {Object.values(Color).map((symbol) => (
              <SelectItem key={symbol} value={symbol}>
                <div className="flex items-center gap-3 capitalize">
                  <div className={cn(color2Tailwind(symbol), "size-4 rounded-full")}></div>
                  <div className="">{symbol.split("_").map(capitalize).join(" ")}</div>
                </div>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </FieldWrapper>
  )
}

export default AddBudgetDialog
