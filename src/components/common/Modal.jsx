import { createPortal } from 'react-dom'
import { useEffect } from 'react'
import clsx from 'clsx'

export function Modal({ open, onClose, title, children, className }) {
  useEffect(() => {
    if (!open) return
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose?.()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, onClose])

  if (!open) return null

  return createPortal(
    <div className="fixed inset-0 z-[100]">
      <button
        aria-label="Close modal"
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        className={clsx(
          'relative mx-auto mt-16 w-[min(720px,calc(100%-24px))] rounded-2xl',
          'glass p-6 sm:p-8',
          className,
        )}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            {title ? (
              <h2 className="text-lg font-semibold text-zinc-100/95 dark:text-zinc-100">
                {title}
              </h2>
            ) : null}
          </div>
          <button
            onClick={onClose}
            className="focus-ring rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-zinc-100 hover:bg-white/10 dark:bg-white/5"
          >
            Close
          </button>
        </div>
        <div className="mt-4">{children}</div>
      </div>
    </div>,
    document.body,
  )
}

