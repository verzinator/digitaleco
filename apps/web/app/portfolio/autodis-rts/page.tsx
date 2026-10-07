'use client'

import { useRef, useEffect, useState } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  useReducedMotion,
} from 'framer-motion'
import Navbar from '@/components/layout/Navbar'
import { openContactDrawer } from '@/components/ui/ContactDrawer'
import Footer from '@/components/layout/Footer'
import AmbientBlobs from '@/components/ui/AmbientBlobs'
import Link from 'next/link'
import { PROJECT_HERO_IMAGES } from '@/lib/projects'
import { useImageReady } from '@/lib/useImageReady'

/* ─────────────────────────────────────────────
   Constants
   ───────────────────────────────────────────── */

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

const PROJECT = {
  title: 'Autodis RTS Group',
  category: 'Video corporate · Logistica automatizzata',
  year: '2025',
  client: 'Autodis RTS Group S.p.A.',
  services: ['Concept creativo', 'Produzione video', 'Riprese POV'],
  heroImage: PROJECT_HERO_IMAGES['autodis-rts'],
}

// Il percorso del ricambio, in ordine: il nastro le fa scorrere così come
// il pezzo attraversa il capannone. Si parte dalla pianta dell'impianto e
// dalle persone, si segue il pezzo dallo scaffale alla cassetta, poi lungo i
// nastri, fino al pacco che parte. `tall` per gli scatti verticali, che
// hanno una cornice loro invece di essere tagliati in 4:3.
const GALLERY: { src: string; alt: string; tall?: boolean }[] = [
  { src: '/progetti/autodis-rts/rts-01-impianto.jpg', alt: 'Autodis RTS, la pianta 3D dell’impianto automatizzato' },
  { src: '/progetti/autodis-rts/rts-02-squadra.jpg', alt: 'Autodis RTS, il logo RTS e Autodis sulla maglia di un operatore', tall: true },
  { src: '/progetti/autodis-rts/rts-03-prelievo.jpg', alt: 'Autodis RTS, un operatore preleva un ricambio dallo scaffale con il terminale in mano', tall: true },
  { src: '/progetti/autodis-rts/rts-04-cassetta.jpg', alt: 'Autodis RTS, i ricambi vengono sistemati nella cassetta', tall: true },
  { src: '/progetti/autodis-rts/rts-05-nastri.jpg', alt: 'Autodis RTS, le cassette viaggiano sui nastri del capannone' },
  { src: '/progetti/autodis-rts/rts-06-elevatore.jpg', alt: 'Autodis RTS, l’elevatore che porta le cassette tra i livelli dell’impianto', tall: true },
  { src: '/progetti/autodis-rts/rts-07-smistamento.jpg', alt: 'Autodis RTS, la curva dei nastri di smistamento vista dall’alto' },
  { src: '/progetti/autodis-rts/rts-08-spedizione.jpg', alt: 'Autodis RTS, un operatore porta via il pacco pronto per la spedizione', tall: true },
]

const CLOSING_NOTE =
  'Il progetto finale ha rispecchiato le aspettative del cliente, coniugando racconto corporate, ' +
  'tecnologia e creatività in un unico contenuto.'

const RELATED = [
  {
    title: 'MasterFor',
    tags: ['Analisi', 'Comunicazione', 'Trasformazione Digitale'],
    image: PROJECT_HERO_IMAGES.masterfor,
    href: '/portfolio/masterfor',
  },
  {
    title: 'Mondi Piscine',
    tags: ['Content Creation', 'Social Media', 'Reels'],
    image: PROJECT_HERO_IMAGES['mondi-piscine'],
    href: '/portfolio/mondi-piscine',
  },
]

/* ─────────────────────────────────────────────
   Il nastro: le foto scorrono in orizzontale mentre si scende,
   come la cassetta attraverso l'impianto.
   ───────────────────────────────────────────── */

