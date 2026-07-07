'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'

const HOLD_AFTER_COMPLETE_MS = 400
const EXIT_DURATION_MS = 1000

export default function SplashScreen() {
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState<'logo' | 'loading' | 'exit' | 'done'>('logo')
  const prefersReducedMotion = useRef(false)
  const rm = prefersReducedMotion.current

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
    const timeout = setTimeout(() => setPhase('loading'), 1200)
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
            ? Math.random() * 4 + 1.5
            : prev < 70
              ? Math.random() * 6 + 3
              : Math.random() * 12 + 5
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
      const timeout = setTimeout(() => setPhase('done'), EXIT_DURATION_MS + 100)
      return () => clearTimeout(timeout)
    }
  }, [phase])

  if (phase === 'done') return null

  const showBar = phase === 'loading' || phase === 'exit'
  const isExit = phase === 'exit'

  return (
    <>
      <style>{`
        @keyframes splash-shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(250%); }
        }
        @keyframes splash-glow {
          0%, 100% { opacity: 0.03; transform: scale(1); }
          50% { opacity: 0.07; transform: scale(1.1); }
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
          backgroundColor: 'oklch(0.22 0.05 165)',
          opacity: isExit ? 0 : 1,
          transition: isExit
            ? `opacity ${EXIT_DURATION_MS}ms cubic-bezier(0.76, 0, 0.24, 1)`
            : 'none',
          willChange: isExit ? 'opacity' : 'auto',
        }}
      >
        {/* Ambient glow behind logo */}
        <div
          style={{
            position: 'absolute',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(46,204,113,0.12) 0%, transparent 70%)',
            animation: rm ? 'none' : 'splash-glow 3s ease-in-out infinite',
            pointerEvents: 'none',
          }}
        />

        {/* Logo */}
        <div
          style={{
            marginBottom: '1.2rem',
            position: 'relative',
            zIndex: 1,
            opacity: phase === 'logo' && !rm ? 0 : 1,
            transform: (() => {
              if (phase === 'logo' && !rm) return 'scale(0.85) translateY(8px)'
              if (isExit && !rm) return 'scale(1.08)'
              return 'scale(1) translateY(0)'
            })(),
            transition: rm
              ? 'none'
              : isExit
                ? `opacity ${EXIT_DURATION_MS}ms ease, transform ${EXIT_DURATION_MS}ms cubic-bezier(0.16, 1, 0.3, 1)`
                : 'opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1), transform 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <Image
            src="/logo-digital-eco.png"
            alt="Digital Eco"
            width={200}
            height={67}
            priority
            style={{
              width: 'clamp(140px, 22vw, 200px)',
              height: 'auto',
              objectFit: 'contain',
              filter: 'brightness(0) invert(1)',
            }}
          />
        </div>

        {/* Loading bar */}
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            width: 'clamp(160px, 25vw, 240px)',
            height: '2px',
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            borderRadius: '1px',
            overflow: 'hidden',
            opacity: showBar ? (isExit ? 0 : 1) : 0,
            transform: showBar ? 'scaleX(1)' : 'scaleX(0.8)',
            transition: isExit
              ? `opacity 400ms ease`
              : 'opacity 0.5s ease, transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {/* Progress fill — accent green gradient */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              width: `${progress}%`,
              background: 'linear-gradient(90deg, rgba(46,204,113,0.6), rgba(46,204,113,0.9))',
              borderRadius: '1px',
              transition: 'width 0.12s ease-out',
              boxShadow: '0 0 8px rgba(46,204,113,0.3)',
            }}
          />
          {/* Shimmer */}
          {progress < 100 && (
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '30%',
                height: '100%',
                background:
                  'linear-gradient(90deg, transparent, rgba(46,204,113,0.5), transparent)',
                animation: 'splash-shimmer 1.8s ease-in-out infinite',
              }}
            />
          )}
        </div>

        {/* Percentage counter */}
        <span
          style={{
            position: 'relative',
            zIndex: 1,
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '11px',
            fontWeight: 400,
            letterSpacing: '0.15em',
            color: 'rgba(255, 255, 255, 0.25)',
            marginTop: '1.2rem',
            opacity: showBar ? (isExit ? 0 : 1) : 0,
            transition: isExit ? 'opacity 300ms ease' : 'opacity 0.5s ease 0.2s',
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {Math.round(progress)}%
        </span>
      </div>
    </>
  )
}
