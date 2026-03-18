import { useRef } from 'react'

export default function SearchBar({ value, onChange, placeholder = 'Search users...' }) {
  const inputRef = useRef(null)

  return (
    <div className="relative flex max-w-[380px] flex-1 items-center">
      <span className="pointer-events-none absolute left-3.5 flex h-4 w-4 text-text-muted">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-full w-full">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
      </span>
      <input
        ref={inputRef}
        type="text"
        className="w-full rounded-xl border border-border bg-bg-elevated px-10 py-2.5 text-sm text-text-primary outline-none transition placeholder:text-text-muted focus:border-accent focus:bg-bg-surface focus:shadow-[0_0_0_3px_var(--color-accent-dim)]"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        aria-label={placeholder}
        autoComplete="off"
        spellCheck="false"
      />
      {value && (
        <button
          className="absolute right-2.5 flex h-[22px] w-[22px] items-center justify-center rounded-full bg-bg-hover text-text-muted transition hover:bg-rose-dim hover:text-rose"
          onClick={() => {
            onChange('')
            inputRef.current?.focus()
          }}
          aria-label="Clear search"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" className="h-3 w-3">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      )}
    </div>
  )
}
