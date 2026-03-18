import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] animate-fade-in flex-col items-center justify-center px-8 text-center">
      <div className="mb-4 bg-[linear-gradient(135deg,var(--color-accent),var(--color-sky))] bg-clip-text font-display text-[5rem] leading-none font-extrabold tracking-[-0.05em] text-transparent">
        404
      </div>
      <h2 className="mb-2 font-display text-[1.35rem] font-bold text-text-primary">Page not found</h2>
      <p className="mb-7 max-w-[300px] text-sm text-text-secondary">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-accent-hover hover:shadow-accent"
      >
        Go to Dashboard
      </Link>
    </div>
  )
}
