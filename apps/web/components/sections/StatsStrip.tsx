'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, useInView } from 'framer-motion'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

const STATS = [
  { num: 120, suffix: '+', decimal: 0, label: 'Progetti web e digital completati' },
  { num: 98, suffix: '%', decimal: 0, label: 'Clienti soddisfatti del servizio' },
  { num: 1.8, suffix: 'M+', decimal: 1, label: 'Budget advertising gestito in €' },
]

function CountUp({ target, decimals, suffix, duration = 2 }: { target: number; decimals: number; suffix: string; duration?: number }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!inView) return
    const start = performance.now()
    function tick(now: number) {
      const t = Math.min((now - start) / (duration * 1000), 1)
      const eased = 1 - Math.pow(1 - t, 4)
      setValue(eased * target)
      if (t < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, target, duration])

  return (
    <p ref={ref} style={{
      fontFamily: 'var(--font-display)',
      fontStyle: 'italic',
      fontSize: 'clamp(32px, 4vw, 52px)',
      fontWeight: 400,
      color: 'var(--color-text)',
      margin: 0,
      lineHeight: 1,
      letterSpacing: '-0.03em',
    }}>
      {value.toFixed(decimals)}{suffix}
    </p>
  )
}

export default function StatsStrip() {
  const rm = useReducedMotion()

  return (
    <section
      aria-label="Statistiche"
      style={{
        background: 'var(--color-bg)',
        padding: 'clamp(80px, 10vw, 140px) clamp(24px, 4vw, 48px)',
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Top row: title left + description right */}
        <div className="stats-header" style={{
          display: 'grid',
          gap: 'clamp(24px, 3vw, 48px)',
          marginBottom: 'clamp(48px, 6vw, 80px)',
          alignItems: 'end',
        }}>
          <style>{`
            .stats-header {
              grid-template-columns: 1fr;
            }
            @media (min-width: 768px) {
              .stats-header {
                grid-template-columns: 1fr 1fr;
              }
            }
          `}</style>

          <motion.h2
            initial={rm ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, ease: EASE }}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(32px, 4vw, 52px)',
              fontWeight: 400,
              fontStyle: 'italic',
              lineHeight: 1.15,
              letterSpacing: '-0.035em',
              color: 'var(--color-text)',
              margin: 0,
            }}
          >
            Numeri, non <em style={{ color: 'var(--color-primary)' }}>promesse</em>
          </motion.h2>

        </div>

        {/* Stat cards — 3 columns, big numbers, left aligned */}
        <div
          className="stats-grid"
          style={{
            display: 'grid',
            gap: 'clamp(16px, 2vw, 24px)',
          }}
        >
          <style>{`
            .stats-grid {
              grid-template-columns: 1fr;
            }
            @media (min-width: 640px) {
              .stats-grid {
                grid-template-columns: repeat(3, 1fr);
              }
            }
          `}</style>
          {STATS.map((stat, i) => (
            <motion.div
              key={i}
              initial={rm ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: EASE }}
              style={{
                background: '#FFFFFF',
                border: '1px solid var(--color-divider)',
                borderRadius: '20px',
                padding: 'clamp(32px, 4vw, 48px) clamp(28px, 3vw, 40px)',
              }}
            >
              <CountUp target={stat.num} decimals={stat.decimal} suffix={stat.suffix} />
              <p style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(13px, 1vw, 15px)',
                fontWeight: 400,
                color: 'var(--color-text-muted)',
                margin: '16px 0 0',
                lineHeight: 1.4,
              }}>
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
