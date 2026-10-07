'use client'

import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Projects from '@/components/sections/Projects'
import { openContactDrawer } from '@/components/ui/ContactDrawer'

/**
 * I progetti veri, gli stessi della home. Prima qui c'erano nove clienti
 * di esempio e un modulo che non inviava niente: la richiesta ora passa dal
 * pannello contatti, lo stesso del resto del sito.
 */
export default function PortfolioPage() {
  return (
    <div style={{ background: '#0F1410' }}>
      <Navbar />

      <main id="main-content" tabIndex={-1} style={{ paddingTop: '72px' }}>
        <Projects as="h1" />

        <section
          aria-labelledby="portfolio-cta-title"
          style={{
            paddingBlock: 'clamp(64px, 8vw, 120px)',
            paddingInline: 'clamp(24px, 4vw, 48px)',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            textAlign: 'center',
          }}
        >
          <h2
            id="portfolio-cta-title"
            style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 300,
              fontSize: 'clamp(26px, 2.5vw + 1rem, 48px)',
              lineHeight: 1.15,
              letterSpacing: '-0.03em',
              color: '#F0F5F2',
              maxWidth: '16em',
              margin: '0 auto clamp(28px, 3vw, 40px)',
            }}
          >
            Hai un&apos;idea pazzesca?{' '}
            <em style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 400 }}>
              Vediamo come crearla assieme
            </em>
          </h2>
          <button type="button" onClick={openContactDrawer} className="btn-pill btn-pill--light">
            Parliamone
          </button>
        </section>
      </main>

      <Footer />
    </div>
  )
}
