import { useEffect, useMemo, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useAppDispatch } from '../../redux/hooks.js'
import { createBooking } from '../../redux/bookings/bookingsSlice.js'
import { diffDays } from '../../utils/dateUtils.js'
import { formatMoneyPrecise } from '../../utils/formatters.js'
import { Button } from '../common/Button.jsx'
import { Field } from '../common/Field.jsx'
import { Skeleton } from '../common/Skeleton.jsx'

export function BookingForm({
  car,
  user,
  defaultLocation,
  defaultPickupDate,
  defaultReturnDate,
  onRequireLogin,
  onBooked,
}) {
  const dispatch = useAppDispatch()

  const [location, setLocation] = useState(defaultLocation || '')
  const [pickupDate, setPickupDate] = useState(defaultPickupDate || '')
  const [returnDate, setReturnDate] = useState(defaultReturnDate || '')
  const [submitting, setSubmitting] = useState(false)
  const [touched, setTouched] = useState(false)

  useEffect(() => {
    setLocation(defaultLocation || '')
    setPickupDate(defaultPickupDate || '')
    setReturnDate(defaultReturnDate || '')
  }, [defaultLocation, defaultPickupDate, defaultReturnDate])

  const days = useMemo(() => {
    if (!pickupDate || !returnDate) return 1
    return diffDays(pickupDate, returnDate)
  }, [pickupDate, returnDate])

  const subtotal = useMemo(() => {
    if (!car) return 0
    return car.dailyPrice * days
  }, [car, days])

  const taxes = useMemo(() => subtotal * 0.1, [subtotal])
  const total = useMemo(() => Math.round((subtotal + taxes) * 10) / 10, [subtotal, taxes])

  const errors = useMemo(() => {
    const e = {}
    if (!location.trim()) e.location = 'Location is required'
    if (!pickupDate) e.pickupDate = 'Pickup date is required'
    if (!returnDate) e.returnDate = 'Return date is required'
    if (pickupDate && returnDate) {
      const p = new Date(pickupDate).getTime()
      const r = new Date(returnDate).getTime()
      if (Number.isFinite(p) && Number.isFinite(r) && r < p) e.returnDate = 'Return must be after pickup'
    }
    return e
  }, [location, pickupDate, returnDate])

  const canSubmit = Object.keys(errors).length === 0

  const confirm = async () => {
    setTouched(true)
    if (!canSubmit) {
      toast.error('Please fix the highlighted fields')
      return
    }
    if (!user?.id) {
      onRequireLogin?.()
      toast.error('Sign in required to confirm booking')
      return
    }
    setSubmitting(true)
    try {
      const result = await dispatch(
        createBooking({
          car,
          user,
          location: location.trim(),
          pickupDate,
          returnDate,
        }),
      )

      if (result?.error) {
        toast.error('Booking failed (mock)')
        return
      }

      toast.success('Booking confirmed')
      onBooked?.()
    } catch {
      toast.error('Booking failed')
    } finally {
      setSubmitting(false)
    }
  }

  if (!car) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-12 w-full" />
        <Skeleton className="h-40 w-full" />
      </div>
    )
  }

