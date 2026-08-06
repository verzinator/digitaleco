'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState, useRef, useCallback } from 'react'
import { motion, useReducedMotion, useInView } from 'framer-motion'
import { CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

const contactSchema = z.object({
  firstName: z.string().min(2, 'Inserisci almeno 2 caratteri'),
  lastName: z.string().min(2, 'Inserisci almeno 2 caratteri'),
  email: z.string().email('Inserisci un indirizzo email valido'),
  phone: z.string().optional(),
  company: z.string().optional(),
  city: z.string().min(2, 'Inserisci la tua città'),
  privacy: z.boolean().refine(val => val === true, 'Devi accettare la privacy policy'),
})

type ContactFormData = z.infer<typeof contactSchema>
type SubmitState = 'idle' | 'loading' | 'success' | 'error'

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontFamily: 'var(--font-body)',
  fontSize: '12px',
  fontWeight: 600,
  color: 'var(--color-text)',
  marginBottom: '8px',
  letterSpacing: '0.04em',
  textTransform: 'uppercase',
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '14px 16px',
  fontFamily: 'var(--font-body)',
  fontSize: '15px',
  color: 'var(--color-text)',
  background: 'var(--color-surface-offset)',
  border: '1px solid var(--color-divider)',
  borderRadius: 'var(--radius-sm)',
  outline: 'none',
  transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
  boxSizing: 'border-box',
}

function applyFocus(el: HTMLElement) {
  el.style.borderColor = 'var(--color-primary)'
  el.style.boxShadow = '0 0 0 3px rgba(10,92,68,0.12)'
}

function applyBlur(el: HTMLElement, hasError?: boolean) {
  if (!hasError) el.style.borderColor = 'var(--color-divider)'
  el.style.boxShadow = 'none'
}

