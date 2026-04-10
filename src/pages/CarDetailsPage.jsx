import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import gsap from 'gsap'
import { useAppDispatch, useAppSelector } from '../redux/hooks.js'
import { fetchCars, selectCars, selectCarsStatus } from '../redux/cars/carsSlice.js'
import { BookingForm } from '../components/booking/BookingForm.jsx'
import { CarImageGallery } from '../components/cars/CarImageGallery.jsx'
import { Button } from '../components/common/Button.jsx'
import { LoginModal } from '../components/auth/LoginModal.jsx'

export function CarDetailsPage() {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const { carId } = useParams()
  const [searchParams] = useSearchParams()
  const cars = useAppSelector(selectCars)
  const status = useAppSelector(selectCarsStatus)
  const auth = useAppSelector((s) => s.auth)
  const [loginOpen, setLoginOpen] = useState(false)

  const location = searchParams.get('location') || ''
  const pickup = searchParams.get('pickup') || ''
  const returnDate = searchParams.get('return') || ''

  useEffect(() => {
    if (!cars.length && status !== 'loading') dispatch(fetchCars())
  }, [dispatch, cars.length, status])

  const car = useMemo(() => cars.find((c) => c.id === carId), [cars, carId])

  useEffect(() => {
    gsap.fromTo(
      document.querySelectorAll('[data-details-reveal]'),
      { opacity: 0, y: 10, filter: 'blur(8px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.65, ease: 'power3.out', stagger: 0.06 },
    )
  }, [carId, cars.length])

  if (status === 'loading' || !cars.length) {
    return (
      <div className="space-y-8">
        <div className="card rounded-3xl p-10">
          <div className="text-lg font-semibold text-zinc-100/95">Loading car details…</div>
          <div className="mt-2 text-sm text-zinc-100/70">Preparing a premium gallery.</div>
        </div>
      </div>
    )
  }

  if (!car) {
    return (
      <div className="card rounded-3xl p-10">
        <div className="text-lg font-semibold text-zinc-100/95">Car not found</div>
        <div className="mt-2 text-sm text-zinc-100/70">This listing may have been removed.</div>
        <div className="mt-5">
          <Button variant="primary" onClick={() => navigate('/cars')}>
            Back to cars
          </Button>
        </div>
      </div>
    )
  }

  const canBookNow = Boolean(auth.user?.id)

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="text-sm font-semibold text-zinc-600 dark:text-zinc-300" data-details-reveal>
            {car.brand} • {car.type}
          </div>
          <h1 className="mt-2 text-3xl sm:text-4xl font-semibold text-zinc-900 dark:text-zinc-100" data-details-reveal>
            {car.name}
          </h1>
          <div className="mt-2 flex items-center gap-3" data-details-reveal>
            <div className="inline-flex items-center gap-1 rounded-xl border border-black/10 bg-white/60 dark:bg-white/5 px-3 py-2 text-sm text-zinc-800 dark:text-zinc-100">
              <span aria-hidden="true">★</span>
              <span className="font-semibold">{car.rating.toFixed(1)}</span>
              <span className="text-zinc-500 dark:text-zinc-400">({car.reviewsCount} reviews)</span>
            </div>
            <div className="text-sm text-zinc-600 dark:text-zinc-300">
              {car.seats} seats • {car.transmission}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
    variant="ghost"
    onClick={() => navigate('/cars')}
    
  >
    Back
  </Button>
          <Button
            variant="ghost"
            className="text-zinc-700 dark:text-zinc-300 
               hover:bg-zinc-100 dark:hover:bg-white/10"
            onClick={() =>
              toast(canBookNow ? 'You’re ready to book.' : 'Sign in to book this car.')
            }
          >
            {canBookNow ? 'Ready to book' : 'Sign in to book'}
          </Button>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1.35fr,0.65fr] items-start">
        <div className="space-y-6">
          <div data-details-reveal>
            <CarImageGallery images={car.images} />
          </div>

          <div className="card rounded-3xl p-6" data-details-reveal>
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-sm font-semibold text-zinc-900 dark:text-white ">Highlights</div>
                <div className="mt-1 text-xs text-zinc-900 dark:text-zinc-100/90">
                  Premium features that make every drive feel special.
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-zinc-900 dark:text-zinc-100/70">Daily price</div>
                <div className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">${car.dailyPrice}/day</div>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {car.highlights.map((h) => (
                <span
                  key={h}
                  className="rounded-xl border  dark:border-white/10 bg-black/5 dark:bg-white/5 px-3 py-2 text-xs text-zinc-900 dark:text-zinc-100/80"
                >
                  {h}
                </span>
              ))}
            </div>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {car.features.map((f) => (
                <div
                  key={f}
                  className="rounded-2xl border dark:border-white/10 bg-black/5 dark:bg-white/5 px-4 py-3 text-sm  text-zinc-900 dark:text-zinc-100/80"
                >
                  {f}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-5 lg:sticky lg:top-24">
          <BookingForm
            car={car}
            user={auth.user}
            defaultLocation={location}
            defaultPickupDate={pickup}
            defaultReturnDate={returnDate}
            onRequireLogin={() => setLoginOpen(true)}
            onBooked={() => {
              navigate('/dashboard')
            }}
          />
        </div>
      </div>

      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </div>
  )
}

