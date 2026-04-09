import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
import { useSearchParams } from 'react-router-dom'

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
    dispatch(fetchBookings())
  }, [dispatch])

  useEffect(() => {
    if (!bookingsStatus || bookingsStatus === 'loading') return
    const els = Array.from(document.querySelectorAll('[data-cancel-cta]'))
    if (!els.length) return
    gsap.utils.toArray(els).forEach((el) => {
      gsap.set(el, { scale: 1 })
      const onEnter = () => gsap.to(el, { scale: 1.03, duration: 0.2, ease: 'power2.out' })
      const onLeave = () => gsap.to(el, { scale: 1, duration: 0.25, ease: 'power2.out' })
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
      return () => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
      }
    })
  }, [bookingsStatus])

  const myBookings = auth.user?.id ? bookings.filter((b) => b.userId === auth.user.id) : []
  const visible = statusFilter === 'all' ? myBookings : myBookings.filter((b) => b.status === statusFilter)
  const activeCount = myBookings.filter((b) => b.status === 'confirmed').length
  const carById = new Map(cars.map((c) => [c.id, c]))

  const doCancel = (id) => {
    dispatch(cancelBooking(id))
    toast.success('Booking cancelled')
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl sm:text-4xl font-semibold text-zinc-900 dark:text-zinc-100" data-reveal>
            Your dashboard
          </h1>
          <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-300" data-reveal>
            Manage bookings, view totals, and stay in control.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="rounded-2xl border border-black/10 bg-white/60 dark:bg-white/5 px-4 py-2">
            <div className="text-xs text-zinc-500 dark:text-zinc-400">Active bookings</div>
            <div className="mt-1 text-sm font-semibold text-zinc-900 dark:text-zinc-100">{activeCount}</div>
          </div>
          <Button variant="secondary" onClick={() => navigate('/cars')}>
            Book another car
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[340px,1fr] items-start">
        <aside className="card rounded-3xl p-5 sm:p-6 h-fit sticky top-24">
          <div className="text-sm font-semibold text-zinc-50">Booking filters</div>
          <div className="mt-1 text-xs text-zinc-100/70">
            Choose what you want to see.
          </div>
          <div className="mt-5 space-y-3">
            <label className="block">
              <div className="text-xs font-semibold text-zinc-100/85">Status</div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="mt-2 focus-ring w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-zinc-100"
              >
                <option value="all">All</option>
                <option value="confirmed">Confirmed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </label>
          </div>

          {!auth.user?.id ? (
            <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="text-sm font-semibold text-zinc-100/95">Sign in required</div>
              <div className="mt-1 text-xs text-zinc-100/70">
                Your bookings are stored under your mock user profile.
              </div>
              <div className="mt-4">
                <Button variant="primary" className="w-full" onClick={() => setLoginOpen(true)}>
                  Sign in
                </Button>
              </div>
            </div>
          ) : null}
        </aside>

        <section className="space-y-6">
          {bookingsStatus === 'loading' ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {Array.from({ length: 6 }).map((_, idx) => (
                <SkeletonCard key={idx} />
              ))}
            </div>
          ) : !auth.user?.id ? (
            <div className="card rounded-3xl p-10">
              <div className="text-lg font-semibold text-zinc-100/95">Welcome</div>
              <div className="mt-2 text-sm text-zinc-100/70">
                Sign in to view your bookings and manage them here.
              </div>
              <div className="mt-5">
                <Button variant="primary" onClick={() => setLoginOpen(true)}>
                  Sign in to dashboard
                </Button>
              </div>
            </div>
          ) : visible.length ? (
            <div className="space-y-4">
              {visible.map((b) => {
                const car = carById.get(b.carId)
                const canCancel = b.status === 'confirmed'
                return (
                  <div key={b.id} className="card rounded-3xl p-5 sm:p-6">
                    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                      <div className="flex items-center gap-4">
                        <div className="relative h-20 w-28 overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                          {car ? (
                            <img
                              src={car.images[0]}
                              alt={`${car.brand} ${car.name}`}
                              className="h-full w-full object-cover"
                              loading="lazy"
                            />
                          ) : (
                            <div className="h-full w-full" />
                          )}
                        </div>
                        <div>
                          <div className="text-sm font-semibold text-zinc-100/95">
                            {car ? `${car.brand} ${car.name}` : b.carId}
                          </div>
                          <div className="mt-1 text-xs text-zinc-100/70">
                            {formatDate(b.pickupDate)} → {formatDate(b.returnDate)}
                          </div>
                          <div className="mt-1 text-xs text-zinc-100/70">{b.location}</div>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:justify-end">
                        <div className="text-right">
                          <div className="text-xs text-zinc-100/70">Total</div>
                          <div className="text-lg font-semibold text-violet-200">
                            {formatMoney(b.total)}
                          </div>
                          <div className="mt-1 text-xs text-zinc-100/70">
                            {b.status === 'confirmed' ? 'Confirmed' : 'Cancelled'}
                          </div>
                        </div>

                        {canCancel ? (
                          <Button
                            variant="danger"
                            className="sm:w-auto"
                            data-cancel-cta
                            onClick={() => doCancel(b.id)}
                          >
                            Cancel
                          </Button>
                        ) : (
                          <Button variant="secondary" className="sm:w-auto" onClick={() => toast('Nothing to cancel')}>
                            View
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="card rounded-3xl p-10">
              <div className="text-lg font-semibold text-zinc-100/95">No bookings yet</div>
              <div className="mt-2 text-sm text-zinc-100/70">
                Confirm a booking from a car details page and it will show up here.
              </div>
              <div className="mt-5">
                <Button variant="primary" onClick={() => navigate('/cars')}>
                  Browse cars
                </Button>
              </div>
            </div>
          )}
        </section>
      </div>

      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </div>
  )
}

