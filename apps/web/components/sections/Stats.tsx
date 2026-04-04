'use client'

import { motion, useReducedMotion, useInView, animate } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

const stats = [
  { value: 120, suffix: '+', label: 'Progetti completati', description: 'Siti, e-commerce e campagne lanciate con successo' },
  { value: 8, suffix: '', label: 'Anni di esperienza', description: 'In prima linea nel digitale italiano dal 2016' },
  { value: 95, suffix: '%', label: 'Clienti soddisfatti', description: 'Tasso di soddisfazione misurato su ogni progetto' },
  { value: 3.2, suffix: 'x', label: 'ROI medio ads', description: 'Ritorno medio sulle campagne advertising gestite' },
]

function AnimatedNumber({
  value,
  suffix,
  isInView,
}: {
  value: number
  suffix: string
  isInView: boolean
}) {
  const [display, setDisplay] = useState(0)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (!isInView) return
    if (reduceMotion) {
      setDisplay(value)
      return
    }

    const controls = animate(0, value, {
      duration: 1.8,
      ease: EASE,
      onUpdate(v) {
        setDisplay(value % 1 !== 0 ? parseFloat(v.toFixed(1)) : Math.round(v))
      },
    })
    return () => controls.stop()
  }, [isInView, value, reduceMotion])

  return (
    <span
      className="counter-number"
      aria-label={`${value}${suffix}`}
      style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'var(--text-3xl)',
        fontWeight: 700,
        color: 'var(--color-accent)',
        lineHeight: 1,
        fontVariantNumeric: 'tabular-nums',
      }}
    >
      {display}
      {suffix}
    </span>
  )
}

function StatCard({
  stat,
  index,
}: {
  stat: (typeof stats)[0]
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px 0px' })
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      ref={ref}
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.5,
        delay: reduceMotion ? 0 : index * 0.1,
        ease: EASE,
      }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        padding: 'var(--space-8)',
        background: 'oklch(from #FFFFFF l c h / 0.05)',
        border: '1px solid oklch(from #FFFFFF l c h / 0.12)',
        borderRadius: 'var(--radius-md)',
        flex: 1,
        minWidth: '200px',
      }}
    >
      <AnimatedNumber value={stat.value} suffix={stat.suffix} isInView={isInView} />
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-base)',
          fontWeight: 700,
          color: '#FFFFFF',
          marginTop: 'var(--space-3)',
          marginBottom: 'var(--space-2)',
        }}
      >
        {stat.label}
      </p>
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-sm)',
          color: 'oklch(from #FFFFFF l c h / 0.65)',
          lineHeight: 1.6,
        }}
      >
        {stat.description}
      </p>
    </motion.div>
  )
}

export default function Stats() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px 0px' })
  const reduceMotion = useReducedMotion()

  return (
    <section
      ref={ref}
      aria-labelledby="stats-title"
      style={{
        background: 'var(--color-primary)',
        paddingBlock: 'var(--space-24)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(circle, oklch(from #2ECC71 l c h / 0.15) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          pointerEvents: 'none',
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '-20%',
          right: '-10%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, oklch(from #2ECC71 l c h / 0.10) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: EASE }}
          style={{ marginBottom: 'var(--space-12)', maxWidth: '560px' }}
        >
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-xs)',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--color-accent)',
              marginBottom: 'var(--space-3)',
            }}
          >
            I numeri ci danno ragione
          </p>
          <h2
            id="stats-title"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-2xl)',
              lineHeight: 1.15,
              color: '#FFFFFF',
            }}
          >
            Risultati concreti, misurabili, reali
          </h2>
        </motion.div>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'var(--space-4)',
          }}
        >
          {stats.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
