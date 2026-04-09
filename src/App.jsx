import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { AppLayout } from './layout/AppLayout.jsx'
import { HomePage } from './pages/HomePage.jsx'
import { CarsPage } from './pages/CarsPage.jsx'
import { CarDetailsPage } from './pages/CarDetailsPage.jsx'
import { DashboardPage } from './pages/DashboardPage.jsx'
import { NotFoundPage } from './pages/NotFoundPage.jsx'
import { PageTransition } from './ui/PageTransition.jsx'

export default function App() {
  const location = useLocation()

  return (
    <Routes location={location} key={location.pathname}>
      <Route element={<AppLayout />}>
        <Route
          path="/"
          element={
            <PageTransition>
              <HomePage />
            </PageTransition>
          }
        />
        <Route
          path="/cars"
          element={
            <PageTransition>
              <CarsPage />
            </PageTransition>
          }
        />
        <Route
          path="/cars/:carId"
          element={
            <PageTransition>
              <CarDetailsPage />
            </PageTransition>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PageTransition>
              <DashboardPage />
            </PageTransition>
          }
        />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route
          path="*"
          element={
            <PageTransition>
              <NotFoundPage />
            </PageTransition>
          }
        />
      </Route>
    </Routes>
  )
}
