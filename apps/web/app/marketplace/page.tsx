import type { Metadata } from 'next'
import ServiceSubPageTemplate from '@/components/sections/ServiceSubPageTemplate'

export const metadata: Metadata = {
  title: 'Marketplace',
  description:
    'Gestione professionale della tua presenza su Amazon, Etsy, Zalando e altri marketplace. Setup, ottimizzazione listing, campagne sponsored e analisi della concorrenza.',
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
    <div style={{ position: 'absolute', top: '0', right: '0', width: '180px', height: '180px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(46,204,113,0.10) 0%, transparent 70%)' }} />
    <svg width="160" height="140" viewBox="0 0 150 130" fill="none" aria-hidden="true">
      {/* Marketplace grid of product cards */}
      <rect x="10" y="10" width="38" height="46" rx="6" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
      <rect x="14" y="14" width="30" height="22" rx="4" fill="rgba(46,204,113,0.2)" />
      <line x1="14" y1="40" x2="34" y2="40" stroke="white" strokeWidth="1.5" opacity="0.8" />
      <line x1="14" y1="46" x2="28" y2="46" stroke="white" strokeWidth="1" opacity="0.4" />
      <rect x="56" y="10" width="38" height="46" rx="6" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
      <rect x="60" y="14" width="30" height="22" rx="4" fill="rgba(255,255,255,0.12)" />
      <line x1="60" y1="40" x2="80" y2="40" stroke="white" strokeWidth="1.5" opacity="0.8" />
      <line x1="60" y1="46" x2="74" y2="46" stroke="white" strokeWidth="1" opacity="0.4" />
      <rect x="102" y="10" width="38" height="46" rx="6" fill="rgba(46,204,113,0.15)" stroke="rgba(46,204,113,0.4)" strokeWidth="1.5" />
      <rect x="106" y="14" width="30" height="22" rx="4" fill="rgba(46,204,113,0.2)" />
      <line x1="106" y1="40" x2="126" y2="40" stroke="white" strokeWidth="1.5" opacity="0.9" />
      <line x1="106" y1="46" x2="120" y2="46" stroke="white" strokeWidth="1" opacity="0.5" />
      {/* Star rating */}
      <text x="106" y="54" fill="#2ECC71" fontSize="8" fontFamily="sans-serif" opacity="0.9">★★★★★</text>
      {/* Bottom row */}
      <rect x="10" y="64" width="38" height="46" rx="6" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
      <rect x="14" y="68" width="30" height="22" rx="4" fill="rgba(255,255,255,0.08)" />
      <line x1="14" y1="94" x2="34" y2="94" stroke="white" strokeWidth="1.5" opacity="0.6" />
      <rect x="56" y="64" width="38" height="46" rx="6" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
      <rect x="60" y="68" width="30" height="22" rx="4" fill="rgba(46,204,113,0.15)" />
      <line x1="60" y1="94" x2="80" y2="94" stroke="white" strokeWidth="1.5" opacity="0.6" />
      <rect x="102" y="64" width="38" height="46" rx="6" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
      <rect x="106" y="68" width="30" height="22" rx="4" fill="rgba(255,255,255,0.08)" />
      <line x1="106" y1="94" x2="126" y2="94" stroke="white" strokeWidth="1.5" opacity="0.6" />
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
    <div style={{ position: 'absolute', top: '-15px', left: '-15px', width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />
    {icon}
  </div>
)

const features = [
  {
    illustration: featureIllustration(
      'linear-gradient(135deg, #063329 0%, #0A5C44 100%)',
      <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
        <circle cx="18" cy="8" r="3" fill="rgba(46,204,113,0.4)" />
        <path d="M17 8l1 1 2-2" stroke="#2ECC71" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: 'Setup Marketplace',
    description:
      "Apertura e configurazione professionale del tuo account venditore su Amazon, Etsy, Zalando e altri marketplace con tutti i requisiti tecnici e legali in regola.",
  },
  {
    illustration: featureIllustration(
      'linear-gradient(135deg, #0A5C44 0%, #0d7a5c 100%)',
      <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M14.5 10c-.83 0-1.5-.67-1.5-1.5v-5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5z" />
        <path d="M20.5 10H19V8.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5-.67 1.5-1.5 1.5z" />
        <path d="M9.5 14c.83 0 1.5.67 1.5 1.5v5c0 .83-.67 1.5-1.5 1.5S8 21.33 8 20.5v-5c0-.83.67-1.5 1.5-1.5z" />
        <path d="M3.5 14H5v1.5c0 .83-.67 1.5-1.5 1.5S2 16.33 2 15.5 2.67 14 3.5 14z" />
        <path d="M14 14.5c0-.83.67-1.5 1.5-1.5h5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-5c-.83 0-1.5-.67-1.5-1.5z" />
        <path d="M15.5 19H14v1.5c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z" />
        <path d="M10 9.5C10 8.67 9.33 8 8.5 8h-5C2.67 8 2 8.67 2 9.5S2.67 11 3.5 11h5c.83 0 1.5-.67 1.5-1.5z" />
        <path d="M8.5 5H10V3.5C10 2.67 9.33 2 8.5 2S7 2.67 7 3.5 7.67 5 8.5 5z" />
      </svg>
    ),
    title: 'Ottimizzazione Listing',
    description:
      'Ottimizzazione SEO dei titoli, bullet points, descrizioni e immagini prodotto per migliorare il posizionamento organico e il tasso di conversione sui marketplace.',
  },
  {
    illustration: featureIllustration(
      'linear-gradient(135deg, #084a37 0%, #0A5C44 100%)',
      <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 11l19-9-9 19-2-8-8-2z" />
        <circle cx="15" cy="9" r="3" fill="rgba(46,204,113,0.3)" />
        <circle cx="15" cy="9" r="1" fill="#2ECC71" stroke="none" />
      </svg>
    ),
    title: 'Campagne Sponsored',
    description:
      'Gestione delle campagne pubblicitarie native sui marketplace: Sponsored Products, Sponsored Brands e Display Ads con ottimizzazione continua del TACOS.',
  },
  {
    illustration: featureIllustration(
      'linear-gradient(135deg, #0d7a5c 0%, #0A5C44 100%)',
      <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
        <path d="M17 7l2-2" stroke="#2ECC71" />
        <circle cx="19" cy="5" r="2" fill="rgba(46,204,113,0.4)" />
        <path d="M7 17l-2 2" stroke="#2ECC71" />
        <circle cx="5" cy="19" r="2" fill="rgba(46,204,113,0.4)" />
      </svg>
    ),
    title: 'Analisi Competitor',
    description:
      "Monitoraggio costante dei competitor, analisi dei prezzi e delle strategie vincenti per mantenere un vantaggio competitivo e aumentare la quota di mercato.",
  },
]

export default function MarketplacePage() {
  return (
    <ServiceSubPageTemplate
      title="Marketplace"
      eyebrow="Vendita online"
      subtitle="Portare i tuoi prodotti su Amazon, Etsy, Zalando e altri marketplace richiede competenza, strategia e ottimizzazione continua. Gestiamo la tua presenza per massimizzare le vendite e costruire un rating eccellente."
      heroIllustration={heroIllustration}
      contentTitle="Come gestiamo la tua presenza sui marketplace"
      features={features}
    />
  )
}
