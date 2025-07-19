import Link from "next/link"
import React from "react"

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
    <div className="flex h-[400px] w-full max-w-[560px] flex-col justify-between rounded-xl bg-white p-6">
      <h1 className="text-preset-1">{title}</h1>

      {children}

      <div className="mx-auto text-center">
        <span className="text-preset-4 text-gray-500">{footer.text}</span>

        <Link href={footer.href} className="text-preset-4-bold inline text-gray-900">
          {" "}
          {footer.action}
        </Link>
      </div>
    </div>
  )
}
