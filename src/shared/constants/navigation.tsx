import { routes } from "./routes"
import { Logout } from "../components/logout"
import ReceiptIcon from "@/shared/icons/receipt"
import JarFillIcon from "@/shared/icons/jar-fill"
import HouseIcon from "@/shared/icons/house-icon"
import ChartDonutIcon from "@/shared/icons/chart-donut"
import { NavigationItemProps } from "../types/navigation"
import ArrowsDownUpIcon from "@/shared/icons/arrows-down-up"

export const navigationItems = [
  {
    title: "Overview" as const,
    url: routes.overview,
    Icon: HouseIcon,
  },
  {
    title: "Transactions" as const,
    url: routes.transactions,
    Icon: ArrowsDownUpIcon,
  },
  {
    title: "Budgets" as const,
    url: routes.budgets,
    Icon: ChartDonutIcon,
  },
  {
    title: "Pots" as const,
    url: routes.pots,
    Icon: JarFillIcon,
  },
  {
    title: "Recurring bills" as const,
    url: routes.recurringBills,
    Icon: ReceiptIcon,
  },
  {
    title: "Logout" as const,
    Element: Logout,
    Icon: ReceiptIcon,
    url: "nothing-to-see-here",
  },
] satisfies NavigationItemProps[]
