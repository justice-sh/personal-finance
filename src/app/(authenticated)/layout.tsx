import { ScrollArea } from "@/shared/components/ui/scroll-area"
import { SidebarProvider } from "@/shared/components/ui/sidebar"
import { AppSidebar } from "@/widgets/app-sidebar"

export default function AuthenticatedLayout({ children }: { children: React.ReactNode }) {
  const styles = {
    root: "h-[100vh] w-full overflow-hidden",
    container: "md-7:grid-cols-[300px_1fr] grid h-full",
    aside: "max-md-7:hidden row-span-2 h-full  border-r bg-gray-900 max-h-[100vh]",
    scrollArea: "h-full",
    content: "p-4",
  }

  return (
    <div className={styles.root}>
      <SidebarProvider className={styles.container}>
        <AppSidebar className={styles.aside} />
        <ScrollArea className={styles.scrollArea}>
          <div className={styles.content}>{children}</div>
        </ScrollArea>
      </SidebarProvider>
    </div>
  )
}
