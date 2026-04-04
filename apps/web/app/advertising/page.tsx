import type { Metadata } from 'next'
import ServiceSubPageTemplate from '@/components/sections/ServiceSubPageTemplate'

export const metadata: Metadata = {
  title: 'Advertising',
  description:
    'Campagne pubblicitarie Google Ads, Meta Ads e LinkedIn Ads ottimizzate per il massimo ROI. Gestione professionale del budget con report trasparenti e risultati misurabili.',
}

const heroIllustration = (
  <div
    style={{
      width: '100%',
      aspectRatio: '4/3',
      background: 'linear-gradient(135deg, #0A5C44 0%, #084a37 100%)',
      borderRadius: 'var(--radius-lg)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}
  >
    <div style={{ position: 'absolute', top: '0', right: '0', width: '200px', height: '200px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(46,204,113,0.12) 0%, transparent 70%)' }} />
    <svg width="160" height="140" viewBox="0 0 150 130" fill="none" aria-hidden="true">
      {/* Dashboard frame */}
      <rect x="10" y="10" width="130" height="110" rx="8" stroke="white" strokeWidth="1" fill="rgba(255,255,255,0.04)" />
      {/* Metric cards */}
      <rect x="18" y="18" width="35" height="25" rx="4" fill="rgba(46,204,113,0.2)" />
      <line x1="22" y1="26" x2="44" y2="26" stroke="white" strokeWidth="1.5" opacity="0.9" />
      <line x1="22" y1="32" x2="36" y2="32" stroke="white" strokeWidth="1" opacity="0.5" />
      <rect x="58" y="18" width="35" height="25" rx="4" fill="rgba(255,255,255,0.08)" />
      <line x1="62" y1="26" x2="84" y2="26" stroke="white" strokeWidth="1.5" opacity="0.9" />
      <line x1="62" y1="32" x2="76" y2="32" stroke="white" strokeWidth="1" opacity="0.5" />
      <rect x="98" y="18" width="35" height="25" rx="4" fill="rgba(255,255,255,0.08)" />
      <line x1="102" y1="26" x2="124" y2="26" stroke="white" strokeWidth="1.5" opacity="0.9" />
      <line x1="102" y1="32" x2="116" y2="32" stroke="white" strokeWidth="1" opacity="0.5" />
      {/* Bar chart */}
      <rect x="18" y="52" width="114" height="60" rx="4" fill="rgba(255,255,255,0.04)" />
      <rect x="28" y="88" width="14" height="16" rx="2" fill="rgba(46,204,113,0.5)" />
      <rect x="48" y="78" width="14" height="26" rx="2" fill="rgba(46,204,113,0.6)" />
      <rect x="68" y="68" width="14" height="36" rx="2" fill="rgba(46,204,113,0.8)" />
      <rect x="88" y="60" width="14" height="44" rx="2" fill="#2ECC71" />
      <rect x="108" y="70" width="14" height="34" rx="2" fill="rgba(46,204,113,0.7)" />
      <line x1="18" y1="108" x2="132" y2="108" stroke="white" strokeWidth="0.8" opacity="0.3" />
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
    <div style={{ position: 'absolute', bottom: '-15px', left: '-15px', width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />
    {icon}
  </div>
)

const features = [
  {
    illustration: featureIllustration(
      'linear-gradient(135deg, #0A5C44 0%, #084a37 100%)',
      <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        <line x1="12" y1="17" x2="12.01" y2="17" strokeWidth="2.5" />
        {/* G-style indicator */}
        <path d="M17 7l3-3" stroke="#2ECC71" strokeWidth="2" />
        <circle cx="20" cy="4" r="2" fill="rgba(46,204,113,0.5)" stroke="none" />
      </svg>
    ),
    title: 'Google Ads',
    description:
      'Campagne Search, Display, Shopping e Performance Max per intercettare i clienti nel momento esatto in cui cercano i tuoi prodotti o servizi.',
  },
  {
    illustration: featureIllustration(
      'linear-gradient(135deg, #084a37 0%, #0A5C44 100%)',
      <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" />
        <path d="M16 8.56V11h2.5" stroke="#2ECC71" strokeWidth="1.5" />
        <path d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" strokeWidth="2.5" />
      </svg>
    ),
    title: 'Meta Ads',
    description:
      'Campagne Facebook e Instagram con targeting avanzato per intercettare il pubblico ideale. Formati video, carosello e lead generation per ogni obiettivo.',
  },
  {
    illustration: featureIllustration(
      'linear-gradient(135deg, #0d7a5c 0%, #0A5C44 100%)',
      <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" fill="rgba(46,204,113,0.5)" />
      </svg>
    ),
    title: 'LinkedIn Ads',
    description:
      'Il canale ideale per il B2B: Sponsored Content, InMail e Lead Gen Forms per raggiungere decision maker, dirigenti e professionisti del tuo settore.',
  },
  {
    illustration: featureIllustration(
      'linear-gradient(135deg, #063329 0%, #0A5C44 100%)',
      <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
        <polyline points="2 20 22 20" />
        <path d="M6 14l6-6 6 6" stroke="#2ECC71" strokeWidth="1.5" />
        <circle cx="18" cy="10" r="2.5" fill="rgba(46,204,113,0.4)" stroke="#2ECC71" />
      </svg>
    ),
    title: 'Reportistica ROI',
    description:
      'Dashboard personalizzate con KPI in tempo reale, report mensili dettagliati e ottimizzazione continua delle campagne basata sui dati.',
  },
]

export default function AdvertisingPage() {
  return (
    <ServiceSubPageTemplate
      title="Advertising"
      eyebrow="Performance marketing"
      subtitle="Campagne pubblicitarie digitali che portano risultati concreti e misurabili. Gestiamo il tuo budget su Google, Meta e LinkedIn con strategie data-driven per massimizzare ogni euro investito."
      heroIllustration={heroIllustration}
      contentTitle="Le nostre piattaforme pubblicitarie"
      features={features}
    />
  )
}
