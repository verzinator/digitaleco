'use client'

import { useRef } from 'react'
import { motion, useReducedMotion, useInView } from 'framer-motion'
import ContactFormFields from './ContactFormFields'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

export default function ContactForm() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px 0px' })
  const rm = useReducedMotion()

  return (
    <section
      ref={ref}
      id="consulenza"
      aria-labelledby="contact-title"
      style={{
        background: 'var(--color-bg)',
        padding: 'clamp(80px, 10vw, 140px) clamp(24px, 4vw, 48px)',
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: 'clamp(40px, 5vw, 64px)',
            alignItems: 'start',
          }}
          className="md:!grid-cols-[1fr_1.15fr]"
        >
          {/* Left column — copy */}
          <motion.div
            initial={rm ? false : { opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE }}
            style={{ paddingTop: 'clamp(0px, 2vw, 24px)' }}
          >
            <h2
              id="contact-title"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(36px, 5vw + 0.5rem, 64px)',
                fontWeight: 400,
                fontStyle: 'italic',
                lineHeight: 1.05,
                letterSpacing: '-0.03em',
                color: 'var(--color-text)',
                margin: '0 0 clamp(20px, 3vw, 32px) 0',
              }}
            >
              Troviamo i tuoi clienti.<br /><em style={{ fontStyle: 'italic', color: 'var(--color-accent)' }}>Iniziamo dal conoscerti.</em>
            </h2>

            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(15px, 1.1vw + 0.2rem, 18px)',
                color: 'var(--color-text-muted)',
                lineHeight: 1.7,
                margin: '0 0 clamp(32px, 4vw, 48px) 0',
                maxWidth: '420px',
              }}
            >
              Ogni azienda ha una storia diversa, obiettivi diversi e punti di forza da valorizzare.
              <br /><br />
              Per questo il nostro lavoro inizia sempre da una conversazione. Raccontaci il tuo progetto: analizzeremo le tue esigenze e costruiremo insieme la strategia più adatta per far crescere il tuo business.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                'Primo confronto conoscitivo gratuito',
                'Analisi preliminare del progetto',
                'Strategia e proposta personalizzata',
              ].map((text, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                  }}
                >
                  <div
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: 'var(--color-accent)',
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '14px',
                      fontWeight: 500,
                      color: 'var(--color-text)',
                      letterSpacing: '0.01em',
                    }}
                  >
                    {text}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right column — form card */}
          <motion.div
            initial={rm ? false : { opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.12, ease: EASE }}
            style={{
              background: 'var(--color-surface)',
              borderRadius: '32px',
              padding: 'clamp(28px, 4vw, 44px)',
              border: '1px solid oklch(from #1A1A2E l c h / 0.08)',
              boxShadow: '0 4px 24px oklch(from #1A1A2E l c h / 0.05)',
            }}
          >
            <ContactFormFields idPrefix="c" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
