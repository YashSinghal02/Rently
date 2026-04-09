import { configureStore } from '@reduxjs/toolkit'
import { themeReducer } from './theme/themeSlice.js'
import { authReducer } from './auth/authSlice.js'
import { carsReducer } from './cars/carsSlice.js'
import { bookingsReducer } from './bookings/bookingsSlice.js'

export const store = configureStore({
  reducer: {
    theme: themeReducer,
    auth: authReducer,
    cars: carsReducer,
    bookings: bookingsReducer,
  },
  devTools: import.meta.env.MODE !== 'production',
})

