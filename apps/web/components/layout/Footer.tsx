'use client'

import Link from 'next/link'

const socialLinks = [
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/company/digitaleco',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    href: 'https://instagram.com/digitaleco_it',
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
    href: 'https://facebook.com/digitaleco',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    name: 'TikTok',
    href: 'https://tiktok.com/@digitaleco',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18" aria-hidden="true">
        <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
      </svg>
    ),
  },
]

const footerColumns = [
  {
    title: 'Azienda',
    links: [
      { label: 'Chi siamo', href: '/about' },
      { label: 'Portfolio', href: '/portfolio' },
      { label: 'Contatti', href: '/contact' },
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
        background: '#052E22',
        color: '#FFFFFF',
        overflow: 'hidden',
      }}
    >
      {/* ── Main content ── */}
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '64px 32px 0',
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
              Via della Repubblica 12, 20121 Milano MI
            </p>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '11px',
              color: 'rgba(255,255,255,0.45)',
              lineHeight: 1.6,
            }}>
              P.IVA: 12345678901
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

      {/* ── Giant brand name ── */}
      <div
        style={{
          position: 'relative',
          height: 'clamp(100px, 14vw, 200px)',
          overflow: 'hidden',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(120px, 16vw, 280px)',
            fontWeight: 400,
            fontStyle: 'italic',
            letterSpacing: '-0.04em',
            color: 'rgba(255,255,255,0.08)',
            letterSpacing: '-0.03em',
            lineHeight: 0.85,
            whiteSpace: 'nowrap',
            display: 'block',
            textAlign: 'center',
            userSelect: 'none',
          }}
          aria-hidden="true"
        >
          DIGITAL ECO
        </span>
      </div>
    </footer>
  )
}
