import { NavigationItemProps } from "../types/navigation"
import ArrowsDownUpIcon from "@/shared/icons/arrows-down-up"
import JarFillIcon from "@/shared/icons/jar-fill"
import HouseIcon from "@/shared/icons/house-icon"
import ReceiptIcon from "@/shared/icons/receipt"
import ChartDonutIcon from "@/shared/icons/chart-donut"

export const navigationItems: NavigationItemProps[] = [
  {
    title: "Overview",
    url: "/",
    Icon: HouseIcon,
  },
  {
    title: "Transactions",
    url: "/transactions",
    Icon: ArrowsDownUpIcon,
  },
  {
    title: "Budgets",
    url: "/budgets",
    Icon: ChartDonutIcon,
  },
  {
    title: "Pots",
    url: "/pots",
    Icon: JarFillIcon,
  },
  {
    title: "Recurring bills",
    url: "/bills",
    Icon: ReceiptIcon,
  },
]
