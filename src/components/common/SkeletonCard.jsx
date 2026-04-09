import { Skeleton } from './Skeleton.jsx'

export function SkeletonCard() {
  return (
    <div className="card overflow-hidden">
      <div className="relative">
        <Skeleton className="h-44 w-full rounded-none" />
      </div>
      <div className="p-4 sm:p-5 space-y-3">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-5 w-48" />
        <Skeleton className="h-3 w-40" />
        <Skeleton className="h-3 w-28" />
      </div>
    </div>
  )
}

