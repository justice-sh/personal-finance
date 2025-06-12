import type { Metadata } from "next"
import { Geist, Geist_Mono, Public_Sans } from "next/font/google"
import "./globals.css"
import { ScrollArea } from "@/shared/components/ui/scroll-area"
import { SidebarProvider } from "@/shared/components/ui/sidebar"
import MobileNavigation from "@/shared/components/global/mobile-navigation"
import AppSidebar from "@/shared/components/sidebar"
import { cookies } from "next/headers"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
  weight: ["500", "700"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
    { name: "Najmudeen A.", url: "https://github.com/Jumi525" },
    { name: "Frontend Mentors", url: "https://www.frontendmentor.io/" },
  ],
}

const styles = {
  container: "flex max-md:flex-col",
  aside: "bg-sidebar bg-blue-300",
  scrollArea: "flex flex-1 p-4",
  mobileNav: "md:hidden bg-sidebar flex-1 sticky bottom-0 z-50",
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookieStore = await cookies()
  const defaultOpen = cookieStore.get("sidebar_state")?.value === "true"
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} bg-beige-100 antialiased`}>
        <SidebarProvider defaultOpen={true} className={styles.container}>
          <AppSidebar className={styles.aside} />
          <ScrollArea className={styles.scrollArea}>
            <section className="col-span-2 row-span-1 h-full w-full">{children}</section>
          </ScrollArea>
          <MobileNavigation className={styles.mobileNav} />
        </SidebarProvider>
      </body>
    </html>
  )
}

// className={cn(publicSans.variable, "bg-beige-100 antialiased")}
