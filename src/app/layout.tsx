import { cn } from "@/shared/lib/utils"
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
  title: {
    default: "Personal Finance | Manage Your Money with Ease",
    template: "%s | Personal Finance",
  },
  description:
    "Take control of your financial future with our comprehensive personal finance management solution. Track expenses, set budgets, and achieve your financial goals.",
  keywords: ["personal finance", "money management", "budgeting", "expense tracking", "financial goals", "savings", "investment"],
  authors: [{ name: "Personal Finance Team" }],
  creator: "Personal Finance",
  publisher: "Personal Finance",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://personal-finance.app"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://personal-finance.app",
    title: "Personal Finance | Manage Your Money with Ease",
    description: "Take control of your financial future with our comprehensive personal finance management solution.",
    siteName: "Personal Finance",
  },
  twitter: {
    card: "summary_large_image",
    title: "Personal Finance | Manage Your Money with Ease",
    description: "Take control of your financial future with our comprehensive personal finance management solution.",
    creator: "@personalfinance",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "google-site-verification-code",
  },
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
