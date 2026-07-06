'use client'

import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

// Splash screen total duration ~4s
const SPLASH_DURATION = 3.8

export default function ImageHero() {
  const rm = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  // Animate: full viewport → inset box with margins
  const padding = useTransform(scrollYProgress, [0, 0.5], [0, 24])
  const height = useTransform(scrollYProgress, [0, 0.5], ['100svh', '60svh'])
  const borderRadius = useTransform(scrollYProgress, [0, 0.5], [0, 20])

  const scroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    document.getElementById('consulenza')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      ref={sectionRef}
      aria-label="Digital Eco"
      style={{
        height: '180svh',
        background: 'var(--color-bg)',
      }}
    >
      {/* Sticky wrapper */}
      <div style={{ position: 'sticky', top: 0, height: '100svh' }}>
        <motion.div
          style={{
            padding,
            height: '100%',
          }}
        >
          <motion.div
            style={{
              position: 'relative',
              height,
              overflow: 'hidden',
              borderRadius,
            }}
          >
            {/* Background image */}
            <motion.div
              initial={rm ? false : { scale: 1.08, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.8, ease: EASE }}
              style={{
                position: 'absolute',
                inset: 0,
                overflow: 'hidden',
              }}
            >
              <Image
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=85"
                alt="Team al lavoro"
                fill
                priority
                sizes="100vw"
                style={{ objectFit: 'cover', objectPosition: '50% 30%' }}
              />
              {/* Dark overlay */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to bottom, rgba(6,6,6,0.2) 0%, rgba(6,6,6,0.3) 50%, rgba(6,6,6,0.7) 100%)',
                }}
                aria-hidden="true"
              />
            </motion.div>

            {/* Content — pinned to bottom, inside overflow:hidden */}
            <div
              className="absolute inset-0 flex flex-col justify-end items-start"
              style={{
                zIndex: 2,
                padding: 'clamp(24px, 4vw, 56px)',
                paddingBottom: 'clamp(24px, 4vw, 48px)',
              }}
            >
              <div className="flex flex-col gap-8 mt-auto w-full md:flex-row md:items-end md:justify-between md:gap-20">
                {/* H1 */}
                <h1 style={{ fontFamily: 'var(--font-display)', margin: 0, padding: 0 }}>
                  <span className="sr-only">Digital Eco — Agenzia di Comunicazione, Web Design e Advertising Digitale a Venezia</span>
                  {['Make.', 'Every project.', 'Better.'].map((line, lineIdx) => {
                    const words = line.split(' ')
                    const wordsBefore = ['Make.', 'Every project.', 'Better.']
                      .slice(0, lineIdx)
                      .reduce((acc, l) => acc + l.split(' ').length, 0)

                    return (
                      <div
                        key={lineIdx}
                        style={{
                          display: 'flex',
                          flexWrap: 'wrap',
                          gap: 'clamp(8px, 1.5vw, 20px)',
                          clipPath: 'inset(-10% -10% -20% -10%)',
                        }}
                      >
                        {words.map((word, wordIdx) => (
                          <motion.span
                            key={wordIdx}
                            initial={rm ? false : { opacity: 0, y: '60%' }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              duration: 0.8,
                              delay: SPLASH_DURATION + (wordsBefore + wordIdx) * 0.15,
                              ease: EASE,
                            }}
                            style={{
                              display: 'block',
                              fontFamily: 'var(--font-display)',
                              fontSize: 'clamp(44px, 9vw, 140px)',
                              fontWeight: 400,
                              fontStyle: 'italic',
                              letterSpacing: '-0.04em',
                              lineHeight: 0.95,
                              color: '#FFFFFF',
                            }}
                          >
                            {word}
                          </motion.span>
                        ))}
                      </div>
                    )
                  })}
                </h1>

                {/* CTA button */}
                <motion.a
                  href="#consulenza"
                  onClick={scroll}
                  initial={rm ? false : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: SPLASH_DURATION + 0.8, ease: EASE }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    fontFamily: 'var(--font-body)',
                    fontWeight: 600,
                    fontSize: 'clamp(11px, 1.2vw, 14px)',
                    letterSpacing: '0.04em',
                    color: '#FFFFFF',
                    background: 'rgba(255, 255, 255, 0.15)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255, 255, 255, 0.25)',
                    padding: 'clamp(12px, 1.4vw, 16px) clamp(24px, 2.5vw, 36px)',
                    borderRadius: 'var(--radius-sm)',
                    textDecoration: 'none',
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                    width: 'fit-content',
                    transition: 'transform 200ms cubic-bezier(0.16, 1, 0.3, 1), opacity 200ms ease',
                  }}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Parliamone
                </motion.a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
