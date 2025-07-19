import Link from "next/link"
import { routes } from "@/shared/constants/routes"

export default function LoginPage() {
  return (
    <section className="w-full ring-1">
      Login page
      <Link href={routes.overview} className="text-blue-500 hover:underline">
        Overview
      </Link>
    </section>
  )
}
