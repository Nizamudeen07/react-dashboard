export function Skeleton({ width = '100%', height = 16, radius = 6, className = '', style }) {
  return (
    <div
      className={`shimmer-bg ${className}`}
      style={{ width, height, borderRadius: radius, ...style }}
      aria-hidden="true"
    />
  )
}

export function UserRowSkeleton() {
  return (
    <div className="flex items-center gap-4 border-b border-border-light px-5 py-4 last:border-b-0">
      <div className="shimmer-bg h-10 w-10 shrink-0 rounded-full" />
      <div className="min-w-0 flex-1">
        <Skeleton width={140} height={14} />
        <Skeleton width={180} height={12} className="mt-1.5" />
      </div>
      <Skeleton width={80} height={12} className="hidden md:block" />
      <Skeleton width={100} height={12} className="hidden md:block" />
      <Skeleton width={60} height={24} radius={999} />
    </div>
  )
}

export function UserCardSkeleton() {
  return (
    <div className="surface-card p-6">
      <div className="shimmer-bg mx-auto h-[72px] w-[72px] rounded-full" />
      <Skeleton width={120} height={14} style={{ margin: '12px auto 6px' }} />
      <Skeleton width={160} height={12} style={{ margin: '0 auto' }} />
      <div className="mt-3 flex flex-col gap-1.5">
        <Skeleton width="100%" height={12} />
        <Skeleton width="80%" height={12} />
      </div>
    </div>
  )
}
