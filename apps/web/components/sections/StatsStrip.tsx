'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, useInView } from 'framer-motion'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

const STATS = [
  { num: 120, suffix: '+', decimal: 0, label: 'Progetti completati' },
  { num: 98, suffix: '%', decimal: 0, label: 'Clienti soddisfatti' },
  { num: 1.8, suffix: 'M+', decimal: 1, label: 'Budget ads gestito' },
]

function CountUp({
  target,
  decimals,
  suffix,
  duration = 2,
}: {
  target: number
  decimals: number
  suffix: string
  duration?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
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
    <span
      ref={ref}
      style={{
        fontFamily: 'var(--font-display)',
        fontStyle: 'italic',
        fontSize: 'clamp(64px, 8vw, 112px)',
        fontWeight: 400,
        color: 'var(--color-text-inverse)',
        lineHeight: 1,
        letterSpacing: '-0.03em',
        fontVariantNumeric: 'tabular-nums',
      }}
    >
      {value.toFixed(decimals)}
      <span
        style={{
          color: 'var(--color-accent)',
          fontSize: '0.4em',
          fontStyle: 'italic',
          letterSpacing: '-0.02em',
          verticalAlign: 'baseline',
        }}
      >
        {suffix}
      </span>
    </span>
  )
}

export default function StatsStrip() {
  const rm = useReducedMotion()

  return (
    <section
      aria-label="Statistiche"
      style={{
        background: '#0F1410',
        padding: 'clamp(80px, 10vw, 140px) clamp(24px, 4vw, 48px)',
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Title */}
        <motion.h2
          initial={rm ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: EASE }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2rem, 1rem + 3.5vw, 3.5rem)',
            fontWeight: 400,
            fontStyle: 'italic',
            lineHeight: 1.1,
            letterSpacing: '-0.035em',
            color: 'var(--color-text-inverse)',
            margin: '0 0 clamp(40px, 5vw, 72px)',
            textAlign: 'center',
          }}
        >
          Numeri, non <em style={{ color: 'var(--color-accent)' }}>promesse</em>
        </motion.h2>

        {/* Stats row — single box, vertical dividers */}
        <style>{`
          .stats-box {
            background: #222824;
            border-radius: 20px;
            padding: clamp(32px, 4vw, 48px) clamp(24px, 3vw, 40px);
          }
          .stats-row {
            display: grid;
            grid-template-columns: 1fr;
            gap: 0;
          }
          .stats-row .stat-item {
            padding: clamp(24px, 3vw, 32px) 0;
            border-bottom: 1px solid rgba(255,255,255,0.08);
          }
          .stats-row .stat-item:first-child {
            padding-top: 0;
          }
          .stats-row .stat-item:last-child {
            border-bottom: none;
            padding-bottom: 0;
          }
          @media (min-width: 640px) {
            .stats-row {
              grid-template-columns: repeat(3, 1fr);
            }
            .stats-row .stat-item {
              border-bottom: none;
              border-right: 1px solid rgba(255,255,255,0.08);
              padding: clamp(16px, 2vw, 24px) 0;
            }
            .stats-row .stat-item:first-child {
              padding-top: clamp(16px, 2vw, 24px);
            }
            .stats-row .stat-item:last-child {
              border-right: none;
              padding-bottom: clamp(16px, 2vw, 24px);
            }
          }
        `}</style>

        <div className="stats-box">
        <div className="stats-row">
          {STATS.map((stat, i) => (
            <motion.div
              key={i}
              className="stat-item"
              initial={rm ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{
                duration: 0.6,
                delay: rm ? 0 : i * 0.12,
                ease: EASE,
              }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '16px',
                textAlign: 'center',
              }}
            >
              <CountUp
                target={stat.num}
                decimals={stat.decimal}
                suffix={stat.suffix}
              />

              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'clamp(14px, 1.2vw, 15px)',
                  fontWeight: 500,
                  letterSpacing: '0.02em',
                  color: 'rgba(255,255,255,0.4)',
                  margin: 0,
                  lineHeight: 1.4,
                }}
              >
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
        </div>
      </div>
    </section>
  )
}
