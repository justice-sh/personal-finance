import { cn } from "@/shared/lib/utils"

export function TransactionDate({ date, className }: { date: Date | string; className?: string }) {
  const _date = typeof date === "string" ? new Date(date) : date

  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(_date)

  const [month, day, year] = formattedDate.replace(", ", " ").split(" ")

  return <p className={cn("text-preset-5 text-gray-500", className)}>{`${day} ${month} ${year}`}</p>
}
