'use client'

import Link from 'next/link'

const socialLinks = [
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/company/digitaleco',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" aria-hidden="true">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    name: 'Instagram',
    href: 'https://instagram.com/digitaleco_it',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" width="20" height="20" aria-hidden="true">
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
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20" aria-hidden="true">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
]

const footerColumns = [
  {
    title: 'Servizi',
    links: [
      { label: 'Intelligenza Artificiale', href: '/ai' },
      { label: 'Export Digitale', href: '/export-digitale' },
      { label: 'Siti Web & E-Commerce', href: '/siti-web' },
      { label: 'Advertising', href: '/advertising' },
      { label: 'Social Media', href: '/social-media' },
      { label: 'Comunicazione Aziendale', href: '/comunicazione-aziendale' },
      { label: 'Marketplace', href: '/marketplace' },
      { label: 'Video Referenziali', href: '/video-referenziali' },
    ],
  },
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
        background: 'var(--color-text)',
        color: 'var(--color-text-inverse)',
        paddingTop: 'var(--space-16)',
        paddingBottom: 'var(--space-8)',
      }}
    >
      <div className="container">
        {/* Top row: brand + columns */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: 'var(--space-10)',
            paddingBottom: 'var(--space-12)',
            borderBottom: '1px solid oklch(from #FFFFFF l c h / 0.10)',
          }}
        >
          {/* Brand column */}
          <div style={{ gridColumn: 'span 1' }}>
            <Link
              href="/"
              aria-label="Digital Eco — torna alla home"
              style={{ display: 'inline-block', marginBottom: 'var(--space-4)', minHeight: '44px' }}
            >
              <FooterLogoSVG />
            </Link>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-sm)',
                color: 'oklch(from #FFFFFF l c h / 0.60)',
                lineHeight: 1.65,
                maxWidth: '260px',
                marginBottom: 'var(--space-6)',
              }}
            >
              Trasformiamo idee in esperienze digitali memorabili che generano risultati concreti.
            </p>

            {/* Social links */}
            <div
              style={{
                display: 'flex',
                gap: 'var(--space-3)',
              }}
            >
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
                    width: '44px',
                    height: '44px',
                    color: 'oklch(from #FFFFFF l c h / 0.65)',
                    background: 'oklch(from #FFFFFF l c h / 0.05)',
                    border: '1px solid oklch(from #FFFFFF l c h / 0.10)',
                    borderRadius: 'var(--radius-sm)',
                    transition: 'color var(--transition-interactive), background var(--transition-interactive)',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.color = '#FFFFFF'
                    e.currentTarget.style.background = 'oklch(from #FFFFFF l c h / 0.10)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.color = 'oklch(from #FFFFFF l c h / 0.65)'
                    e.currentTarget.style.background = 'oklch(from #FFFFFF l c h / 0.05)'
                  }}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Nav columns */}
          {footerColumns.map(col => (
            <div key={col.title}>
              <h3
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 700,
                  color: '#FFFFFF',
                  marginBottom: 'var(--space-4)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
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
                  gap: 'var(--space-3)',
                }}
              >
                {col.links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--text-sm)',
                        color: 'oklch(from #FFFFFF l c h / 0.60)',
                        textDecoration: 'none',
                        display: 'inline-block',
                        minHeight: '28px',
                        transition: 'color var(--transition-interactive)',
                      }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#FFFFFF')}
                      onMouseLeave={e => (e.currentTarget.style.color = 'oklch(from #FFFFFF l c h / 0.60)')}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 'var(--space-4)',
            paddingTop: 'var(--space-8)',
          }}
        >
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-xs)',
              color: 'oklch(from #FFFFFF l c h / 0.40)',
            }}
          >
            &copy; {year} Digital Eco S.r.l. — P.IVA 12345678901 — Tutti i diritti riservati
          </p>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-xs)',
              color: 'oklch(from #FFFFFF l c h / 0.40)',
            }}
          >
            Fatto con cura in Italia
          </p>
        </div>
      </div>
    </footer>
  )
}

function FooterLogoSVG() {
  return (
    <svg
      width="130"
      height="32"
      viewBox="0 0 140 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M4 4 C4 4, 28 4, 28 18 C28 32, 4 32, 4 32 Z" fill="var(--color-accent)" />
      <path d="M10 12 C10 12, 22 12, 22 18 C22 24, 10 24, 10 24 Z" fill="#FFFFFF" opacity="0.6" />
      <text x="36" y="23" fontFamily="var(--font-display), Georgia, serif" fontSize="17" fontWeight="700" fill="#FFFFFF" letterSpacing="-0.3">
        Digital
      </text>
      <text x="97" y="23" fontFamily="var(--font-body), sans-serif" fontSize="17" fontWeight="300" fill="var(--color-accent)" letterSpacing="0.5">
        Eco
      </text>
    </svg>
  )
}
