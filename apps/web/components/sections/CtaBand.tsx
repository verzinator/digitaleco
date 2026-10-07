'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { openContactDrawer } from '@/components/ui/ContactDrawer'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

/**
 * La fascia bianca di chiusura dei casi studio: occhiello verde, titolo in
 * corsivo, una riga e "Parliamone" che apre il pannello contatti.
 */
export default function CtaBand({
  eyebrow,
  title,
  text,
}: {
  eyebrow: string
  title: string
  text: string
}) {
  const rm = useReducedMotion()

  return (
    <section
      style={{
        background: '#FFFFFF',
        padding: 'clamp(56px, 7vw, 96px) clamp(24px, 4vw, 48px)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <style>{`
        .cta-band {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: clamp(32px, 5vw, 64px);
        }
        @media (max-width: 768px) {
          .cta-band {
            flex-direction: column;
            align-items: flex-start;
            gap: 28px;
          }
        }
      `}</style>
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(circle, rgba(10,92,68,0.07) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
          pointerEvents: 'none',
        }}
      />
      <motion.div
        initial={rm ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: EASE }}
        className="cta-band"
        style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative' }}
      >
        <div>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '12px',
            fontWeight: 500,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--color-primary)',
            margin: '0 0 clamp(10px, 1.2vw, 16px)',
          }}>
            {eyebrow}
          </p>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(30px, 3.4vw, 46px)',
            fontWeight: 400,
            fontStyle: 'italic',
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            color: 'var(--color-text)',
            margin: '0 0 clamp(10px, 1.2vw, 16px)',
          }}>
            {title}
          </h2>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '14px',
            fontWeight: 300,
            color: 'var(--color-text)',
            lineHeight: 1.7,
            maxWidth: '44ch',
            margin: 0,
          }}>
            {text}
          </p>
        </div>

        <button type="button" onClick={openContactDrawer} className="btn-pill btn-pill--green">
          Parliamone
        </button>
      </motion.div>
    </section>
  )
}
