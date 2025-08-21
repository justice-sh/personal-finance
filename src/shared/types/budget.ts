import z from "zod"
import { Color } from "../enums/color"
import { Currency } from "../enums/currency"
import { AddBudgetSchema, AdjustBudgetSchema } from "../schemas/budget"

export type Budget = {
  category: string
  color: Color
  createdAt: string
  currency: Currency
  currentAmount: number
  id: string
  maxSpend: number
  spent: number
  updatedAt: string
}

export type CreateBudget = z.infer<typeof AddBudgetSchema>

export type AdjustBudget = z.infer<typeof AdjustBudgetSchema>
