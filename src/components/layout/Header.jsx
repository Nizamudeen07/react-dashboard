import { useLocation } from 'react-router-dom'

const TITLES = {
  '/': 'Dashboard',
  '/users': 'User Management',
  '/analytics': 'Analytics',
  '/settings': 'Settings',
}

export default function Header({ onMenuClick }) {
  const location = useLocation()
  const title = TITLES[location.pathname] || 'AdminPulse'
  const isUsersDetail = location.pathname.startsWith('/users/') && location.pathname !== '/users'

  return (
    <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-border bg-bg-surface/95 px-4 backdrop-blur sm:px-6">
      <div className="flex items-center gap-3">
        <button
          className="flex h-[34px] w-[34px] items-center justify-center rounded-lg text-text-secondary transition hover:bg-bg-hover hover:text-text-primary md:hidden"
          onClick={onMenuClick}
          aria-label="Open menu"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" className="h-[18px] w-[18px]">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
        <h1 className="font-display text-[1.05rem] font-bold tracking-[-0.02em] text-text-primary">
          {isUsersDetail ? 'User Detail' : title}
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden items-center gap-1.5 rounded-full border border-emerald/20 bg-emerald-dim px-2.5 py-1 text-[11px] font-bold tracking-[0.05em] text-emerald sm:flex">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald animate-pulse-soft" />
          <span>Live</span>
        </div>
        <button
          className="relative flex h-[34px] w-[34px] items-center justify-center rounded-lg text-text-secondary transition hover:bg-bg-hover hover:text-text-primary"
          aria-label="Notifications"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="h-[18px] w-[18px]">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          <span className="absolute right-1.5 top-1.5 h-[7px] w-[7px] rounded-full border-[1.5px] border-bg-surface bg-rose" />
        </button>
      </div>
    </header>
  )
}
