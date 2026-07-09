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
        position: 'relative',
        background: '#060D09',
        paddingBlock: 'clamp(64px, 8vw, 120px)',
        paddingInline: 'clamp(24px, 5vw, 80px)',
      }}
    >
      <div style={{ position: 'relative', zIndex: 2, maxWidth: '960px', margin: '0 auto', textAlign: 'left' }}>
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
            color: '#F0F5F2',
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

        {/* Description paragraph */}
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
            color: 'rgba(240, 245, 242, 0.5)',
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
