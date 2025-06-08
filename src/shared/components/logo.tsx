import Image from "next/image"
import Link from "next/link"
import { cn } from "../lib/utils"

type Props = {
  className?: string
  state?: "collapsed" | "expanded"
}

const Logo = ({ className, state = "expanded" }: Props) => {
  const styles = {
    reveal: "opacity-0 transition-all data-[reveal=true]:opacity-100 absolute duration-500 ",
  }

  return (
    <Link href="/" className={cn("block overflow-hidden transition-all duration-300", className)}>
      <Image src="/logo-short.svg" alt="Logo" width={18} height={20} data-reveal={state === "collapsed"} className={styles.reveal} />
      <Image src="/logo.svg" alt="Logo" width={121} height={22} data-reveal={state === "expanded"} className={styles.reveal} />
    </Link>
  )
}

export default Logo
