import { Color } from "../enums/color"

export function color2Tailwind(color: Color) {
  const styles: Record<Color, string> = {
    // Secondary Colors
    [Color.Red]: "bg-secondary-red",
    [Color.Cyan]: "bg-secondary-cyan",
    [Color.Navy]: "bg-secondary-navy",
    [Color.Green]: "bg-secondary-green",
    [Color.Yellow]: "bg-secondary-yellow",
    [Color.Purple]: "bg-secondary-purple",

    // Other Colors
    [Color.Blue]: "bg-other-blue",
    [Color.Gold]: "bg-other-gold",
    [Color.Brown]: "bg-other-brown",
    [Color.Orange]: "bg-other-orange",
    [Color.Margento]: "bg-other-margento",
    [Color.NavyGray]: "bg-other-navy-gray",
    [Color.OtherPurple]: "bg-other-purple",
    [Color.Turquoise]: "bg-other-turquoise",
    [Color.ArmyGreen]: "bg-other-army-green",
  }

  return styles[color]
}

export function color2Css(color: Color) {
  const styles: Record<Color, string> = {
    // Secondary Colors
    [Color.Red]: "var(--secondary-red)",
    [Color.Cyan]: "var(--secondary-cyan)",
    [Color.Navy]: "var(--secondary-navy)",
    [Color.Green]: "var(--secondary-green)",
    [Color.Yellow]: "var(--secondary-yellow)",
    [Color.Purple]: "var(--secondary-purple)",

    // Other Colors
    [Color.Blue]: "var(--other-blue)",
    [Color.Gold]: "var(--other-gold)",
    [Color.Brown]: "var(--other-brown)",
    [Color.Orange]: "var(--other-orange)",
    [Color.Margento]: "var(--other-margento)",
    [Color.NavyGray]: "var(--other-navy-gray)",
    [Color.OtherPurple]: "var(--other-purple)",
    [Color.Turquoise]: "var(--other-turquoise)",
    [Color.ArmyGreen]: "var(--other-army-green)",
  }

  return styles[color]
}
