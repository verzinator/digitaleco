'use client'

import React from 'react'
import Image from 'next/image'

const BG = '#F1F3F5'
const STROKE = '#C8CDD4'

export default function Navbar() {
  function cta() {
    const el = document.getElementById('consulenza')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header
      style={{
        position: 'fixed',
        top: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        height: '44px',
        width: 'calc(100% - 24px)',
        maxWidth: '380px',
        background: BG,
        border: `1px solid ${STROKE}`,
        borderRadius: '22px',
        boxShadow: '0 2px 20px rgba(0,0,0,0.08)',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '4px 6px 4px 14px',
        gap: '12px',
      }}
    >
      {/* Logo */}
      <a
        href="/"
        aria-label="Torna alla home"
        style={{
          display: 'flex',
          alignItems: 'center',
          textDecoration: 'none',
        }}
      >
        <Image src="/logo-digital-eco.png" alt="Digital Eco" width={120} height={30} style={{ height: '24px', width: 'auto', filter: 'brightness(0)' }} />
      </a>

      {/* CTA Button */}
      <button
        onClick={cta}
        style={{
          background: 'var(--color-accent)',
          color: 'var(--color-primary)',
          border: 'none',
          padding: '6px 14px',
          borderRadius: '999px',
          fontSize: '12px',
          fontFamily: 'var(--font-body)',
          fontWeight: 600,
          cursor: 'pointer',
          transition: 'filter 140ms ease, transform 100ms ease',
          whiteSpace: 'nowrap',
        }}
        onMouseEnter={e => (e.currentTarget.style.filter = 'brightness(1.07)')}
        onMouseLeave={e => (e.currentTarget.style.filter = 'none')}
        onMouseDown={e => (e.currentTarget.style.transform = 'scale(0.97)')}
        onMouseUp={e => (e.currentTarget.style.transform = 'scale(1)')}
      >
        Parliamone!
      </button>
    </header>
  )
}

/* ─── Logo SVG ────────────── */
function LogoSVG({ scale = 1 }: { scale?: number }) {
  return (
    <svg
      width={142 * scale}
      height={(142 * scale * 36) / 140}
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
