export default function Spinner({ size = 24, color = 'var(--color-accent)' }) {
  return (
    <div
      className="shrink-0 animate-spin-slow rounded-full border-2 border-solid"
      style={{ width: size, height: size, borderColor: `${color}30`, borderTopColor: color }}
      role="status"
      aria-label="Loading"
    />
  )
}
