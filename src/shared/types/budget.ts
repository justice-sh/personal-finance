import z from "zod"
import { Color } from "../enums/color.enum"
import { CurrencySymbol } from "./currency"
import { AddBudgetSchema } from "../schemas/budget.schema"

export type Budget = {
  category: string
  color: Color
  createdAt: string
  currentAmount: number
  id: string
  maxSpend: number
  spent: number
  updatedAt: string
  currency: CurrencySymbol
}

export type CreateBudget = z.infer<typeof AddBudgetSchema>
