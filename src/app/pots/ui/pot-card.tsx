import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/shared/components/ui/dropdown-menu"
import clsx from "clsx"
import React from "react"
import { Separator } from "@/shared/components/ui/separator"
import DeleteDialog from "@/shared/components/delete-dialog"
import AddPots from "@/app/pots/ui/add-edit-pots"
import Dialog from "@/app/pots/ui/withdraw-add-dialog"
import Slider from "@/shared/components/slider"
import OptionsIcon from "@/shared/icons/options-icon"

type Props = { classname?: string; title: string; price: number; sliderValue: number; target: number; color: string }

const PotCard = ({ classname, price, sliderValue, target, title, color }: Props) => {
  return (
    <div
      className={clsx(
        "mx-w-[32.4rem] flex h-[19.9rem] w-full flex-col justify-between gap-y-8 rounded-[0.75rem] bg-white p-6 lg:h-[19rem]",
        classname,
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-4">
          <div className={clsx("size-4 rounded-full bg-amber-400", color)}></div>
          <p className="text-preset-2">{title}</p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <OptionsIcon height={16} width={16} className="size-4 text-gray-300" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="flex h-[5.69rem] w-[8.38rem] flex-col items-start gap-y-3 px-5 py-3">
            <DropdownMenuItem asChild>
              <AddPots
                mode="edit"
                title={`Edit ${"Pots"}`}
                description="As your budgets change, feel free to update your spending limits."
                state="Save Changes"
              />
            </DropdownMenuItem>

            <Separator className="bg-gray-100" />
            <DropdownMenuItem asChild>
              <DeleteDialog
                name="Delete Pots"
                title={"Savings"}
                description="Are you sure you want to delete this budget? This action cannot be reversed, and all the data inside it will be removed forever."
              />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex h-full flex-col items-center justify-center">
        <div className="mb-4 flex w-full items-center justify-between">
          <p className="text-preset-4 text-gray-500">Total Saved</p>
          <h2 className="text-preset-1 font-bold">${price}.00</h2>
        </div>
        <Slider sliderPipeClass={color} value={sliderValue} />
        <div className="mt-3 flex w-full items-center justify-between">
          <p className="text-preset-5-bold text-gray-500">{sliderValue}%</p>
          <p className="text-preset-5 text-gray-500">target of ${target}</p>
        </div>
      </div>
      <div className="flex h-[3.33rem] items-center justify-center gap-x-4">
        <Dialog purpose="Add to" state="Confirm Addition" />
        <Dialog purpose="Withdraw from" state="Confirm Withdraw" />
      </div>
    </div>
  )
}

export default PotCard
