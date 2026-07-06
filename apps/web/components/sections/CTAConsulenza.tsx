'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

export default function CTAConsulenza() {
  const rm = useReducedMotion()

  function scrollToContact(e: React.MouseEvent) {
    e.preventDefault()
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="consulenza"
      aria-labelledby="cta-title"
      style={{
        background: 'var(--color-bg)',
        padding: 'clamp(32px, 5vw, 80px) clamp(20px, 4vw, 48px)',
      }}
    >
      <motion.div
        initial={rm ? false : { opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.7, ease: EASE }}
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          background: 'var(--color-primary)',
          borderRadius: 'clamp(16px, 2vw, 28px)',
          overflow: 'hidden',
          position: 'relative',
          display: 'grid',
          gridTemplateColumns: '1fr',
          minHeight: '400px',
        }}
        className="md:!grid-cols-[1fr_auto]"
      >
        {/* Left: content */}
        <div style={{
          padding: 'clamp(40px, 5vw, 72px)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 2,
        }}>
          <h2
            id="cta-title"
            style={{
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              fontSize: 'clamp(1.8rem, 1rem + 3vw, 3.4rem)',
              lineHeight: 1.1,
              letterSpacing: '-0.03em',
              color: '#FFFFFF',
              marginBottom: 'clamp(16px, 2vw, 28px)',
            }}
          >
            Parliamo del tuo{' '}
            <em style={{ fontStyle: 'italic', color: 'var(--color-accent)' }}>
              prossimo progetto
            </em>
          </h2>

          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(14px, 1.2vw, 17px)',
            color: 'rgba(255,255,255,0.7)',
            lineHeight: 1.65,
            maxWidth: '480px',
            marginBottom: 'clamp(24px, 3vw, 40px)',
          }}>
            Raccontaci la tua idea. Ti offriamo una consulenza gratuita con analisi preliminare e proposta personalizzata entro 24 ore.
          </p>

          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <a
              href="#contact"
              onClick={scrollToContact}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontFamily: 'var(--font-body)',
                fontWeight: 600,
                fontSize: 'clamp(13px, 1.1vw, 15px)',
                color: 'var(--color-primary)',
                background: '#FFFFFF',
                padding: '14px 28px',
                borderRadius: 'var(--radius-sm)',
                textDecoration: 'none',
                transition: 'transform 100ms ease, filter 140ms ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.filter = 'brightness(0.95)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.filter = 'none'
              }}
            >
              Consulenza Gratuita
              <ArrowRight size={16} aria-hidden="true" />
            </a>

            <a
              href="mailto:ciao@digitaleco.it"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                fontFamily: 'var(--font-body)',
                fontWeight: 500,
                fontSize: 'clamp(13px, 1.1vw, 15px)',
                color: 'rgba(255,255,255,0.7)',
                background: 'transparent',
                padding: '14px 28px',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid rgba(255,255,255,0.2)',
                textDecoration: 'none',
                transition: 'color 200ms ease, border-color 200ms ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = '#FFFFFF'
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = 'rgba(255,255,255,0.7)'
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'
              }}
            >
              ciao@digitaleco.it
            </a>
          </div>
        </div>

        {/* Right: decorative element */}
        <div
          className="hidden md:flex"
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px 60px 40px 0',
            position: 'relative',
          }}
        >
          {/* Abstract leaf/eco shape */}
          <svg
            width="220"
            height="260"
            viewBox="0 0 220 260"
            fill="none"
            style={{ opacity: 0.12 }}
            aria-hidden="true"
          >
            <path
              d="M10 250 C10 250, 10 10, 110 10 C210 10, 210 250, 210 250"
              stroke="#FFFFFF"
              strokeWidth="1.5"
              fill="none"
            />
            <path
              d="M40 250 C40 250, 40 50, 110 50 C180 50, 180 250, 180 250"
              stroke="#FFFFFF"
              strokeWidth="1.5"
              fill="none"
            />
            <path
              d="M70 250 C70 250, 70 90, 110 90 C150 90, 150 250, 150 250"
              stroke="#FFFFFF"
              strokeWidth="1.5"
              fill="none"
            />
            <circle cx="110" cy="130" r="8" fill="var(--color-accent)" opacity="0.6" />
          </svg>
        </div>

        {/* Background glow */}
        <div
          style={{
            position: 'absolute',
            top: '-30%',
            right: '-10%',
            width: '60%',
            height: '160%',
            background: 'radial-gradient(ellipse at center, rgba(46,204,113,0.08) 0%, transparent 70%)',
            pointerEvents: 'none',
          }}
          aria-hidden="true"
        />
      </motion.div>
    </section>
  )
}
