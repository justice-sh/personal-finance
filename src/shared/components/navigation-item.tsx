import Link from "next/link"
import { cn } from "../lib/utils"
import { NavigationItemProps } from "../types/navigation"

export default function NavigationItem({
  item,
  pathname,
  className,
  ...props
}: {
  pathname: string
  item: NavigationItemProps
  className?: string
}) {
  const isActive = item.url === pathname

  const Tag = item.url ? Link : "div"

  return (
    <Tag
      {...props}
      data-active={isActive}
      href={item.url || (null as any)}
      className={cn(className, "text-preset-3! group/menu-item flex h-auto gap-3 rounded-ss-none rounded-es-none p-3")}
    >
      <item.Icon data-active={isActive} className="group-hover/menu-item:fill-secondary-green data-[active=true]:fill-secondary-green" />
      <span>{item.title}</span>
    </Tag>
  )
}
