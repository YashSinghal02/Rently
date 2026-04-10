export function Field({ label, hint, children }) {
  return (
    <label className="block">
      {label ? (
        <div className="mb-2 text-sm font-medium text-zinc-800 dark:text-zinc-100">
          {label}
        </div>
      ) : null}

      {children}

      {hint ? (
        <div className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
          {hint}
        </div>
      ) : null}
    </label>
  )
}