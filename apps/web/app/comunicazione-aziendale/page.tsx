import type { Metadata } from 'next'
import ServiceSubPageTemplate from '@/components/sections/ServiceSubPageTemplate'

export const metadata: Metadata = {
  title: 'Comunicazione Aziendale',
  description:
    'Brand identity, copywriting strategico, email marketing e PR digitale per raccontare la storia della tua azienda e costruire un brand forte e riconoscibile.',
}

const heroIllustration = (
  <div
    style={{
      width: '100%',
      aspectRatio: '4/3',
      background: 'linear-gradient(135deg, #084a37 0%, #0d7a5c 100%)',
      borderRadius: 'var(--radius-lg)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}
  >
    <div style={{ position: 'absolute', top: '0', left: '0', width: '160px', height: '160px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(46,204,113,0.10) 0%, transparent 70%)' }} />
    <svg width="160" height="140" viewBox="0 0 150 130" fill="none" aria-hidden="true">
      {/* Brand elements layout */}
      {/* Logo mark */}
      <circle cx="35" cy="35" r="22" stroke="white" strokeWidth="1.5" fill="rgba(255,255,255,0.06)" />
      <path d="M25 25 C25 25 45 25 45 35 C45 45 25 45 25 45 Z" fill="#2ECC71" opacity="0.8" />
      <path d="M29 30 C29 30 41 30 41 35 C41 40 29 40 29 40 Z" fill="white" opacity="0.5" />
      {/* Color palette */}
      <rect x="68" y="14" width="14" height="14" rx="3" fill="#0A5C44" />
      <rect x="86" y="14" width="14" height="14" rx="3" fill="#2ECC71" />
      <rect x="104" y="14" width="14" height="14" rx="3" fill="rgba(255,255,255,0.5)" />
      <rect x="122" y="14" width="14" height="14" rx="3" fill="rgba(255,255,255,0.2)" />
      {/* Typography sample */}
      <line x1="68" y1="36" x2="136" y2="36" stroke="white" strokeWidth="3" opacity="0.9" strokeLinecap="round" />
      <line x1="68" y1="44" x2="120" y2="44" stroke="white" strokeWidth="2" opacity="0.6" strokeLinecap="round" />
      <line x1="68" y1="51" x2="130" y2="51" stroke="white" strokeWidth="1.5" opacity="0.4" strokeLinecap="round" />
      {/* Document / email */}
      <rect x="18" y="70" width="114" height="52" rx="6" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
      <line x1="26" y1="83" x2="124" y2="83" stroke="white" strokeWidth="0.8" opacity="0.2" />
      {/* Email chevron */}
      <path d="M18 75 L75 95 L132 75" stroke="rgba(255,255,255,0.4)" strokeWidth="1" fill="none" />
      <line x1="26" y1="95" x2="70" y2="95" stroke="white" strokeWidth="1" opacity="0.3" />
      <line x1="26" y1="101" x2="80" y2="101" stroke="white" strokeWidth="1" opacity="0.2" />
      <line x1="26" y1="107" x2="60" y2="107" stroke="white" strokeWidth="1" opacity="0.2" />
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
      'linear-gradient(135deg, #084a37 0%, #0d7a5c 100%)',
      <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <path d="M8 14s1.5 2 4 2 4-2 4-2" />
        <line x1="9" y1="9" x2="9.01" y2="9" strokeWidth="3" />
        <line x1="15" y1="9" x2="15.01" y2="9" strokeWidth="3" />
        <circle cx="18" cy="6" r="3" fill="rgba(46,204,113,0.5)" />
        <path d="M17 5l1.5 1.5L21 4" stroke="#2ECC71" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: 'Brand Identity',
    description:
      "Creazione o restyling del sistema di identità visiva: logo, palette colori, tipografia e brand guidelines per un'immagine aziendale coerente su tutti i touchpoint.",
  },
  {
    illustration: featureIllustration(
      'linear-gradient(135deg, #0A5C44 0%, #084a37 100%)',
      <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 20h9" />
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
        <line x1="14" y1="6" x2="18" y2="10" stroke="#2ECC71" />
      </svg>
    ),
    title: 'Copywriting Strategico',
    description:
      "Testi persuasivi per siti web, landing page, brochure e presentazioni aziendali che comunicano il valore unico della tua offerta e convertono i lettori in clienti.",
  },
  {
    illustration: featureIllustration(
      'linear-gradient(135deg, #0d7a5c 0%, #0A5C44 100%)',
      <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
        <circle cx="18" cy="18" r="3" fill="rgba(46,204,113,0.3)" />
        <path d="M17 18l1 1 2-2" stroke="#2ECC71" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: 'Email Marketing',
    description:
      'Campagne email e newsletter progettate per nutrire i lead, fidelizzare i clienti esistenti e generare vendite con automation flow personalizzati per ogni segmento.',
  },
  {
    illustration: featureIllustration(
      'linear-gradient(135deg, #063329 0%, #0d7a5c 100%)',
      <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M19 20H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h10l6 6v8a2 2 0 0 1-2 2z" />
        <polyline points="17 22 17 13 7 13 7 22" />
        <polyline points="7 2 7 8 15 8" />
        <circle cx="16" cy="16" r="3" fill="rgba(46,204,113,0.3)" />
        <path d="M15 16l1 1 2-2" stroke="#2ECC71" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: 'PR Digitale',
    description:
      "Ufficio stampa digitale, gestione delle relazioni con media online, blog di settore e influencer per aumentare l'autorevolezza e la visibilità del tuo brand.",
  },
]

export default function ComunicazioneAziendalePage() {
  return (
    <ServiceSubPageTemplate
      title="Comunicazione Aziendale"
      eyebrow="Identità e messaggio"
      subtitle="Costruiamo la voce e l'immagine della tua azienda in modo coerente, autentico e strategico. Dal brand identity al copywriting, dall'email marketing alle PR digitali: un ecosistema comunicativo che genera fiducia e vendite."
      heroIllustration={heroIllustration}
      contentTitle="Cosa include la nostra comunicazione aziendale"
      features={features}
    />
  )
}
