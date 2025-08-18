import ArrowRightFilledIcon from "@/shared/icons/arrow-right-filled"
import { Button } from "@/shared/components/ui/button"
import { cn } from "@/shared/lib/utils"
import gsap from "gsap"

export function Pagination({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
  className,
}: {
  totalItems: number
  itemsPerPage: number
  currentPage: number
  onPageChange: (page: number) => void
  className?: string
}) {
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  const IDs = {
    content: "pagination-content",
  }

  const handlePageChange = (page: number) => {
    onPageChange(page)
    animatePagination(totalPages, page, `#${IDs.content}`)
  }

  if (totalPages < 2) return null

  return (
    <div className={cn("mt-4 flex items-center justify-between", className)}>
      <Button disabled={currentPage < 2} onClick={() => handlePageChange(currentPage - 1)} variant="outline">
        <ArrowRightFilledIcon className="rotate-180" /> Prev
      </Button>

      <div className="max-sm-8:hidden relative h-10 w-full max-w-[240px] overflow-hidden">
        <div id={IDs.content} className="absolute flex h-full w-full gap-2">
          {Array.from({ length: totalPages }, (_, index) => (
            <Button
              key={index}
              onClick={() => handlePageChange(index + 1)}
              variant={currentPage === index + 1 ? "default" : "outline"}
            >
              {index + 1}
            </Button>
          ))}
        </div>
      </div>

      <Button disabled={currentPage >= totalPages} onClick={() => handlePageChange(currentPage + 1)} variant="outline">
        Next <ArrowRightFilledIcon />
      </Button>
    </div>
  )
}

function animatePagination(totalPages: number, page: number, selector: string) {
  const buttonWidth = 40
  const gap = 8
  const itemFullWidth = buttonWidth + gap

  const containerWidth = 200

  let xPosition = 0

  if (totalPages > 1) {
    const allItemsWidth = totalPages * itemFullWidth - gap

    if (allItemsWidth <= containerWidth) {
      xPosition = 0
    } else {
      const targetScrollX = (page - 1) * itemFullWidth - containerWidth / 2 + buttonWidth / 2

      xPosition = Math.max(0, targetScrollX)
      xPosition = Math.min(xPosition, allItemsWidth - containerWidth)
    }
  }

  gsap.to(selector, {
    x: -xPosition,
    duration: 0.3,
    ease: "power2.out",
  })
}
