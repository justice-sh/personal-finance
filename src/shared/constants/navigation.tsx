import { NavigationItemProps } from "../types/navigation"
import ArrowsDownUpIcon from "@/shared/icons/arrows-down-up"
import JarFillIcon from "@/shared/icons/jar-fill"
import HouseIcon from "@/shared/icons/house-icon"
import ReceiptIcon from "@/shared/icons/receipt"
import ChartDonutIcon from "@/shared/icons/chart-donut"
import { routes } from "./routes"

export const navigationItems: NavigationItemProps[] = [
  {
    title: "Overview",
    url: routes.overview,
    Icon: HouseIcon,
  },
  {
    title: "Transactions",
    url: routes.transactions,
    Icon: ArrowsDownUpIcon,
  },
  {
    title: "Budgets",
    url: routes.budgets,
    Icon: ChartDonutIcon,
  },
  {
    title: "Pots",
    url: routes.pots,
    Icon: JarFillIcon,
  },
  {
    title: "Recurring bills",
    url: routes.recurringBills,
    Icon: ReceiptIcon,
  },
]
