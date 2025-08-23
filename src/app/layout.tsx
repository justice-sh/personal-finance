import "./globals.css"
import type { Metadata } from "next"
import LayoutManager from "./layouts"
import { cookies } from "next/headers"
import { cn } from "@/shared/lib/utils"
import localFont from "next/font/local"
import { configUtil } from "@/shared/utils/config"
import { Analytics } from "@vercel/analytics/next"
import { Toaster } from "@/shared/components/ui/sonner"

configUtil.validate()

const publicSans = localFont({
  src: [
    { path: "./fonts/public_sans/PublicSans-Italic-VariableFont_wght.ttf", style: "italics" },
    { path: "./fonts/public_sans/PublicSans-VariableFont_wght.ttf", style: "normal" },
  ],
  display: "swap",
  variable: "--font-public-sans",
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
    { name: "Najmudeen A.", url: "https://github.com/jumi525" },
  ],
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
      <body className={cn(publicSans.variable, "bg-beige-100 antialiased")}>
        <LayoutManager defaultOpen={defaultOpen}>{children}</LayoutManager>
        <Toaster richColors />
        <Analytics />
      </body>
    </html>
  )
}
