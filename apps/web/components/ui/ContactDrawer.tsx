'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useDragControls, useReducedMotion } from 'framer-motion'
import { Clock, Mail, MapPin, X } from 'lucide-react'
import ContactFormFields from '@/components/sections/ContactFormFields'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]
const OPEN_EVENT = 'digitaleco:open-contact'

/** Apre il drawer "Parliamone" da qualunque punto del sito. */
export function openContactDrawer() {
  if (typeof window !== 'undefined') window.dispatchEvent(new CustomEvent(OPEN_EVENT))
}

const CONTACTS = [
  { icon: Mail, label: 'Scrivici', value: 'ciao@digitaleco.it', href: 'mailto:ciao@digitaleco.it' },
  { icon: MapPin, label: 'Dove siamo', value: 'Venezia, Veneto' },
  { icon: Clock, label: 'Quando', value: 'Lun–Ven, 9:00–18:00' },
]

const BULLETS = [
  'Primo confronto conoscitivo gratuito',
  'Analisi preliminare del progetto',
  'Strategia e proposta personalizzata',
]

/**
 * Bottom sheet di contatto: entra sempre dal basso (mobile e desktop),
 * su desktop con larghezza contenuta e angoli superiori arrotondati.
 * Montato una sola volta nel layout, aperto via `openContactDrawer()`.
 */
