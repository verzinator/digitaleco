import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import AboutCarousel from '@/app/about/AboutCarousel'

export const metadata: Metadata = {
  title: 'Chi Siamo',
  description:
    "Scopri la storia di Digital Eco: un'agenzia digitale nata a Venezia che aiuta aziende e brand a crescere online con strategie mirate, design di qualità e tecnologia.",
}

const stats = [
  {
    value: '+50',
    label: 'Clienti',
    description: 'Aziende che ci hanno scelto',
  },
  {
    value: '4',
    label: 'Anni',
    description: 'Di presenza sul mercato digitale',
  },
  {
    value: '+200',
    label: 'Campagne',
    description: 'Strategie realizzate con successo',
  },
]

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" tabIndex={-1}>

        {/* ── 1. HERO ───────────────────────────────────────────── */}
        <section
          aria-label="Chi siamo — Digital Eco"
          style={{
            paddingTop: 'calc(72px + var(--space-20))',
            paddingBottom: 'var(--space-24)',
            background: 'var(--color-bg)',
            textAlign: 'center',
          }}
        >
          <div className="container">
            <p
              className="eyebrow"
              style={{ marginBottom: 'var(--space-3)' }}
            >
              La nostra storia
            </p>
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-3xl)',
                lineHeight: 1.1,
                color: 'var(--color-text)',
                marginBottom: 'var(--space-6)',
              }}
            >
              Siamo Digital Eco
            </h1>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-lg)',
                color: 'var(--color-text-muted)',
                maxWidth: '660px',
                margin: '0 auto',
                lineHeight: 1.65,
              }}
            >
              Un'agenzia digitale nata a Venezia con una missione chiara:
              aiutare aziende, professionisti e brand a crescere online
              attraverso strategie mirate, design di qualità e tecnologia al
              servizio delle persone.
            </p>
          </div>
        </section>

        {/* ── 2. STATS ──────────────────────────────────────────── */}
        <section
          aria-label="I nostri numeri"
          style={{
            background: 'var(--color-primary)',
            paddingBlock: 'var(--space-24)',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Decorative dot grid */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage:
                'radial-gradient(circle, oklch(from #2ECC71 l c h / 0.15) 1px, transparent 1px)',
              backgroundSize: '32px 32px',
              pointerEvents: 'none',
            }}
          />

          <div className="container" style={{ position: 'relative', zIndex: 1 }}>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 'var(--space-4)',
                justifyContent: 'center',
              }}
            >
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  style={{
                    flex: '1',
                    minWidth: '220px',
                    textAlign: 'center',
                    padding: 'var(--space-8)',
                    background: 'oklch(from #FFFFFF l c h / 0.05)',
                    border: '1px solid oklch(from #FFFFFF l c h / 0.10)',
                    borderRadius: 'var(--radius-md)',
                    ...(i < stats.length - 1
                      ? {}
                      : {}),
                  }}
                >
                  <p
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(3rem, 2rem + 3vw, 5.5rem)',
                      fontWeight: 700,
                      color: 'var(--color-accent)',
                      lineHeight: 1,
                      fontVariantNumeric: 'tabular-nums',
                    }}
                  >
                    {stat.value}
                  </p>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--text-lg)',
                      fontWeight: 700,
                      color: '#FFFFFF',
                      marginTop: 'var(--space-3)',
                    }}
                  >
                    {stat.label}
                  </p>
                  <p
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--text-sm)',
                      color: 'rgba(255,255,255,0.65)',
                      marginTop: 'var(--space-2)',
                      lineHeight: 1.5,
                    }}
                  >
                    {stat.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── 3. VENETIAN ROOTS ─────────────────────────────────── */}
        <section
          aria-labelledby="roots-title"
          style={{
            background: 'var(--color-surface-offset)',
            paddingBlock: 'var(--space-24)',
            textAlign: 'center',
          }}
        >
          <div className="container">
            <p
              className="eyebrow"
              style={{ marginBottom: 'var(--space-3)' }}
            >
              Le nostre radici
            </p>
            <h2
              id="roots-title"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-2xl)',
                color: 'var(--color-text)',
                lineHeight: 1.15,
                marginBottom: 'var(--space-6)',
              }}
            >
              Nati a Venezia, presenti ovunque
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-base)',
                color: 'var(--color-text-muted)',
                maxWidth: '700px',
                margin: '0 auto',
                lineHeight: 1.75,
              }}
            >
              Digital Eco nasce nel cuore della Serenissima, una città dove
              l'artigianato incontra l'innovazione da secoli. Da Venezia
              portiamo online i valori più autentici dei nostri clienti,
              operando ogni giorno con partner in tutta Italia e nel mercato
              internazionale. La nostra prospettiva è locale nell'anima,
              globale nella visione.
            </p>
          </div>
        </section>

        {/* ── 4. DIGITAL / ECO CARDS ────────────────────────────── */}
        <section
          aria-labelledby="identity-title"
          style={{
            background: 'var(--color-bg)',
            paddingBlock: 'var(--space-24)',
          }}
        >
          <div className="container">
            <h2
              id="identity-title"
              className="sr-only"
            >
              La nostra identità
            </h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: 'var(--space-6)',
              }}
            >
              {/* LEFT — SIAMO DIGITAL */}
              <div
                style={{
                  background: 'var(--color-primary)',
                  borderRadius: 'var(--radius-lg)',
                  padding: 'var(--space-10)',
                }}
              >
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-xs)',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'var(--color-accent)',
                    marginBottom: 'var(--space-4)',
                  }}
                >
                  SIAMO
                </p>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'var(--text-2xl)',
                    color: '#FFFFFF',
                    lineHeight: 1.1,
                    marginBottom: 'var(--space-6)',
                  }}
                >
                  DIGITAL
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-base)',
                    color: 'rgba(255,255,255,0.75)',
                    lineHeight: 1.75,
                  }}
                >
                  per la nostra propensione ad abbracciare l'innovazione e la
                  tecnologia in ambito digitale, dedicando uno spazio di
                  condivisione per lo sviluppo di nuove idee e progetti capaci
                  di cogliere le opportunità del mercato online.
                </p>
              </div>

              {/* RIGHT — DIAMO ECO */}
              <div
                style={{
                  background: 'var(--color-accent)',
                  borderRadius: 'var(--radius-lg)',
                  padding: 'var(--space-10)',
                }}
              >
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-xs)',
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'var(--color-primary)',
                    marginBottom: 'var(--space-4)',
                  }}
                >
                  DIAMO
                </p>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'var(--text-2xl)',
                    color: 'var(--color-primary)',
                    lineHeight: 1.1,
                    marginBottom: 'var(--space-6)',
                  }}
                >
                  ECO
                </h3>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-base)',
                    color: 'oklch(from var(--color-primary) l c h / 0.80)',
                    lineHeight: 1.75,
                  }}
                >
                  perché ci poniamo come obiettivo la diffusione online dei
                  valori e dei tratti distintivi dei nostri clienti. Dal
                  passaparola tradizionale al passaparola digitale, dando eco
                  alla comunicazione dei nostri partner in modo efficace per
                  vendere online.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── 5. PROJECTS CAROUSEL ──────────────────────────────── */}
        <section
          aria-labelledby="projects-title"
          style={{
            background: 'var(--color-surface-offset)',
            paddingBlock: 'var(--space-24)',
          }}
        >
          <div className="container">
            <p
              className="eyebrow"
              style={{ marginBottom: 'var(--space-3)' }}
            >
              I nostri lavori
            </p>
            <h2
              id="projects-title"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-2xl)',
                color: 'var(--color-text)',
                lineHeight: 1.15,
                marginBottom: 'var(--space-12)',
              }}
            >
              I nostri progetti
            </h2>
          </div>

          {/* Full-width carousel (client component) */}
          <AboutCarousel />
        </section>

        {/* ── 6. CTA BANNER ─────────────────────────────────────── */}
        <section
          aria-labelledby="cta-title"
          style={{
            background: 'var(--color-primary)',
            paddingBlock: 'var(--space-24)',
            textAlign: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Decorative dot grid */}
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

          <div
            className="container"
            style={{ position: 'relative', zIndex: 1 }}
          >
            <h2
              id="cta-title"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-2xl)',
                color: '#FFFFFF',
                lineHeight: 1.15,
                marginBottom: 'var(--space-4)',
              }}
            >
              Scopri cosa possiamo fare per te
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-lg)',
                color: 'rgba(255,255,255,0.75)',
                marginBottom: 'var(--space-8)',
                lineHeight: 1.6,
              }}
            >
              Analizziamo la tua situazione e costruiamo la strategia giusta
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
            >
              Parliamone!
            </Link>
          </div>
        </section>

      </main>
      <Footer />
    </>
  )
}
