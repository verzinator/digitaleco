'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform, useReducedMotion, useSpring } from 'framer-motion'
import Navbar from '@/components/layout/Navbar'
import { openContactDrawer } from '@/components/ui/ContactDrawer'
import Footer from '@/components/layout/Footer'
import AmbientBlobs from '@/components/ui/AmbientBlobs'
import Link from 'next/link'

/* ─────────────────────────────────────────────
   Constants
   ───────────────────────────────────────────── */

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

const PROJECT = {
  title: 'Villa Irene Cashmere',
  cover: 'Dalla collezione all’immagine',
  category: 'Moda & Produzione Fotografica',
  year: '2024',
  client: 'Villa Irene Cashmere',
  services: ['Direzione creativa', 'Lookbook', 'Produzione fotografica'],
  heroImage: '/progetti/villa-irene-cashmere/emo-1106.jpg',
}

const GALLERY = [
  { src: '/progetti/villa-irene-cashmere/emo-1078.jpg', alt: 'Villa Irene Cashmere, dettaglio di un dolcevita arancio della collezione' },
  { src: '/progetti/villa-irene-cashmere/prod-1021.jpg', alt: 'Villa Irene Cashmere, maglia verde indossata durante lo shooting' },
  { src: '/progetti/villa-irene-cashmere/emo-291.jpg', alt: 'Villa Irene Cashmere, capi in cashmere blu e verde a contrasto' },
]

// Nastro orizzontale: immagini verticali 3:4 (segnaposto, da sostituire con gli scatti reali)
const MARQUEE = [
  { src: '/progetti/villa-irene-cashmere/emo-1029.jpg', alt: 'Villa Irene Cashmere, dolcevita verde della collezione, dettaglio ravvicinato' },
  { src: '/progetti/villa-irene-cashmere/prod-1200.jpg', alt: 'Villa Irene Cashmere, maglia blu a collo alto indossata in studio' },
  { src: '/progetti/villa-irene-cashmere/emo-1161.jpg', alt: 'Villa Irene Cashmere, dolcevita fucsia a costa larga, dettaglio della manica' },
  { src: '/progetti/villa-irene-cashmere/prod-093.jpg', alt: 'Villa Irene Cashmere, dolcevita arancio della linea uomo' },
  { src: '/progetti/villa-irene-cashmere/emo-1263.jpg', alt: 'Villa Irene Cashmere, cardigan viola a trecce, dettaglio della lavorazione' },
  { src: '/progetti/villa-irene-cashmere/prod-1214.jpg', alt: 'Villa Irene Cashmere, maglia gialla a punto traforato' },
  { src: '/progetti/villa-irene-cashmere/emo-908.jpg', alt: 'Villa Irene Cashmere, dolcevita bianco e senape, dettaglio del collo' },
  { src: '/progetti/villa-irene-cashmere/prod-1136.jpg', alt: 'Villa Irene Cashmere, maglia verde a trecce della collezione' },
  { src: '/progetti/villa-irene-cashmere/emo-1209.jpg', alt: 'Villa Irene Cashmere, dolcevita blu elettrico, dettaglio ravvicinato' },
  { src: '/progetti/villa-irene-cashmere/prod-1094.jpg', alt: 'Villa Irene Cashmere, maglia lilla a collo alto' },
  { src: '/progetti/villa-irene-cashmere/emo-087.jpg', alt: 'Villa Irene Cashmere, dolcevita blu notte della linea uomo' },
  { src: '/progetti/villa-irene-cashmere/prod-733.jpg', alt: 'Villa Irene Cashmere, completo in maglia ottanio, maglia e pantalone' },
  { src: '/progetti/villa-irene-cashmere/emo-1352.jpg', alt: 'Villa Irene Cashmere, dolcevita blu con dettaglio giallo sulla manica' },
  { src: '/progetti/villa-irene-cashmere/prod-259.jpg', alt: 'Villa Irene Cashmere, cardigan blu notte e dolcevita verde, linea uomo' },
]

const CLOSING_NOTE =
  'Il progetto ha permesso a Villa Irene Cashmere di disporre di un patrimonio fotografico originale e ' +
  'coerente con il proprio posizionamento, superando una semplice rappresentazione del prodotto per ' +
  'costruire un racconto più completo della collezione. La gestione completa della produzione — dalla ' +
  'scelta dei modelli fino alla realizzazione del lookbook — ha inoltre garantito uniformità stilistica ' +
  'e continuità tra la fase creativa e quella commerciale.'

const RELATED = [
  {
    title: 'MasterFor',
    tags: ['Analisi', 'Comunicazione', 'Trasformazione Digitale'],
    image: '/progetti/progetto-1-5.jpeg',
    href: '/portfolio/masterfor',
  },
  {
    title: 'Mondi Piscine',
    tags: ['Content Creation', 'Social Media', 'Reels'],
    image: 'https://images.unsplash.com/photo-1572331165267-854da2b10ccc?w=1600&q=80',
    href: '/portfolio/mondi-piscine',
  },
]

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
   Nastro orizzontale infinito
   ───────────────────────────────────────────── */

function Marquee() {
  const rm = useReducedMotion()
  // La sequenza e' duplicata: quando la prima meta' esce di scena
  // il track e' gia' tornato al punto di partenza, senza stacchi.
  const loop = [...MARQUEE, ...MARQUEE]

  return (
    <motion.div
      className="cs-marquee"
      initial={rm ? false : { opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, ease: EASE }}
    >
      <div className="cs-marquee-track">
        {loop.map((item, i) => {
          const duplicato = i >= MARQUEE.length
          return (
            <div className="cs-marquee-item" key={i} aria-hidden={duplicato}>
              <img src={item.src} alt={duplicato ? '' : item.alt} loading="lazy" />
            </div>
          )
        })}
      </div>
    </motion.div>
  )
}

function EditorialGallery() {
  const rm = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 70,
    damping: 24,
    mass: 0.8,
  })
  const topX = useTransform(smoothProgress, [0, 1], rm ? ['0%', '0%'] : ['3%', '-12%'])
  const bottomX = useTransform(smoothProgress, [0, 1], rm ? ['-6%', '-6%'] : ['-18%', '-6%'])
  const rows = [
    MARQUEE.slice(0, 7),
    MARQUEE.slice(7, 14),
  ]
  const activeImage = activeIndex === null ? null : MARQUEE[activeIndex]
  const showPrevious = () => setActiveIndex((current) => current === null ? null : (current - 1 + MARQUEE.length) % MARQUEE.length)
  const showNext = () => setActiveIndex((current) => current === null ? null : (current + 1) % MARQUEE.length)

  useEffect(() => {
    if (activeIndex === null) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveIndex(null)
      if (event.key === 'ArrowLeft') showPrevious()
      if (event.key === 'ArrowRight') showNext()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [activeIndex])

  return (
    <section ref={sectionRef} className="cs-editorial-gallery" aria-labelledby="editorial-gallery-title">
      <motion.div
        initial={rm ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease: EASE }}
        className="cs-editorial-heading"
      >
        <p>Dietro la collezione</p>
        <h2 id="editorial-gallery-title">Dentro lo shooting</h2>
      </motion.div>

      {rows.map((row, rowIndex) => (
        <motion.div
          key={rowIndex}
          className="cs-photo-rail"
          style={{ x: rowIndex === 0 ? topX : bottomX }}
        >
          {row.map((galleryImage, imageIndex) => (
            <motion.button
              key={`${rowIndex}-${galleryImage.src}`}
              type="button"
              className={`cs-photo-card cs-photo-card-${(imageIndex + rowIndex) % 3}`}
              onClick={() => setActiveIndex(MARQUEE.indexOf(galleryImage))}
              aria-label={`Apri immagine: ${galleryImage.alt}`}
            >
              <img src={galleryImage.src} alt={galleryImage.alt} loading="lazy" />
            </motion.button>
          ))}
        </motion.div>
      ))}

      {activeImage && (
        <motion.div
          className="cs-lightbox"
          initial={rm ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          role="dialog"
          aria-modal="true"
          aria-label={activeImage.alt}
          onClick={() => setActiveIndex(null)}
        >
          <button
            type="button"
            className="cs-lightbox-close"
            onClick={() => setActiveIndex(null)}
            aria-label="Chiudi immagine"
          >
            ×
          </button>
          <button
            type="button"
            className="cs-lightbox-nav cs-lightbox-prev"
            onClick={(event) => { event.stopPropagation(); showPrevious() }}
            aria-label="Immagine precedente"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m15 18-6-6 6-6" /></svg>
          </button>
          <img src={activeImage.src} alt={activeImage.alt} onClick={(event) => event.stopPropagation()} />
          <button
            type="button"
            className="cs-lightbox-nav cs-lightbox-next"
            onClick={(event) => { event.stopPropagation(); showNext() }}
            aria-label="Immagine successiva"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m9 18 6-6-6-6" /></svg>
          </button>
        </motion.div>
      )}
    </section>
  )
}

/* ─────────────────────────────────────────────
   Page
   ───────────────────────────────────────────── */

