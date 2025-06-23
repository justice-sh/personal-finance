"use client"

import { useQueryParams } from "@/shared/hooks/use-query-params"
import { IconButton } from "@/shared/components/icon-button"
import { PageLayer } from "@/shared/components/page-layer"
import { IconInput } from "@/shared/components/icon-input"
import SearchIcon from "@/shared/icons/search-icon"
import { SortBy } from "./ui/sort-by"
import React from "react"
import { Category } from "./ui/category"

type SortBy = "latest" | "oldest" | "A to Z" | "Z to A" | "highest" | "lowest" | ({} & string)

type TransactionsQueryParams = {
  page: number
  query: string
  sortBy: SortBy
  category: string
}

export default function TransactionsPage() {
  const filterSectionRef = React.useRef<HTMLDivElement>(null)

  const [queryParams, setQueryParams] = useQueryParams<TransactionsQueryParams>({ query: "", page: 1, sortBy: "latest", category: "all" })

  return (
    <PageLayer title="Transactions" className="@container flex flex-col gap-6 rounded-xl bg-white p-6">
      <section ref={filterSectionRef} className="@container flex items-center gap-3">
        <IconInput
          value={queryParams.query}
          onChange={(e) => setQueryParams({ query: e.target.value })}
          type="text"
          icon={<IconButton icon={SearchIcon} />}
          placeholder="Search transaction"
          className="mr-auto max-w-[320px]"
        />

        <SortBy value={queryParams.sortBy} setValue={(value) => setQueryParams({ sortBy: value }, 0)} className="ml-8" />
        <Category value={queryParams.category} setValue={(value) => setQueryParams({ category: value }, 0)} />
      </section>

      <section className="flex"></section>
    </PageLayer>
  )
}
