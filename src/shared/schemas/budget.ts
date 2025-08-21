import z from "zod"
import { Color } from "@/shared/enums/color"
import { Currency } from "@/shared/enums/currency"
import { BudgetAdjustmentType } from "../enums/budget"

export const AddBudgetSchema = z.object({
  color: z.enum(Color, { message: "Invalid color" }),
  category: z.string().nonempty("Category is required"),
  currency: z.enum(Currency),
  maxSpend: z.number().min(0, "Maximum Spend must be a positive number"),
})

export const EditBudgetSchema = z.object({
  color: z.enum(Color, { message: "Invalid color" }).optional(),
  category: z.string().nonempty("Category is required").optional(),
  currency: z.enum(Currency).optional(),
  maxSpend: z.number().min(0, "Maximum Spend must be a positive number").optional(),
})

export const AdjustBudgetSchema = z
  .object({
    amount: z.number().positive("Amount must be a positive number").describe("Amount to spend"),
    type: z
      .enum(Object.values(BudgetAdjustmentType) as [BudgetAdjustmentType, ...BudgetAdjustmentType[]])
      .describe("Type of adjustment"),
    reason: z.string().optional().describe("Reason for adjustment"),
  })
  .transform((data) => {
    if (data.reason) data.reason = data.reason.toLowerCase()
    return data
  })
  .describe("Increase or Decrease the allocated amount for a budget")

export const SpendBudgetSchema = z
  .object({
    description: z.string().describe("Reason for spend"),
    amount: z.number().positive("Amount must be a positive number").describe("Amount to spend"),
  })
  .transform((data) => {
    data.description = data.description.toLowerCase()
    return data
  })
  .describe("Perform spend operation on a budget")
