import { useCallback, useMemo } from 'react'

export default function Pagination({ page, totalPages, onPageChange, isPlaceholder }) {
  const pages = useMemo(() => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1)
    if (page <= 4) return [1, 2, 3, 4, 5, '...', totalPages]
    if (page >= totalPages - 3) return [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages]
    return [1, '...', page - 1, page, page + 1, '...', totalPages]
  }, [page, totalPages])

  const handlePrev = useCallback(() => onPageChange(page - 1), [page, onPageChange])
  const handleNext = useCallback(() => onPageChange(page + 1), [page, onPageChange])

  if (totalPages <= 1) return null

  return (
    <div className="flex items-center justify-center gap-2 px-5 py-5">
      <button
        className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-bg-surface text-text-secondary transition hover:border-text-muted hover:bg-bg-hover hover:text-text-primary disabled:cursor-not-allowed disabled:opacity-35"
        onClick={handlePrev}
        disabled={page === 1 || isPlaceholder}
        aria-label="Previous page"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      <div className="flex items-center gap-1">
        {pages.map((p, i) =>
          p === '...' ? (
            <span key={`ellipsis-${i}`} className="select-none px-0.5 text-sm text-text-muted">...</span>
          ) : (
            <button
              key={p}
              className={[
                'h-8 min-w-8 rounded-lg px-1 text-sm font-medium transition disabled:cursor-not-allowed disabled:opacity-40',
                p === page ? 'bg-accent font-bold text-white' : 'text-text-secondary hover:bg-bg-hover hover:text-text-primary',
              ].join(' ')}
              onClick={() => onPageChange(p)}
              disabled={isPlaceholder}
              aria-label={`Page ${p}`}
              aria-current={p === page ? 'page' : undefined}
            >
              {p}
            </button>
          )
        )}
      </div>

      <button
        className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-bg-surface text-text-secondary transition hover:border-text-muted hover:bg-bg-hover hover:text-text-primary disabled:cursor-not-allowed disabled:opacity-35"
        onClick={handleNext}
        disabled={page === totalPages || isPlaceholder}
        aria-label="Next page"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    </div>
  )
}
