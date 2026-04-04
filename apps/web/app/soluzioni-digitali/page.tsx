import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Soluzioni Digitali',
  description:
    'Scopri tutte le soluzioni digitali di Digital Eco: AI, export digitale, siti web, e-commerce, advertising, social media, comunicazione aziendale, marketplace e video referenziali.',
}

const services = [
  {
    title: 'Intelligenza Artificiale',
    description:
      "Automazione intelligente, chatbot aziendali e analisi dati con l'AI per ottimizzare i processi e personalizzare l'esperienza cliente.",
    href: '/ai',
    bgFrom: '#0A5C44',
    bgTo: '#0d7a5c',
    icon: (
      <svg
        width="64"
        height="64"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M12 2a5 5 0 0 1 5 5v1a5 5 0 0 1-10 0V7a5 5 0 0 1 5-5z" />
        <path d="M6.5 9.5a5 5 0 0 0-1 9.5" />
        <path d="M17.5 9.5a5 5 0 0 1 1 9.5" />
        <line x1="12" y1="13" x2="12" y2="17" />
        <circle cx="12" cy="19" r="2" />
        <line x1="9" y1="19" x2="15" y2="19" />
      </svg>
    ),
  },
  {
    title: 'Export Digitale',
    description:
      'Porta il tuo brand sui mercati internazionali con strategie di export digitale, localizzazione contenuti e e-commerce cross-border.',
    href: '/export-digitale',
    bgFrom: '#0d7a5c',
    bgTo: '#2ECC71',
    icon: (
      <svg
        width="64"
        height="64"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        <path d="M16 8l3-3m0 0l-3-3m3 3H14" />
      </svg>
    ),
  },
  {
    title: 'Siti Web & E-Commerce',
    description:
      'Dal concept al lancio: siti web su misura, negozi online performanti, SEO tecnico e assistenza continua per vendere di più.',
    href: '/siti-web',
    bgFrom: '#063329',
    bgTo: '#0A5C44',
    icon: (
      <svg
        width="64"
        height="64"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="2" y1="7" x2="22" y2="7" />
        <circle cx="5" cy="5" r="0.8" fill="white" stroke="none" />
        <circle cx="8" cy="5" r="0.8" fill="white" stroke="none" />
        <circle cx="11" cy="5" r="0.8" fill="white" stroke="none" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
        <rect x="5" y="10" width="4" height="3" rx="1" />
        <line x1="11" y1="11" x2="17" y2="11" />
        <line x1="11" y1="13" x2="15" y2="13" />
      </svg>
    ),
  },
  {
    title: 'Advertising',
    description:
      'Campagne Google Ads, Meta Ads e LinkedIn Ads ottimizzate per il massimo ROI. Budget di qualsiasi dimensione, risultati misurabili.',
    href: '/advertising',
    bgFrom: '#0A5C44',
    bgTo: '#084a37',
    icon: (
      <svg
        width="64"
        height="64"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M3 11l19-9-9 19-2-8-8-2z" />
        <circle cx="18" cy="6" r="2" />
        <path d="M14 10l4-4" />
      </svg>
    ),
  },
  {
    title: 'Social Media',
    description:
      'Strategia editoriale, contenuti originali e community management su Instagram, LinkedIn, Facebook e TikTok per far crescere il tuo brand.',
    href: '/social-media',
    bgFrom: '#0d7a5c',
    bgTo: '#0A5C44',
    icon: (
      <svg
        width="64"
        height="64"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <circle cx="18" cy="5" r="3" />
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="19" r="3" />
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
      </svg>
    ),
  },
  {
    title: 'Comunicazione Aziendale',
    description:
      "Brand identity, copywriting strategico, email marketing e PR digitale per raccontare la tua storia e rafforzare l'immagine aziendale.",
    href: '/comunicazione-aziendale',
    bgFrom: '#084a37',
    bgTo: '#0d7a5c',
    icon: (
      <svg
        width="64"
        height="64"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        <line x1="8" y1="9" x2="16" y2="9" />
        <line x1="8" y1="13" x2="14" y2="13" />
      </svg>
    ),
  },
  {
    title: 'Marketplace',
    description:
      "Gestione professionale su Amazon, Etsy, Zalando e altri marketplace: setup, ottimizzazione listing, campagne sponsored e analisi competitor.",
    href: '/marketplace',
    bgFrom: '#063329',
    bgTo: '#0A5C44',
    icon: (
      <svg
        width="64"
        height="64"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
      </svg>
    ),
  },
  {
    title: 'Video Referenziali',
    description:
      "Video testimonianze autentiche e referenze clienti per aumentare la fiducia nel tuo brand. Produzione, post-produzione e distribuzione strategica.",
    href: '/video-referenziali',
    bgFrom: '#0A5C44',
    bgTo: '#063329',
    icon: (
      <svg
        width="64"
        height="64"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <polygon points="23 7 16 12 23 17 23 7" />
        <rect x="1" y="5" width="15" height="14" rx="2" />
        <polygon
          points="10 9 10 15 14 12"
          fill="white"
          stroke="none"
          opacity="0.6"
        />
      </svg>
    ),
  },
]

