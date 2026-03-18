import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useUsers } from '../hooks/useUsers'

function StatCard({ label, value, delta, color, icon, loading }) {
  return (
    <div
      className="relative overflow-hidden rounded-2xl border border-border bg-bg-surface p-5 transition duration-200 hover:-translate-y-0.5 hover:shadow-panel"
      style={{ '--card-accent': color }}
    >
      <div className="absolute inset-x-0 top-0 h-0.5 rounded-t-[2px] bg-[var(--card-accent)]" />
      <div className="mb-3.5 flex items-center justify-between gap-3">
        <span className="text-[11px] font-bold uppercase tracking-[0.08em] text-text-muted">{label}</span>
        <span className="flex h-8 w-8 items-center justify-center rounded-md text-[var(--card-accent)] [background:color-mix(in_srgb,var(--card-accent)_12%,transparent)] [&>svg]:h-4 [&>svg]:w-4">
          {icon}
        </span>
      </div>
      <div className="mb-2 min-h-7 font-display text-[1.75rem] leading-none font-extrabold tracking-[-0.03em] text-text-primary">
        {loading ? <span className="shimmer-bg block h-7 w-20 rounded" /> : value}
      </div>
      {delta && (
        <div className="flex items-center gap-1 text-[11px] font-semibold text-emerald">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" className="h-3 w-3">
            <polyline points="18 15 12 9 6 15" />
          </svg>
          {delta}
        </div>
      )}
    </div>
  )
}

export default function Dashboard() {
  const { data, isLoading } = useUsers({ page: 1, limit: 10, search: '' })

  const stats = useMemo(() => {
    if (!data) return null
    const total = data.total || 0
    return {
      total,
      active: Math.round(total * 0.73),
      admins: Math.round(total * 0.08),
      newThisMonth: Math.round(total * 0.12),
    }
  }, [data])

  return (
    <div className="flex animate-fade-in flex-col gap-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="font-display text-2xl font-extrabold tracking-[-0.03em] text-text-primary">Overview</h2>
          <p className="mt-0.5 text-sm text-text-secondary">Welcome back - here's what's happening.</p>
        </div>
        <Link
          to="/users"
          className="inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2.5 text-[0.85rem] font-semibold text-white transition hover:bg-accent-hover hover:shadow-accent"
        >
          Manage Users
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </Link>
      </div>

      <div className="stagger grid grid-cols-2 gap-4 xl:grid-cols-4">
        <StatCard
          label="Total Users"
          value={stats?.total?.toLocaleString()}
          delta="12% this month"
          color="var(--color-accent)"
          loading={isLoading}
          icon={
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          }
        />
        <StatCard
          label="Active Users"
          value={stats?.active?.toLocaleString()}
          delta="8% this week"
          color="var(--color-emerald)"
          loading={isLoading}
          icon={
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
            </svg>
          }
        />
        <StatCard
          label="Admins"
          value={stats?.admins?.toLocaleString()}
          color="var(--color-sky)"
          loading={isLoading}
          icon={
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          }
        />
        <StatCard
          label="New This Month"
          value={stats?.newThisMonth?.toLocaleString()}
          delta="5% vs last month"
          color="var(--color-amber)"
          loading={isLoading}
          icon={
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
          }
        />
      </div>

      <div className="surface-card animate-fade-in p-6">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div>
            <h3 className="font-display text-[0.95rem] font-bold text-text-primary">User Activity</h3>
            <p className="mt-0.5 text-xs text-text-muted">Last 7 days</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-accent" />
            <span className="text-xs text-text-secondary">Registrations</span>
          </div>
        </div>
        <div className="flex h-[120px] items-end gap-2">
          {[65, 80, 45, 90, 72, 88, 60].map((h, i) => (
            <div key={i} className="flex h-full flex-1 flex-col items-center justify-end gap-1.5">
              <div
                className="w-full rounded-t bg-[linear-gradient(to_top,var(--color-accent),color-mix(in_srgb,var(--color-accent)_60%,var(--color-sky)))] opacity-0 [animation:bar-grow_0.5s_ease_forwards]"
                style={{ height: `${h}%`, animationDelay: `${i * 0.07}s` }}
              />
              <span className="text-[10px] font-semibold text-text-muted">
                {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'][i]}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="surface-card animate-fade-in p-6">
        <div className="mb-5 flex items-center justify-between gap-4">
          <h3 className="font-display text-[0.95rem] font-bold text-text-primary">Recent Users</h3>
          <Link to="/users" className="text-[0.8rem] font-semibold text-accent transition hover:text-accent-hover">
            View all {'->'}
          </Link>
        </div>

        <div className="flex flex-col">
          {isLoading
            ? Array.from({ length: 5 }, (_, i) => (
                <div key={i} className="mx-[-1.5rem] flex items-center gap-3 border-b border-border-light px-6 py-3 last:border-b-0">
                  <div className="shimmer-bg h-9 w-9 shrink-0 rounded-full" />
                  <div className="flex-1">
                    <div className="shimmer-bg h-3 w-[120px] rounded" />
                    <div className="shimmer-bg mt-[5px] h-2.5 w-[160px] rounded" />
                  </div>
                </div>
              ))
            : data?.users?.slice(0, 5).map((user) => (
                <Link
                  key={user.id}
                  to="/users"
                  className="mx-[-1.5rem] flex items-center gap-3 border-b border-border-light px-6 py-3 transition hover:bg-bg-hover last:border-b-0"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full border-[1.5px] border-border bg-accent-dim font-display text-[0.7rem] font-extrabold text-accent">
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
                      {user.firstName?.[0]}{user.lastName?.[0]}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="block truncate text-[0.85rem] font-semibold text-text-primary">
                      {user.firstName} {user.lastName}
                    </span>
                    <span className="block truncate text-xs text-text-muted">{user.email}</span>
                  </div>
                  <span className="rounded-full border border-border bg-bg-hover px-2 py-[3px] text-[11px] font-bold capitalize whitespace-nowrap text-text-muted">
                    {user.role || 'user'}
                  </span>
                </Link>
              ))}
        </div>
      </div>
    </div>
  )
}
