export default function Placeholder({ title = 'Coming Soon', description = 'This feature is under development.' }) {
  return (
    <div className="flex min-h-[50vh] animate-fade-in flex-col items-center justify-center text-center">
      <div className="mb-4 rounded-full border border-amber/20 bg-amber-dim px-3 py-1 text-[11px] font-bold uppercase tracking-[0.08em] text-amber">
        In Progress
      </div>
      <h2 className="mb-2 font-display text-2xl font-extrabold tracking-[-0.03em] text-text-primary">{title}</h2>
      <p className="max-w-[300px] text-sm text-text-secondary">{description}</p>
    </div>
  )
}
