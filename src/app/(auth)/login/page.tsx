import { Metadata } from "next"
import { LoginForm } from "./_components/LoginForm"

export const metadata: Metadata = {
  title: "Login to Your Account",
  description:
    "Securely access your personal finance dashboard. Login to manage your finances, track expenses, and achieve your financial goals.",
  keywords: ["login", "sign in", "personal finance", "financial dashboard", "secure access", "account login"],
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: "Login to Your Account | Personal Finance",
    description: "Securely access your personal finance dashboard. Login to manage your finances and track expenses.",
    type: "website",
  },
}

export default function LoginPage() {
  return (
    <main className="flex min-h-screen w-full items-center justify-center p-4">
      <LoginForm />
    </main>
  )
}
