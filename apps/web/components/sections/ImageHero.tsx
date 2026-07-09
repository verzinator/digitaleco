'use client'

import { useRef, useEffect, useCallback, useState } from 'react'
import { motion, useReducedMotion, useScroll, useTransform, useSpring } from 'framer-motion'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]
const SPLASH_DURATION = 3.8
const LERP_FACTOR = 0.06

// Horizontal shift per line on scroll: left, right, left
const LINE_DIRECTIONS = [-1, 1, -1]
const SHIFT_AMOUNT = 120 // px max

export default function ImageHero() {
  const rm = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const mouseRef = useRef({ x: 0.5, y: 0.5 })
  const targetRef = useRef({ x: 0.5, y: 0.5 })
  const rafRef = useRef<number>(0)
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  // Detect touch device
  useEffect(() => {
    setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0)
  }, [])

  const isHovering = useRef(false)

  // Smoothed mouse tracking via lerp — only when hovering this section
  const animate = useCallback(() => {
    if (isHovering.current) {
      const current = mouseRef.current
      const target = targetRef.current
      current.x += (target.x - current.x) * LERP_FACTOR
      current.y += (target.y - current.y) * LERP_FACTOR

      const el = sectionRef.current
      if (el) {
        el.style.setProperty('--mx', `${(current.x * 100).toFixed(2)}%`)
        el.style.setProperty('--my', `${(current.y * 100).toFixed(2)}%`)
      }
    }
    rafRef.current = requestAnimationFrame(animate)
  }, [])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const rect = sectionRef.current?.getBoundingClientRect()
    if (!rect) return
    targetRef.current = {
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    }
  }, [])

  useEffect(() => {
    if (rm || isTouchDevice) return
    rafRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafRef.current)
  }, [rm, isTouchDevice, animate])

  // Scroll-driven text parallax
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const smoothProgress = useSpring(scrollYProgress, { damping: 40, stiffness: 80, mass: 0.8 })

  const lineX0 = useTransform(smoothProgress, [0, 0.6], [0, LINE_DIRECTIONS[0] * SHIFT_AMOUNT])
  const lineX1 = useTransform(smoothProgress, [0, 0.6], [0, LINE_DIRECTIONS[1] * SHIFT_AMOUNT])
  const lineX2 = useTransform(smoothProgress, [0, 0.6], [0, LINE_DIRECTIONS[2] * SHIFT_AMOUNT])
  // No fade out — text stays visible
  const lineXValues = [lineX0, lineX1, lineX2]

  const lines = ['Make.', 'Every project.', 'Better.']
  let charCount = 0

  return (
    <>
      <style>{`
        @keyframes hero-drift-1 {
          0%, 100% { transform: translate(0%, 0%); }
          25% { transform: translate(8%, -12%); }
          50% { transform: translate(-5%, 8%); }
          75% { transform: translate(12%, 5%); }
        }
        @keyframes hero-drift-2 {
          0%, 100% { transform: translate(0%, 0%); }
          25% { transform: translate(-10%, 6%); }
          50% { transform: translate(7%, -10%); }
          75% { transform: translate(-8%, -4%); }
        }
        @keyframes hero-drift-3 {
          0%, 100% { transform: translate(0%, 0%); }
          33% { transform: translate(6%, 10%); }
          66% { transform: translate(-12%, -6%); }
        }
        @keyframes hero-pulse {
          0%, 100% { opacity: 0.35; }
          50% { opacity: 0.55; }
        }
      `}</style>

      <section
        ref={sectionRef}
        aria-label="Digital Eco"
        onMouseMove={!rm && !isTouchDevice ? handleMouseMove : undefined}
        onMouseEnter={() => { isHovering.current = true }}
        onMouseLeave={() => { isHovering.current = false }}
        style={{
          '--mx': '50%',
          '--my': '50%',
          position: 'relative',
          height: '140svh',
          background: '#060D09',
        } as React.CSSProperties}
      >
        {/* Sticky wrapper */}
        <div style={{
          position: 'sticky',
          top: 0,
          height: '100svh',
          overflow: 'hidden',
        }}>
          {/* Gradient layer — mouse-reactive blob */}
          {!rm && (
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: '-20%',
                pointerEvents: 'none',
                willChange: 'background',
                background: `
                  radial-gradient(
                    ellipse 55% 55% at var(--mx) var(--my),
                    rgba(10, 92, 68, 0.6) 0%,
                    rgba(10, 92, 68, 0.15) 40%,
                    transparent 70%
                  )
                `,
              }}
            />
          )}

          {/* Ambient blob 1 — deep green, drifting */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              width: '70vmax',
              height: '70vmax',
              top: '-15%',
              right: '-10%',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(10, 143, 92, 0.4) 0%, rgba(10, 143, 92, 0.05) 50%, transparent 70%)',
              animation: rm ? 'none' : 'hero-drift-1 25s ease-in-out infinite',
              pointerEvents: 'none',
            }}
          />

          {/* Ambient blob 2 — brighter green, lower */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              width: '60vmax',
              height: '60vmax',
              bottom: '-20%',
              left: '-15%',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(46, 204, 113, 0.2) 0%, rgba(46, 204, 113, 0.03) 50%, transparent 70%)',
              animation: rm ? 'none' : 'hero-drift-2 30s ease-in-out infinite',
              pointerEvents: 'none',
            }}
          />

          {/* Ambient blob 3 — subtle warm green center */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              width: '50vmax',
              height: '50vmax',
              top: '30%',
              left: '40%',
              transform: 'translate(-50%, -50%)',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(10, 92, 68, 0.25) 0%, transparent 60%)',
              animation: rm ? 'none' : 'hero-drift-3 20s ease-in-out infinite, hero-pulse 8s ease-in-out infinite',
              pointerEvents: 'none',
            }}
          />

          {/* Noise texture overlay for depth */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              opacity: 0.03,
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              backgroundSize: '128px 128px',
              pointerEvents: 'none',
            }}
          />

          {/* Content — centered */}
          <div
            style={{
              position: 'relative',
              zIndex: 2,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 'clamp(24px, 4vw, 56px)',
            }}
          >
            {/* H1 — three lines centered with scroll parallax */}
            <motion.h1
              style={{
                fontFamily: 'var(--font-display)',
                margin: 0,
                padding: 0,
                textAlign: 'center',
                opacity: 1,
              }}
            >
              <span className="sr-only">Digital Eco — Agenzia di Comunicazione, Web Design e Advertising Digitale a Venezia</span>
              {lines.map((line, lineIdx) => {
                const chars = line.split('')

                return (
                  <motion.div
                    key={lineIdx}
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      justifyContent: 'center',
                      clipPath: 'inset(-10% -10% -20% -10%)',
                      x: rm ? 0 : lineXValues[lineIdx],
                    }}
                  >
                    {chars.map((char, charIdx) => {
                      const isSpace = char === ' '
                      const delay = SPLASH_DURATION + charCount * 0.04
                      charCount++

                      return (
                        <motion.span
                          key={charIdx}
                          initial={rm ? false : { opacity: 0, y: '100%' }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.6,
                            delay,
                            ease: EASE,
                          }}
                          aria-hidden="true"
                          style={{
                            display: 'inline-block',
                            fontFamily: 'var(--font-display)',
                            fontSize: 'clamp(56px, 10vw, 140px)',
                            fontWeight: 400,
                            fontStyle: 'italic',
                            letterSpacing: '-0.04em',
                            lineHeight: 0.95,
                            color: '#F0F5F2',
                            ...(isSpace ? { width: 'clamp(8px, 1.5vw, 20px)' } : {}),
                          }}
                        >
                          {isSpace ? '\u00A0' : char}
                        </motion.span>
                      )
                    })}
                  </motion.div>
                )
              })}
            </motion.h1>

            {/* Bottom info strip — wrapper for scroll opacity */}
            <motion.div
              style={{
                position: 'absolute',
                bottom: 'clamp(28px, 4vw, 48px)',
                left: 'clamp(24px, 4vw, 56px)',
                right: 'clamp(24px, 4vw, 56px)',
                opacity: 1,
              }}
            >
            <motion.div
              initial={rm ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: SPLASH_DURATION + 1, ease: EASE }}
              className="hero-info-strip"
              style={{
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                gap: '24px',
              }}
            >
              <style>{`
                .hero-info-strip {
                  flex-direction: row;
                }
                @media (max-width: 640px) {
                  .hero-info-strip {
                    flex-direction: column !important;
                    align-items: flex-start !important;
                    gap: 20px !important;
                  }
                }
              `}</style>
              {[
                { title: 'Con sede a Venezia', sub: 'Operativi in tutta Italia' },
                { title: 'Comunicazione digitale', sub: 'web design e advertising' },
                { title: 'Branding, social', sub: 'e strategie di crescita' },
              ].map((item, i) => (
                <div key={i}>
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'clamp(13px, 1.1vw, 15px)',
                    fontWeight: 300,
                    color: 'rgba(240, 245, 242, 0.85)',
                    lineHeight: 1.3,
                    margin: 0,
                  }}>
                    {item.title}
                  </p>
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'clamp(12px, 1vw, 14px)',
                    fontWeight: 300,
                    color: 'rgba(240, 245, 242, 0.4)',
                    lineHeight: 1.4,
                    margin: 0,
                    marginTop: '2px',
                  }}>
                    {item.sub}
                  </p>
                </div>
              ))}
            </motion.div>
            </motion.div>
          </div>

          {/* Vignette edges */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              background: `
                radial-gradient(ellipse 80% 80% at 50% 50%, transparent 30%, rgba(6, 13, 9, 0.5) 100%)
              `,
            }}
          />
        </div>

      </section>

    </>
  )
}
