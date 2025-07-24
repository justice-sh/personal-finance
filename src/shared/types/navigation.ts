import { FC } from "react"
import NavigationItem from "../components/navigation-item"

export type NavigationItemProps = {
  url?: string
  title: string
  action?: () => void
  Element?: FC<React.ComponentProps<typeof NavigationItem>>
  Icon: React.ComponentType<{ className?: string; "data-active"?: boolean; id?: string }>
}
