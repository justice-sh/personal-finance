import React from "react"
import { cn } from "../lib/utils"

type SliderProps = {
  styles?: { border?: string; pipe?: string }
  value?: number
}

const Slider = ({ styles, value = 50 }: SliderProps) => {
  return (
    <div className={cn("bg-beige-100 w-full rounded-[0.5rem]", styles?.border)}>
      <div
        className={cn("h-2 rounded-[0.5rem] bg-red-300", styles?.pipe)}
        style={{ width: `${value === 100 ? 100 : value}%` }}
      />
    </div>
  )
}

export default Slider
