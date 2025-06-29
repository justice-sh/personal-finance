import React from "react"
import type { SVGProps } from "react"

export function TypcnFilter(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width={24} height={24} viewBox="0 0 24 24" {...props}>
      <path
        fill="currentColor"
        d="M19 6H5c-1.1 0-1.4.6-.6 1.4l4.2 4.2c.8.8 1.4 2.3 1.4 3.4v5l4-2v-3.5c0-.8.6-2.1 1.4-2.9l4.2-4.2c.8-.8.5-1.4-.6-1.4"
      />
    </svg>
  )
}
