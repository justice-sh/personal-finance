"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/components/ui/table"
import { TransactionAmount } from "@/shared/components/transaction/tx-amount"
import { TransactionAvatar } from "@/shared/components/transaction/tx-avatar"
import { TransactionDate } from "@/shared/components/transaction/tx-date"
import { useQueryParams } from "@/shared/hooks/use-query-params"
import { Pagination } from "./pagination"
import { cn } from "@/shared/lib/utils"
import React from "react"

const classes = {
  table: "my-grid-container",
  row: "my-grid-row",
}

export function TransactionsGrid() {
  const ref = React.useRef<HTMLDivElement>(null)

  const [queryParams, setQueryParams] = useQueryParams<{ page: number; pageSize: number }>({ page: 1, pageSize: 6 })

  useDynamicPageSize(ref, (pageSize) => setQueryParams({ pageSize, page: 1 }))

  const paginatedTransactions = transactions.slice((queryParams.page - 1) * queryParams.pageSize, queryParams.page * queryParams.pageSize)

  return (
    <section ref={ref} className="@container flex flex-1 flex-col">
      <DesktopView list={paginatedTransactions} className={cn("@max-[600px]:hidden", classes.table)} />

      <MobileView list={paginatedTransactions} className={cn("@min-[600px]:hidden", classes.table)} />

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

function DesktopView({ list, className }: { list: typeof transactions; className?: string }) {
  return (
    <Table className={className}>
      <TableHeader>
        <TableRow>
          <TableHead className="mr-auto">Recipient / Sender</TableHead>
          <TableHead className="w-[150px]">Category</TableHead>
          <TableHead className="w-[150px]">Transaction Date</TableHead>
          <TableHead className="ml-auto text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {list.map((transaction, idx) => (
          <TableRow key={transaction.id + idx} className={classes.row}>
            <TableCell className="flex items-center gap-4">
              <TransactionAvatar avatar={transaction.avatar} />
              <p className="text-preset-4-bold text-gray-900">{transaction.name}</p>
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
  )
}

function MobileView({ list, className }: { list: typeof transactions; className?: string }) {
  return (
    <Table className={className}>
      <TableBody>
        {list.map((transaction, idx) => (
          <TableRow key={transaction.id + idx} className={cn("flex w-full flex-row justify-between", classes.row)}>
            <TableCell className="flex w-full items-center gap-4">
              <TransactionAvatar avatar={transaction.avatar} className="max-xs-5:hidden size-8" />
              <div className="flex flex-col gap-1">
                <p className="text-preset-4-bold text-gray-900">{transaction.name}</p>
                <p className="text-preset-5 text-gray-500 capitalize">{transaction.category}</p>
              </div>
            </TableCell>

            <TableCell className="grid gap-1">
              <TransactionAmount
                amount={transaction.totalAmount}
                type={transaction.type}
                currency={transaction.currency}
                className="text-preset-4-bold"
              />
              <TransactionDate date={transaction.date} className="text-preset-5 text-gray-500" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

/**
 * Custom hook to dynamically adjust the page size based on the window's height and item height.
 * @param ref - Reference to the container element.
 * @param onPageSizeChange - Callback function to be called when the page size changes.
 */
function useDynamicPageSize(ref: React.RefObject<HTMLDivElement | null>, onPageSizeChange?: (pageSize: number) => void) {
  React.useEffect(() => {
    const controller = new AbortController()

    let timeoutID: number = 0

    const handleResize = () => {
      window.clearTimeout(timeoutID)

      const container = ref.current
      if (!container) return

      timeoutID = window.setTimeout(() => {
        const table = Array.from(container.querySelectorAll(`.${classes.table}`)).filter((child) => {
          const display = getComputedStyle(child).display
          return display !== "none"
        })[0]

        const item = table.querySelector(`.${classes.row}`)
        if (!item) return

        const windowHeight = window.innerHeight - 330
        const itemHeight = item.clientHeight

        const newPageSize = Math.max(3, Math.floor(windowHeight / itemHeight))

        onPageSizeChange?.(newPageSize)
      }, 400)
    }

    window.addEventListener("resize", handleResize, { signal: controller.signal })

    handleResize()

    return () => {
      controller.abort()
      window.clearTimeout(timeoutID)
    }
  }, [ref])
}

const transactions = [
  {
    id: "1",
    avatar: "/images/avatar.png",
    name: "James Peterson",
    totalAmount: 250,
    category: "Entertainment",
    date: "2023-10-01",
    type: "expense" as const,
    currency: "USD" as const,
  },
  {
    id: "1",
    avatar: "/images/avatar.png",
    name: "James Peterson",
    totalAmount: 250,
    category: "Entertainment",
    date: "2023-10-01",
    type: "income" as const,
    currency: "USD" as const,
  },
  {
    id: "1",
    avatar: "/images/avatar.png",
    name: "James Peterson",
    totalAmount: 250,
    category: "Entertainment",
    date: "2023-10-01",
    type: "income" as const,
    currency: "USD" as const,
  },
  {
    id: "1",
    avatar: "/images/avatar.png",
    name: "James Peterson",
    totalAmount: 250,
    category: "Entertainment",
    date: "2023-10-01",
    type: "expense" as const,
    currency: "USD" as const,
  },
  {
    id: "1",
    avatar: "/images/avatar.png",
    name: "James Peterson",
    totalAmount: 250,
    category: "Entertainment",
    date: "2023-10-01",
    type: "expense" as const,
    currency: "USD" as const,
  },
  {
    id: "1",
    avatar: "/images/avatar.png",
    name: "James Peterson",
    totalAmount: 250,
    category: "Entertainment",
    date: "2023-10-01",
    type: "income" as const,
    currency: "USD" as const,
  },
  {
    id: "1",
    avatar: "/images/avatar.png",
    name: "James Peterson",
    totalAmount: 250,
    category: "Entertainment",
    date: "2023-10-01",
    type: "expense" as const,
    currency: "USD" as const,
  },
  {
    id: "1",
    avatar: "/images/avatar.png",
    name: "James Peterson",
    totalAmount: 250,
    category: "Entertainment",
    date: "2023-10-01",
    type: "expense" as const,
    currency: "USD" as const,
  },
  {
    id: "1",
    avatar: "/images/avatar.png",
    name: "James Peterson",
    totalAmount: 250,
    category: "Entertainment",
    date: "2023-10-01",
    type: "expense" as const,
    currency: "USD" as const,
  },
  {
    id: "1",
    avatar: "/images/avatar.png",
    name: "James Peterson",
    totalAmount: 250,
    category: "Entertainment",
    date: "2023-10-01",
    type: "expense" as const,
    currency: "USD" as const,
  },
  {
    id: "1",
    avatar: "/images/avatar.png",
    name: "James Peterson",
    totalAmount: 250,
    category: "Entertainment",
    date: "2023-10-01",
    type: "expense" as const,
    currency: "USD" as const,
  },
  {
    id: "1",
    avatar: "/images/avatar.png",
    name: "James Peterson",
    totalAmount: 250,
    category: "Entertainment",
    date: "2023-10-01",
    type: "expense" as const,
    currency: "USD" as const,
  },
  {
    id: "1",
    avatar: "/images/avatar.png",
    name: "James Peterson",
    totalAmount: 250,
    category: "Entertainment",
    date: "2023-10-01",
    type: "expense" as const,
    currency: "USD" as const,
  },
  {
    id: "1",
    avatar: "/images/avatar.png",
    name: "James Peterson",
    totalAmount: 250,
    category: "Entertainment",
    date: "2023-10-01",
    type: "expense" as const,
    currency: "USD" as const,
  },
  {
    id: "1",
    avatar: "/images/avatar.png",
    name: "James Peterson",
    totalAmount: 250,
    category: "Entertainment",
    date: "2023-10-01",
    type: "expense" as const,
    currency: "USD" as const,
  },
  {
    id: "1",
    avatar: "/images/avatar.png",
    name: "James Peterson",
    totalAmount: 250,
    category: "Entertainment",
    date: "2023-10-01",
    type: "expense" as const,
    currency: "USD" as const,
  },
  {
    id: "1",
    avatar: "/images/avatar.png",
    name: "James Peterson",
    totalAmount: 250,
    category: "Entertainment",
    date: "2023-10-01",
    type: "expense" as const,
    currency: "USD" as const,
  },
  {
    id: "1",
    avatar: "/images/avatar.png",
    name: "James Peterson",
    totalAmount: 250,
    category: "Entertainment",
    date: "2023-10-01",
    type: "expense" as const,
    currency: "USD" as const,
  },
  {
    id: "1",
    avatar: "/images/avatar.png",
    name: "James Peterson",
    totalAmount: 250,
    category: "Entertainment",
    date: "2023-10-01",
    type: "expense" as const,
    currency: "USD" as const,
  },
  {
    id: "1",
    avatar: "/images/avatar.png",
    name: "James Peterson",
    totalAmount: 250,
    category: "Entertainment",
    date: "2023-10-01",
    type: "expense" as const,
    currency: "USD" as const,
  },
  {
    id: "1",
    avatar: "/images/avatar.png",
    name: "James Peterson",
    totalAmount: 250,
    category: "Entertainment",
    date: "2023-10-01",
    type: "expense" as const,
    currency: "USD" as const,
  },
  {
    id: "1",
    avatar: "/images/avatar.png",
    name: "James Peterson",
    totalAmount: 250,
    category: "Entertainment",
    date: "2023-10-01",
    type: "expense" as const,
    currency: "USD" as const,
  },
  {
    id: "1",
    avatar: "/images/avatar.png",
    name: "James Peterson",
    totalAmount: 250,
    category: "Entertainment",
    date: "2023-10-01",
    type: "expense" as const,
    currency: "USD" as const,
  },
  {
    id: "1",
    avatar: "/images/avatar.png",
    name: "James Peterson",
    totalAmount: 250,
    category: "Entertainment",
    date: "2023-10-01",
    type: "expense" as const,
    currency: "USD" as const,
  },
  {
    id: "1",
    avatar: "/images/avatar.png",
    name: "James Peterson",
    totalAmount: 250,
    category: "Entertainment",
    date: "2023-10-01",
    type: "expense" as const,
    currency: "USD" as const,
  },
  {
    id: "1",
    avatar: "/images/avatar.png",
    name: "James Peterson",
    totalAmount: 250,
    category: "Entertainment",
    date: "2023-10-01",
    type: "expense" as const,
    currency: "USD" as const,
  },
  {
    id: "1",
    avatar: "/images/avatar.png",
    name: "James Peterson",
    totalAmount: 250,
    category: "Entertainment",
    date: "2023-10-01",
    type: "expense" as const,
    currency: "USD" as const,
  },
  {
    id: "1",
    avatar: "/images/avatar.png",
    name: "James Peterson",
    totalAmount: 250,
    category: "Entertainment",
    date: "2023-10-01",
    type: "expense" as const,
    currency: "USD" as const,
  },
  {
    id: "1",
    avatar: "/images/avatar.png",
    name: "James Peterson",
    totalAmount: 250,
    category: "Entertainment",
    date: "2023-10-01",
    type: "expense" as const,
    currency: "USD" as const,
  },
  {
    id: "1",
    avatar: "/images/avatar.png",
    name: "James Peterson",
    totalAmount: 250,
    category: "Entertainment",
    date: "2023-10-01",
    type: "expense" as const,
    currency: "USD" as const,
  },
  {
    id: "1",
    avatar: "/images/avatar.png",
    name: "James Peterson",
    totalAmount: 250,
    category: "Entertainment",
    date: "2023-10-01",
    type: "expense" as const,
    currency: "USD" as const,
  },
  {
    id: "1",
    avatar: "/images/avatar.png",
    name: "James Peterson",
    totalAmount: 250,
    category: "Entertainment",
    date: "2023-10-01",
    type: "expense" as const,
    currency: "USD" as const,
  },
  {
    id: "1",
    avatar: "/images/avatar.png",
    name: "James Peterson",
    totalAmount: 250,
    category: "Entertainment",
    date: "2023-10-01",
    type: "expense" as const,
    currency: "USD" as const,
  },
  {
    id: "1",
    avatar: "/images/avatar.png",
    name: "James Peterson",
    totalAmount: 250,
    category: "Entertainment",
    date: "2023-10-01",
    type: "expense" as const,
    currency: "USD" as const,
  },
  {
    id: "1",
    avatar: "/images/avatar.png",
    name: "James Peterson",
    totalAmount: 250,
    category: "Entertainment",
    date: "2023-10-01",
    type: "expense" as const,
    currency: "USD" as const,
  },
  {
    id: "1",
    avatar: "/images/avatar.png",
    name: "James Peterson",
    totalAmount: 250,
    category: "Entertainment",
    date: "2023-10-01",
    type: "expense" as const,
    currency: "USD" as const,
  },
  {
    id: "1",
    avatar: "/images/avatar.png",
    name: "James Peterson",
    totalAmount: 250,
    category: "Entertainment",
    date: "2023-10-01",
    type: "expense" as const,
    currency: "USD" as const,
  },
  {
    id: "1",
    avatar: "/images/avatar.png",
    name: "James Peterson",
    totalAmount: 250,
    category: "Entertainment",
    date: "2023-10-01",
    type: "expense" as const,
    currency: "USD" as const,
  },
  {
    id: "1",
    avatar: "/images/avatar.png",
    name: "James Peterson",
    totalAmount: 250,
    category: "Entertainment",
    date: "2023-10-01",
    type: "expense" as const,
    currency: "USD" as const,
  },
  {
    id: "1",
    avatar: "/images/avatar.png",
    name: "James Peterson",
    totalAmount: 250,
    category: "Entertainment",
    date: "2023-10-01",
    type: "expense" as const,
    currency: "USD" as const,
  },
  {
    id: "1",
    avatar: "/images/avatar.png",
    name: "James Peterson",
    totalAmount: 250,
    category: "Entertainment",
    date: "2023-10-01",
    type: "expense" as const,
    currency: "USD" as const,
  },
  {
    id: "1",
    avatar: "/images/avatar.png",
    name: "James Peterson",
    totalAmount: 250,
    category: "Entertainment",
    date: "2023-10-01",
    type: "expense" as const,
    currency: "USD" as const,
  },
  {
    id: "1",
    avatar: "/images/avatar.png",
    name: "James Peterson",
    totalAmount: 250,
    category: "Entertainment",
    date: "2023-10-01",
    type: "expense" as const,
    currency: "USD" as const,
  },
  {
    id: "1",
    avatar: "/images/avatar.png",
    name: "James Peterson",
    totalAmount: 250,
    category: "Entertainment",
    date: "2023-10-01",
    type: "expense" as const,
    currency: "USD" as const,
  },
  {
    id: "1",
    avatar: "/images/avatar.png",
    name: "James Peterson",
    totalAmount: 250,
    category: "Entertainment",
    date: "2023-10-01",
    type: "expense" as const,
    currency: "USD" as const,
  },
  {
    id: "1",
    avatar: "/images/avatar.png",
    name: "James Peterson",
    totalAmount: 250,
    category: "Entertainment",
    date: "2023-10-01",
    type: "expense" as const,
    currency: "USD" as const,
  },
  {
    id: "1",
    avatar: "/images/avatar.png",
    name: "James Peterson",
    totalAmount: 250,
    category: "Entertainment",
    date: "2023-10-01",
    type: "expense" as const,
    currency: "USD" as const,
  },
  {
    id: "1",
    avatar: "/images/avatar.png",
    name: "James Peterson",
    totalAmount: 250,
    category: "Entertainment",
    date: "2023-10-01",
    type: "expense" as const,
    currency: "USD" as const,
  },
  {
    id: "1",
    avatar: "/images/avatar.png",
    name: "James Peterson",
    totalAmount: 250,
    category: "Entertainment",
    date: "2023-10-01",
    type: "expense" as const,
    currency: "USD" as const,
  },
  {
    id: "1",
    avatar: "/images/avatar.png",
    name: "James Peterson",
    totalAmount: 250,
    category: "Entertainment",
    date: "2023-10-01",
    type: "expense" as const,
    currency: "USD" as const,
  },
  {
    id: "1",
    avatar: "/images/avatar.png",
    name: "James Peterson",
    totalAmount: 250,
    category: "Entertainment",
    date: "2023-10-01",
    type: "expense" as const,
    currency: "USD" as const,
  },
  {
    id: "1",
    avatar: "/images/avatar.png",
    name: "James Peterson",
    totalAmount: 250,
    category: "Entertainment",
    date: "2023-10-01",
    type: "expense" as const,
    currency: "USD" as const,
  },
  {
    id: "1",
    avatar: "/images/avatar.png",
    name: "James Peterson",
    totalAmount: 250,
    category: "Entertainment",
    date: "2023-10-01",
    type: "expense" as const,
    currency: "USD" as const,
  },
  {
    id: "1",
    avatar: "/images/avatar.png",
    name: "James Peterson",
    totalAmount: 250,
    category: "Entertainment",
    date: "2023-10-01",
    type: "expense" as const,
    currency: "USD" as const,
  },
  {
    id: "1",
    avatar: "/images/avatar.png",
    name: "James Peterson",
    totalAmount: 250,
    category: "Entertainment",
    date: "2023-10-01",
    type: "expense" as const,
    currency: "USD" as const,
  },
  {
    id: "1",
    avatar: "/images/avatar.png",
    name: "James Peterson",
    totalAmount: 250,
    category: "Entertainment",
    date: "2023-10-01",
    type: "expense" as const,
    currency: "USD" as const,
  },
  {
    id: "1",
    avatar: "/images/avatar.png",
    name: "James Peterson",
    totalAmount: 250,
    category: "Entertainment",
    date: "2023-10-01",
    type: "expense" as const,
    currency: "USD" as const,
  },
  {
    id: "1",
    avatar: "/images/avatar.png",
    name: "James Peterson",
    totalAmount: 250,
    category: "Entertainment",
    date: "2023-10-01",
    type: "expense" as const,
    currency: "USD" as const,
  },
  {
    id: "1",
    avatar: "/images/avatar.png",
    name: "James Peterson",
    totalAmount: 250,
    category: "Entertainment",
    date: "2023-10-01",
    type: "expense" as const,
    currency: "USD" as const,
  },
  {
    id: "1",
    avatar: "/images/avatar.png",
    name: "James Peterson",
    totalAmount: 250,
    category: "Entertainment",
    date: "2023-10-01",
    type: "expense" as const,
    currency: "USD" as const,
  },
  {
    id: "1",
    avatar: "/images/avatar.png",
    name: "James Peterson",
    totalAmount: 250,
    category: "Entertainment",
    date: "2023-10-01",
    type: "expense" as const,
    currency: "USD" as const,
  },
  {
    id: "1",
    avatar: "/images/avatar.png",
    name: "James Peterson",
    totalAmount: 250,
    category: "Entertainment",
    date: "2023-10-01",
    type: "expense" as const,
    currency: "USD" as const,
  },
].map((tx, index) => ({
  ...tx,
  id: String(index + 1),
  name: `Transaction ${index + 1}`,
  type: index % 2 === 0 ? ("income" as const) : ("expense" as const),
}))
