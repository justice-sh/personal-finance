import { ColorToMap } from "../types/color"

export function getTailwindColorClass(color: ColorToMap) {
  const styles: Record<ColorToMap, string> = {
    green: "bg-secondary-green",
    cyan: "bg-secondary-cyan",
    yellow: "bg-secondary-yellow",
    navy: "bg-secondary-navy",
  }

  return styles[color]
}

export function getCssColorVar(color: ColorToMap) {
  const styles: Record<ColorToMap, string> = {
    green: "var(--secondary-green)",
    cyan: "var(--secondary-cyan)",
    yellow: "var(--secondary-yellow)",
    navy: "var(--secondary-navy)",
  }

  return styles[color]
}
