'use client'

import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

const SERVICES = [
  'Siti Web',
  'E-Commerce',
  'SEO',
  'Advertising',
  'Social Media',
  'Branding',
  'Strategia',
  'Web Design',
]

export default function Services() {
  const rm = useReducedMotion()
  const trackRef = useRef<HTMLDivElement>(null)
  const offsetRef = useRef(0)
  const frameRef = useRef<number>(0)
  const [paused, setPaused] = useState(false)
  const pausedRef = useRef(false)

  useEffect(() => {
    pausedRef.current = paused
  }, [paused])

  useEffect(() => {
    if (rm) return
    const track = trackRef.current
    if (!track) return

    function tick() {
      if (!track) return
      if (!pausedRef.current) {
        offsetRef.current += 0.5

        const children = track.children
        const halfCount = children.length / 2
        let setWidth = 0
        for (let i = 0; i < halfCount; i++) {
          setWidth += (children[i] as HTMLElement).offsetWidth
        }

        if (offsetRef.current >= setWidth) {
          offsetRef.current -= setWidth
        }

        track.style.transform = `translateX(${-offsetRef.current}px)`
      }
      frameRef.current = requestAnimationFrame(tick)
    }

    frameRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameRef.current)
  }, [rm])

  const items = SERVICES.flatMap((s) => [s, '●'])
  // Triple to ensure no gaps
  const rendered = [...items, ...items, ...items]

  return (
    <section
      id="servizi"
      aria-label="Servizi"
      style={{
        position: 'relative',
        background: '#0A0F0C',
        padding: 'clamp(28px, 3.5vw, 48px) 0',
        overflow: 'hidden',
      }}
    >
      {/* Shadow overlay left */}
      <div aria-hidden="true" style={{
        position: 'absolute', left: 0, top: 0, bottom: 0, width: '120px',
        background: 'linear-gradient(to right, #0A0F0C, transparent)',
        zIndex: 2, pointerEvents: 'none',
      }} />
      {/* Shadow overlay right */}
      <div aria-hidden="true" style={{
        position: 'absolute', right: 0, top: 0, bottom: 0, width: '120px',
        background: 'linear-gradient(to left, #0A0F0C, transparent)',
        zIndex: 2, pointerEvents: 'none',
      }} />
      <div
        ref={trackRef}
        style={{
          display: 'flex',
          alignItems: 'center',
          width: 'max-content',
          willChange: 'transform',
          transition: 'none',
        }}
      >
        {rendered.map((text, i) => {
          const isDot = text === '●'
          return (
            <span
              key={i}
              style={isDot ? {
                fontSize: 'clamp(6px, 0.4rem + 0.2vw, 10px)',
                color: 'var(--color-accent)',
                padding: '0 clamp(20px, 3vw, 40px)',
                lineHeight: 1,
                userSelect: 'none',
                flexShrink: 0,
              } : {
                fontFamily: 'var(--font-display)',
                fontStyle: 'italic',
                fontSize: 'clamp(1.8rem, 1.2rem + 2.5vw, 3.5rem)',
                fontWeight: 400,
                letterSpacing: '-0.03em',
                lineHeight: 1,
                whiteSpace: 'nowrap',
                flexShrink: 0,
                color: 'rgba(255, 255, 255, 0.25)',
                transition: 'color 0.3s ease',
              }}
              onMouseEnter={!isDot ? (e) => {
                e.currentTarget.style.color = 'rgba(255, 255, 255, 0.9)'
              } : undefined}
              onMouseLeave={!isDot ? (e) => {
                e.currentTarget.style.color = 'rgba(255, 255, 255, 0.25)'
              } : undefined}
            >
              {text}
            </span>
          )
        })}
      </div>
    </section>
  )
}
