"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/components/ui/table"
import { TransactionAmount } from "@/shared/components/transaction/tx-amount"
import { TransactionAvatar } from "@/shared/components/transaction/tx-avatar"
import { TransactionDate } from "@/shared/components/transaction/tx-date"
import { useQueryParams } from "@/shared/hooks/use-query-params"
import { Pagination } from "./pagination"
import React, { useCallback } from "react"

export function TransactionsGrid() {
  const ref = React.useRef<HTMLDivElement>(null)

  const [queryParams, setQueryParams] = useQueryParams<{ page: number; pageSize: number }>({ page: 1, pageSize: 6 })

  useDynamicPageSize(ref, ".table-row", (newPageSize) => {
    setQueryParams({ page: 1, pageSize: newPageSize })
  })

  const paginatedTransactions = transactions.slice((queryParams.page - 1) * queryParams.pageSize, queryParams.page * queryParams.pageSize)

  return (
    <section ref={ref} className="flex flex-1 flex-col">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="mr-auto">Recipient / Sender</TableHead>
            <TableHead className="w-[150px]">Category</TableHead>
            <TableHead className="w-[150px]">Transaction Date</TableHead>
            <TableHead className="ml-auto text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedTransactions.map((transaction, idx) => (
            <TableRow key={transaction.id + idx} className="table-row">
              <TableCell>
                <TransactionAvatar
                  avatar={transaction.avatar}
                  label={transaction.name}
                  styles={{ label: "text-gray-900 text-preset-4-bold" }}
                />
              </TableCell>
              <TableCell className="capitalize">{transaction.category}</TableCell>
              <TableCell>
                <TransactionDate date={transaction.date} />
              </TableCell>
              <TableCell className="text-right">
                <TransactionAmount amount={transaction.totalAmount} type={transaction.type} currency={transaction.currency} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination
        className="mt-auto"
        totalItems={transactions.length}
        itemsPerPage={queryParams.pageSize}
        currentPage={queryParams.page}
        onPageChange={(page) => setQueryParams({ page })}
      />
    </section>
  )
}

function useDynamicPageSize(
  ref: React.RefObject<HTMLDivElement | null>,
  itemSelector: string,
  onPageSizeChange?: (pageSize: number) => void,
) {
  const handleResize = useCallback(() => {
    const parent = ref.current
    if (!parent) return

    const item = parent.querySelector(itemSelector)
    if (!item) return

    const parentHeight = window.innerHeight - 350
    const itemHeight = item.clientHeight

    const newPageSize = Math.max(3, Math.floor(parentHeight / itemHeight))

    onPageSizeChange?.(newPageSize)
  }, [ref, itemSelector])

  React.useEffect(() => {
    window.addEventListener("resize", handleResize)
    handleResize()

    return () => window.removeEventListener("resize", handleResize)
  }, [handleResize])
}

