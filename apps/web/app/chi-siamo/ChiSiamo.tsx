'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import CtaBand from '@/components/sections/CtaBand'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

// Le foto vere del gruppo, in fila: la sede al centro e piu' larga, gli
// eventi ai lati. Didascalie con quello che si vede, non un'etichetta.
const PHOTOS = [
  {
    src: '/foto/seminario-ai.jpg',
    alt: "Un relatore presenta i chatbot per l'assistenza e la vendita online davanti alla platea",
    caption: "Un seminario sui chatbot per l'assistenza e la vendita online",
  },
  {
    src: '/foto/sede-make-group.jpg',
    alt: "La sede del gruppo, vista dall'ingresso",
    caption: 'La nostra sede, dove lavoriamo e ospitiamo gli incontri',
    main: true,
  },
  {
    src: '/foto/evento-networking.jpg',
    alt: 'Ospiti durante il momento di networking nella sede Digital Eco',
    caption: "Dopo l'incontro, il confronto continua",
  },
]

const SERVICES = [
  'Strategia',
  'Siti web & e-commerce',
  'Social media',
  'Advertising',
  'Intelligenza artificiale',
  'Comunicazione aziendale',
  'Video referenziali',
  'Export digitale',
  'Marketplace',
]

/** Titolo di sezione come quelli della home: centrato, sans leggero e corsivo verde */
function SectionTitle({
  as: Tag = 'h2',
  id,
  lead,
  accent,
  text,
}: {
  as?: 'h1' | 'h2'
  id: string
  lead: string
  accent: string
  text?: string
}) {
  const rm = useReducedMotion()
  return (
    <motion.div
      initial={rm ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: EASE }}
      className="cs-title"
    >
      <Tag id={id}>
        {lead}
        <br />
        <em>{accent}</em>
      </Tag>
      {text && <p>{text}</p>}
    </motion.div>
  )
}

/** I servizi come card che scorrono di lato mentre si scende */
function ServicesConveyor({ onGlassMove }: { onGlassMove: (e: React.MouseEvent<HTMLElement>) => void }) {
  const rm = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const [distance, setDistance] = useState(0)

  // Quanto deve scorrere il nastro: la sua larghezza meno lo schermo.
  // È anche lo scroll verticale che la sezione si prende.
  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const measure = () => setDistance(Math.max(0, track.scrollWidth - document.documentElement.clientWidth))
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(track)
    window.addEventListener('resize', measure)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', measure)
    }
  }, [])

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] })
  const x = useTransform(scrollYProgress, (v) => -v * distance)

  const cards = SERVICES.map((label, i) => (
    <article key={label} className="cs-glass cs-service-card" onMouseMove={onGlassMove}>
      <span className="cs-service-num">{String(i + 1).padStart(2, '0')}</span>
      <h3>{label}</h3>
    </article>
  ))

  const title = (
    <SectionTitle id="servizi-title" lead="Cosa facciamo" accent="per farti trovare" />
  )

  // Senza animazioni: una fila che si scorre a mano
  if (rm) {
    return (
      <section aria-labelledby="servizi-title" style={{ paddingBlock: 'clamp(80px, 10vw, 160px)' }}>
        <div className="cs-wrap">{title}</div>
        <div className="cs-service-strip">{cards}</div>
      </section>
    )
  }

  return (
    <section
      ref={sectionRef}
      aria-labelledby="servizi-title"
      style={{ position: 'relative', height: `calc(100svh + ${distance}px)` }}
    >
      <div className="cs-service-sticky">
        <div className="cs-wrap">{title}</div>
        <motion.div ref={trackRef} className="cs-service-track" style={{ x }}>
          {cards}
        </motion.div>
      </div>
    </section>
  )
}

