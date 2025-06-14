import React from "react"

type Props = { children: React.ReactNode }
//this is the layout for the budgets page
const layout = ({ children }: Props) => {
  return <div>{children}</div>
}

export default layout
