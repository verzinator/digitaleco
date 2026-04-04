import type { Metadata } from 'next'
import ServiceSubPageTemplate from '@/components/sections/ServiceSubPageTemplate'

export const metadata: Metadata = {
  title: 'Siti Web & E-Commerce',
  description:
    "Siti web su misura e negozi online performanti. Dal design al lancio, curiamo ogni dettaglio per garantire un'esperienza utente eccellente e conversioni elevate.",
}

const heroIllustration = (
  <div
    style={{
      width: '100%',
      aspectRatio: '4/3',
      background: 'linear-gradient(135deg, #063329 0%, #0A5C44 100%)',
      borderRadius: 'var(--radius-lg)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}
  >
    <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(46,204,113,0.08) 1px, transparent 1px)', backgroundSize: '18px 18px' }} />
    <svg width="170" height="130" viewBox="0 0 160 120" fill="none" aria-hidden="true">
      {/* Browser frame */}
      <rect x="10" y="10" width="140" height="100" rx="8" stroke="white" strokeWidth="1.5" fill="rgba(255,255,255,0.05)" />
      <line x1="10" y1="28" x2="150" y2="28" stroke="white" strokeWidth="1" opacity="0.6" />
      {/* Browser dots */}
      <circle cx="23" cy="19" r="3" fill="rgba(255,255,255,0.5)" />
      <circle cx="33" cy="19" r="3" fill="rgba(255,255,255,0.5)" />
      <circle cx="43" cy="19" r="3" fill="rgba(255,255,255,0.5)" />
      {/* URL bar */}
      <rect x="55" y="14" width="70" height="10" rx="3" fill="rgba(255,255,255,0.1)" />
      {/* Content blocks */}
      <rect x="18" y="36" width="124" height="28" rx="4" fill="rgba(46,204,113,0.2)" />
      <line x1="18" y1="44" x2="80" y2="44" stroke="white" strokeWidth="2" opacity="0.8" />
      <line x1="18" y1="52" x2="60" y2="52" stroke="white" strokeWidth="1" opacity="0.5" />
      <rect x="18" y="72" width="56" height="30" rx="4" fill="rgba(255,255,255,0.08)" />
      <rect x="82" y="72" width="60" height="30" rx="4" fill="rgba(255,255,255,0.08)" />
      <line x1="22" y1="80" x2="68" y2="80" stroke="white" strokeWidth="1" opacity="0.4" />
      <line x1="22" y1="86" x2="60" y2="86" stroke="white" strokeWidth="1" opacity="0.3" />
      <line x1="86" y1="80" x2="136" y2="80" stroke="white" strokeWidth="1" opacity="0.4" />
      <line x1="86" y1="86" x2="128" y2="86" stroke="white" strokeWidth="1" opacity="0.3" />
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
    <div style={{ position: 'absolute', top: '-15px', left: '-15px', width: '70px', height: '70px', borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />
    {icon}
  </div>
)

const features = [
  {
    illustration: featureIllustration(
      'linear-gradient(135deg, #063329 0%, #0A5C44 100%)',
      <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="2" y1="7" x2="22" y2="7" />
        <circle cx="5" cy="5" r="0.8" fill="white" stroke="none" />
        <circle cx="8" cy="5" r="0.8" fill="white" stroke="none" />
        <path d="M7 11h3v4H7z" fill="rgba(46,204,113,0.6)" stroke="none" />
        <line x1="12" y1="12" x2="17" y2="12" stroke="rgba(255,255,255,0.8)" />
        <line x1="12" y1="14" x2="15" y2="14" stroke="rgba(255,255,255,0.5)" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    title: 'Design su Misura',
    description:
      'Ogni sito è progettato da zero per riflettere la personalità del tuo brand. UI/UX research, wireframe, prototipazione e sviluppo in un processo integrato.',
  },
  {
    illustration: featureIllustration(
      'linear-gradient(135deg, #0A5C44 0%, #0d7a5c 100%)',
      <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 0 1-8 0" />
        <circle cx="12" cy="16" r="2" fill="rgba(46,204,113,0.8)" stroke="none" />
      </svg>
    ),
    title: 'E-Commerce Performanti',
    description:
      'Negozi online Shopify, WooCommerce o custom sviluppati per convertire. Integrazione con gateway di pagamento, logistica e sistemi ERP.',
  },
  {
    illustration: featureIllustration(
      'linear-gradient(135deg, #084a37 0%, #0d7a5c 100%)',
      <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
        <path d="M11 8v6M8 11h6" stroke="#2ECC71" />
      </svg>
    ),
    title: 'SEO Tecnico',
    description:
      "Ottimizzazione tecnica per i motori di ricerca: velocità di caricamento, Core Web Vitals, struttura URL, schema markup e ottimizzazione mobile.",
  },
  {
    illustration: featureIllustration(
      'linear-gradient(135deg, #0d7a5c 0%, #0A5C44 100%)',
      <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M18 20V10" />
        <path d="M12 20V4" />
        <path d="M6 20v-6" />
        <polyline points="2 20 22 20" />
        <circle cx="18" cy="7" r="3" fill="rgba(46,204,113,0.3)" />
        <path d="M16 7l1.5 1.5L20 6" stroke="#2ECC71" strokeWidth="1.5" />
      </svg>
    ),
    title: 'Assistenza Post-Lancio',
    description:
      'Monitoraggio continuo, aggiornamenti di sicurezza, ottimizzazioni basate sui dati e supporto tecnico dedicato per mantenere le performance nel tempo.',
  },
]

export default function SitiWebPage() {
  return (
    <ServiceSubPageTemplate
      title="Siti Web & E-Commerce"
      eyebrow="Presenza online"
      subtitle="Costruiamo la tua vetrina digitale con cura artigianale e tecnologia all'avanguardia. Dal concept creativo al lancio, ogni progetto è pensato per convertire visitatori in clienti fedeli."
      heroIllustration={heroIllustration}
      contentTitle="Cosa include il nostro servizio"
      features={features}
    />
  )
}
