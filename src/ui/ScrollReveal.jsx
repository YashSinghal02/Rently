import { useEffect, useRef } from 'react'
import { revealOnScroll } from '../utils/gsapUtils.js'

export function ScrollReveal({ children }) {
  const rootRef = useRef(null)

  useEffect(() => {
    const root = rootRef.current
    if (!root) return
    let cleanup = null

    const revealNodes = () => {
      const nodes = Array.from(root.querySelectorAll('[data-reveal]')).filter(
        (n) => !n.dataset.gsapRevealed,
      )
      nodes.forEach((n) => {
        n.dataset.gsapRevealed = 'true'
      })
      if (!nodes.length) return
      cleanup?.()
      cleanup = revealOnScroll(nodes)
    }

    revealNodes()

    const mo = new MutationObserver(() => {
      revealNodes()
    })
    mo.observe(root, { childList: true, subtree: true })

    return () => {
      mo.disconnect()
      cleanup?.()
    }
  }, [])

  return <div ref={rootRef}>{children}</div>
}

