import { FC } from "react"

export type NavigationItemProps = {
  title: string
  url?: string
  action?: () => void
  Element?: FC<any>
  Icon: React.ComponentType<{ className?: string; "data-active"?: boolean; id?: string }>
}
