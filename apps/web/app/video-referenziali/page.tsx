import type { Metadata } from 'next'
import ServiceSubPageTemplate from '@/components/sections/ServiceSubPageTemplate'

export const metadata: Metadata = {
  title: 'Video Referenziali',
  description:
    'Video testimonianze autentiche e referenze clienti per aumentare la fiducia nel tuo brand. Produzione professionale, post-produzione e distribuzione strategica su tutti i canali.',
}

const heroIllustration = (
  <div
    style={{
      width: '100%',
      aspectRatio: '4/3',
      background: 'linear-gradient(135deg, #0A5C44 0%, #063329 100%)',
      borderRadius: 'var(--radius-lg)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}
  >
    <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle, rgba(46,204,113,0.07) 1px, transparent 1px)', backgroundSize: '20px 20px' }} />
    <svg width="160" height="140" viewBox="0 0 150 130" fill="none" aria-hidden="true">
      {/* Video frame */}
      <rect x="10" y="20" width="130" height="80" rx="8" stroke="white" strokeWidth="1.5" fill="rgba(255,255,255,0.05)" />
      {/* Film strips top/bottom */}
      <rect x="10" y="12" width="130" height="10" rx="3" fill="rgba(255,255,255,0.08)" />
      <rect x="10" y="108" width="130" height="10" rx="3" fill="rgba(255,255,255,0.08)" />
      {/* Film holes */}
      {[22, 40, 58, 76, 94, 112].map((x) => (
        <rect key={x} x={x} y="14" width="8" height="6" rx="1.5" fill="rgba(0,0,0,0.3)" />
      ))}
      {[22, 40, 58, 76, 94, 112].map((x) => (
        <rect key={x} x={x} y="110" width="8" height="6" rx="1.5" fill="rgba(0,0,0,0.3)" />
      ))}
      {/* Person silhouette */}
      <circle cx="75" cy="45" r="12" fill="rgba(255,255,255,0.15)" />
      <path d="M52 85c0-12.7 10.3-23 23-23h0c12.7 0 23 10.3 23 23" fill="rgba(255,255,255,0.1)" />
      {/* Quote marks */}
      <text x="20" y="70" fill="rgba(46,204,113,0.7)" fontSize="22" fontFamily="Georgia, serif">&ldquo;</text>
      <text x="122" y="70" fill="rgba(46,204,113,0.7)" fontSize="22" fontFamily="Georgia, serif">&rdquo;</text>
      {/* Play button */}
      <circle cx="75" cy="60" r="18" fill="rgba(46,204,113,0.2)" stroke="#2ECC71" strokeWidth="1.5" />
      <polygon points="70,53 70,67 82,60" fill="#2ECC71" />
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
      'linear-gradient(135deg, #0A5C44 0%, #063329 100%)',
      <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
        <polyline points="14 2 14 8 20 8" />
        <line x1="16" y1="13" x2="8" y2="13" />
        <line x1="16" y1="17" x2="8" y2="17" />
        <polyline points="10 9 9 9 8 9" />
        <circle cx="18" cy="18" r="3" fill="rgba(46,204,113,0.3)" />
        <path d="M17 18l1 1 2-2" stroke="#2ECC71" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    title: 'Ideazione e Script',
    description:
      'Sviluppiamo la struttura narrativa del video, curiamo la sceneggiatura e prepariamo il cliente per garantire un racconto autentico, convincente e allineato ai valori del brand.',
  },
  {
    illustration: featureIllustration(
      'linear-gradient(135deg, #063329 0%, #0A5C44 100%)',
      <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polygon points="23 7 16 12 23 17 23 7" />
        <rect x="1" y="5" width="15" height="14" rx="2" />
        <line x1="5" y1="10" x2="5" y2="14" stroke="rgba(46,204,113,0.8)" strokeWidth="2" strokeLinecap="round" />
        <line x1="8" y1="9" x2="8" y2="15" stroke="rgba(46,204,113,0.6)" strokeWidth="2" strokeLinecap="round" />
        <line x1="11" y1="11" x2="11" y2="13" stroke="rgba(46,204,113,0.4)" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    title: 'Produzione Video',
    description:
      'Riprese professionali in location o in studio con attrezzatura cinematografica, regia esperta e assistenza al cliente durante tutto il processo di registrazione.',
  },
  {
    illustration: featureIllustration(
      'linear-gradient(135deg, #084a37 0%, #063329 100%)',
      <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="2" y1="20" x2="22" y2="20" />
        <line x1="12" y1="17" x2="12" y2="20" />
        <line x1="5" y1="8" x2="5" y2="12" stroke="#2ECC71" strokeWidth="2" strokeLinecap="round" />
        <line x1="8" y1="7" x2="8" y2="13" stroke="#2ECC71" strokeWidth="2" strokeLinecap="round" />
        <line x1="11" y1="9" x2="11" y2="11" stroke="rgba(46,204,113,0.5)" strokeWidth="2" strokeLinecap="round" />
        <line x1="14" y1="6" x2="14" y2="14" stroke="rgba(46,204,113,0.7)" strokeWidth="2" strokeLinecap="round" />
        <line x1="17" y1="8" x2="17" y2="12" stroke="rgba(46,204,113,0.4)" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
    title: 'Post-Produzione',
    description:
      'Montaggio professionale, correzione colore, aggiunta di sottotitoli, musica e grafiche animate. Consegna in tutti i formati ottimizzati per web, social e presentazioni.',
  },
  {
    illustration: featureIllustration(
      'linear-gradient(135deg, #0d7a5c 0%, #063329 100%)',
      <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="18" cy="5" r="3" />
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="19" r="3" />
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
        <circle cx="18" cy="5" r="1.5" fill="rgba(46,204,113,0.6)" stroke="none" />
        <circle cx="18" cy="19" r="1.5" fill="rgba(46,204,113,0.6)" stroke="none" />
      </svg>
    ),
    title: 'Distribuzione Strategica',
    description:
      'Piano di distribuzione multicanale: pubblicazione sul sito web, YouTube, LinkedIn, campagne advertising e integrazione nelle fasi chiave del funnel di vendita.',
  },
]

export default function VideoReferenzialiPage() {
  return (
    <ServiceSubPageTemplate
      title="Video Referenziali"
      eyebrow="Prova sociale"
      subtitle="Le testimonianze video dei tuoi clienti soddisfatti sono lo strumento di vendita più potente che esista. Produciamo video referenziali autentici e professionali che aumentano la fiducia e accelerano le decisioni d'acquisto."
      heroIllustration={heroIllustration}
      contentTitle="Come realizziamo i tuoi video referenziali"
      features={features}
    />
  )
}
