import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { bookingsMock } from '../../data/bookingsMock.js'

const BOOKINGS_STORAGE_KEY = 'rently_bookings_v1'

const loadPersistedBookings = () => {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(BOOKINGS_STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

const persistBookings = (items) => {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(BOOKINGS_STORAGE_KEY, JSON.stringify(items))
  } catch {
    // Ignore persistence issues in mock mode.
  }
}

const calculateDays = (pickupDate, returnDate) => {
  const p = new Date(pickupDate)
  const r = new Date(returnDate)
  const diff = r.getTime() - p.getTime()
  const days = Math.round(diff / (1000 * 60 * 60 * 24))
  return Math.max(1, days)
}

export const fetchBookings = createAsyncThunk('bookings/fetchBookings', async () => {
  await new Promise((r) => setTimeout(r, 550))
  return bookingsMock
})

export const createBooking = createAsyncThunk(
  'bookings/createBooking',
  async ({ car, user, location, pickupDate, returnDate }, { rejectWithValue }) => {
    try {
      const days = calculateDays(pickupDate, returnDate)
      const subtotal = car.dailyPrice * days
      const taxes = subtotal * 0.1
      const total = Math.round((subtotal + taxes) * 10) / 10
      await new Promise((r) => setTimeout(r, 450))
      return {
        id: `booking-${Math.random().toString(16).slice(2)}-${Date.now()}`,
        carId: car.id,
        userId: user.id,
        location,
        pickupDate,
        returnDate,
        dailyPrice: car.dailyPrice,
        days,
        subtotal,
        taxes,
        total,
        status: 'confirmed',
        createdAt: new Date().toISOString(),
      }
    } catch {
      return rejectWithValue('Could not create booking')
    }
  },
)

const bookingsSlice = createSlice({
  name: 'bookings',
  initialState: {
    items: loadPersistedBookings(),
    status: 'idle',
    error: null,
  },
  reducers: {
    cancelBooking(state, action) {
      const id = action.payload
      const idx = state.items.findIndex((b) => b.id === id)
      if (idx !== -1) {
        state.items[idx].status = 'cancelled'
        persistBookings(state.items)
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBookings.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchBookings.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
        persistBookings(state.items)
      })
      .addCase(fetchBookings.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error?.message ?? 'Failed to load bookings'
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.items.unshift(action.payload)
        persistBookings(state.items)
      })
  },
})

export const bookingsReducer = bookingsSlice.reducer
export const { cancelBooking } = bookingsSlice.actions

export const selectBookings = (state) => state.bookings.items
export const selectBookingsStatus = (state) => state.bookings.status

