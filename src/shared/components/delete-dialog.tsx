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
import { X } from "lucide-react"
import React from "react"
import { cn } from "../lib/utils"

type DeleteDialogProps = {
  name: string
  title: string
  description: string
  styles?: {
    trigger?: string
  }
}

const DeleteDialog = ({ description, title, name, styles }: DeleteDialogProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger
        className={cn(
          "text-preset-4 flex h-5 items-center justify-center rounded-md bg-white p-0 font-normal text-nowrap text-black",
          styles?.trigger,
        )}
      >
        {name}
      </AlertDialogTrigger>
      <AlertDialogContent className="mx-auto flex h-auto max-h-[32rem] w-[calc(100vw-2rem)] flex-col justify-between gap-y-5 px-5 py-6 sm:w-full sm:max-w-[35rem] sm:p-8">
        <AlertDialogHeader className="h-min w-full gap-y-5">
          <AlertDialogTitle className="flex items-center justify-between">
            <p className="text-preset-2 sm:text-preset-1">{`Delete "${title}"?`}</p>
            <AlertDialogCancel className="h-8 w-8 rounded-full border-black/50">
              <X className="size-[1.57rem]" />
            </AlertDialogCancel>
          </AlertDialogTitle>
          <div className="text-preset-4 flex h-min flex-col justify-between gap-y-5">
            <AlertDialogDescription className="text-preset-4 h-min text-start text-gray-500">
              {description}
            </AlertDialogDescription>
          </div>
        </AlertDialogHeader>

        <AlertDialogFooter className="">
          <div className="flex h-min w-full flex-col gap-y-5">
            <AlertDialogAction className="text-preset-4-bold h-[3.32rem] w-full text-white">
              Yes, Confirm Delete
            </AlertDialogAction>
            <AlertDialogCancel className="text-preset-4 h-[1.32rem] w-full border-none shadow-none">
              No, Go Back
            </AlertDialogCancel>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteDialog
