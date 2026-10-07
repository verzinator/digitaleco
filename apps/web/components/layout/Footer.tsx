'use client'

import Link from 'next/link'
import { COMPANY, COMPANY_ADDRESS } from '@/lib/contacts'

const socialLinks = [
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/company/digital-eco-it/',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    href: 'https://www.instagram.com/digital.eco.it/',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" width="18" height="18" aria-hidden="true">
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    ),
  },
  {
    name: 'Facebook',
    href: 'https://www.facebook.com/digitalecoit/',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
]

const footerColumns = [
  {
    title: 'Azienda',
    links: [
      { label: 'Chi siamo', href: '/chi-siamo' },
      { label: 'Contatti', href: '/contatti' },
    ],
  },
  {
    title: 'Legale',
    links: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Cookie Policy', href: '/cookies' },
      { label: 'Termini di servizio', href: '/terms' },
      { label: 'Note legali', href: '/legal' },
    ],
  },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      role="contentinfo"
      style={{
        color: '#FFFFFF',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* ── Main content ── */}
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '64px 32px 0',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {/* Top row: brand left + columns right */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '48px',
            paddingBottom: '48px',
          }}
        >
          {/* Brand column */}
          <div>
            <Link
              href="/"
              aria-label="Digital Eco — torna alla home"
              style={{ display: 'inline-block', marginBottom: '8px', textDecoration: 'none' }}
            >
              <span style={{
                fontFamily: 'var(--font-display)',
                fontSize: '20px',
                fontWeight: 700,
                color: '#FFFFFF',
                letterSpacing: '-0.02em',
              }}>
                Digital<span style={{ fontFamily: 'var(--font-body)', fontWeight: 300, color: 'var(--color-accent)' }}>Eco</span>
              </span>
            </Link>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '13px',
              color: 'rgba(255,255,255,0.6)',
              lineHeight: 1.5,
              marginBottom: '24px',
              maxWidth: '260px',
            }}>
              Agenzia di comunicazione e web design a Venezia. Creiamo esperienze digitali che fanno crescere il tuo business.
            </p>

            {/* Social icons */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '32px' }}>
              {socialLinks.map(({ name, href, icon }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Seguici su ${name}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '36px',
                    height: '36px',
                    color: 'rgba(255,255,255,0.7)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    borderRadius: '50%',
                    transition: 'color 200ms ease, border-color 200ms ease',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = '#FFFFFF'
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = 'rgba(255,255,255,0.7)'
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'
                  }}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {footerColumns.map(col => (
            <div key={col.title} style={{ minWidth: '160px' }}>
              <h3
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '14px',
                  fontWeight: 700,
                  color: '#FFFFFF',
                  marginBottom: '16px',
                }}
              >
                {col.title}
              </h3>
              <ul
                role="list"
                style={{
                  listStyle: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                }}
              >
                {col.links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: '13px',
                        color: 'rgba(255,255,255,0.6)',
                        textDecoration: 'none',
                        transition: 'color 200ms ease',
                      }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#FFFFFF')}
                      onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Divider ── */}
        <div style={{ height: '1px', background: 'rgba(255,255,255,0.12)' }} />

        {/* ── Bottom bar ── */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: '16px',
            padding: '24px 0 32px',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '11px',
              color: 'rgba(255,255,255,0.45)',
              lineHeight: 1.6,
            }}>
              Copyright &copy; {year} Digital Eco S.r.l.
            </p>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '11px',
              color: 'rgba(255,255,255,0.45)',
              lineHeight: 1.6,
            }}>
              Tutti i diritti riservati. Esperienze digitali che crescono.
            </p>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '11px',
              color: 'rgba(255,255,255,0.45)',
              lineHeight: 1.6,
            }}>
              {COMPANY_ADDRESS}
            </p>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '11px',
              color: 'rgba(255,255,255,0.45)',
              lineHeight: 1.6,
            }}>
              P.IVA {COMPANY.vat}
            </p>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            color: 'rgba(255,255,255,0.45)',
            fontSize: '11px',
            fontFamily: 'var(--font-body)',
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <circle cx="12" cy="12" r="10" />
              <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
            </svg>
            IT
          </div>
        </div>
      </div>

      {/* ── Giant brand name — clipped to show only top portion ── */}
      <div
        style={{
          position: 'relative',
          height: 'clamp(80px, 12vw, 200px)',
          overflow: 'hidden',
          marginTop: '-16px',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(80px, 14vw, 240px)',
            fontWeight: 400,
            fontStyle: 'italic',
            letterSpacing: '-0.03em',
            color: 'rgba(255,255,255,0.08)',
            lineHeight: 0.85,
            whiteSpace: 'nowrap',
            display: 'block',
            textAlign: 'center',
            userSelect: 'none',
          }}
          aria-hidden="true"
        >
          Digital Eco
        </span>
      </div>
    </footer>
  )
}
