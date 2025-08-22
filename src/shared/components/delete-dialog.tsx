import { toast } from "sonner"
import { X } from "lucide-react"
import { cn } from "../lib/utils"
import { Button } from "./ui/button"
import React, { useState } from "react"
import {
  AlertDialog,
  AlertDialogTitle,
  AlertDialogCancel,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogTrigger,
  AlertDialogDescription,
} from "@/shared/components/ui/alert-dialog"
import { capitalize } from "../utils/string"
import { getErrorMessage } from "../utils/error-util"

type DeleteDialogProps = {
  name: string
  title: string
  description: string
  styles?: {
    trigger?: string
  }
  onDelete: () => Promise<unknown>
}

const DeleteDialog = ({ description, title, name, styles, onDelete }: DeleteDialogProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const raiseDelete = async () => {
    try {
      setIsDeleting(true)

      await onDelete()

      setIsOpen(false)
      toast.success("Success", { description: `"${capitalize(title)}" successfully deleted.` })
    } catch (error) {
      toast.error("Error", { description: getErrorMessage(error) })
    } finally {
      setIsDeleting(false)
    }
  }

  const toggleOpen = () => setIsOpen((prev) => !prev)

  return (
    <AlertDialog open={isOpen}>
      <AlertDialogTrigger className={cn("text-destructive", styles?.trigger)} onClick={toggleOpen}>
        {name}
      </AlertDialogTrigger>

      <AlertDialogContent className="space-y-3">
        <AlertDialogHeader className="flex flex-row items-center justify-between">
          <AlertDialogTitle className="text-preset-2 sm:text-preset-1 capitalize">{`Delete "${title}"?`}</AlertDialogTitle>

          <AlertDialogCancel onClick={toggleOpen} className="h-8 w-8 rounded-full border-black/50">
            <X className="size-[1.57rem]" />
          </AlertDialogCancel>
        </AlertDialogHeader>

        <AlertDialogDescription className="text-preset-4 text-gray-500">{description}</AlertDialogDescription>

        <AlertDialogFooter className="flex w-full flex-col [&>*]:w-full">
          <Button onClick={raiseDelete} isLoading={isDeleting} variant="destructive">
            Yes, Confirm Deletion
          </Button>

          <Button onClick={toggleOpen} disabled={isDeleting} variant="ghost">
            No, Go Back
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteDialog
