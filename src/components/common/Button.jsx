import clsx from 'clsx'

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  ...props
}) {
  const variants = {
    primary:
'bg-gradient-to-r from-violet-500 via-violet-600 to-indigo-500 text-white border border-white/10 shadow-[0_10px_30px_-10px_rgba(139,92,246,0.5)] hover:scale-[0.98] transition-all duration-300',
    secondary:
      'bg-white/10 text-zinc-100 border border-white/15 hover:bg-white/15 dark:bg-white/5 dark:text-zinc-50',
    ghost:
  'bg-transparent text-zinc-700 hover:text-violet-500 border border-black/10 hover:bg-black/5 dark:text-zinc-100 dark:border-white/10 dark:hover:bg-white/10',
    light:
      'bg-white text-zinc-900 border border-black/10 hover:bg-white/90',
    danger:
      'bg-gradient-to-r from-rose-500 to-red-500 text-white border border-white/10',
  }

  const sizes = {
    sm: 'h-9 px-3 text-sm',
    md: 'h-11 px-4 text-sm',
    lg: 'h-12 px-5 text-base',
  }

  return (
    <button
      className={clsx(
        'focus-ring inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200',
        'disabled:opacity-60 disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    />
  )
}

