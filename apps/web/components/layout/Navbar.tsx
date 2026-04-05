'use client'

import React, { useState } from 'react'

/* ─── Voci di navigazione ─────────────────────────────── */
const NAV_ITEMS = [
  { label: 'Portfolio',         href: '/portfolio' },
  { label: 'Chi Siamo',         href: '/about' },
  { label: 'Strategia',         href: '/strategia' },
  { label: 'Soluzioni Digitali',href: '/soluzioni-digitali' },
  { label: 'Blog',              href: '/blog' },
]

/* ─── Costanti colore (grigio tenue + stroke più scuro) ── */
const BG     = '#F1F3F5'   // grigio tenue — var(--color-surface-offset)
const STROKE = '#C8CDD4'   // grigio leggermente più scuro

export default function Navbar() {
  const [open, setOpen] = useState(false)

  function go(href: string) {
    window.location.href = href
    setOpen(false)
  }

  function cta() {
    const el = document.getElementById('consulenza')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
    else window.location.href = '/contact'
    setOpen(false)
  }

  return (
    <>
      {/* ════════════════════════════════════════════════════
          DESKTOP  ≥ md  — pill floating centrata
      ════════════════════════════════════════════════════ */}
      <header
        className="hidden md:flex items-center fixed z-[9999]"
        style={{
          top: '16px',
          left: '50%',
          transform: 'translateX(-50%)',
          height: '60px',
          minWidth: '1020px',
          width: 'max-content',
          background: BG,
          border: `1px solid ${STROKE}`,
          borderRadius: '24px',
          boxShadow: '0 2px 20px rgba(0,0,0,0.08)',
          /* padding: gap sinistro logo | gap destro CTA (6px → CTA non tocca mai il bordo) */
          padding: '6px 8px 6px 20px',
        }}
      >
        {/* ── Logo ─────────────────── */}
        <button onClick={() => go('/')} aria-label="Torna alla home" style={btnReset}>
          <LogoSVG />
        </button>

        {/* ── Voci centrali — assolute per restare perfettamente al centro ── */}
        <nav
          aria-label="Navigazione principale"
          style={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            alignItems: 'center',
            gap: '2px',
            borderRadius: '1px',
          }}
        >
          {NAV_ITEMS.map(item => (
            <NavBtn key={item.label} onClick={() => go(item.href)}>
              {item.label}
            </NavBtn>
          ))}
        </nav>

        {/* ── CTA — il padding-right:6px del pill garantisce il gap dal bordo ── */}
        <div style={{ marginLeft: 'auto' }}>
          <CtaBtn onClick={cta}>Parliamone!</CtaBtn>
        </div>
      </header>

      {/* ════════════════════════════════════════════════════
          MOBILE / TABLET  < md
          Pill floating 16 px da bordi viewport
      ════════════════════════════════════════════════════ */}
      <div className="md:hidden">
        <div
          role="navigation"
          aria-label="Navigazione mobile"
          style={{
            position: 'fixed',
            top: '16px',
            left: '16px',
            right: '16px',
            zIndex: 9999,
            background: BG,
            border: `1px solid ${STROKE}`,
            borderRadius: '20px',
            overflow: 'hidden',
            maxHeight: open ? '520px' : '60px',
            transition: 'max-height 280ms cubic-bezier(0.16,1,0.3,1)',
            boxShadow: '0 2px 16px rgba(0,0,0,0.07)',
          }}
        >
          {/* ── Header row (sempre visibile) ── */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '60px', padding: '0 10px 0 16px' }}>
            <button onClick={() => go('/')} aria-label="Torna alla home" style={btnReset}>
              <LogoSVG scale={0.85} />
            </button>

            {/* Hamburger / Close */}
            <button
              onClick={() => setOpen(v => !v)}
              aria-label={open ? 'Chiudi menu' : 'Apri menu'}
              aria-expanded={open}
              style={{
                ...btnReset,
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '10px',
                color: 'var(--color-text)',
                transition: 'background 140ms ease',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'rgba(0,0,0,0.06)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              {open
                ? <IconX />
                : <IconMenu />}
            </button>
          </div>

          {/* ── Voci espanse ── */}
          <div
            style={{
              padding: '4px 8px 0',
              opacity: open ? 1 : 0,
              pointerEvents: open ? 'auto' : 'none',
              transition: 'opacity 180ms ease',
            }}
          >
            {NAV_ITEMS.map(item => (
              <button
                key={item.label}
                onClick={() => go(item.href)}
                style={{
                  ...btnReset,
                  display: 'block',
                  width: '100%',
                  textAlign: 'left',
                  padding: '13px 16px',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontFamily: 'var(--font-body)',
                  fontWeight: 500,
                  color: 'var(--color-text)',
                  transition: 'background 140ms ease',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = 'rgba(0,0,0,0.06)')}
                onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                onMouseDown={e => (e.currentTarget.style.background = 'rgba(0,0,0,0.10)')}
                onMouseUp={e => (e.currentTarget.style.background = 'rgba(0,0,0,0.06)')}
              >
                {item.label}
              </button>
            ))}

            {/* CTA — margini interni da tutti i bordi del menu */}
            <div style={{ padding: '10px 8px 14px' }}>
              <button
                onClick={cta}
                style={{
                  ...btnReset,
                  display: 'block',
                  width: '100%',
                  padding: '13px',
                  borderRadius: '999px',
                  fontSize: '16px',
                  fontFamily: 'var(--font-body)',
                  fontWeight: 600,
                  background: 'var(--color-accent)',
                  color: 'var(--color-primary)',
                  textAlign: 'center',
                  transition: 'filter 140ms ease, transform 100ms ease',
                }}
                onMouseEnter={e => (e.currentTarget.style.filter = 'brightness(1.07)')}
                onMouseLeave={e => (e.currentTarget.style.filter = 'none')}
                onMouseDown={e => (e.currentTarget.style.transform = 'scale(0.97)')}
                onMouseUp={e => (e.currentTarget.style.transform = 'scale(1)')}
              >
                Parliamone!
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

/* ─── Componenti interni ──────────────────────────────── */

/** Voce di navigazione desktop — tertiary: sfondo solo su hover/pressed */
function NavBtn({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        ...btnReset,
        height: '40px',
        padding: '0 14px',
        borderRadius: '999px',
        fontSize: '14px',
        fontFamily: 'var(--font-body)',
        fontWeight: 500,
        color: 'var(--color-text)',
        whiteSpace: 'nowrap',
        transition: 'background 140ms ease, color 140ms ease',
      }}
      onMouseEnter={e => (e.currentTarget.style.background = 'rgba(0,0,0,0.06)')}
      onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
      onMouseDown={e => (e.currentTarget.style.background = 'rgba(0,0,0,0.10)')}
      onMouseUp={e => (e.currentTarget.style.background = 'rgba(0,0,0,0.06)')}
    >
      {children}
    </button>
  )
}

