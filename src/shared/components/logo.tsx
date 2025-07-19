import Image from "next/image"
import Link from "next/link"
import { cn } from "../lib/utils"

type Props = {
  href?: string
  className?: string
  state?: "collapsed" | "expanded"
}

const Logo = ({ className, state = "expanded", href = "/" }: Props) => {
  const styles = {
    container: state === "collapsed" ? "size-[18px]" : "w-[121px] h-[22px]",
    imageReveal: "opacity-0 transition-all data-[reveal=true]:opacity-100 absolute duration-500",
  }

  return (
    <div className={cn("transition-all duration-300", className)}>
      <Link href={href} className={cn("relative flex h-full w-full items-center justify-center overflow-hidden", styles.container)}>
        <Image
          src="/logo-short.svg"
          alt="Logo"
          width={18}
          height={18}
          data-reveal={state === "collapsed"}
          className={cn("h-[18px]", styles.imageReveal)}
        />
        <Image
          src="/logo.svg"
          alt="Logo"
          width={121}
          height={22}
          data-reveal={state === "expanded"}
          className={cn("h-auto", styles.imageReveal)}
        />
      </Link>
    </div>
  )
}

export default Logo
