import clsx from "clsx"
import React from "react"

type SliderProps = {
  sliderBorderClass?: string
  sliderPipeClass?: string
  value?: number
}

const Slider = ({ sliderBorderClass, sliderPipeClass, value = 50 }: SliderProps) => {
  return (
    <div className={clsx("bg-beige-100 w-full rounded-[0.5rem]", sliderBorderClass)}>
      <div className={clsx(`h-2 rounded-[0.5rem] bg-red-700`, sliderPipeClass)} style={{ width: `${value}%` }} />
    </div>
  )
}

export default Slider
