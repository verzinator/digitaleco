import type { Metadata } from 'next'
import ServiceSubPageTemplate from '@/components/sections/ServiceSubPageTemplate'

export const metadata: Metadata = {
  title: 'Export Digitale',
  description:
    'Porta il tuo brand sui mercati internazionali con strategie di export digitale, localizzazione contenuti, e-commerce cross-border e strategie B2B.',
}

const heroIllustration = (
  <div
    style={{
      width: '100%',
      aspectRatio: '4/3',
      background: 'linear-gradient(135deg, #0d7a5c 0%, #2ECC71 100%)',
      borderRadius: 'var(--radius-lg)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}
  >
    <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.08) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
    <div style={{ position: 'absolute', top: '15%', left: '10%', width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)' }} />
    <svg width="150" height="150" viewBox="0 0 120 120" fill="none" aria-hidden="true">
      {/* Globe */}
      <circle cx="60" cy="60" r="40" stroke="white" strokeWidth="1.5" opacity="0.9" />
      <ellipse cx="60" cy="60" rx="18" ry="40" stroke="white" strokeWidth="1" opacity="0.6" />
      <line x1="20" y1="60" x2="100" y2="60" stroke="white" strokeWidth="1" opacity="0.6" />
      <line x1="27" y1="40" x2="93" y2="40" stroke="white" strokeWidth="0.8" opacity="0.4" />
      <line x1="27" y1="80" x2="93" y2="80" stroke="white" strokeWidth="0.8" opacity="0.4" />
      {/* Export arrows */}
      <g opacity="0.9">
        <line x1="90" y1="25" x2="108" y2="12" stroke="#0A5C44" strokeWidth="2.5" strokeLinecap="round" />
        <polyline points="100 10 108 12 106 20" stroke="#0A5C44" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" fill="none" />
      </g>
      <circle cx="60" cy="60" r="4" fill="white" />
    </svg>
  </div>
)

const featureIllustration = (bg: string, icon: React.ReactNode) => (
  <div
    style={{
      width: '100%',
      height: '100%',
      background: bg,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}
  >
    <div style={{ position: 'absolute', bottom: '-20px', right: '-20px', width: '90px', height: '90px', borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />
    {icon}
  </div>
)

const features = [
  {
    illustration: featureIllustration(
      'linear-gradient(135deg, #0d7a5c 0%, #0A5C44 100%)',
      <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        <circle cx="12" cy="12" r="2" fill="#2ECC71" stroke="none" />
      </svg>
    ),
    title: 'Ricerca Mercati Esteri',
    description:
      'Analisi approfondita di domanda, competitor e normative nei mercati target per identificare le opportunità più redditizie per la tua azienda.',
  },
  {
    illustration: featureIllustration(
      'linear-gradient(135deg, #0A5C44 0%, #0d7a5c 100%)',
      <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M5 8l6 6" />
        <path d="M4 14l6-6 2 2 4-4" />
        <path d="M12 4h8v8" />
        <rect x="2" y="12" width="9" height="9" rx="2" opacity="0.5" />
        <rect x="13" y="12" width="9" height="9" rx="2" opacity="0.5" />
      </svg>
    ),
    title: 'Localizzazione Contenuti',
    description:
      'Traduzione professionale e adattamento culturale di siti web, cataloghi e materiali di marketing per comunicare in modo autentico con ogni mercato.',
  },
  {
    illustration: featureIllustration(
      'linear-gradient(135deg, #084a37 0%, #0d7a5c 100%)',
      <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
        <circle cx="17" cy="17" r="4" fill="rgba(46,204,113,0.3)" />
        <path d="M15 17l1.5 1.5L19 15" stroke="#2ECC71" strokeWidth="1.5" />
      </svg>
    ),
    title: 'E-Commerce Cross-Border',
    description:
      'Configurazione di negozi online ottimizzati per la vendita internazionale: pagamenti multi-valuta, spedizioni e compliance normativa.',
  },
  {
    illustration: featureIllustration(
      'linear-gradient(135deg, #063329 0%, #0A5C44 100%)',
      <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: 'Strategie Export B2B',
    description:
      'Sviluppo di reti di distributori e partner internazionali, lead generation B2B e presenza sui principali portali di business globali.',
  },
]

export default function ExportDigitalePage() {
  return (
    <ServiceSubPageTemplate
      title="Export Digitale"
      eyebrow="Crescita internazionale"
      subtitle="Trasforma il digitale nel tuo miglior commerciale all'estero. Portiamo il tuo brand sui mercati europei e internazionali con strategie di export mirate, contenuti localizzati e canali di vendita online ottimizzati."
      heroIllustration={heroIllustration}
      contentTitle="Come ti portiamo sui mercati internazionali"
      features={features}
    />
  )
}
