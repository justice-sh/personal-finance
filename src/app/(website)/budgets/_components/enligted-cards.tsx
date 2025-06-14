import React from "react"
import LatestEnligted from "./latest-enligted"
import Image from "next/image"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/shared/components/ui/dropdown-menu"
import AddBudgets from "./add-edit-budget"
import DeleteDialog from "@/shared/components/global/delete-dialog"
import { Separator } from "@/shared/components/ui/separator"
import clsx from "clsx"
import Slider from "@/shared/components/global/slider"

type Props = {
  color: string
  name: string
  range: number
  priceOf: string
  priceOut: string
  next: {
    name: string
    value: string
    date: string
  }[]
}

const EnligtedCards = ({ color, name, priceOf, priceOut, next, range }: Props) => {
  return (
    <div className="flex flex-col gap-y-5 rounded-[0.75rem] bg-white px-5 py-6 sm:p-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-4">
          <div className={clsx("size-4 rounded-full bg-red-600", color)} />
          <p className="text-preset-2">{name}</p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Image
              src={require("../../../../../public/asset/Icons Collection (Phosphor Icons).svg")}
              alt="Menu"
              height={16}
              width={16}
              className="size-4"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="flex h-[5.69rem] w-[8.38rem] flex-col items-start gap-y-3 px-5 py-3">
            <DropdownMenuItem asChild>
              <AddBudgets
                mode="edit"
                title={`Edit ${"Budget"}`}
                description="As your budgets change, feel free to update your spending limits."
                state="Save Changes"
              />
            </DropdownMenuItem>

            <Separator className="bg-gray-100" />
            <DropdownMenuItem asChild>
              <DeleteDialog
                name="Delete Budgets"
                title={"Entertainment"}
                description="Are you sure you want to delete this budget? This action cannot be reversed, and all the data inside it will be removed forever."
              />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex flex-col gap-y-4">
        <p className="text-preset-4 text-gray-500">Maximum of ${priceOut}</p>
        <Slider sliderBorderClass="p-1" sliderPipeClass={`${color} h-6 `} value={range} />

        <div className="flex items-center justify-between gap-x-4">
          <div className="flex w-1/2 items-center gap-x-4">
            <div className={clsx("h-[2.69rem] w-1 rounded-[0.5rem] bg-green-800", color)} />
            <div className="flex flex-col justify-between">
              <p className="text-preset-5 text-gray-500">Spend</p>
              <p className="text-preset-4-bold">${priceOf}</p>
            </div>
          </div>
          <div className="flex w-1/2 items-center justify-start gap-x-4">
            <div className="h-[2.69rem] w-1 rounded-[0.5rem] bg-gray-200" />
            <div className="flex flex-col justify-between">
              <p className="text-preset-5 text-gray-500">Remaining</p>
              <p className="text-preset-4-bold">${priceOut}</p>
            </div>
          </div>
        </div>
      </div>
      <LatestEnligted next={next} />
    </div>
  )
}

export default EnligtedCards
