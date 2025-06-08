export type NavigationItemProps = {
  title: string
  url?: string
  Icon: React.ComponentType<{ className?: string; "data-active"?: boolean }>
}
