'use client'

import React from 'react'
import Image from 'next/image'

export default function Navbar() {
  function cta() {
    const el = document.getElementById('consulenza')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <style>{`
        .nav-pill {
          position: fixed;
          top: 16px;
          left: 50%;
          transform: translateX(-50%);
          height: 56px;
          width: calc(100% - 24px);
          max-width: 420px;
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(26, 26, 46, 0.06);
          border-radius: 28px;
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 6px 6px 6px 20px;
          gap: 12px;
        }
        .nav-cta {
          background: var(--color-primary);
          color: #F8F9FA;
          border: none;
          padding: 10px 22px;
          border-radius: 22px;
          font-size: 14px;
          font-family: var(--font-body);
          font-weight: 500;
          letter-spacing: 0.01em;
          cursor: pointer;
          white-space: nowrap;
          transition: background 200ms ease, transform 120ms ease;
        }
        .nav-cta:hover {
          background: var(--color-primary-hover);
        }
        .nav-cta:active {
          transform: scale(0.97);
        }
      `}</style>
      <header className="nav-pill">
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
          <Image src="/logo-digital-eco.png" alt="Digital Eco" width={120} height={30} style={{ height: '30px', width: 'auto', filter: 'brightness(0)' }} />
        </a>

        {/* CTA Button */}
        <button onClick={cta} className="nav-cta">
          Parliamone
        </button>
      </header>
    </>
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
