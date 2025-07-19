import React from "react"
import Link from "next/link"

type Props = {
  title: string
  children: React.ReactNode
  footer: {
    text: string
    action: string
    href: string
  }
}

export const AuthLayer = ({ children, title, footer }: Props) => {
  return (
    <section className="flex w-full max-w-[560px] flex-col justify-between gap-10 rounded-xl bg-white p-6">
      <h1 className="text-preset-1">{title}</h1>

      {children}

      <footer className="mx-auto text-center">
        <span className="text-preset-4 text-gray-500">{footer.text}</span>{" "}
        <Link href={footer.href} className="text-preset-4-bold inline text-gray-900">
          {footer.action}
        </Link>
      </footer>
    </section>
  )
}