const transactions = [
  {
    id: "1",
    avatar: "/images/avatar.png",
    name: "James Peterson 1",
    totalAmount: 250,
    category: "Entertainment",
    date: "2023-10-01",
    type: "expense" as const,
    currency: "USD" as const,
  },
  {
    id: "1",
    avatar: "/images/avatar.png",
    name: "James Peterson 2",
    totalAmount: 250,
    category: "Entertainment",
    date: "2023-10-01",
    type: "income" as const,
    currency: "USD" as const,
  },
  {
    id: "1",
    avatar: "/images/avatar.png",
    name: "James Peterson 3",
    totalAmount: 250,
    category: "Entertainment",
    date: "2023-10-01",
    type: "income" as const,
    currency: "USD" as const,
  },
  {
    id: "1",
    avatar: "/images/avatar.png",
    name: "James Peterson 4",
    totalAmount: 250,
    category: "Entertainment",
    date: "2023-10-01",
    type: "expense" as const,
    currency: "USD" as const,
  },
  {
    id: "1",
    avatar: "/images/avatar.png",
    name: "James Peterson 5",
    totalAmount: 250,
    category: "Entertainment",
    date: "2023-10-01",
    type: "expense" as const,
    currency: "USD" as const,
  },
  {
    id: "1",
    avatar: "/images/avatar.png",
    name: "James Peterson 6",
    totalAmount: 250,
    category: "Entertainment",
    date: "2023-10-01",
    type: "income" as const,
    currency: "USD" as const,
  },
  {
    id: "1",
    avatar: "/images/avatar.png",
    name: "James Peterson 7",
    totalAmount: 250,
    category: "Entertainment",
    date: "2023-10-01",
    type: "expense" as const,
    currency: "USD" as const,
  },
  {
    id: "1",
    avatar: "/images/avatar.png",
    name: "James Peterson 8",
    totalAmount: 250,
    category: "Entertainment",
    date: "2023-10-01",
    type: "expense" as const,
    currency: "USD" as const,
  },
  {
    id: "1",
    avatar: "/images/avatar.png",
    name: "James Peterson 9",
    totalAmount: 250,
    category: "Entertainment",
    date: "2023-10-01",
    type: "expense" as const,
    currency: "USD" as const,
  },
  {
    id: "1",
    avatar: "/images/avatar.png",
    name: "James Peterson 10",
    totalAmount: 250,
    category: "Entertainment",
    date: "2023-10-01",
    type: "expense" as const,
    currency: "USD" as const,
  },
  {
    id: "1",
    avatar: "/images/avatar.png",
    name: "James Peterson 11",
    totalAmount: 250,
    category: "Entertainment",
    date: "2023-10-01",
    type: "expense" as const,
    currency: "USD" as const,
  },
  {
    id: "1",
    avatar: "/images/avatar.png",
    name: "James Peterson 12",
    totalAmount: 250,
    category: "Entertainment",
    date: "2023-10-01",
    type: "expense" as const,
    currency: "USD" as const,
  },
  {
    id: "1",
    avatar: "/images/avatar.png",
    name: "James Peterson 13",
    totalAmount: 250,
    category: "Entertainment",
    date: "2023-10-01",
    type: "expense" as const,
    currency: "USD" as const,
  },
  {
    id: "1",
    avatar: "/images/avatar.png",
    name: "James Peterson 14",
    totalAmount: 250,
    category: "Entertainment",
    date: "2023-10-01",
    type: "expense" as const,
    currency: "USD" as const,
  },
  {
    id: "1",
    avatar: "/images/avatar.png",
    name: "James Peterson 15",
    totalAmount: 250,
    category: "Entertainment",
    date: "2023-10-01",
    type: "expense" as const,
    currency: "USD" as const,
  },
  {
    id: "1",
    avatar: "/images/avatar.png",
    name: "James Peterson 16",
    totalAmount: 250,
    category: "Entertainment",
    date: "2023-10-01",
    type: "expense" as const,
    currency: "USD" as const,
  },
  {
    id: "1",
    avatar: "/images/avatar.png",
    name: "James Peterson 17",
    totalAmount: 250,
    category: "Entertainment",
    date: "2023-10-01",
    type: "expense" as const,
    currency: "USD" as const,
  },
  {
    id: "1",
    avatar: "/images/avatar.png",
    name: "James Peterson 18",
    totalAmount: 250,
    category: "Entertainment",
    date: "2023-10-01",
    type: "expense" as const,
    currency: "USD" as const,
  },
  {
    id: "1",
    avatar: "/images/avatar.png",
    name: "James Peterson 19",
    totalAmount: 250,
    category: "Entertainment",
    date: "2023-10-01",
    type: "expense" as const,
    currency: "USD" as const,
  },
  {
    id: "1",
    avatar: "/images/avatar.png",
    name: "James Peterson 20",
    totalAmount: 250,
    category: "Entertainment",
    date: "2023-10-01",
    type: "expense" as const,
    currency: "USD" as const,
  },
  {
    id: "1",
    avatar: "/images/avatar.png",
    name: "James Peterson 21",
    totalAmount: 250,
    category: "Entertainment",
    date: "2023-10-01",
    type: "expense" as const,
    currency: "USD" as const,
  },
  {
    id: "1",
    avatar: "/images/avatar.png",
    name: "James Peterson 22",
    totalAmount: 250,
    category: "Entertainment",
    date: "2023-10-01",
    type: "expense" as const,
    currency: "USD" as const,
  },
  {
    id: "1",
    avatar: "/images/avatar.png",
    name: "James Peterson 23",
    totalAmount: 250,
    category: "Entertainment",
    date: "2023-10-01",
    type: "expense" as const,
    currency: "USD" as const,
  },
  {
    id: "1",
    avatar: "/images/avatar.png",
    name: "James Peterson 24",
    totalAmount: 250,
    category: "Entertainment",
    date: "2023-10-01",
    type: "expense" as const,
    currency: "USD" as const,
  },
  {
    id: "1",
    avatar: "/images/avatar.png",
    name: "James Peterson 25",
    totalAmount: 250,
    category: "Entertainment",
    date: "2023-10-01",
    type: "expense" as const,
    currency: "USD" as const,
  },
  {
    id: "1",
    avatar: "/images/avatar.png",
    name: "James Peterson 26",
    totalAmount: 250,
    category: "Entertainment",
    date: "2023-10-01",
    type: "expense" as const,
    currency: "USD" as const,
  },
  {
    id: "1",
    avatar: "/images/avatar.png",
    name: "James Peterson 27",
    totalAmount: 250,
    category: "Entertainment",
    date: "2023-10-01",
    type: "expense" as const,
    currency: "USD" as const,
  },
  {
    id: "1",
    avatar: "/images/avatar.png",
    name: "James Peterson 28",
    totalAmount: 250,
    category: "Entertainment",
    date: "2023-10-01",
    type: "expense" as const,
    currency: "USD" as const,
  },
]
