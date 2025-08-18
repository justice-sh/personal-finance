"use client"

import React from "react"
import { Category } from "./ui/category"
import { TransactionsGrid } from "./ui/grid"
import SearchIcon from "@/shared/icons/search-icon"
import { PageLayer } from "@/shared/components/page-layer"
import { IconInput } from "@/shared/components/icon-input"
import { useTransactions } from "@/shared/data/transaction"
import { IconButton } from "@/shared/components/icon-button"
import { TransactionParam } from "@/shared/types/transaction"
import { useQueryParams } from "@/shared/hooks/use-query-params"
import { SortBy } from "@/shared/components/transaction/tx-sort-by"

type SortBy = "latest" | "oldest" | "A to Z" | "Z to A" | "highest" | "lowest" | ({} & string)

export default function TransactionsPage() {
  const filterSectionRef = React.useRef<HTMLDivElement>(null)

  const [queryParams, setQueryParams] = useQueryParams<TransactionParam>({
    query: "",
    offset: 0,
    sortBy: "latest",
    category: "all",
    limit: 6,
  })

  const { data, isLoading } = useTransactions(queryParams)

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

      <TransactionsGrid
        transactions={data}
        isLoading={isLoading}
        queryParams={queryParams}
        setQueryParams={setQueryParams}
      />
    </PageLayer>
  )
}
