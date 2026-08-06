'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useInView, useReducedMotion } from 'framer-motion'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import AmbientBlobs from '@/components/ui/AmbientBlobs'
import Link from 'next/link'

/* ─────────────────────────────────────────────
   Constants
   ───────────────────────────────────────────── */

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

const PROJECT = {
  title: 'MasterFor',
  category: 'Formazione & Trasformazione Digitale',
  year: '2022–2024',
  client: 'MasterFor',
  services: ['Analisi', 'Comunicazione', 'Trasformazione Digitale'],
  heroImage: '/progetti/progetto-1-5.jpeg',
}

const GALLERY = [
  { src: '/progetti/progetto-1-2.jpeg', alt: 'MasterFor, scatto della produzione fotografica dedicata' },
  { src: '/progetti/progetto-1-3.jpeg', alt: 'MasterFor, spazi e attività formative dell’azienda' },
  { src: '/progetti/progetto-1-4.jpeg', alt: 'MasterFor, il nuovo ecosistema digitale in uso' },
]

const CLOSING_NOTE =
  'Il progetto è stato completato attraverso attività di formazione e affiancamento rivolte al personale, ' +
  'con l’obiettivo di favorire l’utilizzo dei nuovi strumenti e rendere l’organizzazione progressivamente ' +
  'autonoma nella gestione dell’ecosistema digitale.'

const METRICS = [
  { value: 340, suffix: '%', label: 'Aumento traffico organico' },
  { value: 52, suffix: '%', label: 'Tasso di conversione Google Ads' },
  { value: 2.8, suffix: 'x', label: 'ROAS medio campagne', decimals: 1 },
  { value: 96, suffix: '/100', label: 'PageSpeed score mobile' },
]

const RELATED = [
  {
    title: 'Artigiani del Gusto',
    tags: ['E-Commerce', 'Sviluppo Sito', 'SEO'],
    image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1600&q=80',
    href: '/portfolio',
  },
  {
    title: 'Studio Legale Meroni',
    tags: ['Branding', 'Web Design', 'SEO'],
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80',
    href: '/portfolio',
  },
]

/* ─────────────────────────────────────────────
   Animated Counter
   ───────────────────────────────────────────── */

function Counter({ value, suffix, decimals = 0 }: { value: number; suffix: string; decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const [display, setDisplay] = useState('0')

  useEffect(() => {
    if (!isInView) return
    const duration = 1800
    const startTime = performance.now()

    function tick(now: number) {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      // ease-out quart
      const eased = 1 - Math.pow(1 - progress, 4)
      const current = eased * value
      setDisplay(decimals > 0 ? current.toFixed(decimals) : Math.round(current).toString())
      if (progress < 1) requestAnimationFrame(tick)
    }

    requestAnimationFrame(tick)
  }, [isInView, value, decimals])

  return (
    <span ref={ref}>
      {display}{suffix}
    </span>
  )
}

/* ─────────────────────────────────────────────
   Gallery Image
   ───────────────────────────────────────────── */

function GalleryImage({ src, alt, index }: { src: string; alt: string; index: number }) {
  const rm = useReducedMotion()

  return (
    <motion.div
      initial={rm ? false : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: EASE }}
      style={{ overflow: 'hidden', borderRadius: '12px' }}
    >
      <img
        src={src}
        alt={alt}
        loading="lazy"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
        }}
      />
    </motion.div>
  )
}

/* ─────────────────────────────────────────────
   Page
   ───────────────────────────────────────────── */

