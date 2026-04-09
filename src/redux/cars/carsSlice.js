import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { carsMock } from '../../data/carsMock.js'

export const fetchCars = createAsyncThunk('cars/fetchCars', async () => {
  await new Promise((r) => setTimeout(r, 650))
  return carsMock
})

const carsSlice = createSlice({
  name: 'cars',
  initialState: {
    items: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.pending, (state) => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(fetchCars.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error?.message ?? 'Failed to load cars'
      })
  },
})

export const carsReducer = carsSlice.reducer

export const selectCars = (state) => state.cars.items
export const selectCarsStatus = (state) => state.cars.status

