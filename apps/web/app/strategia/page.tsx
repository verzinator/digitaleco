import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'Strategia',
  description:
    'Un percorso strutturato in tre fasi per trasformare la tua presenza digitale in un motore di crescita: analisi digitale, strumenti giusti per il tuo mercato e acquisizione di clienti qualificati.',
}

const illustrationAnalisi = (
  <svg width="180" height="160" viewBox="0 0 180 160" fill="none" aria-hidden="true">
    {/* Bar chart */}
    <rect x="18" y="90" width="18" height="42" rx="4" fill="rgba(10,92,68,0.15)" />
    <rect x="46" y="70" width="18" height="62" rx="4" fill="rgba(10,92,68,0.25)" />
    <rect x="74" y="50" width="18" height="82" rx="4" fill="rgba(10,92,68,0.4)" />
    <rect x="102" y="60" width="18" height="72" rx="4" fill="rgba(46,204,113,0.5)" />
    <rect x="130" y="35" width="18" height="97" rx="4" fill="#2ECC71" />
    {/* Axis */}
    <line x1="12" y1="134" x2="158" y2="134" stroke="rgba(10,92,68,0.25)" strokeWidth="1.5" />
    {/* Magnifying glass */}
    <circle cx="62" cy="72" r="32" stroke="#0A5C44" strokeWidth="2" fill="rgba(46,204,113,0.06)" />
    <line x1="86" y1="96" x2="108" y2="118" stroke="#0A5C44" strokeWidth="3.5" strokeLinecap="round" />
    <circle cx="62" cy="72" r="20" stroke="#2ECC71" strokeWidth="1.5" fill="none" strokeDasharray="4 3" />
  </svg>
)

const illustrationStrumenti = (
  <svg width="180" height="160" viewBox="0 0 180 160" fill="none" aria-hidden="true">
    {/* Central hub */}
    <circle cx="90" cy="80" r="24" fill="rgba(10,92,68,0.12)" stroke="#0A5C44" strokeWidth="1.5" />
    <circle cx="90" cy="80" r="12" fill="#0A5C44" />
    <circle cx="90" cy="80" r="5" fill="white" />
    {/* Spoke nodes */}
    <line x1="90" y1="56" x2="90" y2="26" stroke="rgba(10,92,68,0.3)" strokeWidth="1.5" strokeDasharray="4 3" />
    <circle cx="90" cy="20" r="12" fill="rgba(46,204,113,0.2)" stroke="#2ECC71" strokeWidth="1.5" />

    <line x1="110" y1="65" x2="138" y2="44" stroke="rgba(10,92,68,0.3)" strokeWidth="1.5" strokeDasharray="4 3" />
    <circle cx="148" cy="38" r="12" fill="rgba(46,204,113,0.2)" stroke="#2ECC71" strokeWidth="1.5" />

    <line x1="114" y1="84" x2="148" y2="84" stroke="rgba(10,92,68,0.3)" strokeWidth="1.5" strokeDasharray="4 3" />
    <circle cx="158" cy="84" r="12" fill="rgba(46,204,113,0.2)" stroke="#2ECC71" strokeWidth="1.5" />

    <line x1="110" y1="95" x2="138" y2="116" stroke="rgba(10,92,68,0.3)" strokeWidth="1.5" strokeDasharray="4 3" />
    <circle cx="148" cy="122" r="12" fill="rgba(46,204,113,0.2)" stroke="#2ECC71" strokeWidth="1.5" />

    <line x1="90" y1="104" x2="90" y2="134" stroke="rgba(10,92,68,0.3)" strokeWidth="1.5" strokeDasharray="4 3" />
    <circle cx="90" cy="140" r="12" fill="rgba(46,204,113,0.2)" stroke="#2ECC71" strokeWidth="1.5" />

    <line x1="70" y1="95" x2="42" y2="116" stroke="rgba(10,92,68,0.3)" strokeWidth="1.5" strokeDasharray="4 3" />
    <circle cx="32" cy="122" r="12" fill="rgba(46,204,113,0.2)" stroke="#2ECC71" strokeWidth="1.5" />

    <line x1="66" y1="84" x2="32" y2="84" stroke="rgba(10,92,68,0.3)" strokeWidth="1.5" strokeDasharray="4 3" />
    <circle cx="22" cy="84" r="12" fill="rgba(46,204,113,0.2)" stroke="#2ECC71" strokeWidth="1.5" />
  </svg>
)