export default function VillaIreneCashmerePage() {
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
        /* Nastro orizzontale infinito */
        .cs-marquee {
          position: relative;
          overflow: hidden;
          /* i bordi sfumano invece di tagliare di netto */
          -webkit-mask-image: linear-gradient(to right, transparent, #000 8%, #000 92%, transparent);
          mask-image: linear-gradient(to right, transparent, #000 8%, #000 92%, transparent);
        }
        .cs-marquee-track {
          display: flex;
          width: max-content;
          animation: cs-marquee-scroll 60s linear infinite;
        }
        .cs-marquee-item {
          flex: 0 0 auto;
          width: clamp(180px, 20vw, 280px);
          aspect-ratio: 3 / 4;
          /* il margine fa da gap: cosi' il track e' esattamente 2x una sequenza
             e translateX(-50%) cade sul fotogramma identico */
          margin-right: clamp(12px, 1.5vw, 20px);
          border-radius: 12px;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.04);
        }
        .cs-marquee-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        @keyframes cs-marquee-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .cs-marquee-track {
            animation: none;
          }
          .cs-marquee {
            overflow-x: auto;
            -webkit-mask-image: none;
            mask-image: none;
          }
        }
        .cs-editorial-gallery {
          position: relative;
          z-index: 2;
          overflow: hidden;
          padding: 0 0 clamp(48px, 6vw, 96px);
        }
        .cs-editorial-heading {
          width: min(100% - 48px, 1100px);
          margin: 0 auto clamp(36px, 5vw, 64px);
        }
        .cs-editorial-heading p {
          margin: 0 0 10px;
          color: var(--color-primary);
          font-family: var(--font-body);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
        }
        .cs-editorial-heading h2 {
          margin: 0;
          color: rgba(255, 255, 255, 0.94);
          font-family: var(--font-display);
          font-size: clamp(34px, 5vw, 68px);
          font-style: italic;
          font-weight: 400;
          letter-spacing: -0.03em;
        }
        .cs-photo-rail {
          display: flex;
          width: max-content;
          gap: clamp(14px, 2vw, 28px);
          padding-inline: 4vw;
          margin-bottom: clamp(14px, 2vw, 28px);
          will-change: transform;
        }
        .cs-photo-card {
          position: relative;
          flex: none;
          width: clamp(190px, 22vw, 320px);
          aspect-ratio: 3 / 4;
          padding: 0;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          background: #101713;
          cursor: zoom-in;
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.22);
        }
        .cs-photo-card img {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
          transition: transform 700ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        .cs-photo-card:hover img { transform: scale(1.02); }
        .cs-lightbox {
          position: fixed;
          inset: 0;
          z-index: 20000;
          display: grid;
          place-items: center;
          padding: clamp(20px, 4vw, 56px);
          background: rgba(3, 8, 5, 0.92);
          backdrop-filter: blur(16px);
          cursor: zoom-out;
        }
        .cs-lightbox img {
          max-width: min(1200px, 94vw);
          max-height: 88vh;
          border-radius: 12px;
          object-fit: contain;
          box-shadow: 0 30px 90px rgba(0, 0, 0, 0.5);
        }
        .cs-lightbox-close,
        .cs-lightbox-nav {
          position: absolute;
          z-index: 2;
          display: grid;
          place-items: center;
          width: clamp(50px, 5vw, 68px);
          height: clamp(50px, 5vw, 68px);
          border: 1px solid rgba(255, 255, 255, 0.28);
          border-radius: 999px;
          background: rgba(255, 255, 255, 0.07);
          backdrop-filter: blur(16px);
          color: #fff;
          cursor: pointer;
          transition: background 220ms ease, border-color 220ms ease;
        }
        .cs-lightbox-close:hover,
        .cs-lightbox-nav:hover {
          background: rgba(255, 255, 255, 0.14);
          border-color: rgba(255, 255, 255, 0.5);
        }
        .cs-lightbox-close {
          top: clamp(16px, 3vw, 32px);
          right: clamp(16px, 3vw, 32px);
          font-size: clamp(30px, 3vw, 40px);
          font-weight: 300;
          line-height: 1;
        }
        .cs-lightbox-nav {
          top: 50%;
          transform: translateY(-50%);
        }
        .cs-lightbox-prev { left: clamp(12px, 3vw, 40px); }
        .cs-lightbox-next { right: clamp(12px, 3vw, 40px); }
        .cs-lightbox-nav svg {
          width: 28px;
          height: 28px;
          fill: none;
          stroke: currentColor;
          stroke-width: 1.8;
          stroke-linecap: round;
          stroke-linejoin: round;
        }
        @media (max-width: 768px) {
          .cs-lightbox {
            padding-inline: 68px;
          }
          .cs-lightbox-nav {
            width: 46px;
            height: 46px;
          }
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
              alt="Villa Irene Cashmere, i capi della collezione fotografati per il lookbook di stagione"
              style={{
                width: '100%',
                height: '115%',
                objectFit: 'cover',
                objectPosition: 'center 40%',
              }}
            />
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to bottom, rgba(5,30,20,0.3) 0%, rgba(5,30,20,0.75) 100%)',
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

            <motion.p
              initial={rm ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.65, ease: EASE }}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(16px, 1.6vw, 24px)',
                fontWeight: 300,
                letterSpacing: '-0.01em',
                color: 'rgba(255,255,255,0.82)',
                lineHeight: 1.4,
                maxWidth: '24ch',
                margin: 'clamp(12px, 1.5vw, 20px) 0 0',
              }}
            >
              {PROJECT.cover}
            </motion.p>
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

              {/* Attività realizzate — pill tags */}
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
                  Attività realizzate
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

        {/* ── Il progetto e L'approccio ── */}
        <section style={{
          position: 'relative',
          zIndex: 1,
          padding: 'clamp(48px, 6vw, 96px) clamp(24px, 4vw, 48px)',
        }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div className="cs-narrative">
              {/* Il progetto */}
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
                    Villa Irene Cashmere aveva l’esigenza di valorizzare la propria collezione attraverso una
                    produzione fotografica capace di restituire qualità, stile e coerenza con il posizionamento
                    del brand.
                  </p>
                  <p style={{ margin: 0 }}>
                    L’obiettivo non era semplicemente realizzare delle fotografie di prodotto, ma costruire
                    un’immagine coordinata e riconoscibile, capace di raccontare i capi all’interno di un
                    contesto editoriale e di supportare la comunicazione commerciale della stagione.
                  </p>
                </div>
              </motion.div>

              {/* L'approccio */}
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
                  L’approccio
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
                    Abbiamo seguito il progetto in tutte le sue fasi, occupandoci dell’intera organizzazione
                    della produzione.
                  </p>
                  <p style={{ margin: 0 }}>
                    A partire dalle esigenze del brand e dalla collezione da raccontare, abbiamo lavorato sulla
                    definizione dello stile dello shooting, sull’individuazione dei modelli più adatti, sulla
                    ricerca delle location e sulla selezione dello studio fotografico.
                  </p>
                  <p style={{ margin: 0 }}>
                    Abbiamo inoltre coordinato la gestione operativa dei modelli e l’organizzazione delle
                    giornate di shooting, costruendo un processo completo che permettesse al cliente di avere
                    un unico referente per l’intera produzione.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Nastro orizzontale ── */}
        <section style={{
          position: 'relative',
          zIndex: 1,
          padding: '0 0 clamp(48px, 6vw, 96px)',
        }}>
          <Marquee />
        </section>

        {/* ── La produzione fotografica e Il lookbook ── */}
        <section style={{
          position: 'relative',
          zIndex: 1,
          padding: '0 clamp(24px, 4vw, 48px) clamp(48px, 6vw, 96px)',
        }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div className="cs-narrative">
              {/* La produzione fotografica */}
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
                  La produzione fotografica
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
                    Gli shooting sono stati pensati per mettere in risalto materiali, vestibilità, dettagli e
                    combinazioni dei diversi capi, mantenendo una linea visiva elegante e coerente con il mondo
                    cashmere.
                  </p>
                  <p style={{ margin: 0 }}>
                    La produzione è stata gestita sia dal punto di vista creativo sia logistico, coordinando
                    persone, location, tempistiche e necessità operative.
                  </p>
                  <p style={{ margin: 0 }}>
                    L’obiettivo era ottenere una libreria di immagini proprietarie utilizzabile non solo per la
                    stagione in corso, ma anche per le diverse esigenze commerciali e di comunicazione del brand.
                  </p>
                </div>
              </motion.div>

              {/* Il lookbook */}
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
                  Il lookbook
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
                    A partire dal materiale prodotto durante gli shooting, abbiamo successivamente progettato e
                    realizzato il lookbook di stagione.
                  </p>
                  <p style={{ margin: 0 }}>
                    Il lookbook è stato costruito come uno strumento capace di presentare la collezione in modo
                    ordinato, elegante e immediatamente fruibile, valorizzando i diversi outfit e mantenendo
                    continuità con l’identità visiva del brand.
                  </p>
                  <p style={{ margin: 0 }}>
                    Fotografia e impaginazione sono state così integrate all’interno di un unico progetto,
                    trasformando lo shooting in uno strumento concreto a supporto della presentazione e della
                    vendita della collezione.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <EditorialGallery />

        {/* ── Il risultato: testo glass tra due righe ── */}
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
              fontSize: 'clamp(11px, 0.9vw, 13px)',
              fontWeight: 500,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'rgba(255, 255, 255, 0.5)',
              margin: '0 0 12px',
            }}>
              Il risultato
            </p>
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
                Hai una collezione da raccontare?
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
                Dalla direzione creativa al lookbook finito, seguiamo l’intera produzione con un unico referente.
              </p>
            </div>

            <button
              type="button"
              onClick={openContactDrawer}
              className="cs-cta-btn"
              style={{ border: 'none', cursor: 'pointer' }}
            >
              Parliamone
              <span aria-hidden="true" className="cs-cta-arrow">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
            </button>
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
