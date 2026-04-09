import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: {
    id: 'mock-user-1',
    name: 'Alex Carter',
    email: 'alex@premiumcars.dev',
    avatarColor: '#a855f7',
  },
  status: 'authenticated',
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      state.user = action.payload
      state.status = 'authenticated'
    },
    logout(state) {
      state.user = null
      state.status = 'guest'
    },
  },
})

export const authReducer = authSlice.reducer
export const authActions = authSlice.actions

