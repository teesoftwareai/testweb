import { useEffect, useRef } from 'react'

export function useReveal() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.05 }
    )

    // Observe the container itself if it has .reveal class
    if (el.classList.contains('reveal') || el.classList.contains('reveal-item')) {
      observer.observe(el)
    }

    // Observe each child with .reveal or .reveal-item
    el.querySelectorAll('.reveal, .reveal-item').forEach((child) =>
      observer.observe(child)
    )

    return () => observer.disconnect()
  }, [])

  return ref
}