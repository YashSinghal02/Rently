import { Link } from 'react-router-dom'

export function Footer() {
  return (
    <footer className="mt-10 pb-10">
      <div className="container-page">
        <div className="glass-light rounded-3xl p-6 sm:p-8">
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <div className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                Rently
              </div>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                Premium rentals with a smooth, real-world booking experience.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              <div className="space-y-2">
                <div className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                  Explore
                </div>
                <FooterLink to="/" label="Home" />
                <FooterLink to="/cars" label="Cars" />
              </div>
              <div className="space-y-2">
                <div className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                  Account
                </div>
                <FooterLink to="/dashboard" label="Dashboard" />
                <button className="text-left text-sm text-zinc-700 dark:text-zinc-200 hover:text-violet-600 dark:hover:text-violet-400">
                  Support (mock)
                </button>
              </div>
            </div>
            <div>
              <div className="text-xs font-semibold text-zinc-500 dark:text-zinc-400">
                Quick note
              </div>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300">
                This is a production-style demo using mock JSON for cars & bookings.
              </p>
              <div className="mt-4 flex items-center gap-2">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-black/10 bg-white/80 dark:bg-white/5">
                  ✨
                </span>
                <span className="text-sm text-zinc-600 dark:text-zinc-300">
                  Dark/light mode persisted.
                </span>
              </div>
            </div>
          </div>
          <div className="mt-6 border-t border-black/10 dark:border-white/10 pt-5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-xs text-zinc-600 dark:text-zinc-300">
              © {new Date().getFullYear()} Rently. All rights reserved.
            </div>
            <div className="text-xs text-zinc-600 dark:text-zinc-300">
              Built with React, Redux Toolkit, Tailwind & GSAP.
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterLink({ to, label }) {
  return (
    <Link
      to={to}
      className="block text-sm text-zinc-700 dark:text-zinc-200 hover:text-violet-600 dark:hover:text-violet-400"
    >
      {label}
    </Link>
  )
}

