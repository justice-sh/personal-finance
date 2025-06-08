import { cn } from "@/shared/lib/utils"
import type { Metadata } from "next"
import { Public_Sans } from "next/font/google"
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={cn(publicSans.variable, "bg-beige-100 antialiased")}>{children}</body>
    </html>
  )
}
