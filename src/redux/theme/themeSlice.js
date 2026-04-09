import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  mode: 'light',
}

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setTheme(state, action) {
      state.mode = action.payload
      localStorage.setItem('car_rental_theme', state.mode)
    },
    toggleTheme(state) {
      state.mode = state.mode === 'light' ? 'dark' : 'light'
      localStorage.setItem('car_rental_theme', state.mode)
      document.documentElement.classList.toggle('dark', state.mode === 'dark')
    },
  },
})

export const themeReducer = themeSlice.reducer
export const themeActions = themeSlice.actions

