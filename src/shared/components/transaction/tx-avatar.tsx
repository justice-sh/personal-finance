import React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { cn } from "../../lib/utils"

type TransactionAvatarProps = {
  label?: string
  avatar?: string
  icon?: React.ReactNode
  styles?: {
    avatar?: string
    label?: string
  }
}

export function TransactionAvatar({ label = "", avatar, icon, styles }: TransactionAvatarProps) {
  const fallbackInitials = label.substring(0, 2).toUpperCase()
  const alt = label || "TA"

  return (
    <div className="flex items-center gap-4">
      <Avatar className={cn("bg-other-orange sm-8:size-10 relative z-10 size-8 text-white", styles?.avatar)}>
        {avatar && <AvatarImage src={avatar} alt={alt} loading="lazy" />}

        {!avatar && icon && <div className="absolute inset-0 z-10">{icon}</div>}

        <AvatarFallback className={cn("text-preset-5 bg-inherit")}>{fallbackInitials}</AvatarFallback>
      </Avatar>

      <p className={cn("text-preset-4-bold", styles?.label)}>{label}</p>
    </div>
  )
}
