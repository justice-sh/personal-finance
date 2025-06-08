import { Metadata } from "next"
import { RegisterForm } from "./_components/RegisterForm"

export const metadata: Metadata = {
  title: "Create Your Account",
  description:
    "Start your financial journey today. Create a free account to manage your personal finances, track expenses, and achieve your financial goals.",
  keywords: ["register", "sign up", "create account", "personal finance", "financial management", "free account"],
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: "Create Your Account | Personal Finance",
    description: "Start your financial journey today. Create a free account to manage your personal finances and track expenses.",
    type: "website",
  },
}

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen w-full items-center justify-center p-4">
      <RegisterForm />
    </main>
  )
}
