'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useInView, useReducedMotion } from 'framer-motion'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Link from 'next/link'

/* ─────────────────────────────────────────────
   Constants
   ───────────────────────────────────────────── */

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

const PROJECT = {
  title: 'Relais Villa Fontana',
  category: 'Hospitality & Digital Advertising',
  year: '2025',
  client: 'Relais Villa Fontana',
  services: ['Web Design', 'Sviluppo Sito', 'Google Ads', 'SEO'],
  heroImage: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&q=80&auto=format',
}

const GALLERY = [
  { src: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80&auto=format', alt: 'Suite di lusso con arredi in stile toscano' },
  { src: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80&auto=format', alt: 'Area piscina del boutique hotel' },
  { src: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1400&q=80&auto=format', alt: 'Vista esterna del relais con giardino toscano' },
]

const METRICS = [
  { value: 340, suffix: '%', label: 'Aumento traffico organico' },
  { value: 52, suffix: '%', label: 'Tasso di conversione Google Ads' },
  { value: 2.8, suffix: 'x', label: 'ROAS medio campagne', decimals: 1 },
  { value: 96, suffix: '/100', label: 'PageSpeed score mobile' },
]

const RELATED = [
  {
    title: 'Artigiani del Gusto',
    category: 'E-Commerce',
    bg: 'linear-gradient(135deg, #063329 0%, #0A5C44 100%)',
    href: '/portfolio',
  },
  {
    title: 'Studio Legale Meroni',
    category: 'Brand Identity & Web',
    bg: 'linear-gradient(135deg, #084a37 0%, #0d7a5c 100%)',
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

export default function RelaisVillaFontanaPage() {
  const rm = useReducedMotion()
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 120])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

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
          aspect-ratio: 16 / 9;
          margin-top: clamp(16px, 2vw, 24px);
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
        .cs-related-card {
          border-radius: 16px;
          overflow: hidden;
          transition: transform 300ms cubic-bezier(0.16, 1, 0.3, 1);
          cursor: pointer;
          text-decoration: none;
          display: block;
        }
        .cs-related-card:hover {
          transform: scale(1.02);
        }
        .cs-narrative {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(48px, 6vw, 96px);
          align-items: start;
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
            aspect-ratio: 16 / 10;
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
              alt="Relais Villa Fontana, vista panoramica"
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
                fontSize: 'clamp(12px, 1vw, 14px)',
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
          background: 'var(--color-bg)',
          padding: 'clamp(48px, 6vw, 80px) clamp(24px, 4vw, 48px)',
        }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
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
                  color: 'var(--color-text-muted)',
                  marginBottom: '8px',
                }}>
                  Cliente
                </p>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'clamp(15px, 1.2vw, 18px)',
                  fontWeight: 400,
                  color: 'var(--color-text)',
                  lineHeight: 1.5,
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
                  color: 'var(--color-text-muted)',
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
                        color: 'var(--color-primary)',
                        background: 'rgba(10, 92, 68, 0.08)',
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
                  color: 'var(--color-text-muted)',
                  marginBottom: '8px',
                }}>
                  Anno
                </p>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'clamp(15px, 1.2vw, 18px)',
                  fontWeight: 400,
                  color: 'var(--color-text)',
                  lineHeight: 1.5,
                  margin: 0,
                }}>
                  {PROJECT.year}
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Divider ── */}
        <div style={{
          maxWidth: '1000px',
          margin: '0 auto',
          padding: '0 clamp(24px, 4vw, 48px)',
        }}>
          <div style={{ height: '1px', background: 'var(--color-divider)' }} />
        </div>

        {/* ── Sfida e Soluzione ── */}
        <section style={{
          background: 'var(--color-bg)',
          padding: 'clamp(48px, 6vw, 96px) clamp(24px, 4vw, 48px)',
        }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
            <div className="cs-narrative">
              {/* La Sfida */}
              <motion.div
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
                  color: 'var(--color-text)',
                  marginBottom: 'clamp(16px, 2vw, 24px)',
                }}>
                  La sfida
                </h2>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'clamp(15px, 1.1vw, 17px)',
                  fontWeight: 300,
                  color: 'var(--color-text-muted)',
                  lineHeight: 1.75,
                  maxWidth: '45ch',
                  margin: 0,
                }}>
                  Relais Villa Fontana, boutique hotel immerso nelle colline toscane, aveva un sito datato che non rifletteva
                  la qualità dell'esperienza offerta agli ospiti. Il traffico organico era stagnante e le campagne pubblicitarie
                  precedenti generavano click ma pochissime prenotazioni dirette, con un costo per acquisizione insostenibile.
                </p>
              </motion.div>

              {/* La Soluzione */}
              <motion.div
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
                  color: 'var(--color-text)',
                  marginBottom: 'clamp(16px, 2vw, 24px)',
                }}>
                  La soluzione
                </h2>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'clamp(15px, 1.1vw, 17px)',
                  fontWeight: 300,
                  color: 'var(--color-text-muted)',
                  lineHeight: 1.75,
                  maxWidth: '45ch',
                  margin: 0,
                }}>
                  Abbiamo progettato un sito editoriale con fotografia immersiva e micro-animazioni che trasmettono
                  l'atmosfera del relais già dalla prima visita. Parallelamente, abbiamo costruito campagne Google Ads
                  iper-targettizzate su segmenti alto-spendenti, con landing page dedicate e un funnel di prenotazione
                  ottimizzato per ridurre ogni frizione.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ── Gallery: 2 affiancate + 1 full ── */}
        <section style={{
          background: 'var(--color-bg)',
          padding: '0 clamp(24px, 4vw, 48px) clamp(48px, 6vw, 96px)',
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            {/* Two side by side */}
            <div className="cs-gallery-pair">
              <GalleryImage src={GALLERY[0].src} alt={GALLERY[0].alt} index={0} />
              <GalleryImage src={GALLERY[1].src} alt={GALLERY[1].alt} index={1} />
            </div>
            {/* One full-width below */}
            <div className="cs-gallery-full">
              <GalleryImage src={GALLERY[2].src} alt={GALLERY[2].alt} index={2} />
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section style={{
          background: '#E8F5EE',
          padding: 'clamp(64px, 8vw, 120px) clamp(24px, 4vw, 48px)',
          textAlign: 'center',
        }}>
          <motion.div
            initial={rm ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: EASE }}
            style={{ maxWidth: '600px', margin: '0 auto' }}
          >
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(28px, 3.5vw, 48px)',
              fontWeight: 400,
              fontStyle: 'italic',
              lineHeight: 1.15,
              letterSpacing: '-0.03em',
              color: 'var(--color-text)',
              marginBottom: 'clamp(12px, 1.5vw, 20px)',
            }}>
              Vuoi risultati simili?
            </h2>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(15px, 1.1vw, 17px)',
              fontWeight: 300,
              color: 'var(--color-text-muted)',
              lineHeight: 1.7,
              marginBottom: 'clamp(24px, 3vw, 40px)',
            }}>
              Raccontaci il tuo progetto. Ti proponiamo una strategia su misura, senza impegno.
            </p>
            <Link
              href="/#consulenza"
              style={{
                display: 'inline-block',
                background: 'var(--color-primary)',
                color: '#FFFFFF',
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(14px, 1vw, 16px)',
                fontWeight: 500,
                padding: 'clamp(14px, 1.5vw, 18px) clamp(32px, 3vw, 48px)',
                borderRadius: '999px',
                textDecoration: 'none',
                transition: 'background 200ms ease',
              }}
            >
              Parliamone
            </Link>
          </motion.div>
        </section>

        {/* ── Related Projects ── */}
        <section style={{
          background: 'var(--color-surface-offset)',
          padding: 'clamp(64px, 8vw, 96px) clamp(24px, 4vw, 48px)',
        }}>
          <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
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
                color: 'var(--color-text)',
                marginBottom: 'clamp(32px, 4vw, 56px)',
              }}
            >
              Altri progetti
            </motion.h2>

            <div className="cs-related-grid">
              {RELATED.map((project, i) => (
                <motion.div
                  key={project.title}
                  initial={rm ? false : { opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: EASE }}
                >
                  <Link href={project.href} className="cs-related-card">
                    <div style={{
                      aspectRatio: '16 / 10',
                      background: project.bg,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                    }}>
                      <div style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)',
                        backgroundSize: '18px 18px',
                      }} />
                    </div>
                    <div style={{
                      padding: 'clamp(16px, 2vw, 24px)',
                      background: 'var(--color-surface)',
                    }}>
                      <p style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'clamp(11px, 0.85vw, 12px)',
                        fontWeight: 500,
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        color: 'var(--color-text-muted)',
                        marginBottom: '6px',
                      }}>
                        {project.category}
                      </p>
                      <p style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(18px, 1.5vw, 22px)',
                        fontWeight: 400,
                        fontStyle: 'italic',
                        color: 'var(--color-text)',
                        margin: 0,
                        lineHeight: 1.3,
                      }}>
                        {project.title}
                      </p>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  )
}
