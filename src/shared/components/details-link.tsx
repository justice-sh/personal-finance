import ArrowRightFilledIcon from "@/shared/icons/arrow-right-filled"
import Link from "next/link"

export function DetailsLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="text-preset-4 flex items-center gap-2 text-gray-500">
      {label} <ArrowRightFilledIcon className="size-4" />
    </Link>
  )
}
