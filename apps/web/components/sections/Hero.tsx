'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

const heroVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.10,
    },
  },
}

const EASE = [0.16, 1, 0.3, 1] as const

const childVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: EASE,
    },
  },
}

const typewriterContainer = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.02,
    },
  },
}

function Typewriter({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <motion.span
      variants={{
        hidden: { opacity: 1 },
        visible: {
          opacity: 1,
          transition: {
            delayChildren: delay,
            staggerChildren: 0.05, // A bit slower to feel more mechanical
          },
        },
      }}
      initial="hidden"
      animate="visible"
      style={{ fontFamily: 'inherit', position: 'relative' }}
    >
      {text.split('').map((char, i) => (
        <motion.span 
          key={i} 
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { duration: 0 } }
          }}
          style={{ fontFamily: 'inherit' }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  )
}

export default function Hero() {
  const reduceMotion = useReducedMotion()

  const motionProps = reduceMotion
    ? {}
    : { initial: 'hidden', animate: 'visible', variants: heroVariants }

  return (
    <section
      aria-label="Hero — Benvenuto in Digital Eco"
      style={{
        position: 'relative',
        height: '100vh',
        minHeight: '100svh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--color-bg)',
        overflow: 'hidden',
        paddingTop: '72px',
      }}
    >
      {/* Dot grid background */}
      <div
        aria-hidden="true"
        className="hero-dot-grid"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
        }}
      />

      {/* Large decorative circle */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: '-15%',
          right: '-10%',
          width: 'clamp(400px, 55vw, 800px)',
          height: 'clamp(400px, 55vw, 800px)',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, oklch(from var(--color-accent) l c h / 0.12) 0%, transparent 70%)',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      {/* Small accent orb */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '15%',
          left: '5%',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, oklch(from var(--color-primary) l c h / 0.08) 0%, transparent 70%)',
          zIndex: 0,
          pointerEvents: 'none',
        }}
      />

      <div
        className="container"
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: 'var(--space-12)',
          paddingBlock: 'var(--space-20)',
        }}
      >
        <motion.div
          {...motionProps}
          style={{
            maxWidth: '860px', // Increased slightly for better look when centered
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* Eyebrow */}
          <motion.p
            variants={reduceMotion ? {} : childVariant}
            className="eyebrow"
            style={{
              marginBottom: 'var(--space-4)',
            }}
          >
            Agenzia Digitale Italiana
          </motion.p>

          {/* Main headline */}
          <motion.h1
            variants={reduceMotion ? {} : childVariant}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-hero)',
              lineHeight: 1.05,
              color: 'var(--color-text)',
              marginBottom: 'var(--space-6)',
              letterSpacing: '-0.02em',
            }}
          >
            {reduceMotion ? (
              <>
                Progettiamo <em style={{ fontStyle: 'italic', color: 'var(--color-primary)' }}>esperienze</em> <br />
                digitali che crescono.
              </>
            ) : (
              <>
                <Typewriter text="Progettiamo " delay={0.2} />
                <em
                  style={{
                    fontStyle: 'italic',
                    color: 'var(--color-primary)',
                  }}
                >
                  <Typewriter text="esperienze" delay={0.5} />
                </em>{' '}
                <br />
                <Typewriter text="digitali che crescono." delay={0.8} />
              </>
            )}
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            variants={reduceMotion ? {} : childVariant}
            style={{
              fontSize: 'var(--text-lg)',
              color: 'var(--color-text-muted)',
              lineHeight: 1.65,
              maxWidth: '560px',
              marginInline: 'auto',
              marginBottom: 'var(--space-10)',
            }}
          >
            {reduceMotion ? (
              "Dal web design all'e-commerce, dalla gestione social all'advertising: costruiamo la presenza digitale che il tuo brand merita."
            ) : (
              <Typewriter 
                text="Dal web design all'e-commerce, dalla gestione social all'advertising: costruiamo la presenza digitale che il tuo brand merita." 
                delay={1.4} 
              />
            )}
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={reduceMotion ? {} : childVariant}
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 'var(--space-4)',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Link
              href="/contact"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'var(--space-2)',
                fontFamily: 'var(--font-body)',
                fontWeight: 600,
                fontSize: 'var(--text-base)',
                color: 'var(--color-text-inverse)',
                background: 'var(--color-primary)',
                padding: 'var(--space-4) var(--space-8)',
                borderRadius: 'var(--radius-sm)',
                minHeight: '52px',
                transition: 'background var(--transition-interactive), transform var(--transition-interactive)',
                textDecoration: 'none',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'var(--color-primary-hover)'
                e.currentTarget.style.transform = 'translateY(-1px)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'var(--color-primary)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              Consulenza Gratuita
              <ArrowRight size={18} aria-hidden="true" />
            </Link>

            <Link
              href="/portfolio"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'var(--space-2)',
                fontFamily: 'var(--font-body)',
                fontWeight: 600,
                fontSize: 'var(--text-base)',
                color: 'var(--color-primary)',
                background: 'transparent',
                padding: 'var(--space-4) var(--space-8)',
                borderRadius: 'var(--radius-sm)',
                minHeight: '52px',
                border: '1px solid var(--color-border)',
                transition: 'border-color var(--transition-interactive), background var(--transition-interactive)',
                textDecoration: 'none',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'var(--color-primary)'
                e.currentTarget.style.background = 'oklch(from var(--color-primary) l c h / 0.04)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'var(--color-border)'
                e.currentTarget.style.background = 'transparent'
              }}
            >
              Vedi il Portfolio
            </Link>
          </motion.div>

        </motion.div>
      </div>
    </section>
  )
}
