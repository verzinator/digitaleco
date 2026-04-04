'use client'

import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export interface ServiceFeature {
  illustration: React.ReactNode
  title: string
  description: string
}

export interface ServiceSubPageTemplateProps {
  title: string
  eyebrow: string
  subtitle: string
  heroIllustration: React.ReactNode
  contentTitle: string
  features: ServiceFeature[]
}

export default function ServiceSubPageTemplate({
  title,
  eyebrow,
  subtitle,
  heroIllustration,
  contentTitle,
  features,
}: ServiceSubPageTemplateProps) {
  return (
    <>
      <Navbar />
      <main id="main-content" tabIndex={-1}>

        {/* ── 1. HERO ── */}
        <section
          aria-labelledby="service-page-title"
          style={{
            paddingTop: 'calc(72px + var(--space-20))',
            paddingBottom: 'var(--space-20)',
            background: 'var(--color-bg)',
          }}
        >
          <div className="container">
            <div className="ssp-hero-grid">
              {/* Text column */}
              <div>
                <p className="eyebrow" style={{ marginBottom: 'var(--space-3)' }}>
                  {eyebrow}
                </p>
                <h1
                  id="service-page-title"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'var(--text-3xl)',
                    lineHeight: 1.1,
                    color: 'var(--color-text)',
                    marginBottom: 'var(--space-6)',
                  }}
                >
                  {title}
                </h1>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-lg)',
                    color: 'var(--color-text-muted)',
                    maxWidth: '520px',
                    lineHeight: 1.65,
                    marginBottom: 'var(--space-8)',
                  }}
                >
                  {subtitle}
                </p>
                <Link
                  href="/contact#consulenza"
                  className="ssp-hero-cta"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: 'var(--space-4) var(--space-8)',
                    background: 'var(--color-primary)',
                    color: 'var(--color-text-inverse)',
                    fontFamily: 'var(--font-body)',
                    fontWeight: 600,
                    fontSize: 'var(--text-base)',
                    borderRadius: 'var(--radius-sm)',
                    minHeight: '52px',
                    textDecoration: 'none',
                    transition: 'background var(--transition-interactive)',
                  }}
                  onMouseEnter={e =>
                    (e.currentTarget.style.background = 'var(--color-primary-hover)')
                  }
                  onMouseLeave={e =>
                    (e.currentTarget.style.background = 'var(--color-primary)')
                  }
                >
                  Richiedi una consulenza gratuita
                </Link>
              </div>

              {/* Illustration column */}
              <div className="ssp-hero-illus">
                {heroIllustration}
              </div>
            </div>
          </div>
        </section>

        {/* ── 2. FEATURES GRID ── */}
        <section
          aria-labelledby="features-section-title"
          style={{
            background: 'var(--color-surface-offset)',
            paddingBlock: 'var(--space-24)',
          }}
        >
          <div className="container">
            <p
              className="eyebrow"
              style={{ marginBottom: 'var(--space-3)', textAlign: 'center' }}
            >
              Cosa offriamo
            </p>
            <h2
              id="features-section-title"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-2xl)',
                color: 'var(--color-text)',
                lineHeight: 1.15,
                textAlign: 'center',
                marginBottom: 'var(--space-12)',
              }}
            >
              {contentTitle}
            </h2>

            <div className="ssp-features-grid">
              {features.map((feature, i) => (
                <article
                  key={i}
                  className="ssp-feature-card"
                  style={{
                    background: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-md)',
                    boxShadow: 'var(--shadow-sm)',
                    overflow: 'hidden',
                    transition:
                      'box-shadow var(--transition-interactive), transform var(--transition-interactive)',
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.boxShadow = 'var(--shadow-md)'
                    el.style.transform = 'translateY(-2px)'
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLElement
                    el.style.boxShadow = 'var(--shadow-sm)'
                    el.style.transform = 'translateY(0)'
                  }}
                >
                  <div
                    style={{
                      height: '180px',
                      overflow: 'hidden',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {feature.illustration}
                  </div>
                  <div style={{ padding: 'var(--space-6)' }}>
                    <h3
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--text-base)',
                        fontWeight: 700,
                        color: 'var(--color-text)',
                        marginBottom: 'var(--space-3)',
                        lineHeight: 1.3,
                      }}
                    >
                      {feature.title}
                    </h3>
                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--text-sm)',
                        color: 'var(--color-text-muted)',
                        lineHeight: 1.7,
                      }}
                    >
                      {feature.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── 3. CTA ── */}
        <section
          aria-labelledby="service-cta-title"
          style={{
            background: 'var(--color-primary)',
            paddingBlock: 'var(--space-24)',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage:
                'radial-gradient(circle, oklch(from #2ECC71 l c h / 0.12) 1px, transparent 1px)',
              backgroundSize: '28px 28px',
              pointerEvents: 'none',
            }}
          />
          <div className="container" style={{ position: 'relative', zIndex: 1 }}>
            <h2
              id="service-cta-title"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-2xl)',
                color: '#FFFFFF',
                lineHeight: 1.15,
                marginBottom: 'var(--space-4)',
              }}
            >
              Pronto a far crescere la tua azienda?
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-lg)',
                color: 'rgba(255,255,255,0.75)',
                marginBottom: 'var(--space-8)',
                lineHeight: 1.6,
                maxWidth: '560px',
                margin: '0 auto var(--space-8)',
              }}
            >
              Contattaci oggi e costruiamo insieme la tua strategia digitale
            </p>
            <Link
              href="/contact#consulenza"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 'var(--space-4) var(--space-10)',
                background: 'var(--color-accent)',
                color: 'var(--color-primary)',
                fontFamily: 'var(--font-body)',
                fontWeight: 700,
                fontSize: 'var(--text-base)',
                borderRadius: 'var(--radius-sm)',
                minHeight: '52px',
                textDecoration: 'none',
                transition:
                  'background var(--transition-interactive), transform var(--transition-interactive)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = '#25b863'
                e.currentTarget.style.transform = 'translateY(-1px)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'var(--color-accent)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              Parliamone!
            </Link>
          </div>
        </section>

      </main>
      <Footer />

      <style>{`
        .ssp-hero-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: var(--space-12);
          align-items: center;
        }
        .ssp-hero-illus {
          display: none;
        }
        .ssp-features-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: var(--space-6);
        }
        @media (min-width: 768px) {
          .ssp-hero-grid {
            grid-template-columns: 1fr 1fr;
          }
          .ssp-hero-illus {
            display: block;
          }
          .ssp-features-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
    </>
  )
}
