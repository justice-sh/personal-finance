"use client"

import { gsap } from "gsap"
import Link from "next/link"
import { cn } from "../lib/utils"
import React, { useRef } from "react"
import { useGSAP } from "@gsap/react"
import { useSidebar } from "./ui/sidebar"
import { SplitText } from "gsap/SplitText"
import { GSDevTools } from "gsap/GSDevTools"
import { ExpoScaleEase } from "gsap/EasePack"
import { usePathname } from "next/navigation"
import { NavigationItemProps } from "../types/navigation"

gsap.registerPlugin(useGSAP, ExpoScaleEase, SplitText, GSDevTools)

type ElementIds = Record<"overlay" | "icon" | "bar" | "text", string>

type Props = {
  className?: string
  item: Pick<NavigationItemProps, "Icon" | "action" | "title" | "url">
}

export default function NavigationItem({ item, className, ...props }: Props) {
  const ref = useRef<HTMLAnchorElement>(null)
  const pathname = usePathname()

  const isActive = item.url === pathname
  const Tag = (item.url ? Link : "div") as React.ElementType

  const elementIds: ElementIds = {
    overlay: "#sidebar-menu-item-bg",
    text: "#sidebar-menu-item-text",
    icon: "#sidebar-menu-item-icon",
    bar: "#sidebar-menu-item-bar",
  }

  const animation = useAnimation({ ref, isActive, elementIds })

  const styles = {
    mobile: "max-md:flex-col max-md:items-center  max-md:justify-center max-md:gap-1",
    radius: "rounded-lg rounded-es-none md:rounded-ss-none max-md:rounded-ee-none",
  }

  return (
    <Tag
      {...props}
      data-active={isActive}
      href={item.url || null}
      className={cn(
        className,
        "text-sidebar-foreground group/menu-item relative z-10 flex h-auto cursor-pointer gap-3 overflow-hidden rounded-none bg-transparent! p-3",
        styles.mobile,
      )}
      onClick={item.action}
      onMouseEnter={animation.play}
      onMouseLeave={animation.reverse}
      ref={ref}
    >
      <item.Icon data-active={isActive} id={elementIds.icon.replace("#", "")} className="data-[active=true]:fill-secondary-green" />

      <div
        id={elementIds.text.replace("#", "")}
        data-active={isActive}
        className="text-preset-5-bold md:text-preset-3 data-[active=true]:text-sidebar-accent-foreground max-sm-8:hidden"
      >
        {item.title}
      </div>

      <div
        id={elementIds.bar.replace("#", "")}
        data-active={isActive}
        className="bg-secondary-green absolute h-[4px] w-full opacity-0 data-[active=true]:opacity-100 max-md:bottom-0 md:left-0 md:h-full md:w-[4px]"
      />

      <div
        id={elementIds.overlay.replace("#", "")}
        data-active={isActive}
        className={cn("bg-sidebar-accent absolute left-0 -z-10 h-full w-full opacity-0 data-[active=true]:opacity-100", styles.radius)}
      />
    </Tag>
  )
}

// ==================================================================
// ========================= ANIMATION HOOK =========================
// ==================================================================

function useAnimation({
  isActive,
  elementIds,
  ref,
}: {
  isActive: boolean
  elementIds: ElementIds
  ref: React.RefObject<HTMLElement | null>
}) {
  const timeline = useRef<GSAPTimeline | null>(null)

  const { state } = useSidebar()

  const getSplitTextDuration = (length: number, duration: number) => {
    return duration * (0.018 * length + 0.088)
  }

  const desktopAnimation = () => {
    if (isActive) return

    const split = SplitText.create(elementIds.text, { type: "chars" })

    const duration = state === "collapsed" ? 0.25 : 0.5

    timeline.current = gsap
      .timeline({ defaults: { duration }, paused: true })
      .fromTo(elementIds.overlay, { xPercent: -100 }, { xPercent: 0, duration: 0.35 })
      .fromTo(elementIds.icon, { fill: "var(--sidebar-foreground)" }, { fill: "var(--secondary-green)", duration: 0.001 }, 0.01)
      .fromTo(elementIds.bar, { xPercent: -100 }, { xPercent: 0, ease: "back.inOut" }, 0.02)
      .fromTo(
        split.chars,
        { color: "var(--sidebar-foreground)" },
        {
          color: "var(--sidebar-accent-foreground)",
          stagger: 0.01,
          duration: getSplitTextDuration(split.chars.length, 0.35),
        },
        0.01,
      )
  }

  const mobileAnimation = () => {
    if (isActive) return

    const duration = 0.3

    timeline.current = gsap
      .timeline({ defaults: { duration }, paused: true })
      .fromTo(elementIds.overlay, { yPercent: 100 }, { yPercent: 0 })
      .fromTo(elementIds.text, { color: "var(--sidebar-foreground)" }, { color: "var(--sidebar-accent-foreground)", duration: 0.1 }, 0.1)
      .fromTo(elementIds.icon, { fill: "var(--sidebar-foreground)" }, { fill: "var(--secondary-green)", duration: 0.01 }, 0.1)
      .fromTo(elementIds.bar, { yPercent: 100 }, { yPercent: 0 }, 0.2)
  }

  const { contextSafe } = useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add("(min-width: 768px)", desktopAnimation)
      mm.add("(max-width: 767.5px)", mobileAnimation)

      return () => {
        mm.revert()
      }
    },
    {
      dependencies: [isActive, state],
      scope: ref,
      revertOnUpdate: true,
    },
  )

  const play = contextSafe(() => {
    gsap.set([elementIds.overlay, elementIds.bar], { opacity: 1 })

    timeline.current?.play()
  })

  const reverse = contextSafe(() => {
    if (isActive) return

    timeline.current?.reverse()
  })

  return { play, reverse }
}
