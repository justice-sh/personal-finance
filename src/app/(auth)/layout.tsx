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
    <div className="bg-background relative grid min-h-screen max-w-none grid-cols-1 lg:grid-cols-2 lg:px-0">
      <div className="bg-muted relative hidden max-h-[100vh] flex-col p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-zinc-900" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-6 w-6"
          >
            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
          </svg>
          Personal Finance
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">"Take control of your financial future with our comprehensive personal finance management solution."</p>
          </blockquote>
        </div>
      </div>
      <div className="flex max-h-[100vh] items-center justify-center p-4 lg:p-8">
        <div className="mx-auto w-full max-w-[350px] space-y-6">{children}</div>
      </div>
    </div>
  )
}
