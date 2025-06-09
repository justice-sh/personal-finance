import { TextLogo } from "@/assets/components/text_logo"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Authentication | Personal Finance",
  description:
    "Secure authentication for your personal finance management. Login or register to access your financial dashboard and take control of your money.",
  keywords: ["authentication", "login", "register", "sign in", "sign up", "personal finance", "secure access"],
  robots: {
    index: false,
    follow: true,
  },
  openGraph: {
    title: "Authentication | Personal Finance",
    description: "Secure authentication for your personal finance management. Login or register to access your financial dashboard.",
    type: "website",
  },
}

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-color-beige-100 relative grid min-h-screen max-w-none grid-cols-1 lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full max-w-[670px] flex-col bg-black bg-[url('/login_signup_side_image.png')] bg-cover bg-center bg-no-repeat p-10 text-white lg:flex dark:border-r">
        <div className="relative z-20 flex items-center">
          <TextLogo className="h-10 w-[120px] object-contain" />
        </div>

        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg font-bold">Keep track of your money and save for your future</p>
            <p className="text-sm text-gray-400">
              Personal finance app puts you in control of your spending. Track transactions, set budgets, and add to savings pots easily.
            </p>
          </blockquote>
        </div>
      </div>
      <div className="flex max-h-[100vh] items-center justify-center p-4 lg:p-8">
        <div className="mx-auto w-full max-w-[350px] space-y-6">{children}</div>
      </div>
    </div>
  )
}
