import z from "zod"
import { Color } from "@/shared/enums/color.enum"
import { CurrencySymbol } from "@/shared/types/currency"

export const AddBudgetSchema = z.object({
  color: z.enum(Color, { message: "Invalid color" }),
  category: z.string().nonempty("Category is required"),
  maxAmount: z.object({
    currency: z.enum(CurrencySymbol),
    value: z.number().min(0, "Maximum amount must be a positive number"),
  }),
})

export const EditBudgetSchema = z.object({
  color: z.enum(Color, { message: "Invalid color" }).optional(),
  category: z.string().nonempty("Category is required").optional(),
  maxAmount: z
    .object({
      currency: z.enum(CurrencySymbol),
      value: z.number().min(0, "Maximum amount must be a positive number"),
    })
    .optional(),
})
