export function Skeleton({ className }) {
  return (
    <div
      className={[
        'animate-pulse rounded-xl bg-white/10 dark:bg-black/20',
        className ?? '',
      ].join(' ')}
    />
  )
}

