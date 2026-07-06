'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

const HOLD_AFTER_COMPLETE_MS = 500
const EXIT_DURATION_MS = 900

export default function SplashScreen() {
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState<'logo' | 'loading' | 'exit' | 'done'>('logo')
  const prefersReducedMotion = useRef(false)

  // Check reduced motion preference
  useEffect(() => {
    prefersReducedMotion.current = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches

    if (prefersReducedMotion.current) {
      setPhase('loading')
    }
  }, [])

  // Logo reveal → loading transition
  useEffect(() => {
    if (phase !== 'logo') return
    const timeout = setTimeout(() => setPhase('loading'), 800)
    return () => clearTimeout(timeout)
  }, [phase])

  // Fake loading progress
  useEffect(() => {
    if (phase !== 'loading') return

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        const increment =
          prev < 30
            ? Math.random() * 6 + 2
            : prev < 70
              ? Math.random() * 10 + 4
              : Math.random() * 20 + 8
        return Math.min(prev + increment, 100)
      })
    }, 100)

    return () => clearInterval(interval)
  }, [phase])

  // Trigger exit after loading completes
  useEffect(() => {
    if (progress >= 100 && phase === 'loading') {
      const timeout = setTimeout(() => setPhase('exit'), HOLD_AFTER_COMPLETE_MS)
      return () => clearTimeout(timeout)
    }
  }, [progress, phase])

  // Remove from DOM after exit animation
  useEffect(() => {
    if (phase === 'exit') {
      const timeout = setTimeout(() => setPhase('done'), EXIT_DURATION_MS)
      return () => clearTimeout(timeout)
    }
  }, [phase])

  if (phase === 'done') return null

  const showBar = phase === 'loading' || phase === 'exit'

  return (
    <>
      <style>{`
        @keyframes splash-line-shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>

      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 99999,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'oklch(0.35 0.08 165)',
          transform: phase === 'exit' ? 'translateY(-100%)' : 'translateY(0)',
          transition:
            phase === 'exit'
              ? `transform ${EXIT_DURATION_MS}ms cubic-bezier(0.76, 0, 0.24, 1)`
              : 'none',
          willChange: phase === 'exit' ? 'transform' : 'auto',
        }}
      >
        {/* Logo */}
        <div
          style={{
            marginBottom: '2.5rem',
            opacity: phase === 'logo' && !prefersReducedMotion.current ? 0 : 1,
            transform: phase === 'logo' && !prefersReducedMotion.current ? 'scale(0.92)' : 'scale(1)',
            transition: prefersReducedMotion.current
              ? 'none'
              : 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <Image
            src="/logo-digital-eco.png"
            alt="Digital Eco"
            width={180}
            height={60}
            priority
            style={{
              width: 'clamp(120px, 20vw, 180px)',
              height: 'auto',
              objectFit: 'contain',
              filter: 'brightness(0) invert(1)',
            }}
          />
        </div>

        {/* Loading bar */}
        <div
          style={{
            width: 'clamp(180px, 30vw, 280px)',
            height: '2px',
            backgroundColor: 'oklch(0.95 0.005 165 / 0.15)',
            borderRadius: '1px',
            overflow: 'hidden',
            opacity: showBar ? 1 : 0,
            transition: 'opacity 0.5s ease',
            position: 'relative',
          }}
        >
          {/* Progress fill */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              width: `${progress}%`,
              backgroundColor: 'oklch(0.95 0.005 165 / 0.8)',
              borderRadius: '1px',
              transition: 'width 0.12s ease-out',
            }}
          />
          {/* Shimmer */}
          {progress < 100 && (
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '40%',
                height: '100%',
                background:
                  'linear-gradient(90deg, transparent, oklch(0.95 0.005 165 / 0.4), transparent)',
                animation: 'splash-line-shimmer 1.5s ease-in-out infinite',
              }}
            />
          )}
        </div>
      </div>
    </>
  )
}
