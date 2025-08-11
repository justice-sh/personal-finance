import z from "zod"
import { Color } from "../enums/color"
import { CurrencySymbol } from "../enums/currency"
import { AddBudgetSchema } from "../schemas/budget"

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
