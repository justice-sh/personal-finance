import { LayoutProps } from "./types"
import AppSidebar from "@/widgets/sidebar"
import MobileNavigation from "@/widgets/mobile-navigation"
import { ScrollArea } from "@/shared/components/ui/scroll-area"
import { SidebarProvider } from "@/shared/components/ui/sidebar"

export default function AppLayout({ children, defaultOpen }: LayoutProps) {
  const styles = {
    container: "flex max-md:flex-col",
    aside: "bg-sidebar",
    scrollArea: "flex flex-1 p-4",
    mobileNav: "md:hidden bg-sidebar flex-1 sticky bottom-0 z-50",
  }

  return (
    <SidebarProvider defaultOpen={defaultOpen} className={styles.container}>
      <AppSidebar className={styles.aside} />
      <ScrollArea className={styles.scrollArea}>
        <div className="flex min-h-[95vh] flex-col p-2">{children}</div>
      </ScrollArea>
      <MobileNavigation className={styles.mobileNav} />
    </SidebarProvider>
  )
}
