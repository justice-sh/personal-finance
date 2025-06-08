import type { Metadata } from "next"
import { Public_Sans } from "next/font/google"
import { ScrollArea } from "@/shared/components/ui/scroll-area"
import { SidebarProvider } from "@/shared/components/ui/sidebar"
import { AppSidebar } from "@/widgets/app-sidebar"
import { cn } from "@/shared/lib/utils"
import "./globals.css"
import { cookies } from "next/headers"

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
  weight: ["500", "700"],
})

export const metadata: Metadata = {
  title: "Personal Finance App: Take Control of Your Money Today!",
  description:
    "Manage your money effortlessly with our intuitive personal finance app. Track expenses, create budgets, set financial goals, and invest smarter. Gain real-time insights into your spending habits and watch your savings grow. Secure, user-friendly, and packed with powerful tools to help you achieve financial freedom. Sign-up now and start building a brighter financial future!",
  keywords: [
    "money management",
    "budget tracker",
    "expense tracker",
    "financial planning",
    "savings app",
    "investment tracker",
    "financial goals",
    "money organizer",
    "financial freedom",
    "budgeting app",
    "wealth management",
    "financial insights",
    "finance",
    "personal finance",
    "budgeting",
    "expenses",
    "income",
  ],
  authors: [
    { name: "Justice N.", url: "https://portfolio.jutech.dev/" },
    { name: "Frontend Mentors", url: "https://www.frontendmentor.io/" },
  ],
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true"

  const styles = {
    container: "flex min-h-screen",
    aside: "max-md-7:hidden row-span-2 h-screen border-r bg-gray-900",
    scrollArea: "flex page-height *:*:*:min-page-height flex-1",
  }

  return (
    <html lang="en">
      <body className={cn(publicSans.variable, "bg-beige-100 antialiased")}>
        <SidebarProvider
          defaultOpen={defaultOpen}
          className={styles.container}
          style={
            {
              "--sidebar-width": "18.75rem",
              "--sidebar-width-mobile": "5.5rem",
            } as any
          }
        >
          <AppSidebar className={styles.aside} />
          <ScrollArea className={styles.scrollArea}>{children}</ScrollArea>
        </SidebarProvider>
      </body>
    </html>
  )
}
