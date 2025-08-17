import { Budget } from "@/shared/types/budget"

export type BudgetDialogProps = (AddBudgetProps | EditBudgetProps) & {
  styles?: {
    trigger?: string
  }
}

type AddBudgetProps = {
  mode: "add"
}

type EditBudgetProps = {
  mode: "edit"
  budget: Budget
}
