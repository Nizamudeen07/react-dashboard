import { useCallback, useMemo, useState } from 'react'
import SearchBar from '../components/users/SearchBar'
import UserModal from '../components/users/UserModal'
import UserTable from '../components/users/UserTable'
import Pagination from '../components/ui/Pagination'
import Spinner from '../components/ui/Spinner'
import { useDebounce } from '../hooks/useDebounce'
import { useUsers } from '../hooks/useUsers'

const PAGE_SIZE = 10

export default function Users() {
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [selectedUserId, setSelectedUserId] = useState(null)

  const debouncedSearch = useDebounce(search, 400)

  const { data, isLoading, isError, error, isFetching, isPlaceholderData } = useUsers({
    page,
    limit: PAGE_SIZE,
    search: debouncedSearch,
  })

  const totalPages = useMemo(() => {
    if (!data?.total) return 0
    return Math.ceil(data.total / PAGE_SIZE)
  }, [data?.total])

  const handleSearch = useCallback((value) => {
    setSearch(value)
    setPage(1)
  }, [])

  const handlePageChange = useCallback((newPage) => {
    setPage(newPage)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const handleUserClick = useCallback((id) => setSelectedUserId(id), [])
  const handleModalClose = useCallback(() => setSelectedUserId(null), [])

  return (
    <div className="flex animate-fade-in flex-col gap-5">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl font-extrabold tracking-[-0.03em] text-text-primary">User Management</h2>
          <p className="mt-0.5 text-sm text-text-secondary">
            {data?.total ? `${data.total.toLocaleString()} users total` : 'Browse and manage all users'}
          </p>
        </div>
        {isFetching && !isLoading && (
          <div className="flex items-center gap-2 rounded-full border border-border bg-bg-elevated px-3 py-1.5 text-xs text-text-muted">
            <Spinner size={16} />
            <span>Updating...</span>
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <SearchBar value={search} onChange={handleSearch} />
        <div className="ml-auto flex flex-wrap items-center gap-4">
          {debouncedSearch && data && (
            <span className="whitespace-nowrap text-[0.8rem] font-medium text-text-secondary">
              {data.total === 0 ? 'No results' : `${data.total} result${data.total !== 1 ? 's' : ''}`}
            </span>
          )}
          <div className="whitespace-nowrap text-xs text-text-muted">
            {data?.total > 0 && <span>Page {page} of {totalPages}</span>}
          </div>
        </div>
      </div>

      {isError && (
        <div className="flex items-start gap-4 rounded-2xl border border-rose/20 bg-rose-dim px-6 py-5">
          <div className="mt-0.5 h-[22px] w-[22px] shrink-0 text-rose [&>svg]:h-full [&>svg]:w-full">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <div>
            <p className="mb-0.5 text-[0.9rem] font-bold text-rose">Failed to load users</p>
            <p className="text-[0.8rem] text-text-secondary">
              {error?.message || 'Please check your connection and try again.'}
            </p>
          </div>
        </div>
      )}

      {!isLoading && !isError && data?.users?.length === 0 && (
        <div className="surface-card flex flex-col items-center justify-center px-8 py-20 text-center">
          <div className="mb-4 flex h-[52px] w-[52px] items-center justify-center rounded-2xl border border-border bg-bg-elevated text-text-muted [&>svg]:h-[26px] [&>svg]:w-[26px]">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </div>
          <h3 className="mb-1.5 font-display text-base font-bold text-text-primary">No users found</h3>
          <p className="mb-5 text-[0.85rem] text-text-secondary">Try adjusting your search query.</p>
          <button
            className="rounded-xl border border-border bg-bg-elevated px-5 py-2 text-[0.85rem] font-medium text-text-primary transition hover:border-text-muted hover:bg-bg-hover"
            onClick={() => handleSearch('')}
          >
            Clear search
          </button>
        </div>
      )}

      {(isLoading || data?.users?.length > 0) && (
        <UserTable users={data?.users ?? []} isLoading={isLoading} onUserClick={handleUserClick} />
      )}

      {!isError && totalPages > 1 && (
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          isPlaceholder={isPlaceholderData}
        />
      )}

      {selectedUserId && <UserModal userId={selectedUserId} onClose={handleModalClose} />}
    </div>
  )
}