const illustrationAppuntamento = (
  <svg width="180" height="160" viewBox="0 0 180 160" fill="none" aria-hidden="true">
    {/* Calendar body */}
    <rect x="28" y="28" width="124" height="106" rx="10" fill="rgba(10,92,68,0.07)" stroke="#0A5C44" strokeWidth="1.5" />
    {/* Header */}
    <rect x="28" y="28" width="124" height="32" rx="10" fill="#0A5C44" />
    <rect x="28" y="48" width="124" height="12" rx="0" fill="#0A5C44" />
    {/* Rings */}
    <rect x="60" y="20" width="8" height="20" rx="4" fill="#0A5C44" />
    <rect x="112" y="20" width="8" height="20" rx="4" fill="#0A5C44" />
    {/* Month label */}
    <rect x="74" y="36" width="32" height="7" rx="3" fill="rgba(255,255,255,0.45)" />
    {/* Day cells row 1 */}
    <rect x="38" y="72" width="12" height="12" rx="3" fill="rgba(10,92,68,0.12)" />
    <rect x="58" y="72" width="12" height="12" rx="3" fill="rgba(10,92,68,0.12)" />
    <rect x="78" y="72" width="12" height="12" rx="3" fill="rgba(10,92,68,0.12)" />
    <rect x="98" y="72" width="12" height="12" rx="3" fill="rgba(10,92,68,0.12)" />
    <rect x="118" y="72" width="12" height="12" rx="3" fill="rgba(10,92,68,0.12)" />
    <rect x="138" y="72" width="12" height="12" rx="3" fill="rgba(10,92,68,0.12)" />
    {/* Day cells row 2 */}
    <rect x="38" y="92" width="12" height="12" rx="3" fill="rgba(10,92,68,0.12)" />
    <rect x="58" y="92" width="12" height="12" rx="3" fill="rgba(10,92,68,0.12)" />
    <rect x="78" y="92" width="12" height="12" rx="3" fill="#2ECC71" />
    <rect x="98" y="92" width="12" height="12" rx="3" fill="rgba(10,92,68,0.12)" />
    <rect x="118" y="92" width="12" height="12" rx="3" fill="rgba(10,92,68,0.12)" />
    <rect x="138" y="92" width="12" height="12" rx="3" fill="rgba(10,92,68,0.12)" />
    {/* Day cells row 3 */}
    <rect x="38" y="112" width="12" height="12" rx="3" fill="rgba(10,92,68,0.12)" />
    <rect x="58" y="112" width="12" height="12" rx="3" fill="rgba(10,92,68,0.12)" />
    <rect x="78" y="112" width="12" height="12" rx="3" fill="rgba(10,92,68,0.12)" />
    <rect x="98" y="112" width="12" height="12" rx="3" fill="rgba(10,92,68,0.12)" />
    {/* Check on highlighted day */}
    <path d="M82 98l2.5 2.5 4.5-5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    {/* Notification dot */}
    <circle cx="144" cy="36" r="7" fill="#2ECC71" />
    <line x1="144" y1="33" x2="144" y2="37" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
    <line x1="144" y1="39" x2="144.01" y2="39" stroke="white" strokeWidth="2" strokeLinecap="round" />
  </svg>
)

const cards = [
  {
    number: '01',
    title: 'Analisi Digitale',
    description:
      "Partiamo da un audit completo della tua presenza online: sito web, social media, reputazione digitale, posizionamento SEO e analisi della concorrenza. Identifichiamo i punti di forza da valorizzare e le lacune da colmare per costruire una strategia solida e misurabile.",
    bg: 'var(--color-surface)',
    top: '96px',
    illustration: illustrationAnalisi,
  },
  {
    number: '02',
    title: 'Strumenti per Raggiungere i Clienti',
    description:
      "Sulla base dell'analisi, selezioniamo gli strumenti più efficaci per il tuo settore e il tuo budget: SEO, advertising su Google e Meta, social media, email marketing, marketplace. Costruiamo un ecosistema digitale coerente che porta il messaggio giusto alle persone giuste.",
    bg: 'var(--color-surface-offset, #F1F3F5)',
    top: '116px',
    illustration: illustrationStrumenti,
  },
  {
    number: '03',
    title: 'Appuntamento di Vendita',
    description:
      "Il vero obiettivo di ogni strategia digitale è portare clienti qualificati davanti al tuo team. Ottimizziamo ogni touchpoint per convertire il traffico in lead concreti: landing page, funnel di acquisizione, call-to-action e sistemi di prenotazione automatica degli appuntamenti.",
    bg: 'var(--color-surface)',
    top: '136px',
    illustration: illustrationAppuntamento,
  },
]