export default function ContactForm() {
  const [submitState, setSubmitState] = useState<SubmitState>('idle')
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px 0px' })
  const rm = useReducedMotion()

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting, isValid },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: 'onChange',
  })

  // Keep form reactive
  watch()

  const onSubmit = async (data: ContactFormData) => {
    setSubmitState('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Server error')
      setSubmitState('success')
      reset()
    } catch {
      setSubmitState('error')
    }
  }

  /* Wrap register to compose focus/blur handlers */
  const reg = useCallback(
    (name: keyof ContactFormData, hasError?: boolean) => {
      const { onBlur, ...rest } = register(name)
      return {
        ...rest,
        onFocus: (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => applyFocus(e.currentTarget),
        onBlur: (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
          applyBlur(e.currentTarget, hasError)
          onBlur(e)
        },
      }
    },
    [register],
  )

  return (
    <section
      ref={ref}
      id="consulenza"
      aria-labelledby="contact-title"
      style={{
        background: 'var(--color-bg)',
        padding: 'clamp(80px, 10vw, 140px) clamp(24px, 4vw, 48px)',
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: 'clamp(40px, 5vw, 64px)',
            alignItems: 'start',
          }}
          className="md:!grid-cols-[1fr_1.15fr]"
        >
          {/* Left column — copy */}
          <motion.div
            initial={rm ? false : { opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE }}
            style={{ paddingTop: 'clamp(0px, 2vw, 24px)' }}
          >
            <h2
              id="contact-title"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(36px, 5vw + 0.5rem, 64px)',
                fontWeight: 400,
                fontStyle: 'italic',
                lineHeight: 1.05,
                letterSpacing: '-0.03em',
                color: 'var(--color-text)',
                margin: '0 0 clamp(20px, 3vw, 32px) 0',
              }}
            >
              Troviamo i tuoi clienti.<br /><em style={{ fontStyle: 'italic', color: 'var(--color-accent)' }}>Iniziamo dal conoscerti.</em>
            </h2>

            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'clamp(15px, 1.1vw + 0.2rem, 18px)',
                color: 'var(--color-text-muted)',
                lineHeight: 1.7,
                margin: '0 0 clamp(32px, 4vw, 48px) 0',
                maxWidth: '420px',
              }}
            >
              Ogni azienda ha una storia diversa, obiettivi diversi e punti di forza da valorizzare.
              <br /><br />
              Per questo il nostro lavoro inizia sempre da una conversazione. Raccontaci il tuo progetto: analizzeremo le tue esigenze e costruiremo insieme la strategia più adatta per far crescere il tuo business.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                'Primo confronto conoscitivo gratuito',
                'Analisi preliminare del progetto',
                'Strategia e proposta personalizzata',
              ].map((text, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                  }}
                >
                  <div
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: 'var(--color-accent)',
                      flexShrink: 0,
                    }}
                  />
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '14px',
                      fontWeight: 500,
                      color: 'var(--color-text)',
                      letterSpacing: '0.01em',
                    }}
                  >
                    {text}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right column — form card */}
          <motion.div
            initial={rm ? false : { opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.12, ease: EASE }}
            style={{
              background: 'var(--color-surface)',
              borderRadius: '32px',
              padding: 'clamp(28px, 4vw, 44px)',
              border: '1px solid oklch(from #1A1A2E l c h / 0.08)',
              boxShadow: '0 4px 24px oklch(from #1A1A2E l c h / 0.05)',
            }}
          >
            {submitState === 'success' ? (
              <SuccessMessage />
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} noValidate aria-label="Modulo di contatto">
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {/* Name row */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label htmlFor="c-first" style={labelStyle}>Nome</label>
                      <input
                        id="c-first"
                        type="text"
                        autoComplete="given-name"
                        placeholder="Luca"
                        style={{
                          ...inputStyle,
                          borderColor: errors.firstName ? '#DC2626' : 'var(--color-divider)',
                        }}
                        {...reg('firstName', !!errors.firstName)}
                      />
                      {errors.firstName && <FieldError message={errors.firstName.message!} />}
                    </div>
                    <div>
                      <label htmlFor="c-last" style={labelStyle}>Cognome</label>
                      <input
                        id="c-last"
                        type="text"
                        autoComplete="family-name"
                        placeholder="Morandi"
                        style={{
                          ...inputStyle,
                          borderColor: errors.lastName ? '#DC2626' : 'var(--color-divider)',
                        }}
                        {...reg('lastName', !!errors.lastName)}
                      />
                      {errors.lastName && <FieldError message={errors.lastName.message!} />}
                    </div>
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="c-email" style={labelStyle}>Email</label>
                    <input
                      id="c-email"
                      type="email"
                      autoComplete="email"
                      placeholder="luca.morandi@esempio.com"
                      style={{
                        ...inputStyle,
                        borderColor: errors.email ? '#DC2626' : 'var(--color-divider)',
                      }}
                      {...reg('email', !!errors.email)}
                    />
                    {errors.email && <FieldError message={errors.email.message!} />}
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="c-phone" style={labelStyle}>Telefono</label>
                    <input
                      id="c-phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder="+39 1234 2342 342"
                      style={inputStyle}
                      {...reg('phone')}
                    />
                  </div>

                  {/* Company */}
                  <div>
                    <label htmlFor="c-company" style={labelStyle}>Nome azienda</label>
                    <input
                      id="c-company"
                      type="text"
                      autoComplete="organization"
                      placeholder="Rossi S.r.l."
                      style={inputStyle}
                      {...reg('company')}
                    />
                  </div>

                  {/* City */}
                  <div>
                    <label htmlFor="c-city" style={labelStyle}>Città e provincia</label>
                    <input
                      id="c-city"
                      type="text"
                      autoComplete="address-level2"
                      placeholder="Milano (MI)"
                      style={{
                        ...inputStyle,
                        borderColor: errors.city ? '#DC2626' : 'var(--color-divider)',
                      }}
                      {...reg('city', !!errors.city)}
                    />
                    {errors.city && <FieldError message={errors.city.message!} />}
                  </div>

                  {/* Privacy */}
                  <div>
                    <label style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        style={{
                          marginTop: '2px',
                          width: '16px',
                          height: '16px',
                          flexShrink: 0,
                          accentColor: 'var(--color-primary)',
                          cursor: 'pointer',
                        }}
                        {...register('privacy')}
                      />
                      <span style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '12px',
                        color: 'var(--color-text-muted)',
                        lineHeight: 1.5,
                      }}>
                        Accetto la{' '}
                        <a href="/privacy" style={{ color: 'var(--color-primary)', textDecoration: 'underline' }}>
                          privacy policy
                        </a>
                      </span>
                    </label>
                    {errors.privacy && <FieldError message={errors.privacy.message!} />}
                  </div>

                  {submitState === 'error' && (
                    <div
                      role="alert"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '12px 16px',
                        background: 'rgba(220,38,38,0.06)',
                        border: '1px solid rgba(220,38,38,0.15)',
                        borderRadius: 'var(--radius-sm)',
                        fontFamily: 'var(--font-body)',
                        fontSize: '13px',
                        color: '#B91C1C',
                      }}
                    >
                      <AlertCircle size={16} aria-hidden="true" />
                      Si è verificato un errore. Riprova o scrivici a ciao@digitaleco.it
                    </div>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={!isValid || isSubmitting || submitState === 'loading'}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      width: '100%',
                      padding: '16px 24px',
                      fontFamily: 'var(--font-body)',
                      fontSize: '10px',
                      fontWeight: 600,
                      letterSpacing: '0.22em',
                      textTransform: 'uppercase',
                      color: 'var(--color-text-inverse)',
                      background: 'var(--color-primary)',
                      border: 'none',
                      borderRadius: '100px',
                      cursor: (!isValid || isSubmitting) ? 'not-allowed' : 'pointer',
                      minHeight: '52px',
                      transition: 'background 0.3s ease, transform 0.15s ease, opacity 0.3s ease',
                      marginTop: '4px',
                      opacity: (!isValid && !isSubmitting) ? 0.3 : 1,
                    }}
                    onMouseEnter={e => {
                      if (!isSubmitting && isValid) {
                        e.currentTarget.style.background = 'var(--color-primary-hover)'
                        e.currentTarget.style.transform = 'translateY(-1px)'
                      }
                    }}
                    onMouseLeave={e => {
                      if (!isSubmitting && isValid) {
                        e.currentTarget.style.background = 'var(--color-primary)'
                        e.currentTarget.style.transform = 'translateY(0)'
                      }
                    }}
                  >
                    {isSubmitting ? (
                      <>
                        <SpinnerIcon />
                        Invio in corso...
                      </>
                    ) : (
                      <>
                        Invia richiesta
                        <ArrowRight size={14} strokeWidth={2.5} />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function FieldError({ message }: { message: string }) {
  return (
    <p
      role="alert"
      style={{
        marginTop: '6px',
        fontFamily: 'var(--font-body)',
        fontSize: '12px',
        color: '#DC2626',
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
      }}
    >
      <AlertCircle size={12} aria-hidden="true" />
      {message}
    </p>
  )
}

function SuccessMessage() {
  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        padding: '48px 0',
        gap: '16px',
      }}
    >
      <CheckCircle2 size={56} color="var(--color-accent)" aria-hidden="true" />
      <h3 style={{
        fontFamily: 'var(--font-display)',
        fontSize: '24px',
        fontStyle: 'italic',
        color: 'var(--color-text)',
      }}>
        Messaggio inviato!
      </h3>
      <p style={{
        fontFamily: 'var(--font-body)',
        fontSize: '14px',
        color: 'var(--color-text-muted)',
        lineHeight: 1.65,
        maxWidth: '360px',
      }}>
        Grazie per averci contattato. Ti risponderemo entro 24 ore lavorative.
      </p>
    </div>
  )
}

function SpinnerIcon() {
  return (
    <svg
      aria-hidden="true"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ animation: 'spin 0.8s linear infinite' }}
    >
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  )
}
