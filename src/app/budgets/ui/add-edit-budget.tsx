"use client"

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
import { X } from "lucide-react"
import React from "react"
import { cn } from "@/shared/lib/utils"
import { ComboboxDrawer } from "@/shared/components/combo-drawer"

type AddBudgetsProps = { title: string; description: string; state: string; mode?: "add" | "edit" }
const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
    used: "Already used",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
    used: "Already used",
  },
  {
    value: "Already used",
    label: "Nuxt.js",
    used: "",
  },
  {
    value: "remix",
    label: "Remix",
    used: "",
  },
  {
    value: "astro",
    label: "Astro",
    used: "",
  },
]

const AddBudgets = ({ title, description, state, mode = "add" }: AddBudgetsProps) => {
  const [value, setValue] = React.useState("")
  return (
    <AlertDialog>
      <AlertDialogTrigger
        className={cn("text-preset-4-bold flex h-[53px] items-center justify-center rounded-md bg-black p-4 text-white", {
          "text-preset-4 h-5 bg-white p-0 font-normal text-black": mode === "edit",
        })}
      >
        {title}
      </AlertDialogTrigger>
      <AlertDialogContent className="mx-auto flex h-auto max-h-[35rem] w-[calc(100vw-2rem)] flex-col justify-between gap-y-5 p-8 sm:w-full sm:max-w-[35rem]">
        <AlertDialogHeader className="h-min w-full gap-y-5">
          <AlertDialogTitle className="sm:text-preset-1 flex items-center justify-between">
            <p>{title.replace("+", "")}</p>
            <AlertDialogCancel className="h-8 w-8 rounded-full border-black/50">
              <X className="size-[1.57rem]" />
            </AlertDialogCancel>
          </AlertDialogTitle>
          <div className="flex h-min flex-col justify-between gap-y-5">
            <AlertDialogDescription className="sm:text-preset-4 h-min text-start text-sm">{description}</AlertDialogDescription>
            <div className="flex h-[14.565rem] flex-col gap-y-4">
              <div className="flex h-[4.19rem] flex-col justify-between">
                <p className="text-preset-5-bold text-start">Budget Category</p>
                <ComboboxDrawer options={frameworks} setValue={setValue} value={value} />
              </div>

              <div className="flex h-[4.19rem] flex-col justify-between">
                <p className="text-preset-5-bold text-start">Maximum speed</p>
                <Input className="h-[2.815rem]" placeholder="E.g 2000" />
              </div>
              <div className="flex h-[4.19rem] flex-col justify-between">
                <p className="text-preset-5-bold text-start">Theme</p>
                <ComboboxDrawer options={frameworks} setValue={setValue} value={value} />
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

export default AddBudgets
