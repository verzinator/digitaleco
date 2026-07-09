'use client'

import { useEffect, useState, useCallback } from 'react'
import Image from 'next/image'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [onLight, setOnLight] = useState(false)

  const checkSection = useCallback(() => {
    setScrolled(window.scrollY > 40)
    // Check if navbar (44px from top) overlaps a light section
    const checkY = 44
    const sections = document.querySelectorAll('section')
    let light = false
    sections.forEach((section) => {
      const rect = section.getBoundingClientRect()
      if (rect.top <= checkY && rect.bottom >= checkY) {
        const bg = getComputedStyle(section).backgroundColor
        const match = bg.match(/\d+/g)
        if (match) {
          const avg = (parseInt(match[0]) + parseInt(match[1]) + parseInt(match[2])) / 3
          if (avg > 128) light = true
        }
      }
    })
    setOnLight(light)
  }, [])

  useEffect(() => {
    checkSection()
    window.addEventListener('scroll', checkSection, { passive: true })
    return () => window.removeEventListener('scroll', checkSection)
  }, [checkSection])

  function cta() {
    const el = document.getElementById('consulenza')
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  const dark = onLight

  return (
    <>
      <style>{`
        .nav-pill {
          position: fixed;
          top: 16px;
          left: 50%;
          transform: translateX(-50%);
          height: 56px;
          border-radius: 28px;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 5px 5px 5px 22px;
          gap: 12px;
          backdrop-filter: blur(16px) saturate(1.3);
          -webkit-backdrop-filter: blur(16px) saturate(1.3);
          transition: width 0.5s cubic-bezier(0.16, 1, 0.3, 1),
                      max-width 0.5s cubic-bezier(0.16, 1, 0.3, 1),
                      background 300ms ease,
                      border-color 300ms ease,
                      box-shadow 300ms ease;
        }
        .nav-pill.at-top {
          width: calc(100% - 32px);
          max-width: 720px;
        }
        .nav-pill.scrolled {
          width: calc(100% - 32px);
          max-width: 380px;
        }
        .nav-pill.on-dark {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.12);
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.12), 0 1px 0 rgba(255, 255, 255, 0.06) inset;
        }
        .nav-pill.on-dark:hover {
          background: rgba(255, 255, 255, 0.12);
          border-color: rgba(255, 255, 255, 0.18);
        }
        .nav-pill.on-light {
          background: rgba(255, 255, 255, 0.72);
          border: 1px solid rgba(0, 0, 0, 0.08);
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06), 0 1px 0 rgba(255, 255, 255, 0.6) inset;
        }
        .nav-pill.on-light:hover {
          background: rgba(255, 255, 255, 0.85);
          border-color: rgba(0, 0, 0, 0.12);
        }
        .nav-cta {
          border: none;
          padding: 10px 20px;
          height: 40px;
          border-radius: 20px;
          font-size: 13px;
          font-family: var(--font-body);
          font-weight: 500;
          letter-spacing: 0.02em;
          cursor: pointer;
          white-space: nowrap;
          transition: background 200ms ease, color 200ms ease, transform 100ms ease;
        }
        .nav-cta:active {
          transform: scale(0.97);
        }
        @media (max-width: 640px) {
          .nav-pill {
            height: 48px !important;
            border-radius: 24px !important;
            padding: 4px 4px 4px 16px !important;
            gap: 8px !important;
            top: 12px !important;
          }
          .nav-pill.at-top,
          .nav-pill.scrolled {
            max-width: none !important;
            width: calc(100% - 24px) !important;
          }
          .nav-cta {
            height: 36px;
            padding: 0 16px;
            font-size: 12px;
            border-radius: 18px;
          }
          .nav-pill img {
            height: 22px !important;
          }
        }
      `}</style>
      <header className={`nav-pill ${scrolled ? 'scrolled' : 'at-top'} ${dark ? 'on-light' : 'on-dark'}`}>
        <a
          href="/"
          aria-label="Torna alla home"
          style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}
        >
          <Image
            src="/logo-digital-eco.png"
            alt="Digital Eco"
            width={120}
            height={30}
            style={{
              height: '28px',
              width: 'auto',
              filter: dark ? 'brightness(0)' : 'brightness(0) invert(1)',
              transition: 'filter 300ms ease',
            }}
          />
        </a>

        <button
          onClick={cta}
          className="nav-cta"
          style={{
            background: dark ? '#060D09' : '#FFFFFF',
            color: dark ? '#FFFFFF' : '#060D09',
          }}
        >
          Parliamone
        </button>
      </header>
    </>
  )
}
