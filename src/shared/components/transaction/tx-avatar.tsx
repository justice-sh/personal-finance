import React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { cn } from "../../lib/utils"

type TransactionAvatarProps = {
  avatar?: string
  icon?: React.ReactNode
  className?: string
  fallback?: string
}

export function TransactionAvatar({ avatar, icon, className, fallback }: TransactionAvatarProps) {
  const fallbackInitials = fallback || "TA"
  const alt = "Transaction Avatar"

  return (
    <Avatar className={cn("bg-other-orange relative z-10 size-10 text-white", className)}>
      {avatar && <AvatarImage src={avatar} alt={alt} loading="lazy" />}

      {!avatar && icon && <div className="absolute inset-0 z-10">{icon}</div>}

      <AvatarFallback className={cn("text-preset-5 bg-inherit")}>{fallbackInitials}</AvatarFallback>
    </Avatar>
  )
}