export default function SoluzioniDigitaliPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" tabIndex={-1}>

        {/* ── HERO ── */}
        <section
          aria-label="Soluzioni Digitali — Digital Eco"
          style={{
            paddingTop: 'calc(72px + var(--space-20))',
            paddingBottom: 'var(--space-16)',
            background: 'var(--color-bg)',
          }}
        >
          <div className="container">
            <p className="eyebrow" style={{ marginBottom: 'var(--space-3)' }}>
              I nostri servizi
            </p>
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-3xl)',
                lineHeight: 1.1,
                color: 'var(--color-text)',
                maxWidth: '700px',
                marginBottom: 'var(--space-6)',
              }}
            >
              Soluzioni Digitali
            </h1>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-lg)',
                color: 'var(--color-text-muted)',
                maxWidth: '600px',
                lineHeight: 1.65,
              }}
            >
              Un ecosistema completo di servizi digitali progettati su misura per far crescere il tuo business online. Dalla strategia all&apos;esecuzione, ti affianchiamo in ogni fase.
            </p>
          </div>
        </section>

        {/* ── SERVICES GRID ── */}
        <section
          aria-labelledby="services-grid-title"
          style={{
            background: 'var(--color-bg)',
            paddingBottom: 'var(--space-24)',
          }}
        >
          <h2 id="services-grid-title" className="sr-only">
            Tutti i servizi
          </h2>
          <div className="container">
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: 'var(--space-6)',
              }}
              className="sd-grid"
            >
              {services.map((service) => (
                <article
                  key={service.title}
                  style={{
                    background: 'var(--color-surface)',
                    border: '1px solid var(--color-border)',
                    borderRadius: 'var(--radius-md)',
                    boxShadow: 'var(--shadow-sm)',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    transition:
                      'box-shadow var(--transition-interactive), transform var(--transition-interactive)',
                  }}
                >
                  {/* Illustration */}
                  <div
                    aria-hidden="true"
                    style={{
                      height: '200px',
                      background: `linear-gradient(135deg, ${service.bgFrom} 0%, ${service.bgTo} 100%)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                      overflow: 'hidden',
                      flexShrink: 0,
                    }}
                  >
                    {/* Decorative circle */}
                    <div
                      style={{
                        position: 'absolute',
                        top: '-30px',
                        right: '-30px',
                        width: '120px',
                        height: '120px',
                        borderRadius: '50%',
                        background: 'rgba(46,204,113,0.15)',
                      }}
                    />
                    <div
                      style={{
                        position: 'absolute',
                        bottom: '-20px',
                        left: '-20px',
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        background: 'rgba(255,255,255,0.05)',
                      }}
                    />
                    {/* Icon */}
                    <div style={{ position: 'relative', zIndex: 1 }}>
                      {service.icon}
                    </div>
                  </div>

                  {/* Content */}
                  <div
                    style={{
                      padding: 'var(--space-6)',
                      display: 'flex',
                      flexDirection: 'column',
                      flex: 1,
                    }}
                  >
                    <h3
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'var(--text-xl)',
                        color: 'var(--color-text)',
                        marginBottom: 'var(--space-3)',
                        lineHeight: 1.2,
                      }}
                    >
                      {service.title}
                    </h3>
                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--text-sm)',
                        color: 'var(--color-text-muted)',
                        lineHeight: 1.7,
                        flex: 1,
                        marginBottom: 'var(--space-6)',
                      }}
                    >
                      {service.description}
                    </p>
                    <Link
                      href={service.href}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 'var(--space-2)',
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--text-sm)',
                        fontWeight: 600,
                        color: 'var(--color-primary)',
                        textDecoration: 'none',
                        minHeight: '44px',
                        alignSelf: 'flex-start',
                        transition: 'gap var(--transition-interactive)',
                      }}
                      aria-label={`Scopri ${service.title}`}
                    >
                      Scopri di più
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden="true"
                        style={{ transition: 'transform var(--transition-interactive)' }}
                        className="sd-arrow"
                      >
                        <line x1="5" y1="12" x2="19" y2="12" />
                        <polyline points="12 5 19 12 12 19" />
                      </svg>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

      </main>
      <Footer />

      <style>{`
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }
        @media (max-width: 767px) {
          .sd-grid {
            grid-template-columns: 1fr !important;
          }
        }
        article:hover .sd-arrow {
          transform: translateX(4px);
        }
      `}</style>
    </>
  )
}
