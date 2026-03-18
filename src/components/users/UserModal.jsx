import { memo, useCallback, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { useUser } from '../../hooks/useUsers'
import Spinner from '../ui/Spinner'

function InfoRow({ label, value, icon }) {
  return (
    <div className="flex items-start gap-2.5 border-b border-border-light py-2 last:border-b-0 last:pb-0">
      <span className="mt-0.5 flex h-3.5 w-3.5 shrink-0 text-text-muted [&>svg]:h-full [&>svg]:w-full">
        {icon}
      </span>
      <div>
        <span className="block text-[10px] font-semibold uppercase tracking-[0.05em] text-text-muted">
          {label}
        </span>
        <span className="block break-all text-[0.8rem] font-medium text-text-primary">
          {value || '-'}
        </span>
      </div>
    </div>
  )
}

const UserModal = memo(function UserModal({ userId, onClose }) {
  const { data: user, isLoading, isError, error } = useUser(userId)
  const scrollContainerRef = useRef(null)

  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0
    }
  }, [userId])

  const handleBackdrop = useCallback((e) => {
    if (e.target === e.currentTarget) onClose()
  }, [onClose])

  const getInitials = (firstName, lastName) =>
    `${firstName?.[0] ?? ''}${lastName?.[0] ?? ''}`.toUpperCase()

  const roleColors = {
    admin: 'var(--color-accent)',
    moderator: 'var(--color-sky)',
    user: 'var(--color-emerald)',
  }

  const modalContent = (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden bg-[rgba(5,6,10,0.85)] px-3 py-4 backdrop-blur-[6px] animate-fade-in sm:px-4 sm:py-6"
      onClick={handleBackdrop}
      role="dialog"
      aria-modal="true"
      aria-label="User details"
    >
      <div className="relative flex w-full max-w-[720px] flex-col overflow-hidden rounded-[24px] border border-border bg-bg-surface shadow-[0_8px_32px_rgba(0,0,0,0.5),0_0_60px_rgba(108,99,255,0.1)] animate-modal-in max-h-[min(88vh,860px)]">
        <button
          className="absolute right-4 top-4 z-20 flex h-8 w-8 items-center justify-center rounded-md border border-border bg-bg-elevated text-text-secondary transition hover:border-rose hover:bg-rose-dim hover:text-rose"
          onClick={onClose}
          aria-label="Close"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="h-4 w-4">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {isLoading && (
          <div className="flex min-h-[200px] flex-col items-center justify-center gap-4 px-8 py-16">
            <Spinner size={36} />
            <p className="text-sm text-text-secondary">Loading profile...</p>
          </div>
        )}

        {isError && (
          <div className="flex min-h-[200px] flex-col items-center justify-center gap-4 px-8 py-16 text-center">
            <div className="text-[2.5rem]">!</div>
            <p className="max-w-[300px] text-sm text-text-secondary">
              {error?.message || 'Failed to load user'}
            </p>
            <button
              className="rounded-xl border border-border bg-bg-elevated px-5 py-2 text-[0.8rem] text-text-primary transition hover:bg-bg-hover"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        )}

        {user && (
          <div
            ref={scrollContainerRef}
            className="min-h-0 flex-1 overflow-y-auto p-5 pr-3 sm:p-7 sm:pr-4"
          >
            <div className="mb-5 flex flex-col gap-5 border-b border-border-light pb-6 sm:flex-row sm:items-center sm:text-left">
              <div className="shrink-0">
                {user.image ? (
                  <img
                    src={user.image}
                    alt={`${user.firstName} ${user.lastName}`}
                    className="h-[72px] w-[72px] rounded-full border-2 border-border object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none'
                      e.target.nextSibling.style.display = 'flex'
                    }}
                  />
                ) : null}
                <div
                  className="flex h-[72px] w-[72px] items-center justify-center rounded-full border-2 border-accent-glow bg-accent-dim font-display text-xl font-extrabold text-accent"
                  style={{ display: user.image ? 'none' : 'flex' }}
                >
                  {getInitials(user.firstName, user.lastName)}
                </div>
              </div>

              <div className="flex-1 text-center sm:text-left">
                <h2 className="font-display text-[1.35rem] font-extrabold tracking-[-0.02em] text-text-primary">
                  {user.firstName} {user.lastName}
                </h2>
                <p className="my-1 text-[0.8rem] text-text-muted">@{user.username}</p>
                <div className="flex flex-wrap justify-center gap-1.5 sm:justify-start">
                  <span
                    className="rounded-full px-2.5 py-[3px] text-[11px] font-bold capitalize"
                    style={{
                      color: roleColors[user.role] || 'var(--color-text-secondary)',
                      background: `${roleColors[user.role] || 'var(--color-text-secondary)'}18`,
                    }}
                  >
                    {user.role || 'user'}
                  </span>
                  <span className="rounded-full border border-border bg-bg-hover px-2.5 py-[3px] text-[11px] font-semibold text-text-muted">
                    Age {user.age}
                  </span>
                </div>
              </div>
            </div>

            <div className="mb-6 grid grid-cols-2 overflow-hidden rounded-xl border border-border-light bg-border-light sm:grid-cols-4">
              {[
                { label: 'Blood Type', value: user.bloodGroup, color: 'var(--color-rose)' },
                { label: 'Height', value: user.height ? `${user.height} cm` : null, color: 'var(--color-sky)' },
                { label: 'Weight', value: user.weight ? `${user.weight} kg` : null, color: 'var(--color-emerald)' },
                { label: 'EyeColor', value: user.eyeColor, color: 'var(--color-amber)' },
              ].map(({ label, value, color }) => (
                <div key={label} className="flex flex-col items-center gap-1 bg-bg-elevated px-3 py-3.5 text-center">
                  <span className="font-display text-[0.95rem] font-bold" style={{ color }}>
                    {value || '-'}
                  </span>
                  <span className="text-[10px] font-medium uppercase tracking-[0.05em] text-text-muted">
                    {label}
                  </span>
                </div>
              ))}
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              <div className="surface-elevated p-4">
                <h3 className="mb-3.5 flex items-center gap-1.5 font-display text-xs font-bold uppercase tracking-[0.08em] text-text-muted">
                  <span className="flex h-3.5 w-3.5 items-center [&>svg]:h-full [&>svg]:w-full">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </span>
                  Contact
                </h3>
                <InfoRow
                  label="Email"
                  value={user.email}
                  icon={(
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  )}
                />
                <InfoRow
                  label="Phone"
                  value={user.phone}
                  icon={(
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.15 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.06 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  )}
                />
                <InfoRow
                  label="Birth Date"
                  value={user.birthDate}
                  icon={(
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2" />
                      <line x1="16" y1="2" x2="16" y2="6" />
                      <line x1="8" y1="2" x2="8" y2="6" />
                      <line x1="3" y1="10" x2="21" y2="10" />
                    </svg>
                  )}
                />
              </div>

              <div className="surface-elevated p-4">
                <h3 className="mb-3.5 flex items-center gap-1.5 font-display text-xs font-bold uppercase tracking-[0.08em] text-text-muted">
                  <span className="flex h-3.5 w-3.5 items-center [&>svg]:h-full [&>svg]:w-full">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  </span>
                  Address
                </h3>
                <InfoRow
                  label="City"
                  value={user.address?.city}
                  icon={(
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                      <polyline points="9 22 9 12 15 12 15 22" />
                    </svg>
                  )}
                />
                <InfoRow
                  label="State"
                  value={user.address?.state}
                  icon={(
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="3 11 22 2 13 21 11 13 3 11" />
                    </svg>
                  )}
                />
                <InfoRow
                  label="Country"
                  value={user.address?.country}
                  icon={(
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="2" y1="12" x2="22" y2="12" />
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                    </svg>
                  )}
                />
              </div>

              <div className="surface-elevated p-4">
                <h3 className="mb-3.5 flex items-center gap-1.5 font-display text-xs font-bold uppercase tracking-[0.08em] text-text-muted">
                  <span className="flex h-3.5 w-3.5 items-center [&>svg]:h-full [&>svg]:w-full">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="7" width="20" height="14" rx="2" />
                      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                    </svg>
                  </span>
                  Work
                </h3>
                <InfoRow
                  label="Company"
                  value={user.company?.name}
                  icon={(
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z" />
                      <path d="M6 12H4a2 2 0 0 0-2 2v8h4" />
                      <path d="M18 9h2a2 2 0 0 1 2 2v11h-4" />
                      <path d="M10 6h4" />
                      <path d="M10 10h4" />
                      <path d="M10 14h4" />
                      <path d="M10 18h4" />
                    </svg>
                  )}
                />
                <InfoRow
                  label="Title"
                  value={user.company?.title}
                  icon={(
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 20h9" />
                      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                    </svg>
                  )}
                />
                <InfoRow
                  label="Dept"
                  value={user.company?.department}
                  icon={(
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  )}
                />
              </div>

              <div className="surface-elevated p-4">
                <h3 className="mb-3.5 flex items-center gap-1.5 font-display text-xs font-bold uppercase tracking-[0.08em] text-text-muted">
                  <span className="flex h-3.5 w-3.5 items-center [&>svg]:h-full [&>svg]:w-full">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="5" width="20" height="14" rx="2" />
                      <line x1="2" y1="10" x2="22" y2="10" />
                    </svg>
                  </span>
                  Finance
                </h3>
                <InfoRow
                  label="Bank"
                  value={user.bank?.cardType}
                  icon={(
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="5" width="20" height="14" rx="2" />
                      <line x1="2" y1="10" x2="22" y2="10" />
                    </svg>
                  )}
                />
                <InfoRow
                  label="Currency"
                  value={user.bank?.currency}
                  icon={(
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 8v8m-4-4h8" />
                    </svg>
                  )}
                />
                <InfoRow
                  label="IBAN"
                  value={user.bank?.iban ? `****${user.bank.iban.slice(-4)}` : null}
                  icon={(
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
                      <rect x="5" y="2" width="14" height="20" rx="2" />
                      <path d="M12 18h.01" />
                    </svg>
                  )}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )

  return createPortal(modalContent, document.body)
})

export default UserModal
