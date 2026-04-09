import { Outlet } from 'react-router-dom'
import { Navbar } from '../components/layout/Navbar.jsx'
import { Footer } from '../components/layout/Footer.jsx'
import { ScrollReveal } from '../ui/ScrollReveal.jsx'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export function AppLayout() {
  const bgRef = useRef(null)

  useEffect(() => {
    const el = bgRef.current
    if (!el) return
    const onMove = (e) => {
      const r = el.getBoundingClientRect()
      const x = (e.clientX - r.left) / r.width
      const y = (e.clientY - r.top) / r.height
      gsap.to(el, {
        x: (x - 0.5) * 18,
        y: (y - 0.5) * 12,
        duration: 0.6,
        ease: 'power3.out',
      })
    }
    window.addEventListener('pointermove', onMove)
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  return (
    <div className="min-h-screen bg-white dark:bg-[#070A12]">
      <Navbar />
      <main className="relative">
        <div
          ref={bgRef}
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.25),transparent_60%)] blur-2xl"
        />
        <ScrollReveal>
          <div className="container-page py-6 sm:py-8">
            <Outlet />
          </div>
        </ScrollReveal>
      </main>
      <Footer />
    </div>
  )
}

