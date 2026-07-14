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

      const el = sectionRef.current?.parentElement
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

  const lines = ['Marketing.', 'That moves.', 'Business.']
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
          minHeight: '100svh',
        } as React.CSSProperties}
      >
        {/* Content — centered */}
        <div
          style={{
            position: 'relative',
            zIndex: 2,
            minHeight: '100svh',
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
                          className="hero-char"
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
                .hero-info-item-2 {
                  display: block;
                }
                .hero-char {
                  font-size: clamp(56px, 10vw, 140px);
                }
                @media (max-width: 640px) {
                  .hero-info-strip {
                    flex-direction: row !important;
                    align-items: flex-start !important;
                    justify-content: space-between !important;
                    gap: 16px !important;
                  }
                  .hero-info-item-2 {
                    display: none !important;
                  }
                  .hero-char {
                    font-size: clamp(72px, 14vw, 140px) !important;
                  }
                }
              `}</style>
              {[
                { title: 'Troviamo i tuoi clienti', sub: 'Con strategie orientate alla crescita.' },
                { title: 'Comunichiamo i tuoi distinguo', sub: 'Per valorizzare ciò che ti rende unico.' },
                { title: 'Ti aiutiamo a vendere di più', sub: 'Con strumenti digitali efficaci.' },
              ].map((item, i) => (
                <div key={i} className={i === 2 ? 'hero-info-item-2' : undefined}>
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

      </section>

    </>
  )
}
