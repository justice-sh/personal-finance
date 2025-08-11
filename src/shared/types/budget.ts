import z from "zod"
import { Color } from "./color.type"
import { AddBudgetSchema } from "../schemas/budget.schema"

export type Budget = {
  category: string
  color: Color
  createdAt: string
  currentAmount: number
  id: string
  maxAmount: number
  spent: number
  updatedAt: string
}

export type CreateBudget = z.infer<typeof AddBudgetSchema>
