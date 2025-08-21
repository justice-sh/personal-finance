"use client"

import React from "react"
import { Category } from "./ui/category"
import { TransactionsGrid } from "./ui/grid"
import SearchIcon from "@/shared/icons/search-icon"
import { PageLayer } from "@/shared/components/page-layer"
import { IconInput } from "@/shared/components/icon-input"
import { IconButton } from "@/shared/components/icon-button"
import { TxSortBy } from "@/shared/components/transaction/tx-sort-by"
import { useTransactions, useTransactionsQueryParams } from "@/shared/data/transaction"

export default function TransactionsPage() {
  const filterSectionRef = React.useRef<HTMLDivElement>(null)

  const [queryParams, setQueryParams] = useTransactionsQueryParams()

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
        <TxSortBy value={queryParams.sortBy} setValue={(sortBy) => setQueryParams({ sortBy }, 0)} className="ml-8" />
        <Category value={queryParams.category} setValue={(value) => setQueryParams({ category: value }, 0)} />
      </section>

      <TransactionsGrid data={data} isLoading={isLoading} />
    </PageLayer>
  )
}
