'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

const FAQS = [
  {
    q: 'Quanto costa realizzare un sito web a Venezia?',
    a: 'Il costo varia in base alle funzionalità: un sito vetrina parte da circa 2.000€, un e-commerce da 4.000€. Offriamo una consulenza gratuita per definire un preventivo su misura per le tue esigenze.',
  },
  {
    q: 'Quali servizi di comunicazione digitale offrite?',
    a: 'Offriamo web design e sviluppo siti, e-commerce, gestione social media, campagne Google Ads e Meta Ads, ottimizzazione SEO, branding, comunicazione aziendale e consulenza strategica digitale.',
  },
  {
    q: 'In quanto tempo viene consegnato un sito web?',
    a: 'Un sito vetrina viene consegnato in 3-4 settimane, un e-commerce in 6-8 settimane. Definiamo tempistiche precise durante la consulenza iniziale gratuita.',
  },
  {
    q: 'Lavorate solo con aziende di Venezia e del Veneto?',
    a: 'La nostra sede è a Venezia ma lavoriamo con clienti in tutta Italia, sia in presenza che da remoto. Abbiamo esperienza con PMI, startup e professionisti nei settori artigianato, food, moda e turismo.',
  },
  {
    q: 'Come funziona la consulenza digitale gratuita?',
    a: 'Compili il form di contatto, ti ricontattiamo entro 24 ore per una call conoscitiva. Analizziamo insieme il tuo progetto, i tuoi obiettivi e il tuo pubblico, e ti proponiamo una strategia digitale personalizzata senza impegno.',
  },
  {
    q: 'Gestite anche le campagne pubblicitarie online?',
    a: 'Sì, gestiamo campagne Google Ads, Meta Ads (Facebook e Instagram) e advertising su TikTok. Ci occupiamo di strategia, creazione annunci, ottimizzazione e reportistica mensile dei risultati.',
  },
]

function AccordionItem({ item, index, open, onToggle }: {
  item: typeof FAQS[0]
  index: number
  open: boolean
  onToggle: () => void
}) {
  const rm = useReducedMotion()

  return (
    <motion.div
      initial={rm ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: EASE }}
    >
      {/* Single wrapper with consistent 1px border + box-shadow for 2px effect when open */}
      <div style={{
        borderRadius: '16px',
        border: '1px solid var(--color-divider)',
        boxShadow: open ? '0 0 0 1px #999' : 'none',
        transition: 'box-shadow 0.3s ease',
        overflow: 'hidden',
        background: '#FFFFFF',
      }}>
        <button
          onClick={onToggle}
          aria-expanded={open}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '24px',
            background: 'transparent',
            border: 'none',
            padding: 'clamp(18px, 2vw, 24px) clamp(20px, 2.5vw, 32px)',
            cursor: 'pointer',
            textAlign: 'left',
            outline: 'none',
          }}
        >
          <span style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(14px, 1.1vw, 16px)',
            fontWeight: 500,
            color: 'var(--color-text)',
            lineHeight: 1.4,
          }}>
            {item.q}
          </span>
          <motion.span
            animate={{ rotate: open ? 45 : 0 }}
            transition={{ duration: 0.3, ease: EASE }}
            style={{
              flexShrink: 0,
              width: '28px',
              height: '28px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '20px',
              fontWeight: 300,
              color: 'var(--color-text-muted)',
              lineHeight: 1,
            }}
          >
            +
          </motion.span>
        </button>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
              style={{ overflow: 'hidden' }}
            >
              <div style={{
                padding: '0 clamp(20px, 2.5vw, 32px) clamp(18px, 2vw, 24px)',
              }}>
                <p style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'clamp(13px, 1vw, 15px)',
                  color: 'var(--color-text-muted)',
                  lineHeight: 1.7,
                  margin: 0,
                  maxWidth: '60ch',
                }}>
                  {item.a}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export default function FAQ() {
  const rm = useReducedMotion()
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section
      aria-labelledby="faq-title"
      style={{
        background: 'var(--color-surface-offset)',
        padding: 'clamp(64px, 8vw, 120px) clamp(24px, 4vw, 48px)',
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div className="faq-grid" style={{
          display: 'grid',
          gap: 'clamp(40px, 5vw, 80px)',
          alignItems: 'start',
        }}>
          <style>{`
            .faq-grid {
              grid-template-columns: 1fr;
            }
            .faq-title {
              position: static;
            }
            @media (min-width: 768px) {
              .faq-grid {
                grid-template-columns: clamp(200px, 25vw, 320px) 1fr;
              }
              .faq-title {
                position: sticky;
                top: clamp(80px, 10vw, 120px);
              }
            }
          `}</style>

          {/* Title */}
          <motion.h2
            className="faq-title"
            id="faq-title"
            initial={rm ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, ease: EASE }}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(28px, 3.5vw, 44px)',
              fontWeight: 400,
              fontStyle: 'italic',
              lineHeight: 1.15,
              letterSpacing: '-0.03em',
              color: 'var(--color-text)',
              margin: 0,
            }}
          >
            Le domande che ci fanno tutti
          </motion.h2>

          {/* Accordion */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(10px, 1.2vw, 16px)' }}>
            {FAQS.map((item, i) => (
              <AccordionItem
                key={i}
                item={item}
                index={i}
                open={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