function ConveyorGallery({ images }: { images: typeof GALLERY }) {
  const rm = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [distance, setDistance] = useState(0)
  const [active, setActive] = useState(0)

  // Quanto deve scorrere il nastro: la sua larghezza meno lo schermo.
  // È anche lo scroll verticale che la sezione si prende.
  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const measure = () => {
      setDistance(Math.max(0, track.scrollWidth - document.documentElement.clientWidth))
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(track)
    window.addEventListener('resize', measure)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [])

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  const x = useTransform(scrollYProgress, (v) => -v * distance)
  // Le foto scorrono un po' meno della cornice: profondità, come dal finestrino
  const innerX = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])
  const marker = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setActive(Math.min(images.length - 1, Math.round(v * (images.length - 1))))
  })

  // Senza animazioni: una fila che si scorre a mano
  if (rm) {
    return (
      <section style={{ position: 'relative', zIndex: 1, paddingBottom: 'clamp(48px, 6vw, 96px)' }}>
        <div className="rts-strip">
          {images.map((img) => (
            <div key={img.src} className="rts-frame" data-tall={img.tall || undefined}>
              <img src={img.src} alt={img.alt} loading="lazy" />
            </div>
          ))}
        </div>
      </section>
    )
  }

  return (
    <section
      ref={sectionRef}
      aria-label="Il percorso del ricambio, in immagini"
      style={{ position: 'relative', zIndex: 1, height: `calc(100svh + ${distance}px)` }}
    >
      <div className="rts-sticky">
        <div className="rts-head">
          <p className="rts-eyebrow">Dall’ordine alla spedizione</p>
          <p className="rts-count" aria-hidden="true">
            {String(active + 1).padStart(2, '0')}
            <span> / {String(images.length).padStart(2, '0')}</span>
          </p>
        </div>

        <motion.div ref={trackRef} className="rts-track" style={{ x }}>
          {images.map((img, i) => (
            <div
              key={img.src}
              className="rts-frame"
              data-active={i === active || undefined}
              data-tall={img.tall || undefined}
            >
              {/* Tutte subito: sul nastro arrivano in fretta, non devono comparire a metà */}
              <motion.img src={img.src} alt={img.alt} decoding="async" style={{ x: innerX }} />
            </div>
          ))}
        </motion.div>

        {/* La rotaia: la cassetta avanza con lo scroll */}
        <div className="rts-rail" aria-hidden="true">
          <span className="rts-rail-end">Ordine</span>
          <div className="rts-rail-line">
            <motion.div className="rts-rail-fill" style={{ width: marker }} />
            <motion.div className="rts-rail-box" style={{ left: marker }} />
          </div>
          <span className="rts-rail-end">Spedizione</span>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────────
   Pannello di testo glass
   ───────────────────────────────────────────── */

function GlassPanel({
  title,
  delay = 0,
  wide = false,
  onMove,
  children,
}: {
  title: string
  delay?: number
  /** Pannello da solo su tutta la riga: il testo la occupa tutta */
  wide?: boolean
  onMove?: (e: React.MouseEvent<HTMLDivElement>) => void
  children: React.ReactNode
}) {
  const rm = useReducedMotion()

  return (
    <motion.div
      className="cs-glass"
      onMouseMove={rm ? undefined : onMove}
      initial={rm ? false : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay, ease: EASE }}
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
        {title}
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
        maxWidth: wide ? 'none' : '45ch',
      }}>
        {children}
      </div>
    </motion.div>
  )
}

/* ─────────────────────────────────────────────
   Page
   ───────────────────────────────────────────── */

