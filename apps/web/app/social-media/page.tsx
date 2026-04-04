import type { Metadata } from 'next'
import ServiceSubPageTemplate from '@/components/sections/ServiceSubPageTemplate'

export const metadata: Metadata = {
  title: 'Social Media',
  description:
    'Strategia editoriale, content creation e community management su Instagram, LinkedIn, Facebook e TikTok per costruire un brand forte e una community coinvolta.',
}

const heroIllustration = (
  <div
    style={{
      width: '100%',
      aspectRatio: '4/3',
      background: 'linear-gradient(135deg, #0d7a5c 0%, #0A5C44 100%)',
      borderRadius: 'var(--radius-lg)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}
  >
    <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '22px 22px' }} />
    <svg width="160" height="140" viewBox="0 0 150 130" fill="none" aria-hidden="true">
      {/* Phone frame */}
      <rect x="45" y="5" width="60" height="110" rx="10" stroke="white" strokeWidth="1.5" fill="rgba(255,255,255,0.06)" />
      <rect x="52" y="13" width="46" height="94" rx="6" fill="rgba(255,255,255,0.04)" />
      {/* Status bar dots */}
      <circle cx="73" cy="10" r="3" fill="rgba(255,255,255,0.3)" />
      {/* Content blocks */}
      <rect x="54" y="16" width="42" height="28" rx="4" fill="rgba(46,204,113,0.25)" />
      <line x1="57" y1="24" x2="86" y2="24" stroke="white" strokeWidth="1.5" opacity="0.8" />
      <line x1="57" y1="30" x2="78" y2="30" stroke="white" strokeWidth="1" opacity="0.5" />
      <line x1="57" y1="36" x2="72" y2="36" stroke="white" strokeWidth="1" opacity="0.3" />
      {/* Interaction row */}
      <line x1="54" y1="48" x2="94" y2="48" stroke="white" strokeWidth="0.8" opacity="0.2" />
      <circle cx="59" cy="55" r="5" fill="rgba(46,204,113,0.5)" />
      <line x1="68" y1="54" x2="82" y2="54" stroke="white" strokeWidth="1" opacity="0.5" />
      <line x1="68" y1="57" x2="76" y2="57" stroke="white" strokeWidth="1" opacity="0.3" />
      {/* Second post */}
      <rect x="54" y="65" width="42" height="22" rx="4" fill="rgba(255,255,255,0.08)" />
      <line x1="57" y1="72" x2="86" y2="72" stroke="white" strokeWidth="1.5" opacity="0.7" />
      <line x1="57" y1="78" x2="73" y2="78" stroke="white" strokeWidth="1" opacity="0.4" />
      {/* Floating icons */}
      <circle cx="20" cy="40" r="16" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
      <line x1="20" y1="34" x2="20" y2="46" stroke="white" strokeWidth="1.5" opacity="0.6" strokeLinecap="round" />
      <line x1="14" y1="40" x2="26" y2="40" stroke="white" strokeWidth="1.5" opacity="0.6" strokeLinecap="round" />
      <circle cx="130" cy="70" r="14" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
      <path d="M125 70a5 5 0 1 0 10 0 5 5 0 0 0-10 0" stroke="white" strokeWidth="1.5" opacity="0.6" fill="none" />
      <line x1="130" y1="56" x2="130.01" y2="56" stroke="white" strokeWidth="2" opacity="0.8" />
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
    <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '90px', height: '90px', borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />
    {icon}
  </div>
)

const features = [
  {
    illustration: featureIllustration(
      'linear-gradient(135deg, #0d7a5c 0%, #0A5C44 100%)',
      <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="4" width="18" height="18" rx="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
        <rect x="7" y="14" width="3" height="3" rx="1" fill="rgba(46,204,113,0.7)" stroke="none" />
        <rect x="13" y="14" width="3" height="3" rx="1" fill="rgba(255,255,255,0.3)" stroke="none" />
      </svg>
    ),
    title: 'Strategia Editoriale',
    description:
      'Piano editoriale mensile con contenuti studiati per il tuo target, frequenza ottimale di pubblicazione e mix di formati per massimizzare la reach organica.',
  },
  {
    illustration: featureIllustration(
      'linear-gradient(135deg, #0A5C44 0%, #0d7a5c 100%)',
      <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
        <circle cx="12" cy="13" r="4" />
        <circle cx="12" cy="13" r="1.5" fill="rgba(46,204,113,0.8)" stroke="none" />
      </svg>
    ),
    title: 'Content Creation',
    description:
      'Produzione di contenuti originali: grafiche brandizzate, caroselli, Reels, Stories e copy ottimizzati per ogni piattaforma e obiettivo di comunicazione.',
  },
  {
    illustration: featureIllustration(
      'linear-gradient(135deg, #084a37 0%, #0d7a5c 100%)',
      <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        <circle cx="20" cy="17" r="3" fill="rgba(46,204,113,0.4)" />
        <line x1="19" y1="17" x2="21" y2="17" stroke="#2ECC71" />
        <line x1="20" y1="16" x2="20" y2="18" stroke="#2ECC71" />
      </svg>
    ),
    title: 'Community Management',
    description:
      'Gestione quotidiana dei commenti, messaggi e interazioni per costruire relazioni autentiche con la tua community e aumentare il tasso di engagement.',
  },
  {
    illustration: featureIllustration(
      'linear-gradient(135deg, #063329 0%, #0A5C44 100%)',
      <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
        <circle cx="15" cy="9" r="2" fill="rgba(46,204,113,0.5)" stroke="#2ECC71" strokeWidth="1" />
      </svg>
    ),
    title: 'Analisi Performance',
    description:
      'Report mensili con metriche chiave: reach, impression, engagement rate, follower growth e correlazione con gli obiettivi di business per ottimizzare la strategia.',
  },
]

export default function SocialMediaPage() {
  return (
    <ServiceSubPageTemplate
      title="Social Media"
      eyebrow="Brand awareness"
      subtitle="Trasformiamo i tuoi profili social in potenti strumenti di crescita. Strategia, contenuti e community management integrati per costruire un brand riconoscibile e una community di clienti fedeli."
      heroIllustration={heroIllustration}
      contentTitle="Come facciamo crescere la tua presenza social"
      features={features}
    />
  )
}
