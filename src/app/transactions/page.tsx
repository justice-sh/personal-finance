"use client"

import { useQueryParams } from "@/shared/hooks/use-query-params"
import { IconButton } from "@/shared/components/icon-button"
import { PageLayer } from "@/shared/components/page-layer"
import { IconInput } from "@/shared/components/icon-input"
import SearchIcon from "@/shared/icons/search-icon"
import React from "react"

type TransactionsQueryParams = {
  query: string
  page: number
}

export default function TransactionsPage() {
  const [queryParams, setQueryParams] = useQueryParams<TransactionsQueryParams>({ query: "", page: 1 })

  const isInvalid = queryParams.query.length > 10

  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setQueryParams({ query })
  }

  return (
    <PageLayer title="Transactions" className="@container flex flex-col gap-6 rounded-xl bg-white p-4">
      <section className="flex items-center gap-5"></section>

      <IconInput
        isInvalid={isInvalid}
        value={queryParams.query}
        onChange={handleQueryChange}
        type="text"
        icon={<IconButton icon={SearchIcon} />}
        placeholder="Search transactions..."
      />
    </PageLayer>
  )
}
