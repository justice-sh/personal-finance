"use client"

import React from "react"
import { cn } from "@/shared/lib/utils"
import { Pagination } from "./pagination"
import { TransactionResponse } from "@/shared/types/transaction"
import { parseTransactionType } from "@/shared/utils/transaction"
import { useTransactionsQueryParams } from "@/shared/data/transaction"
import { TransactionDate } from "@/shared/components/transaction/tx-date"
import { TransactionAvatar } from "@/shared/components/transaction/tx-avatar"
import { TransactionAmount } from "@/shared/components/transaction/tx-amount"
import { ConditionalRenderer } from "@/shared/components/conditional-renderer"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/components/ui/table"

type Props = {
  isLoading: boolean
  data: TransactionResponse
  // queryParams: TransactionParam
  // setQueryParams: (params: Partial<TransactionParam>, offset?: number) => void
}

const classes = {
  table: "my-grid-container",
  row: "my-grid-row",
}

export function TransactionsGrid({ data, isLoading }: Props) {
  const ref = React.useRef<HTMLDivElement>(null)

  const [queryParams, setQueryParams] = useTransactionsQueryParams()

  useDynamicPageSize(ref, (limit) => setQueryParams({ limit, offset: queryParams.offset }))

  const paginatedTransactions = data.transactions
  // const paginatedTransactions = transactions.data.slice(
  //   (queryParams.offset + 1 - 1) * queryParams.limit,
  //   (queryParams.offset + 1) * queryParams.limit,
  // )

  return (
    <ConditionalRenderer
      tag="section"
      ref={ref}
      className="@container flex flex-1 flex-col"
      isLoading={isLoading}
      isEmpty={data.transactions.length === 0}
    >
      <DesktopView list={paginatedTransactions} className={cn("@max-[600px]:hidden", classes.table)} />

      <MobileView list={paginatedTransactions} className={cn("@min-[600px]:hidden", classes.table)} />

      <Pagination
        className="mt-auto"
        totalItems={data.meta.total}
        itemsPerPage={queryParams.limit}
        currentPage={queryParams.offset}
        onPageChange={(offset) => setQueryParams({ offset })}
      />
    </ConditionalRenderer>
  )
}

function DesktopView({ list, className }: { list: TransactionResponse["transactions"]; className?: string }) {
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
              <TransactionAvatar avatar={transaction.avatarUrl} />
              <p className="text-preset-4-bold text-gray-900 capitalize">{transaction.description}</p>
            </TableCell>

            <TableCell className="capitalize">{transaction.category}</TableCell>

            <TableCell>
              <TransactionDate date={transaction.createdAt} />
            </TableCell>

            <TableCell className="text-right">
              <TransactionAmount
                amount={transaction.amount}
                type={parseTransactionType(transaction.type)}
                currency={transaction.currency}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

function MobileView({ list, className }: { list: TransactionResponse["transactions"]; className?: string }) {
  return (
    <Table className={className}>
      <TableBody>
        {list.map((transaction, idx) => (
          <TableRow key={transaction.id + idx} className={cn("flex w-full flex-row justify-between", classes.row)}>
            <TableCell className="flex w-full items-center gap-4">
              <TransactionAvatar avatar={transaction.avatarUrl} className="max-xs-5:hidden size-8" />
              <div className="flex flex-col gap-1">
                <p className="text-preset-4-bold text-gray-900">{transaction.description}</p>
                <p className="text-preset-5 text-gray-500 capitalize">{transaction.category}</p>
              </div>
            </TableCell>

            <TableCell className="grid gap-1">
              <TransactionAmount
                amount={transaction.amount}
                type={parseTransactionType(transaction.type)}
                currency={transaction.currency}
                className="text-preset-4-bold"
              />
              <TransactionDate date={transaction.createdAt} className="text-preset-5 text-gray-500" />
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

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref])
}
