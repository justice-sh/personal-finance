"use client"

import { PageLayer } from "@/shared/components/page-layer"
import SearchIcon from "@/shared/icons/search-icon"
import { IconInput } from "@/shared/components/icon-input"
import { IconButton } from "@/shared/components/icon-button"
import React from "react"

export default function TransactionsPage() {
  const [state, setState] = React.useState("")

  const isInvalid = state.length > 10

  return (
    <PageLayer title="Transactions" className="@container flex flex-col gap-6 rounded-xl bg-white p-4">
      <section className="flex items-center gap-5"></section>

      <IconInput
        isInvalid={isInvalid}
        value={state}
        onChange={(e) => setState(e.target.value)}
        type="text"
        icon={<IconButton icon={SearchIcon} />}
        placeholder="Search transactions..."
      />
    </PageLayer>
  )
}
