import gsap from 'gsap'

export const animatePageIn = (container) => {
  if (!container) return
  gsap.fromTo(
    container,
    { y: 10, opacity: 0, filter: 'blur(10px)' },
    { y: 0, opacity: 1, filter: 'blur(0px)', duration: 0.65, ease: 'power3.out' },
  )
}

export const revealOnScroll = (nodes) => {
  if (!nodes?.length) return
  gsap.set(nodes, { opacity: 0, y: 18, filter: 'blur(6px)' })

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        const el = entry.target
        gsap.to(el, {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          duration: 0.7,
          ease: 'power3.out',
        })
        observer.unobserve(el)
      })
    },
    { threshold: 0.15 },
  )

  nodes.forEach((n) => observer.observe(n))
  return () => observer.disconnect()
}

