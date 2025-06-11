import type { Metadata } from "next"
import { Public_Sans } from "next/font/google"
import { ScrollArea } from "@/shared/components/ui/scroll-area"
import { SidebarProvider } from "@/shared/components/ui/sidebar"
import MobileNavigation from "@/widgets/mobile-navigation"
import AppSidebar from "@/widgets/sidebar"
import { cn } from "@/shared/lib/utils"
import { cookies } from "next/headers"
import "./globals.css"

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
    container: "flex max-md:flex-col",
    aside: "bg-sidebar",
    scrollArea: "flex flex-1 p-4",
    mobileNav: "md:hidden bg-sidebar flex-1 sticky bottom-0 z-50",
  }

  return (
    <html lang="en">
      <body className={cn(publicSans.variable, "bg-beige-100 antialiased")}>
        <SidebarProvider defaultOpen={defaultOpen} className={styles.container}>
          <AppSidebar className={styles.aside} />
          <ScrollArea className={styles.scrollArea}>
            <div className="flex min-h-[95vh] flex-col p-2">{children}</div>
          </ScrollArea>
          <MobileNavigation className={styles.mobileNav} />
        </SidebarProvider>
      </body>
    </html>
  )
}