export default function ChiSiamo() {
  // Posizione del bagliore sul bordo dei box, come nei casi studio
  const handleGlassMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    e.currentTarget.style.setProperty('--gx', `${e.clientX - rect.left}px`)
    e.currentTarget.style.setProperty('--gy', `${e.clientY - rect.top}px`)
  }

  return (
    <>
      <style>{`
        .cs-wrap {
          max-width: 1280px;
          margin: 0 auto;
          padding-inline: clamp(24px, 4vw, 48px);
        }

        /* Titoli come in home */
        .cs-title { text-align: center; }
        .cs-title h1, .cs-title h2 {
          font-family: var(--font-body);
          font-weight: 300;
          font-size: clamp(28px, 4vw + 1rem, 68px);
          line-height: 1.1;
          letter-spacing: -0.035em;
          color: #F0F5F2;
          max-width: 12em;
          margin: 0 auto;
        }
        .cs-title em {
          font-family: var(--font-display);
          font-style: italic;
          font-weight: 400;
          color: var(--color-primary);
        }
        .cs-title p {
          font-family: var(--font-body);
          font-size: clamp(15px, 1vw + 0.4rem, 18px);
          font-weight: 300;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.68);
          max-width: 52ch;
          margin: clamp(20px, 2.5vw, 32px) auto 0;
        }

        /* Foto in fila fino ai bordi dello schermo, alte uguali, la sede al
           centro piu' larga. Da telefono scorrono di lato. */
        .cs-photos {
          display: flex;
          gap: clamp(8px, 1vw, 16px);
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          padding-inline: clamp(24px, 4vw, 48px);
          scrollbar-width: none;
        }
        .cs-photos::-webkit-scrollbar { display: none; }
        .cs-photo {
          flex: 0 0 78vw;
          margin: 0;
          scroll-snap-align: center;
        }
        .cs-photo-frame {
          position: relative;
          height: clamp(280px, 70vw, 420px);
          border-radius: 8px;
          overflow: hidden;
          background: rgba(255, 255, 255, 0.04);
        }
        .cs-photo figcaption {
          margin-top: 14px;
          font-family: var(--font-body);
          font-size: 13px;
          font-weight: 300;
          line-height: 1.5;
          color: rgba(255, 255, 255, 0.6);
          max-width: 36ch;
        }
        @media (min-width: 900px) {
          .cs-photos { overflow: visible; padding-inline: 0; }
          .cs-photo { flex: 1 1 0; min-width: 0; }
          .cs-photo--main { flex-grow: 1.7; }
          .cs-photo-frame { height: clamp(360px, 36vw, 600px); border-radius: 0; }
          .cs-photo:first-child .cs-photo-frame { border-radius: 0 8px 8px 0; }
          .cs-photo:last-child .cs-photo-frame { border-radius: 8px 0 0 8px; }
          .cs-photo--main .cs-photo-frame { border-radius: 8px; }
          .cs-photo:first-child figcaption { padding-left: clamp(24px, 4vw, 48px); }
        }

        /* Digital / Eco: i box glass dei casi studio */
        .cs-narrative {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(24px, 3vw, 40px);
          align-items: stretch;
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
        .cs-glass:hover::before { opacity: 1; }
        .cs-glass h2 {
          font-family: var(--font-display);
          font-size: clamp(32px, 3.4vw, 50px);
          font-weight: 400;
          font-style: italic;
          line-height: 1.1;
          letter-spacing: -0.02em;
          color: rgba(255, 255, 255, 0.92);
          margin: 0 0 clamp(16px, 2vw, 24px);
        }
        .cs-glass p {
          font-family: var(--font-body);
          font-size: 14px;
          font-weight: 300;
          line-height: 1.75;
          color: rgba(255, 255, 255, 0.72);
          max-width: 45ch;
          margin: 0;
        }
        @media (max-width: 768px) {
          .cs-narrative { grid-template-columns: 1fr; gap: 24px; }
        }

        /* Servizi: card che scorrono di lato */
        .cs-service-sticky {
          position: sticky;
          top: 0;
          height: 100svh;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: center;
          gap: clamp(40px, 6vh, 72px);
        }
        .cs-service-track,
        .cs-service-strip {
          display: flex;
          gap: clamp(16px, 2vw, 24px);
          padding-inline: max(clamp(24px, 4vw, 48px), calc((100vw - 1280px) / 2 + 48px));
        }
        .cs-service-track { width: max-content; will-change: transform; }
        .cs-service-strip {
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          margin-top: clamp(40px, 6vw, 72px);
        }
        .cs-service-card {
          flex-shrink: 0;
          width: clamp(240px, 24vw, 320px);
          aspect-ratio: 4 / 5;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: clamp(24px, 2.5vw, 32px);
          scroll-snap-align: start;
        }
        .cs-service-num {
          font-family: var(--font-display);
          font-style: italic;
          font-size: clamp(56px, 5vw, 80px);
          line-height: 1;
          letter-spacing: -0.03em;
          color: rgba(255, 255, 255, 0.32);
          transition: color 400ms ease;
        }
        .cs-service-card:hover .cs-service-num { color: rgba(255, 255, 255, 0.9); }
        .cs-service-card h3 {
          font-family: var(--font-body);
          font-weight: 300;
          font-size: clamp(22px, 1.4vw + 0.6rem, 30px);
          line-height: 1.15;
          letter-spacing: -0.02em;
          color: #F0F5F2;
          margin: 0;
        }
        @media (prefers-reduced-motion: reduce) {
          .cs-glass::before { display: none; }
        }
      `}</style>

      {/* ── Apertura ── */}
      <section
        aria-labelledby="chi-siamo-title"
        className="cs-wrap"
        style={{ paddingTop: 'calc(72px + clamp(56px, 8vw, 120px))', paddingBottom: 'clamp(56px, 7vw, 104px)' }}
      >
        <SectionTitle
          as="h1"
          id="chi-siamo-title"
          lead="Nati a Venezia,"
          accent="presenti ovunque"
          text="Digital Eco è un'agenzia di comunicazione, marketing e soluzioni AI con sede a Venezia. Aiutiamo aziende, professionisti e brand a crescere online con strategie mirate, design di qualità e tecnologia al servizio delle persone."
        />
      </section>

      {/* ── Foto ── */}
      <section aria-label="La nostra sede e i nostri eventi">
        <div className="cs-photos">
          {PHOTOS.map((photo) => (
            <figure key={photo.src} className={photo.main ? 'cs-photo cs-photo--main' : 'cs-photo'}>
              <div className="cs-photo-frame">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  priority={photo.main}
                  sizes={photo.main ? '(max-width: 899px) 78vw, 46vw' : '(max-width: 899px) 78vw, 27vw'}
                  style={{ objectFit: 'cover' }}
                />
              </div>
              <figcaption>{photo.caption}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* ── Il nome ── */}
      <section
        aria-label="Perché Digital Eco"
        className="cs-wrap"
        style={{ paddingBlock: 'clamp(80px, 10vw, 160px)' }}
      >
        <div className="cs-narrative">
          <div className="cs-glass" onMouseMove={handleGlassMove}>
            <h2>Siamo Digital</h2>
            <p>
              per la nostra propensione ad abbracciare l&apos;innovazione e la tecnologia, dedicando
              uno spazio di condivisione allo sviluppo di nuove idee e di progetti capaci di cogliere
              le opportunità del mercato online.
            </p>
          </div>
          <div className="cs-glass" onMouseMove={handleGlassMove}>
            <h2>Diamo Eco</h2>
            <p>
              perché il nostro obiettivo è diffondere online i valori e i tratti distintivi dei
              nostri clienti. Dal passaparola tradizionale a quello digitale, diamo eco alla loro
              comunicazione in modo efficace, per vendere online.
            </p>
          </div>
        </div>
      </section>

      {/* ── Cosa facciamo ── */}
      <ServicesConveyor onGlassMove={handleGlassMove} />

      {/* ── Chiusura, come nei casi studio ── */}
      <CtaBand
        eyebrow="Parliamone"
        title="Ci conosciamo?"
        text="Raccontaci il tuo progetto. La prima consulenza è gratuita e senza impegno."
      />
    </>
  )
}
