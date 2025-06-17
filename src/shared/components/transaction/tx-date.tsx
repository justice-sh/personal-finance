import { cn } from "@/shared/lib/utils"

export function TransactionDate({ date, className }: { date: string; className?: string }) {
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  }).format(new Date(date))

  const [month, day, year] = formattedDate.replace(", ", " ").split(" ")

  return <p className={cn("text-preset-5 text-gray-500", className)}>{`${day} ${month} ${year}`}</p>
}
