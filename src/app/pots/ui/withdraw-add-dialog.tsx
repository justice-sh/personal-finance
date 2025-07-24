import Slider from "@/shared/components/slider"
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/shared/components/ui/alert-dialog"
import { Input } from "@/shared/components/ui/input"
import { PlusIcon, X } from "lucide-react"
import React from "react"

type DialogProps = {
  purpose: string
  state: string
}

const Dialog = ({ state, purpose }: DialogProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger className="btn btn-secondary flex h-full flex-1 items-center justify-center rounded-md p-4 text-black">
        {purpose.split(" ")[0] === "Add" ? (
          <div className="flex items-center gap-x-1">
            <PlusIcon className="size-3" />
            <p className="text-preset-4-bold">{purpose.split(" ")[0]}</p>
          </div>
        ) : (
          <p className="text-preset-4-bold">{purpose.split(" ")[0]}</p>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent className="mx-auto flex h-auto max-h-[32rem] w-[calc(100vw-2rem)] flex-col justify-between gap-y-5 px-5 py-6 sm:w-full sm:max-w-[35rem] sm:p-8">
        <AlertDialogHeader className="h-min w-full gap-y-5">
          <AlertDialogTitle className="flex items-center justify-between">
            <p className="text-preset-2 sm:text-preset-1 text-start text-nowrap sm:text-center sm:text-wrap">
              {purpose} {"Savings"}?
            </p>
            <AlertDialogCancel className="h-8 w-8 rounded-full border-black/50">
              <X className="size-[1.57rem]" />
            </AlertDialogCancel>
          </AlertDialogTitle>
          <div className="flex h-min flex-col justify-between gap-y-5">
            <AlertDialogDescription className="text-preset-4 h-min text-start text-gray-500">
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Phasellus hendrerit. Pellentesque aliquet nibh nec urna. In nisi
              neque, aliquet.
            </AlertDialogDescription>
            <div className="flex h-min flex-col gap-y-4">
              <div className="flex h-[7.13rem] flex-col justify-between">
                <div className="mb-4 flex w-full items-center justify-between">
                  <p className="text-preset-4 text-gray-500">New amount</p>
                  <h2 className="text-preset-1 font-bold">${100}.00</h2>
                </div>
                <Slider sliderPipeClass="bg-green-200" />
                <div className="mt-3 flex w-full items-center justify-between">
                  <p className="text-preset-5-bold text-green-400">{20}%</p>
                  <p className="text-preset-5 text-gray-500">target of ${2000}</p>
                </div>
              </div>
              <div className="flex h-full flex-col items-center justify-center"></div>
              <div className="flex h-[4.2rem] flex-col justify-between">
                <p className="text-preset-5-bold text-start text-gray-500">Amount to Withdraw</p>
                <Input className="text-preset-4 h-[2.815rem]" placeholder="E.g $400" />
              </div>
            </div>
          </div>
        </AlertDialogHeader>

        <AlertDialogFooter className="h-[3.32rem]">
          <AlertDialogAction className="text-preset-4-bold h-[3.32rem] w-full text-white">{state}</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default Dialog
