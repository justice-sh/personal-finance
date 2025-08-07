import { Color } from "./color"

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

export type CreateBudget = Pick<Budget, "category" | "color" | "maxAmount">
