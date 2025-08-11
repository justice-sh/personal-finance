import { Color } from "../enums/color"

export function color2Tailwind(color: Color) {
  const styles: Record<Color, string> = {
    // Secondary Colors
    [Color.RED]: "bg-secondary-red",
    [Color.CYAN]: "bg-secondary-cyan",
    [Color.NAVY]: "bg-secondary-navy",
    [Color.GREEN]: "bg-secondary-green",
    [Color.YELLOW]: "bg-secondary-yellow",
    [Color.SECONDARY_PURPLE]: "bg-secondary-purple",

    // Other Colors
    [Color.BLUE]: "bg-other-blue",
    [Color.GOLD]: "bg-other-gold",
    [Color.BROWN]: "bg-other-brown",
    [Color.ORANGE]: "bg-other-orange",
    [Color.MARGENTO]: "bg-other-margento",
    [Color.NAVY_GRAY]: "bg-other-navy-gray",
    [Color.OTHER_PURPLE]: "bg-other-purple",
    [Color.TURQUOISE]: "bg-other-turquoise",
    [Color.ARMY_GREEN]: "bg-other-army-green",
  }

  return styles[color]
}

export function color2Css(color: Color) {
  const styles: Record<Color, string> = {
    // Secondary Colors
    [Color.RED]: "var(--secondary-red)",
    [Color.CYAN]: "var(--secondary-cyan)",
    [Color.NAVY]: "var(--secondary-navy)",
    [Color.GREEN]: "var(--secondary-green)",
    [Color.YELLOW]: "var(--secondary-yellow)",
    [Color.SECONDARY_PURPLE]: "var(--secondary-purple)",

    // Other Colors
    [Color.BLUE]: "var(--other-blue)",
    [Color.GOLD]: "var(--other-gold)",
    [Color.BROWN]: "var(--other-brown)",
    [Color.ORANGE]: "var(--other-orange)",
    [Color.MARGENTO]: "var(--other-margento)",
    [Color.NAVY_GRAY]: "var(--other-navy-gray)",
    [Color.OTHER_PURPLE]: "var(--other-purple)",
    [Color.TURQUOISE]: "var(--other-turquoise)",
    [Color.ARMY_GREEN]: "var(--other-army-green)",
  }

  return styles[color]
}
