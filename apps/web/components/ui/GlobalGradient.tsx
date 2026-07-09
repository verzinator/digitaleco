'use client'

import { useRef, useEffect, useCallback, useState } from 'react'

const LERP = 0.06

export default function GlobalGradient() {
  const elRef = useRef<HTMLDivElement>(null)
  const mouseRef = useRef({ x: 0.5, y: 0.5 })
  const targetRef = useRef({ x: 0.5, y: 0.5 })
  const rafRef = useRef<number>(0)
  const [isTouchDevice, setIsTouchDevice] = useState(false)
  const [isReduced, setIsReduced] = useState(false)

  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0)
    setIsReduced(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  const animate = useCallback(() => {
    const current = mouseRef.current
    const target = targetRef.current
    current.x += (target.x - current.x) * LERP
    current.y += (target.y - current.y) * LERP

    const el = elRef.current
    if (el) {
      el.style.background = `radial-gradient(
        ellipse 600px 600px at ${(current.x * 100).toFixed(2)}% ${(current.y * 100).toFixed(2)}%,
        rgba(180, 180, 180, 0.07) 0%,
        rgba(120, 120, 120, 0.02) 40%,
        transparent 70%
      )`
    }
    rafRef.current = requestAnimationFrame(animate)
  }, [])

  useEffect(() => {
    if (isReduced || isTouchDevice) return

    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [isReduced, isTouchDevice, animate])

  if (isTouchDevice || isReduced) return null

  return (
    <div
      ref={elRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 1,
        willChange: 'background',
      }}
    />
  )
}