return (
  <div className="space-y-5">

    {/* 🔥 BOOKING DETAILS */}
    <div className="rounded-3xl p-5 sm:p-6 border border-black/10 dark:border-white/10 
    bg-white dark:bg-white/5 shadow-sm">

      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-sm font-semibold text-zinc-900 dark:text-white">
            Booking details
          </div>
          <div className="mt-1 text-xs text-zinc-600 dark:text-zinc-400">
            Pick dates and we’ll calculate your total instantly.
          </div>
        </div>

        <div className="text-right">
          <div className="text-xs text-zinc-500 dark:text-zinc-400">From</div>
          <div className="text-lg font-semibold text-zinc-900 dark:text-white">
            {formatMoneyPrecise(car.dailyPrice)}/day
          </div>
        </div>
      </div>

      {/* INPUTS */}
      <div className="mt-5 grid gap-4 sm:grid-cols-2">

        <Field label="Location" className="text-sm font-semibold text-zinc-900 dark:text-white">
          <input
            className={`focus-ring w-full rounded-xl border px-4 py-3 text-sm
            bg-white text-zinc-900 border-black/10 placeholder:text-zinc-400
            dark:bg-white/5 dark:text-white dark:border-white/10
            ${touched && errors.location ? 'border-rose-500' : ''}`}
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="e.g. San Francisco, CA"
            type="text"
          />
          {touched && errors.location && (
            <div className="mt-1 text-xs text-rose-500">{errors.location}</div>
          )}
        </Field>

        <Field label="Pickup date">
          <input
            className={`focus-ring w-full rounded-xl border px-4 py-3 text-sm
            bg-white text-zinc-900 border-black/10
            dark:bg-white/5 dark:text-white dark:border-white/10
            ${touched && errors.pickupDate ? 'border-rose-500' : ''}`}
            value={pickupDate}
            onChange={(e) => setPickupDate(e.target.value)}
            type="date"
            min={new Date().toISOString().slice(0, 10)}
          />
          {touched && errors.pickupDate && (
            <div className="mt-1 text-xs text-rose-500">{errors.pickupDate}</div>
          )}
        </Field>

        <Field label="Return date">
          <input
            className={`focus-ring w-full rounded-xl border px-4 py-3 text-sm
            bg-white text-zinc-900 border-black/10
            dark:bg-white/5 dark:text-white dark:border-white/10
            ${touched && errors.returnDate ? 'border-rose-500' : ''}`}
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
            type="date"
            min={pickupDate || new Date().toISOString().slice(0, 10)}
          />
          {touched && errors.returnDate && (
            <div className="mt-1 text-xs text-rose-500">{errors.returnDate}</div>
          )}
        </Field>

        <div className="flex flex-col justify-end">
          <div className="text-sm font-semibold text-zinc-900 dark:text-white">
            {days} {days === 1 ? 'day' : 'days'}
          </div>
          <div className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
            Total updates as you change dates.
          </div>
        </div>
      </div>
    </div>

    {/* 🔥 SUMMARY */}
    <div className="rounded-3xl p-5 sm:p-6 border border-black/10 dark:border-white/10 
    bg-white dark:bg-white/5 shadow-sm">

      <div className="flex items-center justify-between gap-4">
        <div className="text-sm font-semibold text-zinc-900 dark:text-white">
          Booking summary
        </div>
        <div className="text-xs text-zinc-500 dark:text-zinc-400">
          Taxes included
        </div>
      </div>

      <div className="mt-4 space-y-3">
        <Row label={`${formatMoneyPrecise(car.dailyPrice)}/day`} value={`${formatMoneyPrecise(car.dailyPrice * days)}`} />
        <Row label="Subtotal" value={formatMoneyPrecise(subtotal)} />
        <Row label="Estimated taxes (10%)" value={formatMoneyPrecise(taxes)} />

        <div className="border-t border-black/10 dark:border-white/10 pt-3">
          <Row label="Total" value={formatMoneyPrecise(total)} emphasize />
        </div>
      </div>

      {/* BUTTON */}
      <div className="mt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">

        <Button
          variant="primary"
          size="lg"
          className="w-full sm:w-auto px-6 py-3 whitespace-nowrap text-sm sm:text-base"
          onClick={confirm}
          disabled={submitting}
        >
          {submitting ? 'Confirming…' : 'Confirm booking'}
        </Button>

        <div className="text-xs text-zinc-500 dark:text-zinc-400 text-center sm:text-right">
          You’ll receive a confirmation email (mock).
        </div>
      </div>
    </div>
  </div>
)
}

function Row({ label, value, emphasize = false }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div
        className={`text-sm ${
          emphasize
            ? 'font-semibold text-zinc-900 dark:text-white'
            : 'text-zinc-700 dark:text-zinc-300'
        }`}
      >
        {label}
      </div>

      <div
        className={`text-sm ${
          emphasize
            ? 'font-semibold text-zinc-900 dark:text-violet-300'
            : 'text-zinc-900 dark:text-zinc-200'
        }`}
      >
        {value}
      </div>
    </div>
  )
}

