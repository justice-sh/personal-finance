import z from "zod"
import { Color } from "@/shared/enums/color"
import { CurrencySymbol } from "@/shared/enums/currency"

export const AddBudgetSchema = z.object({
  color: z.enum(Color, { message: "Invalid color" }),
  category: z.string().nonempty("Category is required"),
  currency: z.enum(CurrencySymbol),
  maxSpend: z.number().min(0, "Maximum Spend must be a positive number"),
})

export const EditBudgetSchema = z.object({
  color: z.enum(Color, { message: "Invalid color" }).optional(),
  category: z.string().nonempty("Category is required").optional(),
  currency: z.enum(CurrencySymbol).optional(),
  maxSpend: z.number().min(0, "Maximum Spend must be a positive number").optional(),
})