export default function StrategiaPage() {
  return (
    <>
      <style>{`
        .strat-hero-title {
          font-size: var(--text-3xl);
          font-family: var(--font-display);
          font-weight: 700;
          color: var(--color-text);
          line-height: 1.1;
          letter-spacing: -0.02em;
          margin-bottom: var(--space-6);
        }
        .strat-cta-btn:hover {
          background: #25b863 !important;
        }
        .strat-card-illus {
          display: flex;
        }
        @media (max-width: 800px) {
          .strat-card-shell {
            grid-template-columns: 1fr !important;
          }
          .strat-card-illus {
            display: none !important;
          }
        }
      `}</style>

      <Navbar />

      {/* ── Hero ── */}
      <section
        style={{
          paddingTop: 'calc(72px + var(--space-20))',
          paddingBottom: 'var(--space-20)',
          background: 'var(--color-bg)',
          textAlign: 'center',
        }}
      >
        <div className="container">
          <p className="eyebrow" style={{ marginBottom: 'var(--space-4)' }}>
            Il nostro approccio
          </p>
          <h1 className="strat-hero-title">Strategia</h1>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-lg)',
              color: 'var(--color-text-muted)',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: 1.65,
            }}
          >
            Un percorso strutturato in tre fasi per trasformare la tua presenza digitale in un motore
            di crescita concreto e misurabile.
          </p>
        </div>
      </section>

      {/* ── Intro Statement ── */}
      <section
        style={{
          background: 'var(--color-primary)',
          paddingTop: 'var(--space-16)',
          paddingBottom: 'var(--space-16)',
          textAlign: 'center',
        }}
      >
        <div className="container">
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-2xl)',
              fontWeight: 700,
              color: '#FFFFFF',
              lineHeight: 1.2,
              maxWidth: '680px',
              margin: '0 auto',
            }}
          >
            Come sviluppiamo la tua strategia aziendale?
          </h2>
        </div>
      </section>

      {/* ── Scroll-Stack Cards ── */}
      <section
        style={{
          background: 'var(--color-bg)',
          paddingTop: 'var(--space-14)',
          paddingBottom: 'var(--space-32, 8rem)',
        }}
      >
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '0 var(--space-6)',
          }}
        >
          {cards.map((card, i) => (
            <div
              key={card.number}
              style={{
                position: 'sticky',
                top: card.top,
                zIndex: 10 + i,
                marginTop: i === 0 ? 'var(--space-24)' : '0',
                paddingTop: 'var(--space-6)',
              }}
            >
              <div
                className="strat-card-shell"
                style={{
                  background: card.bg,
                  borderRadius: 'var(--radius-lg)',
                  boxShadow: '0 8px 48px rgba(26,26,46,0.14), 0 2px 8px rgba(26,26,46,0.08)',
                  border: '1px solid rgba(26,26,46,0.10)',
                  minHeight: '500px',
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  alignItems: 'stretch',
                  overflow: 'hidden',
                }}
              >
                  {/* Text */}
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-start',
                      height: '100%',
                      padding: 'var(--space-12)',
                      boxSizing: 'border-box',
                    }}
                  >
                    <p
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '3rem',
                        fontWeight: 700,
                        color: 'var(--color-accent)',
                        lineHeight: 1,
                        marginBottom: 'var(--space-3)',
                        opacity: 0.45,
                      }}
                    >
                      {card.number}
                    </p>
                    <h3
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'var(--text-xl)',
                        fontWeight: 700,
                        color: 'var(--color-text)',
                        lineHeight: 1.2,
                        marginBottom: 'var(--space-4)',
                      }}
                    >
                      {card.title}
                    </h3>
                    <p
                      style={{
                        fontFamily: 'var(--font-body)',
                        fontSize: 'var(--text-base)',
                        color: 'var(--color-text-muted)',
                        lineHeight: 1.75,
                        maxWidth: '480px',
                      }}
                    >
                      {card.description}
                    </p>
                  </div>

                  {/* Illustration */}
                  <div
                    className="strat-card-illus"
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'linear-gradient(135deg, rgba(10,92,68,0.05) 0%, rgba(46,204,113,0.08) 100%)',
                      height: '100%',
                      width: '100%',
                      boxSizing: 'border-box',
                      paddingTop: '48px',
                      paddingBottom: '48px',
                      paddingRight: '48px',
                      paddingLeft: '0',
                    }}
                  >
                    <div
                      style={{
                        height: '100%',
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        alignSelf: 'center',
                      }}
                    >
                      {card.illustration}
                    </div>
                  </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section
        style={{
          background: 'var(--color-primary)',
          paddingTop: 'var(--space-20)',
          paddingBottom: 'var(--space-20)',
          textAlign: 'center',
        }}
      >
        <div className="container">
          <h2
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-2xl)',
              fontWeight: 700,
              color: '#FFFFFF',
              marginBottom: 'var(--space-8)',
              lineHeight: 1.2,
            }}
          >
            Raccontaci di cosa hai bisogno
          </h2>
          <Link
            href="/contact#consulenza"
            className="strat-cta-btn"
            style={{
              display: 'inline-block',
              background: 'var(--color-accent)',
              color: 'var(--color-primary)',
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-base)',
              fontWeight: 700,
              padding: 'var(--space-4) var(--space-10)',
              borderRadius: 'var(--radius-sm)',
              textDecoration: 'none',
              letterSpacing: '0.01em',
              transition: 'background var(--transition-interactive, 150ms ease)',
            }}
          >
            Parliamone!
          </Link>
        </div>
      </section>

      <Footer />
    </>
  )
}