export default function MasterForPage() {
  const rm = useReducedMotion()
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 120])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  // Posizione del bagliore sul bordo dei pannelli glass
  const handleGlassMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget
    const rect = el.getBoundingClientRect()
    el.style.setProperty('--gx', `${e.clientX - rect.left}px`)
    el.style.setProperty('--gy', `${e.clientY - rect.top}px`)
  }

  return (
    <>
      <style>{`
        .cs-info-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: clamp(24px, 3vw, 48px);
        }
        .cs-gallery-pair {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(16px, 2vw, 24px);
        }
        .cs-gallery-pair > div {
          aspect-ratio: 4 / 3;
        }
        .cs-gallery-full {
          aspect-ratio: 21 / 9;
        }
        .cs-metrics-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: clamp(24px, 3vw, 48px);
        }
        .cs-related-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: clamp(16px, 2vw, 24px);
        }
        .cs-glass {
          position: relative;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 8px;
          padding: clamp(24px, 3vw, 40px);
          transition: background 400ms ease, border-color 400ms ease, box-shadow 400ms ease;
        }
        .cs-glass:hover {
          background: rgba(255, 255, 255, 0.07);
          border-color: rgba(255, 255, 255, 0.18);
          box-shadow: 0 8px 40px rgba(0, 0, 0, 0.28);
        }
        /* Bordo che si illumina sotto il puntatore: anello di 1px
           ritagliato con una mask, posizione da --gx/--gy */
        .cs-glass::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          padding: 1px;
          background: radial-gradient(
            220px circle at var(--gx, 50%) var(--gy, 50%),
            rgba(255, 255, 255, 0.55) 0%,
            rgba(255, 255, 255, 0.12) 45%,
            transparent 70%
          );
          -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
          mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          mask-composite: exclude;
          opacity: 0;
          transition: opacity 350ms ease;
          pointer-events: none;
        }
        .cs-glass:hover::before {
          opacity: 1;
        }
        @media (prefers-reduced-motion: reduce) {
          .cs-glass::before {
            display: none;
          }
        }
        .cs-glass-note {
          background: rgba(255, 255, 255, 0.04);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-top: 1px solid rgba(255, 255, 255, 0.14);
          border-bottom: 1px solid rgba(255, 255, 255, 0.14);
          padding-block: clamp(24px, 3vw, 40px);
          padding-inline: clamp(20px, 2.5vw, 32px);
        }
        .cs-cta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: clamp(32px, 5vw, 64px);
        }
        .cs-cta-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          flex-shrink: 0;
          background: var(--color-primary);
          color: var(--color-text-inverse);
          font-family: var(--font-body);
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          padding: 16px 32px;
          min-height: 52px;
          border-radius: 100px;
          text-decoration: none;
          transition: background 0.3s ease, transform 0.15s ease;
        }
        .cs-cta-btn:hover {
          background: var(--color-primary-hover);
          transform: translateY(-1px);
        }
        .cs-cta-arrow {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          transition: transform 250ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        .cs-cta-btn:hover .cs-cta-arrow {
          transform: translateX(3px);
        }
        .cs-related-card {
          cursor: pointer;
          text-decoration: none;
          display: block;
        }
        .cs-related-card:hover .cs-related-inner {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.14);
          box-shadow: 0 8px 40px rgba(0, 0, 0, 0.25);
        }
        .cs-related-card:hover h3 {
          color: rgba(255, 255, 255, 1) !important;
        }
        .cs-narrative {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(24px, 3vw, 40px);
          align-items: stretch;
        }
        @media (max-width: 768px) {
          .cs-info-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          .cs-metrics-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 24px;
          }
          .cs-related-grid {
            grid-template-columns: 1fr;
          }
          .cs-gallery-pair {
            grid-template-columns: 1fr;
          }
          .cs-gallery-pair > div {
            aspect-ratio: 16 / 9;
          }
          .cs-gallery-full {
            aspect-ratio: 16 / 9;
          }
          .cs-cta {
            flex-direction: column;
            align-items: flex-start;
            gap: 28px;
          }
          .cs-narrative {
            grid-template-columns: 1fr;
            gap: 32px;
          }
        }
      `}</style>

      <Navbar />

      <main id="main-content" tabIndex={-1}>

        {/* ── Hero ── */}
        <section
          ref={heroRef}
          style={{
            position: 'relative',
            height: '100svh',
            minHeight: '600px',
            overflow: 'hidden',
          }}
        >
          <motion.div
            style={{
              position: 'absolute',
              inset: 0,
              y: rm ? 0 : heroY,
            }}
          >
            <img
              src={PROJECT.heroImage}
              alt="MasterFor, vista d'insieme del progetto"
              style={{
                width: '100%',
                height: '115%',
                objectFit: 'cover',
                objectPosition: 'center 30%',
              }}
            />
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to bottom, rgba(5,30,20,0.3) 0%, rgba(5,30,20,0.7) 100%)',
            }} />
          </motion.div>

          <motion.div
            style={{
              position: 'relative',
              zIndex: 1,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-end',
              padding: 'clamp(24px, 4vw, 48px)',
              paddingBottom: 'clamp(48px, 8vw, 96px)',
              maxWidth: '1400px',
              margin: '0 auto',
              width: '100%',
              opacity: rm ? 1 : heroOpacity,
            }}
          >
            <motion.p
              initial={rm ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(14px, 1.3vw, 19px)',
                fontWeight: 500,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.7)',
                marginBottom: 'clamp(12px, 1.5vw, 20px)',
              }}
            >
              {PROJECT.category}
            </motion.p>

            <motion.h1
              initial={rm ? false : { opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5, ease: EASE }}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(36px, 6vw, 80px)',
                fontWeight: 400,
                fontStyle: 'italic',
                lineHeight: 1.05,
                letterSpacing: '-0.03em',
                color: '#FFFFFF',
                margin: 0,
                maxWidth: '700px',
              }}
            >
              {PROJECT.title}
            </motion.h1>
          </motion.div>
        </section>

        {/* ── Info Strip ── */}
        <section style={{
          background: '#0F1410',
          padding: 'clamp(48px, 6vw, 80px) clamp(24px, 4vw, 48px)',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto', position: 'relative' }}>
            <div className="cs-info-grid">
              {/* Cliente */}
              <motion.div
                initial={rm ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'clamp(11px, 0.9vw, 13px)',
                  fontWeight: 500,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'rgba(255, 255, 255, 0.5)',
                  marginBottom: '8px',
                }}>
                  Cliente
                </p>
                <p style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(20px, 1.8vw, 28px)',
                  fontWeight: 400,
                  fontStyle: 'italic',
                  letterSpacing: '-0.02em',
                  color: 'rgba(255, 255, 255, 0.95)',
                  lineHeight: 1.3,
                  margin: 0,
                }}>
                  {PROJECT.client}
                </p>
              </motion.div>

              {/* Servizi — pill tags */}
              <motion.div
                initial={rm ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
              >
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'clamp(11px, 0.9vw, 13px)',
                  fontWeight: 500,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'rgba(255, 255, 255, 0.5)',
                  marginBottom: '10px',
                }}>
                  Servizi
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {PROJECT.services.map((s) => (
                    <span
                      key={s}
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'clamp(12px, 0.9vw, 14px)',
                        fontWeight: 500,
                        color: 'rgba(255, 255, 255, 0.75)',
                        background: 'rgba(255, 255, 255, 0.06)',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        padding: '6px 14px',
                        borderRadius: '999px',
                        lineHeight: 1.3,
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Anno */}
              <motion.div
                initial={rm ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
              >
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'clamp(11px, 0.9vw, 13px)',
                  fontWeight: 500,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'rgba(255, 255, 255, 0.5)',
                  marginBottom: '8px',
                }}>
                  Anno
                </p>
                <p style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(20px, 1.8vw, 28px)',
                  fontWeight: 400,
                  fontStyle: 'italic',
                  letterSpacing: '-0.02em',
                  color: 'rgba(255, 255, 255, 0.95)',
                  lineHeight: 1.3,
                  margin: 0,
                }}>
                  {PROJECT.year}
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Corpo: grigio scuro come le fasce, testi glass, gallery, nota, immagine ── */}
        <div style={{ background: '#0F1410', position: 'relative', overflow: 'hidden' }}>
          <AmbientBlobs variant="ink" trackMouse />
          {/* Dot pattern, come nelle fasce */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)',
              backgroundSize: '20px 20px',
              pointerEvents: 'none',
            }}
          />

        {/* ── Il progetto e La soluzione ── */}
        <section style={{
          position: 'relative',
          zIndex: 1,
          padding: 'clamp(48px, 6vw, 96px) clamp(24px, 4vw, 48px)',
        }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div className="cs-narrative">
              {/* Il Progetto */}
              <motion.div
                className="cs-glass"
                onMouseMove={rm ? undefined : handleGlassMove}
                initial={rm ? false : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, ease: EASE }}
              >
                <h2 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(24px, 2.5vw, 36px)',
                  fontWeight: 400,
                  fontStyle: 'italic',
                  lineHeight: 1.15,
                  letterSpacing: '-0.02em',
                  color: 'rgba(255, 255, 255, 0.9)',
                  marginBottom: 'clamp(16px, 2vw, 24px)',
                }}>
                  Il progetto
                </h2>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'clamp(14px, 1.5vw, 20px)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px',
                  fontWeight: 300,
                  color: 'rgba(255, 255, 255, 0.72)',
                  lineHeight: 1.75,
                  maxWidth: '45ch',
                }}>
                  <p style={{ margin: 0 }}>
                    Il percorso con MasterFor è iniziato da un’attività di analisi approfondita dell’azienda,
                    della sua organizzazione e dei diversi servizi proposti.
                  </p>
                  <p style={{ margin: 0 }}>
                    Abbiamo incontrato e coinvolto i referenti delle diverse aree aziendali: Formazione,
                    Consulenza, Incentivi, Servizi al lavoro e MasterForGourmet, la divisione dedicata al mondo
                    della ristorazione e dell’Ho.Re.Ca., per comprendere le specificità di ogni reparto,
                    le modalità operative, i target di riferimento e gli obiettivi commerciali.
                  </p>
                  <p style={{ margin: 0 }}>
                    Questa prima fase ci ha permesso di costruire una visione complessiva dell’azienda e di
                    definire una strategia di comunicazione capace di valorizzare le diverse competenze di
                    MasterFor all’interno di un’identità unica, chiara e riconoscibile.
                  </p>
                </div>
              </motion.div>

              {/* La Soluzione */}
              <motion.div
                className="cs-glass"
                onMouseMove={rm ? undefined : handleGlassMove}
                initial={rm ? false : { opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
              >
                <h2 style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(24px, 2.5vw, 36px)',
                  fontWeight: 400,
                  fontStyle: 'italic',
                  lineHeight: 1.15,
                  letterSpacing: '-0.02em',
                  color: 'rgba(255, 255, 255, 0.9)',
                  marginBottom: 'clamp(16px, 2vw, 24px)',
                }}>
                  La soluzione
                </h2>
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'clamp(14px, 1.5vw, 20px)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px',
                  fontWeight: 300,
                  color: 'rgba(255, 255, 255, 0.72)',
                  lineHeight: 1.75,
                  maxWidth: '45ch',
                }}>
                  <p style={{ margin: 0 }}>
                    A partire dall’analisi iniziale, abbiamo sviluppato un progetto pluriennale di rinnovamento
                    della comunicazione e digitalizzazione dei servizi.
                  </p>
                  <p style={{ margin: 0 }}>
                    Abbiamo curato il restyling complessivo dell’immagine aziendale, definendo un nuovo stile
                    visivo e realizzando contenuti fotografici dedicati alle persone, agli spazi e alle diverse
                    attività dell’azienda.
                  </p>
                  <p style={{ margin: 0 }}>
                    Abbiamo quindi progettato e sviluppato il nuovo sito web, riorganizzando l’offerta per rendere
                    immediatamente comprensibili i diversi ambiti di intervento e facilitare la navigazione degli utenti.
                  </p>
                  <p style={{ margin: 0 }}>
                    Parallelamente, abbiamo realizzato una piattaforma dedicata alla promozione, alla vendita e alla
                    gestione dei corsi di formazione. Uno strumento attraverso il quale gli utenti possono consultare
                    l’offerta formativa, acquistare i corsi e accedere ai contenuti online, mentre l’azienda può
                    gestire in modo più efficiente iscrizioni, percorsi e attività formative.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Gallery: 2 immagini affiancate ── */}
        <section style={{
          position: 'relative',
          zIndex: 1,
          padding: '0 clamp(24px, 4vw, 48px) clamp(48px, 6vw, 96px)',
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div className="cs-gallery-pair">
              <GalleryImage src={GALLERY[0].src} alt={GALLERY[0].alt} index={0} />
              <GalleryImage src={GALLERY[1].src} alt={GALLERY[1].alt} index={1} />
            </div>
          </div>
        </section>

        {/* ── Nota di chiusura: testo glass tra due righe ── */}
        <section style={{
          position: 'relative',
          zIndex: 1,
          padding: '0 clamp(24px, 4vw, 48px) clamp(48px, 6vw, 96px)',
        }}>
          <motion.div
            initial={rm ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: EASE }}
            className="cs-glass-note"
            style={{ maxWidth: '1000px', margin: '0 auto' }}
          >
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '14px',
              fontWeight: 400,
              color: 'rgba(255, 255, 255, 0.85)',
              lineHeight: 1.7,
              letterSpacing: '-0.01em',
              margin: 0,
            }}>
              {CLOSING_NOTE}
            </p>
          </motion.div>
        </section>

        {/* ── Immagine full-width ── */}
        <section style={{
          position: 'relative',
          zIndex: 1,
          padding: '0 clamp(24px, 4vw, 48px) clamp(48px, 6vw, 96px)',
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <div className="cs-gallery-full">
              <GalleryImage src={GALLERY[2].src} alt={GALLERY[2].alt} index={0} />
            </div>
          </div>
        </section>

        </div>{/* fine blocco dark */}

        {/* ── CTA ── */}
        <section style={{
          background: '#FFFFFF',
          padding: 'clamp(56px, 7vw, 96px) clamp(24px, 4vw, 48px)',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Dot pattern coerente con gli altri blocchi */}
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
            className="cs-cta"
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
                Il prossimo progetto
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
                Vuoi risultati simili?
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
                Raccontaci il tuo progetto. Ti proponiamo una strategia su misura, senza impegno.
              </p>
            </div>

            <Link href="/#consulenza" className="cs-cta-btn">
              Parliamone
              <span aria-hidden="true" className="cs-cta-arrow">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
            </Link>
          </motion.div>
        </section>

        {/* ── Related Projects — blocco dark come in home ── */}
        <div style={{ background: '#060D09', position: 'relative' }}>
          <section style={{
            padding: 'clamp(64px, 8vw, 96px) clamp(24px, 4vw, 48px) clamp(48px, 6vw, 80px)',
          }}>
            <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
              <motion.h2
                initial={rm ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: EASE }}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(24px, 2.5vw, 36px)',
                  fontWeight: 400,
                  fontStyle: 'italic',
                  lineHeight: 1.15,
                  letterSpacing: '-0.02em',
                  color: 'rgba(255, 255, 255, 0.9)',
                  marginBottom: 'clamp(32px, 4vw, 56px)',
                }}
              >
                Altri progetti
              </motion.h2>

              <div className="cs-related-grid">
                {RELATED.map((project, i) => (
                  <motion.article
                    key={project.title}
                    initial={rm ? false : { opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1, ease: EASE }}
                  >
                    <Link
                      href={project.href}
                      className="cs-related-card"
                      style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
                    >
                      <div
                        className="cs-related-inner"
                        style={{
                          background: 'rgba(255, 255, 255, 0.05)',
                          backdropFilter: 'blur(20px)',
                          WebkitBackdropFilter: 'blur(20px)',
                          borderRadius: '8px',
                          border: '1px solid rgba(255, 255, 255, 0.08)',
                          overflow: 'hidden',
                          transition: 'background 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease',
                        }}
                      >
                        {/* Immagine */}
                        <div style={{ position: 'relative', width: '100%', aspectRatio: '16 / 9', overflow: 'hidden' }}>
                          <img
                            src={project.image}
                            alt={`Progetto ${project.title}`}
                            loading="lazy"
                            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                          />
                        </div>

                        {/* Info */}
                        <div style={{
                          padding: 'clamp(16px, 2vw, 24px)',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '12px',
                        }}>
                          <h3 style={{
                            fontFamily: 'var(--font-display)',
                            fontSize: 'clamp(1.15rem, 0.9rem + 0.7vw, 1.5rem)',
                            fontWeight: 400,
                            fontStyle: 'italic',
                            letterSpacing: '-0.02em',
                            color: 'rgba(255, 255, 255, 0.9)',
                            lineHeight: 1.2,
                            margin: 0,
                            transition: 'color 0.3s ease',
                          }}>
                            {project.title}
                          </h3>
                          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                            {project.tags.map((tag) => (
                              <span
                                key={tag}
                                style={{
                                  fontFamily: 'var(--font-body)',
                                  fontSize: '10px',
                                  fontWeight: 500,
                                  color: 'rgba(255, 255, 255, 0.5)',
                                  letterSpacing: '0.02em',
                                  whiteSpace: 'nowrap',
                                  padding: '3px 8px',
                                  height: '24px',
                                  lineHeight: '16px',
                                  boxSizing: 'border-box',
                                  borderRadius: '999px',
                                  border: '1px solid rgba(255, 255, 255, 0.15)',
                                  background: 'rgba(255, 255, 255, 0.05)',
                                }}
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </div>
            </div>
          </section>
        </div>

      </main>

      {/* Footer sullo stesso fondo dark della home */}
      <div style={{ background: '#060D09', position: 'relative' }}>
        <Footer />
      </div>
    </>
  )
}
