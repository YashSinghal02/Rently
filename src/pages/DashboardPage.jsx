import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import gsap from 'gsap'
import { useAppDispatch, useAppSelector } from '../redux/hooks.js'
import { fetchCars, selectCars } from '../redux/cars/carsSlice.js'
import {
  cancelBooking,
  fetchBookings,
  selectBookings,
  selectBookingsStatus,
} from '../redux/bookings/bookingsSlice.js'
import { Button } from '../components/common/Button.jsx'
import { SkeletonCard } from '../components/common/SkeletonCard.jsx'
import { formatMoney } from '../utils/formatters.js'
import { LoginModal } from '../components/auth/LoginModal.jsx'

const formatDate = (iso) => {
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
    })
  } catch {
    return iso
  }
}

export function DashboardPage() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const openLogin = searchParams.get('login') === '1'

  const auth = useAppSelector((s) => s.auth)
  const cars = useAppSelector(selectCars)
  const bookings = useAppSelector(selectBookings)
  const bookingsStatus = useAppSelector(selectBookingsStatus)

  const [loginOpen, setLoginOpen] = useState(openLogin)
  const [statusFilter, setStatusFilter] = useState('all')

  useEffect(() => {
    if (!cars.length) dispatch(fetchCars())
  }, [dispatch, cars.length])

  useEffect(() => {
    // Load seed bookings once; do not overwrite newly created bookings.
    if (bookingsStatus === 'idle' && !bookings.length) {
      dispatch(fetchBookings())
    }
  }, [dispatch, bookingsStatus, bookings.length])

  useEffect(() => {
    if (!bookingsStatus || bookingsStatus === 'loading') return
    const els = Array.from(document.querySelectorAll('[data-cancel-cta]'))

    gsap.utils.toArray(els).forEach((el) => {
      const onEnter = () => gsap.to(el, { scale: 1.03, duration: 0.2 })
      const onLeave = () => gsap.to(el, { scale: 1, duration: 0.25 })

      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)

      return () => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
      }
    })
  }, [bookingsStatus])

  const myBookings = auth.user?.id
    ? bookings.filter((b) => b.userId === auth.user.id)
    : []

  const visible =
    statusFilter === 'all'
      ? myBookings
      : myBookings.filter((b) => b.status === statusFilter)

  const activeCount = myBookings.filter((b) => b.status === 'confirmed').length
  const carById = new Map(cars.map((c) => [c.id, c]))

  const doCancel = (id) => {
    dispatch(cancelBooking(id))
    toast.success('Booking cancelled')
  }

  return (
    <div className="space-y-8">

      {/* HEADER */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl sm:text-4xl font-semibold text-zinc-900 dark:text-white">
            Your dashboard
          </h1>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
            Manage bookings, view totals, and stay in control.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="rounded-2xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-white/5 px-4 py-2">
            <div className="text-xs text-zinc-500 dark:text-zinc-400">
              Active bookings
            </div>
            <div className="mt-1 text-sm font-semibold text-zinc-900 dark:text-white">
              {activeCount}
            </div>
          </div>

          <Button
          variant="ghost"
            onClick={() => navigate('/cars')}
            
          >
            Book another car
          </Button>
        </div>
      </div>

      {/* MAIN GRID */}
      <div className="grid gap-6 lg:grid-cols-[340px,1fr] items-start">

        {/* SIDEBAR */}
        <aside className="rounded-3xl p-5 sm:p-6 h-fit 
          lg:sticky lg:top-24 lg:z-10
          border border-zinc-200 dark:border-white/10 
          bg-white dark:bg-white/5 shadow-sm">

          <div className="text-sm font-semibold text-zinc-900 dark:text-white">
            Booking filters
          </div>

          <div className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
            Choose what you want to see.
          </div>

          <div className="mt-5">
            <div className="text-xs font-semibold text-zinc-700 dark:text-zinc-300">
              Status
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="mt-2 w-full rounded-xl border 
              border-zinc-200 dark:border-white/10 
              bg-white dark:bg-[#1a1a1a] 
              px-3 py-2 text-sm 
              text-zinc-900 dark:text-white"
            >
              <option value="all" className="text-black bg-white">All</option>
              <option value="confirmed" className="text-black bg-white">Confirmed</option>
              <option value="cancelled" className="text-black bg-white">Cancelled</option>
            </select>
          </div>
        </aside>

        {/* BOOKINGS */}
        <section className="space-y-6">

          {bookingsStatus === 'loading' ? (
            <div className="grid gap-5 sm:grid-cols-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : !auth.user?.id ? (
            <div className="rounded-3xl p-10 border border-zinc-200 dark:border-white/10 bg-white dark:bg-white/5">
              <div className="text-lg font-semibold text-zinc-900 dark:text-white">
                Welcome
              </div>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                Sign in to view your bookings.
              </p>
              <div className="mt-5">
                <Button variant="primary" onClick={() => setLoginOpen(true)}>
                  Sign in
                </Button>
              </div>
            </div>
          ) : visible.length ? (
            visible.map((b) => {
              const car = carById.get(b.carId)
              const canCancel = b.status === 'confirmed'

              return (
                <div key={b.id}
                  className="rounded-3xl p-5 sm:p-6 
                  border border-zinc-200 dark:border-white/10 
                  bg-white dark:bg-white/5 shadow-sm">

                  <div className="flex flex-col gap-4 md:flex-row md:justify-between">

                    <div className="flex gap-4">
                      <div className="h-20 w-28 rounded-2xl overflow-hidden 
                        border border-zinc-200 dark:border-white/10">

                        {car && (
                          <img
                            src={car.images[0]}
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>

                      <div>
                        <div className="text-sm font-semibold text-zinc-900 dark:text-white">
                          {car ? `${car.brand} ${car.name}` : b.carId}
                        </div>

                        <div className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
                          {formatDate(b.pickupDate)} → {formatDate(b.returnDate)}
                        </div>

                        <div className="text-xs text-zinc-600 dark:text-zinc-400">
                          {b.location}
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-xs text-zinc-600 dark:text-zinc-400">
                        Total
                      </div>

                      <div className="text-lg font-semibold text-[#3DAA7D]">
                        {formatMoney(b.total)}
                      </div>

                      <div className="text-xs text-zinc-600 dark:text-zinc-400">
                        {b.status}
                      </div>

                      <div className="mt-3">
                        {canCancel ? (
                          <Button variant="danger" onClick={() => doCancel(b.id)}>
                            Cancel
                          </Button>
                        ) : (
                          <Button variant="secondary">
                            View
                          </Button>
                        )}
                      </div>
                    </div>

                  </div>
                </div>
              )
            })
          ) : (
            <div className="rounded-3xl p-10 border border-zinc-200 dark:border-white/10 bg-white dark:bg-white/5">
              <div className="text-lg font-semibold text-zinc-900 dark:text-white">
                No bookings yet
              </div>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                Book a car to see it here.
              </p>
            </div>
          )}

        </section>
      </div>

      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </div>
  )
}