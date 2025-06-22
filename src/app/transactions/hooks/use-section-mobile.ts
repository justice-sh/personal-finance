import { useResizeObserver } from "usehooks-ts"

export function useSectionMobile(parentRef: React.RefObject<HTMLDivElement | null>) {
  const { width = 0 } = useResizeObserver({ ref: parentRef as any, box: "border-box" })
  const isMobile = width < 600

  return isMobile
}
