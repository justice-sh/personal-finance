import Image from "next/image"
import { LayoutProps } from "./types"
import Logo from "@/shared/components/logo"
import { routes } from "@/shared/constants/routes"

export default function AuthLayout({ children }: LayoutProps) {
  return (
    <main className="lg-3:grid-cols-[560px_1fr] md-3:grid-cols-[1fr_520px] grid max-h-screen gap-6 p-4">
      <section className="max-md-3:hidden relative z-10 flex h-[calc(100vh-32px)] flex-col overflow-hidden rounded-lg bg-gray-900 text-white">
        <Logo href={routes.login} className="p-5" />
        <Illustration />
        <Content />
      </section>

      <section className="flex items-center justify-center">{children}</section>
    </main>
  )
}

const Content = () => {
  return (
    <div className="@container mt-auto w-full bg-gray-900 p-5">
      <h1 className="text-preset-2 @sm-5:text-preset-1 mb-5">
        Keep track of your money <br className="@max-xs-3:hidden" /> and save for your future
      </h1>

      <p className="text-preset-4">
        Personal finance app puts you in control of your spending. <br className="@max-sm-5:hidden" /> Track transactions, set budgets, and
        add to savings pots easily.
      </p>
    </div>
  )
}

const Illustration = () => {
  return (
    <div className="absolute inset-0 -z-10">
      <Image
        src="/asset/illustration-authentication.svg"
        alt="Authentication Illustration"
        width={560}
        height={500}
        priority
        className="absolute -z-10 h-auto w-full object-cover select-none"
      />
    </div>
  )
}
