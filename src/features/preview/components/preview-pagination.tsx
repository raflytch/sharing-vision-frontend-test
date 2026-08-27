
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"

type PreviewPaginationProps = {
  currentPage: number
  totalPages: number
}

export function PreviewPagination({ currentPage, totalPages }: PreviewPaginationProps) {
  if (totalPages <= 1) return null

  return (
    <Pagination className="mt-10 justify-between">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href={currentPage > 1 ? `/preview?page=${currentPage - 1}` : undefined} aria-disabled={currentPage === 1} className={currentPage === 1 ? "pointer-events-none opacity-40" : undefined} />
        </PaginationItem>
      </PaginationContent>
      <PaginationContent>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
          <PaginationItem key={page}>
            <PaginationLink href={`/preview?page=${page}`} isActive={page === currentPage} aria-label={`Go to page ${page}`}>{page}</PaginationLink>
          </PaginationItem>
        ))}
      </PaginationContent>
      <PaginationContent>
        <PaginationItem>
          <PaginationNext href={currentPage < totalPages ? `/preview?page=${currentPage + 1}` : undefined} aria-disabled={currentPage === totalPages} className={currentPage === totalPages ? "pointer-events-none opacity-40" : undefined} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
