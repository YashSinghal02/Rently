import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { themeActions } from '../redux/theme/themeSlice.js'

export function ThemeProvider({ children }) {
  const dispatch = useDispatch()

  useEffect(() => {
    const stored = localStorage.getItem('car_rental_theme')
    if (stored === 'dark' || stored === 'light') {
      dispatch(themeActions.setTheme(stored))
      document.documentElement.classList.toggle('dark', stored === 'dark')
    } else {
      const prefersDark =
        window.matchMedia &&
        window.matchMedia('(prefers-color-scheme: dark)').matches
      dispatch(themeActions.setTheme(prefersDark ? 'dark' : 'light'))
      document.documentElement.classList.toggle('dark', prefersDark)
    }
  }, [dispatch])

  return children
}