export default function ContactDrawer() {
  const [open, setOpen] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const lastFocused = useRef<HTMLElement | null>(null)
  const dragControls = useDragControls()
  const rm = useReducedMotion()

  const close = useCallback(() => setOpen(false), [])

  useEffect(() => {
    const onOpen = () => setOpen(true)
    window.addEventListener(OPEN_EVENT, onOpen)
    return () => window.removeEventListener(OPEN_EVENT, onOpen)
  }, [])

  /* Blocco scroll pagina + Esc + focus trap minimo */
  useEffect(() => {
    if (!open) return

    lastFocused.current = document.activeElement as HTMLElement
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        close()
        return
      }
      if (e.key !== 'Tab' || !panelRef.current) return
      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input:not([disabled]), textarea, select, [tabindex]:not([tabindex="-1"])',
      )
      if (!focusables.length) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    const t = window.setTimeout(() => panelRef.current?.focus(), 80)

    return () => {
      document.body.style.overflow = prevOverflow
      document.removeEventListener('keydown', onKeyDown)
      window.clearTimeout(t)
      lastFocused.current?.focus?.()
    }
  }, [open, close])

  return (
    <AnimatePresence>
      {open && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 10000 }}>
          <style>{`
            .cd-sheet {
              position: absolute;
              left: 0;
              right: 0;
              bottom: 0;
              margin: 0 auto;
              width: 100%;
              max-width: 1120px;
              max-height: 92dvh;
              display: flex;
              flex-direction: column;
              background: var(--color-bg);
              border-radius: 28px 28px 0 0;
              box-shadow: 0 -24px 80px rgba(6, 13, 9, 0.35);
              overflow: hidden;
            }
            .cd-scroll {
              overflow-y: auto;
              -webkit-overflow-scrolling: touch;
              overscroll-behavior: contain;
              padding: 4px clamp(20px, 4vw, 56px) clamp(32px, 5vw, 56px);
            }
            .cd-grid {
              display: grid;
              grid-template-columns: 1fr;
              gap: clamp(24px, 3vw, 48px);
              align-items: start;
            }
            .cd-card {
              background: var(--color-surface);
              border-radius: 24px;
              padding: clamp(20px, 3vw, 36px);
              border: 1px solid var(--color-divider);
              box-shadow: 0 4px 24px rgba(26, 26, 46, 0.05);
            }
            @media (min-width: 900px) {
              .cd-grid {
                grid-template-columns: 1fr 1.05fr;
                gap: clamp(32px, 4vw, 64px);
              }
            }
            .cd-close:hover {
              background: var(--color-surface-offset);
              color: var(--color-text);
            }
            .cd-contact-link:hover {
              color: var(--color-primary);
            }
          `}</style>

          {/* Backdrop */}
          <motion.div
            onClick={close}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(6, 13, 9, 0.55)',
              backdropFilter: 'blur(6px)',
              WebkitBackdropFilter: 'blur(6px)',
            }}
          />

          {/* Sheet */}
          <motion.div
            ref={panelRef}
            className="cd-sheet"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cd-title"
            tabIndex={-1}
            initial={rm ? { opacity: 0 } : { y: '100%' }}
            animate={rm ? { opacity: 1 } : { y: 0 }}
            exit={rm ? { opacity: 0 } : { y: '100%' }}
            transition={{ duration: 0.55, ease: EASE }}
            drag={rm ? false : 'y'}
            dragListener={false}
            dragControls={dragControls}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.4 }}
            onDragEnd={(_, info) => {
              if (info.offset.y > 140 || info.velocity.y > 700) close()
            }}
            style={{ outline: 'none' }}
          >
            {/* Header: maniglia di trascinamento + chiudi */}
            <div
              onPointerDown={e => dragControls.start(e)}
              style={{
                position: 'relative',
                flexShrink: 0,
                padding: '12px 16px 8px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px',
                cursor: 'grab',
                touchAction: 'none',
              }}
            >
              <div
                aria-hidden="true"
                style={{
                  width: '44px',
                  height: '4px',
                  borderRadius: '2px',
                  background: 'var(--color-divider)',
                }}
              />
              <button
                type="button"
                onClick={close}
                aria-label="Chiudi"
                className="cd-close"
                style={{
                  position: 'absolute',
                  top: '10px',
                  right: 'clamp(14px, 3vw, 28px)',
                  width: '38px',
                  height: '38px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: '50%',
                  border: '1px solid var(--color-divider)',
                  background: 'var(--color-surface)',
                  color: 'var(--color-text-muted)',
                  cursor: 'pointer',
                  transition: 'background 0.2s ease, color 0.2s ease',
                }}
              >
                <X size={18} strokeWidth={2} aria-hidden="true" />
              </button>
            </div>

            <div className="cd-scroll">
              <div className="cd-grid">
                {/* Colonna sinistra — copy + contatti */}
                <div style={{ paddingTop: 'clamp(4px, 1vw, 12px)' }}>
                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '12px',
                    fontWeight: 500,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'var(--color-primary)',
                    margin: '0 0 12px',
                  }}>
                    Parliamone
                  </p>

                  <h2
                    id="cd-title"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(28px, 3.4vw, 46px)',
                      fontWeight: 400,
                      fontStyle: 'italic',
                      lineHeight: 1.08,
                      letterSpacing: '-0.03em',
                      color: 'var(--color-text)',
                      margin: '0 0 clamp(14px, 2vw, 20px)',
                    }}
                  >
                    Troviamo i tuoi clienti.<br />
                    <em style={{ fontStyle: 'italic', color: 'var(--color-accent)' }}>Iniziamo dal conoscerti.</em>
                  </h2>

                  <p style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'clamp(14px, 1vw + 0.2rem, 16px)',
                    color: 'var(--color-text-muted)',
                    lineHeight: 1.7,
                    margin: '0 0 clamp(20px, 3vw, 28px)',
                    maxWidth: '44ch',
                  }}>
                    Raccontaci il tuo progetto: analizzeremo le tue esigenze e costruiremo insieme
                    la strategia più adatta per far crescere il tuo business.
                  </p>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: 'clamp(20px, 3vw, 28px)' }}>
                    {BULLETS.map(text => (
                      <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div
                          aria-hidden="true"
                          style={{
                            width: '6px',
                            height: '6px',
                            borderRadius: '50%',
                            background: 'var(--color-accent)',
                            flexShrink: 0,
                          }}
                        />
                        <span style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '14px',
                          fontWeight: 500,
                          color: 'var(--color-text)',
                          letterSpacing: '0.01em',
                        }}>
                          {text}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Informazioni di contatto */}
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '14px',
                    paddingTop: 'clamp(18px, 2.5vw, 24px)',
                    borderTop: '1px solid var(--color-divider)',
                  }}>
                    {CONTACTS.map(({ icon: Icon, label, value, href }) => (
                      <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <span
                          aria-hidden="true"
                          style={{
                            width: '34px',
                            height: '34px',
                            flexShrink: 0,
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '50%',
                            background: 'rgba(10, 92, 68, 0.08)',
                            color: 'var(--color-primary)',
                          }}
                        >
                          <Icon size={16} strokeWidth={1.8} />
                        </span>
                        <span style={{ display: 'flex', flexDirection: 'column', gap: '2px', minWidth: 0 }}>
                          <span style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: '11px',
                            fontWeight: 600,
                            letterSpacing: '0.08em',
                            textTransform: 'uppercase',
                            color: 'var(--color-text-faint)',
                          }}>
                            {label}
                          </span>
                          {href ? (
                            <a
                              href={href}
                              className="cd-contact-link"
                              style={{
                                fontFamily: 'var(--font-body)',
                                fontSize: '15px',
                                color: 'var(--color-text)',
                                textDecoration: 'none',
                                transition: 'color 0.2s ease',
                              }}
                            >
                              {value}
                            </a>
                          ) : (
                            <span style={{
                              fontFamily: 'var(--font-body)',
                              fontSize: '15px',
                              color: 'var(--color-text)',
                            }}>
                              {value}
                            </span>
                          )}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Colonna destra — stesso form della home */}
                <div className="cd-card">
                  <ContactFormFields idPrefix="cd" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
