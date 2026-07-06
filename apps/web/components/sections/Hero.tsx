'use client'

import { motion, useReducedMotion } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1] as const

/* Typographic fragments — alternating serif (display) and sans (body) */
const headline: { text: string; font: 'display' | 'body' }[] = [
  { text: 'Siamo ', font: 'body' },
  { text: 'Digital Eco.', font: 'display' },
  { text: '\n', font: 'body' },
  { text: 'Agenzia di ', font: 'body' },
  { text: 'comunicazione,', font: 'display' },
  { text: '\n', font: 'body' },
  { text: 'web design ', font: 'display' },
  { text: 'e ', font: 'body' },
  { text: 'advertising', font: 'display' },
  { text: '\n', font: 'body' },
  { text: 'digitale a ', font: 'body' },
  { text: 'Venezia.', font: 'display' },
  { text: '\n', font: 'body' },
  { text: 'Trasformiamo ', font: 'body' },
  { text: 'brand locali', font: 'display' },
  { text: ' in presenze', font: 'body' },
  { text: '\n', font: 'body' },
  { text: 'digitali che competono con i ', font: 'body' },
  { text: 'grandi.', font: 'display' },
]

export default function Hero() {
  const rm = useReducedMotion()

  return (
    <section
      aria-label="Chi siamo"
      style={{
        background: 'var(--color-bg)',
        paddingBlock: 'clamp(96px, 14vw, 200px)',
        paddingInline: 'clamp(24px, 5vw, 80px)',
      }}
    >
      <div style={{ maxWidth: '960px', margin: '0 auto', textAlign: 'left' }}>
        {/* Typographic statement */}
        <motion.h2
          initial={rm ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: EASE }}
          style={{
            fontSize: 'clamp(28px, 4vw + 1rem, 68px)',
            lineHeight: 1.15,
            letterSpacing: '-0.03em',
            color: 'var(--color-text)',
            margin: 0,
            fontWeight: 400,
          }}
        >
          {headline.map((fragment, i) => {
            if (fragment.text === '\n') return <br key={i} />

            const isSerif = fragment.font === 'display'
            return (
              <span
                key={i}
                style={{
                  fontFamily: isSerif ? 'var(--font-display)' : 'var(--font-body)',
                  fontStyle: isSerif ? 'italic' : 'normal',
                  fontWeight: isSerif ? 400 : 300,
                }}
              >
                {fragment.text}
              </span>
            )
          })}
        </motion.h2>

        {/* Description paragraph with inline pill link */}
        <motion.div
          initial={rm ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.15, ease: EASE }}
          style={{
            marginTop: 'clamp(40px, 5vw, 64px)',
            maxWidth: '620px',
            marginLeft: 'auto',
          }}
        >
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(14px, 1.2vw + 0.2rem, 20px)',
            color: 'var(--color-text-muted)',
            lineHeight: 1.75,
            textAlign: 'right',
            margin: 0,
          }}>
            Dal sito web alle campagne advertising, costruiamo
            tutto ciò che serve per portare clienti alla tua azienda.
            Lavoriamo con artigiani, ristoratori, studi professionali
            e startup in Veneto e in tutta Italia.
          </p>
        </motion.div>
      </div>
    </section>
  )
}

/* Inline pill-style link */
function PillLink({ href, children }: { href: string; children: React.ReactNode }) {
  const scroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    document.getElementById(href.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <a
      href={href}
      onClick={scroll}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        fontFamily: 'var(--font-body)',
        fontSize: '10px',
        fontWeight: 600,
        letterSpacing: '0.14em',
        color: 'var(--color-text)',
        border: '1px solid var(--color-divider)',
        borderRadius: '999px',
        padding: '4px 12px',
        textDecoration: 'none',
        verticalAlign: 'middle',
        marginLeft: '4px',
        transition: 'border-color var(--transition-interactive), color var(--transition-interactive)',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'var(--color-primary)'
        e.currentTarget.style.color = 'var(--color-primary)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.borderColor = 'var(--color-divider)'
        e.currentTarget.style.color = 'var(--color-text)'
      }}
    >
      {children}
    </a>
  )
}
