'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useState, useRef } from 'react'
import { motion, useReducedMotion, useInView } from 'framer-motion'
import { Send, CheckCircle2, AlertCircle } from 'lucide-react'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

const contactSchema = z.object({
  name: z
    .string()
    .min(2, 'Inserisci almeno 2 caratteri')
    .max(100, 'Il nome è troppo lungo'),
  email: z
    .string()
    .email('Inserisci un indirizzo email valido'),
  message: z
    .string()
    .min(20, 'Scrivi almeno 20 caratteri nel messaggio')
    .max(2000, 'Il messaggio è troppo lungo'),
  privacy: z
    .boolean()
    .refine(val => val === true, 'Devi accettare la privacy policy per procedere'),
})

type ContactFormData = z.infer<typeof contactSchema>

type SubmitState = 'idle' | 'loading' | 'success' | 'error'

export default function ContactForm() {
  const [submitState, setSubmitState] = useState<SubmitState>('idle')
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px 0px' })
  const reduceMotion = useReducedMotion()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: 'onBlur',
  })

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

  return (
    <section
      ref={ref}
      id="contact"
      aria-labelledby="contact-title"
      style={{
        background: 'var(--color-bg)',
        paddingBlock: 'var(--space-24)',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 'var(--space-16)',
            alignItems: 'start',
          }}
        >
          {/* Left: copy */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <p className="eyebrow" style={{ marginBottom: 'var(--space-3)' }}>
              Parliamoci
            </p>
            <h2
              id="contact-title"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-2xl)',
                lineHeight: 1.15,
                color: 'var(--color-text)',
                marginBottom: 'var(--space-4)',
              }}
            >
              Inizia il tuo progetto oggi
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-base)',
                color: 'var(--color-text-muted)',
                lineHeight: 1.7,
                marginBottom: 'var(--space-8)',
              }}
            >
              Raccontaci il tuo progetto. Ti risponderemo entro 24 ore con un&apos;analisi
              preliminare gratuita e una prima proposta personalizzata.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              {[
                { label: 'Email', value: 'ciao@digitaleco.it' },
                { label: 'Telefono', value: '+39 02 1234 5678' },
                { label: 'Indirizzo', value: 'Via della Repubblica 12, Milano' },
              ].map(({ label, value }) => (
                <div key={label}>
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--text-xs)',
                      fontWeight: 600,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: 'var(--color-text-faint)',
                      display: 'block',
                      marginBottom: 'var(--space-1)',
                    }}
                  >
                    {label}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--text-sm)',
                      color: 'var(--color-text)',
                      fontWeight: 500,
                    }}
                  >
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: form */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
            style={{
              background: 'var(--color-surface)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--space-10)',
              boxShadow: 'var(--shadow-md)',
            }}
          >
            {submitState === 'success' ? (
              <SuccessMessage />
            ) : (
              <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                aria-label="Modulo di contatto"
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="contact-name"
                      style={{
                        display: 'block',
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--text-sm)',
                        fontWeight: 600,
                        color: 'var(--color-text)',
                        marginBottom: 'var(--space-2)',
                      }}
                    >
                      Nome e Cognome <span aria-hidden="true" style={{ color: '#DC2626' }}>*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      autoComplete="name"
                      aria-invalid={!!errors.name}
                      aria-describedby={errors.name ? 'name-error' : undefined}
                      className={`form-input${errors.name ? ' error' : ''}`}
                      placeholder="Mario Rossi"
                      {...register('name')}
                    />
                    {errors.name && (
                      <FieldError id="name-error" message={errors.name.message!} />
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="contact-email"
                      style={{
                        display: 'block',
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--text-sm)',
                        fontWeight: 600,
                        color: 'var(--color-text)',
                        marginBottom: 'var(--space-2)',
                      }}
                    >
                      Email <span aria-hidden="true" style={{ color: '#DC2626' }}>*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      autoComplete="email"
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                      className={`form-input${errors.email ? ' error' : ''}`}
                      placeholder="mario@esempio.it"
                      {...register('email')}
                    />
                    {errors.email && (
                      <FieldError id="email-error" message={errors.email.message!} />
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor="contact-message"
                      style={{
                        display: 'block',
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--text-sm)',
                        fontWeight: 600,
                        color: 'var(--color-text)',
                        marginBottom: 'var(--space-2)',
                      }}
                    >
                      Messaggio <span aria-hidden="true" style={{ color: '#DC2626' }}>*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      rows={5}
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? 'message-error' : undefined}
                      className={`form-input${errors.message ? ' error' : ''}`}
                      placeholder="Descrivi il tuo progetto: cosa stai cercando, il tuo settore, il budget indicativo..."
                      style={{ resize: 'vertical', minHeight: '120px' }}
                      {...register('message')}
                    />
                    {errors.message && (
                      <FieldError id="message-error" message={errors.message.message!} />
                    )}
                  </div>

                  {/* Privacy */}
                  <div>
                    <label
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 'var(--space-3)',
                        cursor: 'pointer',
                      }}
                    >
                      <input
                        type="checkbox"
                        aria-invalid={!!errors.privacy}
                        aria-describedby={errors.privacy ? 'privacy-error' : undefined}
                        style={{
                          marginTop: '2px',
                          width: '18px',
                          height: '18px',
                          flexShrink: 0,
                          accentColor: 'var(--color-primary)',
                          cursor: 'pointer',
                        }}
                        {...register('privacy')}
                      />
                      <span
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--text-xs)',
                          color: 'var(--color-text-muted)',
                          lineHeight: 1.6,
                        }}
                      >
                        Ho letto e accetto la{' '}
                        <a
                          href="/privacy"
                          style={{ color: 'var(--color-primary)', textDecoration: 'underline' }}
                        >
                          Privacy Policy
                        </a>{' '}
                        e autorizzo il trattamento dei miei dati personali ai sensi del Reg. UE 2016/679 (GDPR).
                        <span aria-hidden="true" style={{ color: '#DC2626' }}> *</span>
                      </span>
                    </label>
                    {errors.privacy && (
                      <FieldError id="privacy-error" message={errors.privacy.message!} />
                    )}
                  </div>

                  {submitState === 'error' && (
                    <div
                      role="alert"
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--space-2)',
                        padding: 'var(--space-3) var(--space-4)',
                        background: 'oklch(from #DC2626 l c h / 0.08)',
                        border: '1px solid oklch(from #DC2626 l c h / 0.20)',
                        borderRadius: 'var(--radius-sm)',
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--text-sm)',
                        color: '#B91C1C',
                      }}
                    >
                      <AlertCircle size={16} aria-hidden="true" />
                      Si è verificato un errore. Riprova o scrivici direttamente a ciao@digitaleco.it
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting || submitState === 'loading'}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 'var(--space-2)',
                      width: '100%',
                      padding: 'var(--space-4) var(--space-6)',
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--text-base)',
                      fontWeight: 600,
                      color: 'var(--color-text-inverse)',
                      background: isSubmitting ? 'var(--color-primary-hover)' : 'var(--color-primary)',
                      border: 'none',
                      borderRadius: 'var(--radius-sm)',
                      cursor: isSubmitting ? 'not-allowed' : 'pointer',
                      minHeight: '52px',
                      transition: 'background var(--transition-interactive)',
                      opacity: isSubmitting ? 0.7 : 1,
                    }}
                  >
                    {isSubmitting ? (
                      <>
                        <SpinnerIcon />
                        Invio in corso...
                      </>
                    ) : (
                      <>
                        <Send size={18} aria-hidden="true" />
                        Invia il Messaggio
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

function FieldError({ id, message }: { id: string; message: string }) {
  return (
    <p
      id={id}
      role="alert"
      style={{
        marginTop: 'var(--space-1)',
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--text-xs)',
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
        padding: 'var(--space-8) 0',
        gap: 'var(--space-4)',
      }}
    >
      <CheckCircle2 size={56} color="var(--color-accent)" aria-hidden="true" />
      <h3
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--text-xl)',
          color: 'var(--color-text)',
          marginTop: 'var(--space-2)',
        }}
      >
        Messaggio inviato!
      </h3>
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-base)',
          color: 'var(--color-text-muted)',
          lineHeight: 1.65,
          maxWidth: '360px',
        }}
      >
        Grazie per averci contattato. Ti risponderemo entro 24 ore lavorative
        con la nostra analisi preliminare gratuita.
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
