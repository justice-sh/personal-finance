import { ReactNode } from "react"

export const Form = ({ children, className }: { children?: ReactNode; className?: string }) => {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        e.stopPropagation()
      }}
      className={className}
    >
      {children}
    </form>
  )
}
