import { cn } from "@/shared/lib/utils"

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

  return (
    <div className={cn("mt-4 flex items-center justify-between", className)}>
      <span className="text-sm text-gray-600">
        Page {currentPage} of {totalPages}
      </span>
      <div className="flex space-x-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => onPageChange(index + 1)}
            className={`rounded px-3 py-1 ${currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700"}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  )
}
