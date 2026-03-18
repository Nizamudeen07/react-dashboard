import { memo, useCallback } from 'react'
import { UserRowSkeleton } from '../ui/Skeleton'

const ROLE_COLORS = {
  admin: { bg: 'var(--color-accent-dim)', color: 'var(--color-accent)' },
  moderator: { bg: 'var(--color-sky-dim)', color: 'var(--color-sky)' },
  user: { bg: 'var(--color-emerald-dim)', color: 'var(--color-emerald)' },
}

const UserRow = memo(function UserRow({ user, onClick }) {
  const initials = `${user.firstName?.[0] ?? ''}${user.lastName?.[0] ?? ''}`.toUpperCase()
  const role = user.role || 'user'
  const roleStyle = ROLE_COLORS[role] || ROLE_COLORS.user

  return (
    <tr
      className="group cursor-pointer border-b border-border-light transition last:border-b-0 hover:bg-bg-hover focus-within:bg-bg-hover"
      onClick={() => onClick(user.id)}
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick(user.id)}
      role="button"
      aria-label={`View ${user.firstName} ${user.lastName}`}
    >
      <td className="px-5 py-3.5 align-middle">
        <div className="flex items-center gap-3">
          <div className="flex h-[38px] w-[38px] shrink-0 items-center justify-center overflow-hidden rounded-full border-[1.5px] border-border bg-accent-dim font-display text-xs font-extrabold text-accent">
            {user.image ? (
              <img
                src={user.image}
                alt=""
                className="h-full w-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none'
                  e.target.nextSibling.style.display = 'flex'
                }}
              />
            ) : null}
            <span className="h-full w-full items-center justify-center" style={{ display: user.image ? 'none' : 'flex' }}>
              {initials}
            </span>
          </div>
          <div className="min-w-0">
            <span className="block truncate text-[0.85rem] font-semibold text-text-primary">
              {user.firstName} {user.lastName}
            </span>
            <span className="text-[0.72rem] text-text-muted">@{user.username}</span>
          </div>
        </div>
      </td>
      <td className="hidden px-5 py-3.5 align-middle md:table-cell">
        <span className="text-[0.8rem] text-text-secondary">{user.email}</span>
      </td>
      <td className="hidden px-5 py-3.5 align-middle xl:table-cell">
        <span className="text-[0.8rem] text-text-secondary">{user.phone}</span>
      </td>
      <td className="hidden px-5 py-3.5 align-middle xl:table-cell">
        <span className="text-[0.85rem] font-medium text-text-secondary">{user.age}</span>
      </td>
      <td className="px-5 py-3.5 align-middle">
        <span className="inline-flex whitespace-nowrap rounded-full px-2.5 py-[3px] text-[11px] font-bold capitalize" style={{ background: roleStyle.bg, color: roleStyle.color }}>
          {role}
        </span>
      </td>
      <td className="px-5 py-3.5 align-middle">
        <div className="h-5 w-5 -translate-x-1 text-text-muted opacity-0 transition duration-200 group-hover:translate-x-0 group-hover:opacity-100">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-full w-full">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </div>
      </td>
    </tr>
  )
})

export default function UserTable({ users, isLoading, onUserClick }) {
  const handleClick = useCallback((id) => onUserClick(id), [onUserClick])

  return (
    <div className="overflow-x-auto rounded-2xl border border-border bg-bg-surface">
      <table className="min-w-[480px] w-full border-collapse">
        <thead className="border-b border-border bg-bg-elevated">
          <tr>
            <th className="px-5 py-3 text-left font-display text-[10px] font-bold uppercase tracking-[0.1em] text-text-muted">User</th>
            <th className="hidden px-5 py-3 text-left font-display text-[10px] font-bold uppercase tracking-[0.1em] text-text-muted md:table-cell">Email</th>
            <th className="hidden px-5 py-3 text-left font-display text-[10px] font-bold uppercase tracking-[0.1em] text-text-muted xl:table-cell">Phone</th>
            <th className="hidden px-5 py-3 text-left font-display text-[10px] font-bold uppercase tracking-[0.1em] text-text-muted xl:table-cell">Age</th>
            <th className="px-5 py-3 text-left font-display text-[10px] font-bold uppercase tracking-[0.1em] text-text-muted">Role</th>
            <th className="px-5 py-3 text-left font-display text-[10px] font-bold uppercase tracking-[0.1em] text-text-muted" aria-hidden="true"></th>
          </tr>
        </thead>
        <tbody>
          {isLoading
            ? Array.from({ length: 8 }, (_, i) => (
                <tr key={i}>
                  <td colSpan={6} className="p-0">
                    <UserRowSkeleton />
                  </td>
                </tr>
              ))
            : users.map((user) => (
                <UserRow key={user.id} user={user} onClick={handleClick} />
              ))}
        </tbody>
      </table>
    </div>
  )
}