export default function AutodisRtsPage() {
  const rm = useReducedMotion()
  const heroRef = useRef<HTMLElement>(null)
  const hero = useImageReady()
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

        /* ── Il nastro ── */
        .rts-sticky {
          position: sticky;
          top: 0;
          height: 100svh;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: clamp(20px, 3vh, 36px);
        }
        .rts-head,
        .rts-rail {
          max-width: 1200px;
          width: 100%;
          margin: 0 auto;
          padding-inline: clamp(24px, 4vw, 48px);
          box-sizing: border-box;
        }
        .rts-head {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
        }
        .rts-eyebrow {
          font-family: var(--font-body);
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.5);
          margin: 0;
        }
        .rts-count {
          font-family: var(--font-display);
          font-style: italic;
          font-size: clamp(28px, 3vw, 44px);
          letter-spacing: -0.02em;
          color: rgba(255, 255, 255, 0.95);
          font-variant-numeric: tabular-nums;
          margin: 0;
          line-height: 1;
        }
        /* La regola globale su span lo riporterebbe al font del testo */
        .rts-count span {
          font-family: inherit;
          color: rgba(255, 255, 255, 0.35);
        }
        .rts-track {
          display: flex;
          gap: clamp(16px, 2vw, 28px);
          width: max-content;
          align-items: center;
          /* La prima foto parte allineata al testo, l'ultima si ferma
             allo stesso margine dall'altro lato */
          padding-inline: max(clamp(24px, 4vw, 48px), calc((100vw - 1200px) / 2 + 48px));
          will-change: transform;
        }
        .rts-frame {
          position: relative;
          flex-shrink: 0;
          height: min(72svh, 780px);
          aspect-ratio: 4 / 3;
          border-radius: 12px;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.04);
          opacity: 0.55;
          transform: scale(0.94);
          transition: opacity 600ms cubic-bezier(0.16, 1, 0.3, 1), transform 600ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        .rts-frame[data-tall] {
          aspect-ratio: 9 / 16;
        }
        .rts-frame[data-active] {
          opacity: 1;
          transform: scale(1);
        }
        .rts-frame img {
          position: absolute;
          top: 0;
          left: -8%;
          width: 116%;
          max-width: none;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .rts-rail {
          display: flex;
          align-items: center;
          gap: 16px;
        }
        .rts-rail-end {
          font-family: var(--font-body);
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.45);
          flex-shrink: 0;
        }
        .rts-rail-line {
          position: relative;
          flex: 1;
          height: 1px;
          background: rgba(255, 255, 255, 0.14);
        }
        .rts-rail-fill {
          position: absolute;
          inset: 0 auto 0 0;
          background: var(--color-accent);
        }
        /* La cassetta */
        .rts-rail-box {
          position: absolute;
          top: 50%;
          width: 14px;
          height: 10px;
          border: 1.5px solid var(--color-accent);
          border-radius: 2px;
          background: #0F1410;
          transform: translate(-50%, -50%);
        }
        /* Fila a scorrimento manuale, senza animazioni */
        .rts-strip {
          display: flex;
          gap: 16px;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          align-items: center;
          padding-inline: clamp(24px, 4vw, 48px);
        }
        .rts-strip .rts-frame {
          opacity: 1;
          transform: none;
          scroll-snap-align: center;
        }
        .rts-strip .rts-frame img {
          left: 0;
          width: 100%;
        }

        @media (max-width: 768px) {
          .cs-info-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          .cs-related-grid {
            grid-template-columns: 1fr;
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
          .rts-frame {
            height: auto;
            width: 88vw;
          }
          /* In verticale a 82vw sarebbe piu' alta dello schermo */
          .rts-frame[data-tall] {
            width: 60vw;
          }
        }
      `}</style>

      <link rel="preload" as="image" href={PROJECT.heroImage} fetchPriority="high" />

      <Navbar />

      <main id="main-content" tabIndex={-1}>

        {/* ── Hero ── */}
        <section
          ref={heroRef}
          style={{
            position: 'relative',
            background: '#0F1410',
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
              ref={hero.ref}
              onLoad={hero.onLoad}
              src={PROJECT.heroImage}
              fetchPriority="high"
              alt="Autodis RTS Group, il nuovo capannone automatizzato"
              style={{
                opacity: hero.ready || rm ? 1 : 0,
                transition: 'opacity 600ms ease',
                width: '100%',
                height: '115%',
                objectFit: 'cover',
                objectPosition: 'center 40%',
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
              animate={hero.ready ? { opacity: 1, y: 0 } : undefined}
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
              animate={hero.ready ? { opacity: 1, y: 0 } : undefined}
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
              {[
                { label: 'Cliente', value: PROJECT.client },
                { label: 'Servizi', pills: PROJECT.services },
                { label: 'Anno', value: PROJECT.year },
              ].map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={rm ? false : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: EASE }}
                >
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'clamp(11px, 0.9vw, 13px)',
                    fontWeight: 500,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'rgba(255, 255, 255, 0.5)',
                    marginBottom: item.pills ? '10px' : '8px',
                  }}>
                    {item.label}
                  </p>
                  {item.pills ? (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                      {item.pills.map((s) => (
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
                  ) : (
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
                      {item.value}
                    </p>
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Corpo: grigio scuro come le fasce. I testi stanno in blocchi con
            blob e alone come nelle altre pagine; il nastro ha una fascia sua,
            perché l'alone è grande quanto il blocco e su un blocco alto
            cinque schermi diventerebbe una colonna sfocata. ── */}
        <div style={{ background: '#0F1410', position: 'relative', overflow: 'hidden' }}>
          <AmbientBlobs variant="ink" trackMouse />
          {/* I blob sfumano nel fondo pieno dove il blocco tocca il nastro */}
          <div aria-hidden="true" style={{ position: 'absolute', insetInline: 0, bottom: 0, height: '200px', background: 'linear-gradient(to bottom, transparent, #0F1410)', pointerEvents: 'none' }} />
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

          {/* ── Il progetto e L'approccio ── */}
          <section style={{
            position: 'relative',
            zIndex: 1,
            padding: 'clamp(48px, 6vw, 96px) clamp(24px, 4vw, 48px)',
          }}>
            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
              <div className="cs-narrative">
                <GlassPanel title="Il progetto" onMove={handleGlassMove}>
                  <p style={{ margin: 0 }}>
                    Autodis RTS Group aveva l’esigenza di raccontare in modo chiaro e coinvolgente il
                    funzionamento del nuovo sistema automatizzato presente all’interno del proprio capannone.
                  </p>
                  <p style={{ margin: 0 }}>
                    L’obiettivo era mostrare l’intero percorso seguito da un ricambio: dalla ricezione della
                    richiesta e dell’ordine, passando per le attività del personale e la scansione del QR code,
                    fino alla movimentazione automatizzata del prodotto, all’imballaggio e alla spedizione finale.
                  </p>
                  <p style={{ margin: 0 }}>
                    Un processo articolato e fortemente tecnologico che doveva essere trasformato in un contenuto
                    immediato, comprensibile e visivamente efficace.
                  </p>
                </GlassPanel>

                <GlassPanel title="L’approccio" delay={0.15} onMove={handleGlassMove}>
                  <p style={{ margin: 0 }}>
                    Siamo partiti dallo studio del flusso operativo, analizzando le diverse fasi del processo e
                    individuando i momenti più significativi da raccontare.
                  </p>
                  <p style={{ margin: 0 }}>
                    La sfida principale era evitare una rappresentazione eccessivamente tecnica o descrittiva,
                    cercando invece un punto di vista capace di accompagnare lo spettatore all’interno
                    dell’intero sistema logistico.
                  </p>
                  <p style={{ margin: 0 }}>
                    Da qui è nata l’idea di raccontare parte del percorso direttamente dal punto di vista
                    del ricambio.
                  </p>
                </GlassPanel>
              </div>
            </div>
          </section>

        </div>

        {/* ── Il nastro: le immagini del percorso. Niente overflow: hidden
            qui sopra, o la fascia non resta agganciata allo schermo ── */}
        <div style={{ background: '#0F1410', position: 'relative' }}>
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
          <ConveyorGallery images={GALLERY} />
        </div>

        <div style={{ background: '#0F1410', position: 'relative', overflow: 'hidden' }}>
          <AmbientBlobs variant="ink" trackMouse />
          {/* I blob sfumano nel fondo pieno dove il blocco tocca il nastro */}
          <div aria-hidden="true" style={{ position: 'absolute', insetInline: 0, top: 0, height: '200px', background: 'linear-gradient(to top, transparent, #0F1410)', pointerEvents: 'none' }} />
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

          {/* ── Il concept creativo e La produzione ── */}
          <section style={{
            position: 'relative',
            zIndex: 1,
            padding: 'clamp(48px, 6vw, 96px) clamp(24px, 4vw, 48px)',
          }}>
            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
              <div className="cs-narrative">
                <GlassPanel title="Il concept creativo" onMove={handleGlassMove}>
                  <p style={{ margin: 0 }}>
                    Abbiamo sviluppato una sequenza in modalità POV, posizionando la videocamera all’interno
                    della cassetta utilizzata per il trasporto dei pezzi.
                  </p>
                  <p style={{ margin: 0 }}>
                    In questo modo lo spettatore può seguire in prima persona il percorso del prodotto attraverso
                    il sistema automatizzato, entrando virtualmente nel processo logistico dell’azienda.
                  </p>
                  <p style={{ margin: 0 }}>
                    Le riprese POV sono state alternate a inquadrature più ampie dedicate al personale, agli
                    impianti e alle diverse fasi operative, permettendo di unire la componente tecnologica a
                    quella umana.
                  </p>
                </GlassPanel>

                <GlassPanel title="La produzione" delay={0.15} onMove={handleGlassMove}>
                  <p style={{ margin: 0 }}>
                    La realizzazione del video ha richiesto più sessioni di shooting, necessarie per seguire
                    correttamente le diverse fasi del processo e coordinare le riprese con l’operatività del
                    nuovo stabilimento.
                  </p>
                  <p style={{ margin: 0 }}>
                    Abbiamo curato la pianificazione delle scene, il posizionamento delle camere, le riprese in
                    movimento e la successiva fase di montaggio e post-produzione.
                  </p>
                  <p style={{ margin: 0 }}>
                    Particolare attenzione è stata dedicata alla continuità narrativa, affinché l’intero
                    percorso — dall’ordine alla spedizione — risultasse fluido e facilmente comprensibile.
                  </p>
                </GlassPanel>
              </div>
            </div>
          </section>

          {/* ── Il risultato ── */}
          <section style={{
            position: 'relative',
            zIndex: 1,
            padding: '0 clamp(24px, 4vw, 48px) clamp(48px, 6vw, 96px)',
          }}>
            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
              <GlassPanel title="Il risultato" wide onMove={handleGlassMove}>
                <p style={{ margin: 0 }}>
                  Il risultato finale è un video capace di trasformare un processo logistico complesso in un
                  racconto visivo dinamico e intuitivo.
                </p>
                <p style={{ margin: 0 }}>
                  La scelta di utilizzare il punto di vista del prodotto ha permesso di valorizzare il livello
                  di automazione del nuovo capannone e di mostrare concretamente l’efficienza dell’intero
                  sistema, dando allo spettatore la sensazione di attraversarlo in prima persona.
                </p>
              </GlassPanel>
            </div>
          </section>

          {/* ── Nota di chiusura ── */}
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

        </div>{/* fine blocco dark */}

        {/* ── CTA ── */}
        <section style={{
          background: '#FFFFFF',
          padding: 'clamp(56px, 7vw, 96px) clamp(24px, 4vw, 48px)',
          position: 'relative',
          overflow: 'hidden',
        }}>
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

            <button
              type="button"
              onClick={openContactDrawer}
              className="btn-pill btn-pill--green"
            >
              Parliamone
            </button>
          </motion.div>
        </section>

        {/* ── Related Projects ── */}
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
                        <div style={{ position: 'relative', width: '100%', aspectRatio: '16 / 9', overflow: 'hidden' }}>
                          <img
                            src={project.image}
                            alt={`Progetto ${project.title}`}
                            loading="lazy"
                            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                          />
                        </div>

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

      <div style={{ background: '#060D09', position: 'relative' }}>
        <Footer />
      </div>
    </>
  )
}
