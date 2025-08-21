import clsx from "clsx"
import React from "react"
import BudgetDialog from "./budget-dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu"
import { Budget } from "@/shared/types/budget"
import Slider from "@/shared/components/slider"
import OptionsIcon from "@/shared/icons/options-icon"
import { refreshBudgets } from "@/shared/data/budget"
import { color2Tailwind } from "@/shared/utils/color.util"
import { formatAmount } from "@/shared/utils/formatAmount"
import { BudgetTransactions } from "./budget-transactions"
import { Separator } from "@/shared/components/ui/separator"
import DeleteDialog from "@/shared/components/delete-dialog"
import { budgetAPI } from "@/shared/services/apis/budget.api"

const BudgetCard = ({ budget }: { budget: Budget }) => {
  return (
    <div className="flex flex-col gap-y-5 rounded-md bg-white px-5 py-6 sm:p-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-4">
          <div className={clsx("size-4 rounded-full bg-gray-500", color2Tailwind(budget.color))} />
          <p className="text-preset-2 capitalize">{budget.category}</p>
        </div>

        <BudgetCardActions budget={budget} />
      </div>

      <div className="flex flex-col gap-y-4">
        <p className="text-preset-4 text-gray-500">Maximum of {formatAmount(budget.maxSpend, budget.currency)}</p>

        <Slider
          sliderBorderClass="p-1"
          sliderPipeClass={clsx(color2Tailwind(budget.color), "h-6")}
          value={Math.round((budget.spent / budget.maxSpend) * 100)}
        />

        <div className="flex items-center justify-between gap-x-4">
          <div className="flex w-1/2 items-center gap-x-4">
            <div className={clsx("h-[2.69rem] w-1 rounded-[0.5rem]", color2Tailwind(budget.color))} />
            <div className="flex flex-col justify-between">
              <p className="text-preset-5 text-gray-500">Spent</p>
              <p className="text-preset-4-bold">{formatAmount(budget.spent, budget.currency)}</p>
            </div>
          </div>

          <div className="flex w-1/2 items-center justify-start gap-x-4">
            <div className="bg-beige-100 h-[2.69rem] w-1 rounded-[0.5rem]" />
            <div className="flex flex-col justify-between">
              <p className="text-preset-5 text-gray-500">Remaining</p>
              <p className="text-preset-4-bold">{formatAmount(budget.currentAmount, budget.currency)}</p>
            </div>
          </div>
        </div>
      </div>

      <BudgetTransactions />
    </div>
  )
}

function BudgetCardActions({ budget }: { budget: Budget }) {
  const styles = { item: "text-preset-4 text-left cursor-pointer" }

  const handleDelete = async () => {
    await budgetAPI.deleteBudget(budget.id)
    await refreshBudgets()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="btn btn-ghost btn-size-sm p-2">
        <OptionsIcon className="size-4 text-gray-300" />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="grid gap-3 p-4">
        <DropdownMenuItem asChild>
          <BudgetDialog mode="edit" budget={budget} styles={{ trigger: styles.item }} />
        </DropdownMenuItem>

        <Separator className="bg-gray-100" />

        <DropdownMenuItem asChild>
          <DeleteDialog
            name="Delete Budget"
            title={budget.category}
            description="Are you sure you want to delete this budget? This action cannot be reversed, and all the data inside it will be removed forever."
            styles={{ trigger: styles.item }}
            onDelete={handleDelete}
          />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default BudgetCard
