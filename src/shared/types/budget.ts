import z from "zod"
import { Color } from "../enums/color"
import { Currency } from "../enums/currency"
import { AddBudgetSchema } from "../schemas/budget"

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
