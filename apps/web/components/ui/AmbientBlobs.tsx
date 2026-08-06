'use client'

import { useCallback, useEffect, useRef } from 'react'

const LERP = 0.08

const green = [
  'radial-gradient(circle, rgba(10, 143, 92, 0.4) 0%, rgba(10, 143, 92, 0.05) 50%, transparent 70%)',
  'radial-gradient(circle, rgba(46, 204, 113, 0.2) 0%, rgba(46, 204, 113, 0.03) 50%, transparent 70%)',
  'radial-gradient(circle, rgba(10, 92, 68, 0.25) 0%, transparent 60%)',
]

const grey = [
  'radial-gradient(circle, rgba(180, 180, 180, 0.12) 0%, rgba(160, 160, 160, 0.03) 50%, transparent 70%)',
  'radial-gradient(circle, rgba(200, 200, 200, 0.08) 0%, rgba(180, 180, 180, 0.02) 50%, transparent 70%)',
  'radial-gradient(circle, rgba(160, 160, 160, 0.1) 0%, transparent 60%)',
]

/* Panna per fondi bianchi: caldo, non grigio, si vede appena */
const cream = [
  'radial-gradient(circle, rgba(240, 231, 211, 0.45) 0%, rgba(243, 236, 220, 0.12) 50%, transparent 70%)',
  'radial-gradient(circle, rgba(246, 239, 225, 0.35) 0%, rgba(247, 242, 231, 0.08) 50%, transparent 70%)',
  'radial-gradient(circle, rgba(236, 226, 204, 0.30) 0%, transparent 60%)',
]

/* Nero per fondi scuri: scava profondità invece di schiarire */
const ink = [
  'radial-gradient(circle, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.12) 50%, transparent 70%)',
  'radial-gradient(circle, rgba(4, 10, 7, 0.36) 0%, rgba(4, 10, 7, 0.09) 50%, transparent 70%)',
  'radial-gradient(circle, rgba(0, 0, 0, 0.32) 0%, transparent 60%)',
]

const PALETTES = { green, grey, cream, ink }

/* Alone che segue il mouse, per variante */
const GLOWS: Record<keyof typeof PALETTES, string | null> = {
  green: 'rgba(10, 92, 68, 0.6) 0%, rgba(10, 92, 68, 0.15) 40%, transparent 70%',
  grey: null,
  cream: 'rgba(240, 230, 208, 0.5) 0%, rgba(244, 237, 221, 0.15) 40%, transparent 70%',
  ink: 'rgba(0, 0, 0, 0.55) 0%, rgba(0, 0, 0, 0.16) 40%, transparent 70%',
}

export default function AmbientBlobs({
  variant = 'green',
  trackMouse = false,
}: {
  variant?: keyof typeof PALETTES
  /**
   * Scrive --mx/--my su questo stesso wrapper seguendo il mouse.
   * Senza questo flag le variabili vanno fornite da un antenato
   * (in home lo fa ImageHero) e altrimenti l'alone resta fermo al 50%.
   */
  trackMouse?: boolean
}) {
  const colors = PALETTES[variant]
  const glow = GLOWS[variant]
  const rootRef = useRef<HTMLDivElement>(null)
  const mouse = useRef({ x: 0.5, y: 0.5 })
  const target = useRef({ x: 0.5, y: 0.5 })
  const rafRef = useRef(0)

  const animate = useCallback(() => {
    const current = mouse.current
    current.x += (target.current.x - current.x) * LERP
    current.y += (target.current.y - current.y) * LERP

    const el = rootRef.current
    if (el) {
      el.style.setProperty('--mx', `${(current.x * 100).toFixed(2)}%`)
      el.style.setProperty('--my', `${(current.y * 100).toFixed(2)}%`)
    }
    rafRef.current = requestAnimationFrame(animate)
  }, [])

  useEffect(() => {
    if (!trackMouse) return

    const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (isTouch || isReduced) return

    const handleMouseMove = (e: MouseEvent) => {
      const rect = rootRef.current?.getBoundingClientRect()
      if (!rect) return
      target.current = {
        x: (e.clientX - rect.left) / rect.width,
        y: (e.clientY - rect.top) / rect.height,
      }
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(rafRef.current)
    }
  }, [trackMouse, animate])

  return (
    <div ref={rootRef} aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      <style>{`
        @keyframes blob-drift-1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(5%, -8%) scale(1.05); }
          50% { transform: translate(-3%, 6%) scale(0.95); }
          75% { transform: translate(7%, 3%) scale(1.02); }
        }
        @keyframes blob-drift-2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(-6%, 4%) scale(0.97); }
          50% { transform: translate(4%, -5%) scale(1.04); }
          75% { transform: translate(-2%, -7%) scale(1); }
        }
        @keyframes blob-drift-3 {
          0%, 100% { transform: translate(-50%, 0) scale(1); }
          25% { transform: translate(-45%, 5%) scale(1.06); }
          50% { transform: translate(-55%, -4%) scale(0.96); }
          75% { transform: translate(-48%, -6%) scale(1.03); }
        }
      `}</style>
      {/* Mouse-reactive gradient — reads --mx/--my from parent */}
      {glow && (
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: '-20%',
            pointerEvents: 'none',
            willChange: 'background',
            background: `radial-gradient(ellipse 55% 55% at var(--mx, 50%) var(--my, 50%), ${glow})`,
          }}
        />
      )}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute',
          width: '70vmax',
          height: '70vmax',
          top: '5%',
          right: '-10%',
          borderRadius: '50%',
          background: colors[0],
          animation: 'blob-drift-1 25s ease-in-out infinite',
        }} />
        <div style={{
          position: 'absolute',
          width: '60vmax',
          height: '60vmax',
          top: '25%',
          left: '-15%',
          borderRadius: '50%',
          background: colors[1],
          animation: 'blob-drift-2 30s ease-in-out infinite',
        }} />
        <div style={{
          position: 'absolute',
          width: '50vmax',
          height: '50vmax',
          top: '15%',
          left: '40%',
          borderRadius: '50%',
          background: colors[2],
          animation: 'blob-drift-3 20s ease-in-out infinite',
        }} />
      </div>
    </div>
  )
}
