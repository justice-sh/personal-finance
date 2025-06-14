"use client"
import React from "react"
import { usePathname } from "next/navigation"
import AddBudgets from "./budgets/_components/add-edit-budget"
import AddPots from "./pots/_components/add-edit-pots"

type Props = { children: React.ReactNode }

const template = ({ children }: Props) => {
  const param = usePathname()
  const slicedPath = param.slice(1)
  const pathname = slicedPath.charAt(0).toUpperCase() + slicedPath.slice(1)

  return (
    <main className="grid h-full w-full min-w-max grid-cols-2 grid-rows-[3.5rem_1fr] gap-y-8">
      <section className="col-span-2 row-span-1 flex h-14 w-full items-center justify-between py-1">
        <h1 className="text-preset-1 capitalize">{pathname}</h1>

        {pathname === "Budgets" ? (
          <AddBudgets
            title={`Add New ${pathname}`}
            description="Choose a category to set a spending budget. These categories can help you monitor spending."
            state={`Add ${pathname}`}
          />
        ) : (
          <AddPots
            title={`Add New ${pathname}`}
            description="If your saving targets change, feel free to update your pots."
            state={`Add ${pathname}`}
          />
        )}
      </section>
      <section className="col-span-2 row-span-1 h-full w-full">{children}</section>
    </main>
  )
}

export default template
