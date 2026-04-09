import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export function PageTransition({ children }) {
  const wrapRef = useRef(null)
  const overlayRef = useRef(null)

  useEffect(() => {
    const overlay = overlayRef.current
    const wrap = wrapRef.current
    if (!overlay || !wrap) return

    gsap.set(overlay, { y: '-100%', opacity: 0 })
    gsap.set(wrap, { opacity: 0, y: 12, filter: 'blur(10px)' })

    const tl = gsap.timeline()
    tl.to(overlay, {
      y: '0%',
      opacity: 1,
      duration: 0.35,
      ease: 'power2.out',
    })
    tl.to(
      overlay,
      {
        y: '0%',
        opacity: 1,
        duration: 0.12,
      },
      '<0.06',
    )
    tl.to(
      overlay,
      {
        y: '100%',
        opacity: 0,
        duration: 0.45,
        ease: 'power2.inOut',
      },
      '-=0.18',
    )
    tl.to(
      wrap,
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.65,
        ease: 'power3.out',
      },
      '<',
    )

    return () => tl.kill()
  }, [])

  return (
    <div ref={wrapRef} className="relative">
      <div
        ref={overlayRef}
        className="pointer-events-none absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-violet-500/30 via-fuchsia-500/20 to-transparent opacity-0"
      />
      {children}
    </div>
  )
}