/** Pulsante CTA desktop — pill pieno accent */
function CtaBtn({ children, onClick }: { children: React.ReactNode; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        ...btnReset,
        height: '40px',
        padding: '0 22px',
        borderRadius: '999px',
        fontSize: '14px',
        fontFamily: 'var(--font-body)',
        fontWeight: 600,
        background: 'var(--color-accent)',
        color: 'var(--color-primary)',
        whiteSpace: 'nowrap',
        transition: 'filter 140ms ease, transform 100ms ease',
      }}
      onMouseEnter={e => (e.currentTarget.style.filter = 'brightness(1.07)')}
      onMouseLeave={e => (e.currentTarget.style.filter = 'none')}
      onMouseDown={e => (e.currentTarget.style.transform = 'scale(0.97)')}
      onMouseUp={e => (e.currentTarget.style.transform = 'scale(1)')}
    >
      {children}
    </button>
  )
}

/** Reset CSS per button — azzeramento stile nativo del browser */
const btnReset: React.CSSProperties = {
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
  padding: 0,
  margin: 0,
  lineHeight: 1,
}

/* ─── Logo SVG (adattato a sfondo chiaro) ────────────── */
function LogoSVG({ scale = 1 }: { scale?: number }) {
  return (
    <svg
      width={130 * scale}
      height={30 * scale}
      viewBox="0 0 140 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block' }}
      aria-hidden="true"
    >
      {/* Foglia esterna — verde primary su sfondo chiaro */}
      <path d="M4 4 C4 4, 28 4, 28 18 C28 32, 4 32, 4 32 Z" fill="var(--color-primary)" />
      {/* Foglia interna — accent verde brillante */}
      <path d="M10 12 C10 12, 22 12, 22 18 C22 24, 10 24, 10 24 Z" fill="var(--color-accent)" />
      <text x="36" y="23" fontFamily="var(--font-display), serif" fontSize="17" fontWeight="700" fill="var(--color-text)" letterSpacing="-0.3">
        Digital
      </text>
      <text x="97" y="23" fontFamily="var(--font-body), sans-serif" fontSize="17" fontWeight="300" fill="var(--color-primary)" letterSpacing="0.5">
        Eco
      </text>
    </svg>
  )
}

/* ─── Icone SVG ──────────────────────────────────────── */
function IconMenu() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  )
}

function IconX() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 6L6 18M6 6l12 12" />
    </svg>
  )
}
