import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="mt-12 pb-10">
      <div className="container-page">
        <div
          className="rounded-3xl p-6 sm:p-8 shadow-sm
          border border-zinc-200 dark:border-white/10
          bg-white dark:bg-white/5 backdrop-blur-xl"
        >
          <div className="grid gap-8 md:grid-cols-3">

            {/* BRAND */}
            <div>
              <div className="text-lg font-semibold text-zinc-900 dark:text-white">
                Rently
              </div>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Premium rentals with a smooth, real-world booking experience.
              </p>
            </div>

            {/* LINKS */}
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                  Explore
                </div>
                <FooterLink to="/" label="Home" />
                <FooterLink to="/cars" label="Cars" />
              </div>

              <div className="space-y-3">
                <div className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                  Account
                </div>
                <FooterLink to="/dashboard" label="Dashboard" />
                <FooterLink to="/contact" label="Contact" />
              </div>
            </div>

            {/* INFO */}
            <div>
              <div className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
                Quick note
              </div>

              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Find and book the perfect car with ease using smart filters and a seamless experience.
              </p>

              <div className="mt-4 flex items-center gap-3">
                {/* <span
                  className="inline-flex h-9 w-9 items-center justify-center rounded-xl
                  border border-zinc-200 dark:border-white/10
                  bg-zinc-100 dark:bg-white/10"
                >
                  ✨
                </span> */}

                {/* <span className="text-sm text-zinc-600 dark:text-zinc-400">
                  Fast booking. Transparent pricing. Trusted rentals.
                </span> */}
              </div>
            </div>
          </div>

          {/* BOTTOM BAR */}
          <div
            className="mt-8 pt-5 flex flex-col sm:flex-row items-center justify-between gap-3
            border-t border-zinc-200 dark:border-white/10"
          >
            <div className="text-xs text-zinc-600 dark:text-zinc-400">
              © {new Date().getFullYear()} Rently. All rights reserved.
            </div>

            <div className="text-xs text-zinc-600 dark:text-zinc-400">
             Fast booking. Transparent pricing. Trusted rentals.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ to, label }) {
  return (
    <Link
      to={to}
      className="block text-sm text-zinc-700 dark:text-zinc-300
      hover:text-[#8b5cf6] dark:hover:text-[#8b5cf6]
      transition-colors duration-200"
    >
      {label}
    </Link>
  );
}