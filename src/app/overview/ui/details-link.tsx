import ArrowRightFilledIcon from "@/shared/icons/arrow-right-filled"
import Link from "next/link"

export function DetailsLink({ href }: { href: string }) {
  return (
    <Link href={href} className="text-preset-4 flex items-center gap-2 text-gray-500">
      See Details <ArrowRightFilledIcon className="size-4" />
    </Link>
  )
}
