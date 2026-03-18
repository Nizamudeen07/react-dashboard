import { NavLink } from 'react-router-dom'

const NAV = [
  {
    label: 'Dashboard',
    to: '/',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1.5" />
        <rect x="14" y="3" width="7" height="7" rx="1.5" />
        <rect x="3" y="14" width="7" height="7" rx="1.5" />
        <rect x="14" y="14" width="7" height="7" rx="1.5" />
      </svg>
    ),
  },
  {
    label: 'Users',
    to: '/users',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="7" r="4" />
        <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        <path d="M21 21v-2a4 4 0 0 0-3-3.85" />
      </svg>
    ),
  },
  {
    label: 'Analytics',
    to: '/analytics',
    badge: 'Soon',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
  },
  {
    label: 'Settings',
    to: '/settings',
    badge: 'Soon',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
        <path d="M4.93 4.93a10 10 0 0 0 0 14.14" />
        <path d="M12 2v2m0 16v2M2 12h2m16 0h2" />
      </svg>
    ),
  },
]

const baseNavItem = 'group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-text-secondary transition hover:bg-bg-hover hover:text-text-primary'
const activeNavItem = 'bg-accent-dim text-accent'

export default function Sidebar({ open, onClose }) {
  return (
    <>
      {open && <div className="fixed inset-0 z-[99] bg-black/60 backdrop-blur-[2px] md:hidden" onClick={onClose} />}
      <aside
        className={[
          'fixed inset-y-0 left-0 z-[100] flex w-[260px] flex-col border-r border-border bg-bg-surface transition duration-300 ease-out',
          open ? 'translate-x-0 shadow-[0_8px_32px_rgba(0,0,0,0.5)]' : '-translate-x-full md:translate-x-0',
        ].join(' ')}
      >
        <div className="flex h-16 items-center gap-3 border-b border-border-light px-5">
          <div className="h-8 w-8 shrink-0">
            <svg viewBox="0 0 32 32" fill="none">
              <rect width="32" height="32" rx="10" fill="var(--color-accent)" />
              <path d="M8 16l6 6 10-12" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="font-display text-[1.05rem] font-extrabold tracking-[-0.02em] text-text-primary">AdminPulse</span>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4">
          <div className="flex flex-col gap-0.5">
            <span className="px-2 pb-2 text-[10px] font-bold uppercase tracking-[0.1em] text-text-muted">Menu</span>
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === '/'}
                onClick={onClose}
                className={({ isActive }) => `${baseNavItem} ${isActive ? activeNavItem : ''}`}
              >
                <span className="h-[18px] w-[18px] shrink-0 [&>svg]:h-full [&>svg]:w-full">{item.icon}</span>
                <span className="flex-1">{item.label}</span>
                {item.badge && (
                  <span className="rounded-full border border-border bg-bg-hover px-1.5 py-0.5 text-[10px] font-bold text-text-muted">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            ))}
          </div>
        </nav>

        <div className="flex items-center gap-3 border-t border-border-light px-5 py-4">
          <div className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full border border-accent-glow bg-accent-dim font-display text-[11px] font-extrabold text-accent">
            AP
          </div>
          <div className="min-w-0">
            <div className="truncate text-[0.8rem] font-semibold text-text-primary">Admin User</div>
            <div className="text-[0.72rem] text-text-muted">Super Admin</div>
          </div>
        </div>
      </aside>
    </>
  )
}
