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

  const styles = {
    mobile: "max-md:flex-col max-md:items-center  max-md:justify-center max-md:text-preset-5-bold! max-md:gap-1",
    radius: "rounded-lg rounded-es-none md:rounded-ss-none max-md:rounded-ee-none",
  }

  return (
    <Tag
      {...props}
      data-active={isActive}
      href={item.url || (null as any)}
      className={cn(
        className,
        "text-preset-3! data-[active=true]:bg-sidebar-accent data-[active=true]:text-sidebar-accent-foreground text-sidebar-foreground group/menu-item relative flex h-auto gap-3 p-3",
        styles.mobile,
        styles.radius,
      )}
    >
      <item.Icon data-active={isActive} className="group-hover/menu-item:fill-secondary-green data-[active=true]:fill-secondary-green" />
      <span className="max-sm:hidden">{item.title}</span>

      <Line isActive={isActive} />
    </Tag>
  )
}

const Line = ({ isActive }: { isActive: boolean }) => {
  return (
    <div
      data-active={isActive}
      className="data-[active=true]:bg-secondary-green absolute h-[4px] w-full bg-transparent max-md:bottom-0 md:left-0 md:h-full md:w-[4px]"
    ></div>
  )
}
