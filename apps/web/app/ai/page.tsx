import type { Metadata } from 'next'
import ServiceSubPageTemplate from '@/components/sections/ServiceSubPageTemplate'

export const metadata: Metadata = {
  title: 'Intelligenza Artificiale',
  description:
    "Soluzioni di intelligenza artificiale per automatizzare i processi aziendali, personalizzare l'esperienza cliente e analizzare i dati con strumenti AI avanzati.",
}

const heroIllustration = (
  <div
    style={{
      width: '100%',
      aspectRatio: '4/3',
      background: 'linear-gradient(135deg, #0A5C44 0%, #0d7a5c 60%, #2ECC71 100%)',
      borderRadius: 'var(--radius-lg)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      overflow: 'hidden',
    }}
  >
    {/* Decorative rings */}
    <div style={{ position: 'absolute', top: '10%', right: '10%', width: '120px', height: '120px', borderRadius: '50%', border: '1px solid rgba(46,204,113,0.3)' }} />
    <div style={{ position: 'absolute', top: '5%', right: '5%', width: '180px', height: '180px', borderRadius: '50%', border: '1px solid rgba(46,204,113,0.15)' }} />
    <div style={{ position: 'absolute', bottom: '10%', left: '10%', width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
    {/* Central SVG */}
    <svg width="140" height="140" viewBox="0 0 120 120" fill="none" aria-hidden="true">
      {/* Neural network */}
      <circle cx="60" cy="30" r="12" stroke="white" strokeWidth="2" />
      <circle cx="25" cy="65" r="10" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" />
      <circle cx="95" cy="65" r="10" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" />
      <circle cx="40" cy="97" r="9" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
      <circle cx="80" cy="97" r="9" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
      {/* Connections */}
      <line x1="52" y1="40" x2="33" y2="56" stroke="rgba(46,204,113,0.8)" strokeWidth="1.5" />
      <line x1="68" y1="40" x2="87" y2="56" stroke="rgba(46,204,113,0.8)" strokeWidth="1.5" />
      <line x1="33" y1="74" x2="40" y2="88" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
      <line x1="87" y1="74" x2="80" y2="88" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
      <line x1="35" y1="67" x2="85" y2="67" stroke="rgba(255,255,255,0.2)" strokeWidth="1" strokeDasharray="4 3" />
      {/* Sparkle dots */}
      <circle cx="60" cy="30" r="4" fill="#2ECC71" />
      <circle cx="25" cy="65" r="3" fill="rgba(46,204,113,0.7)" />
      <circle cx="95" cy="65" r="3" fill="rgba(46,204,113,0.7)" />
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
    <div style={{ position: 'absolute', top: '-20px', right: '-20px', width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(255,255,255,0.06)' }} />
    {icon}
  </div>
)

const features = [
  {
    illustration: featureIllustration(
      'linear-gradient(135deg, #0A5C44 0%, #0d7a5c 100%)',
      <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        <circle cx="12" cy="11" r="2" fill="rgba(46,204,113,0.8)" stroke="none" />
        <path d="M9 11h.01M12 11h.01M15 11h.01" stroke="white" strokeWidth="2" />
      </svg>
    ),
    title: 'Chatbot Aziendali',
    description:
      'Assistenti virtuali intelligenti h24 che rispondono ai clienti, qualificano i lead e automatizzano il supporto pre e post-vendita.',
  },
  {
    illustration: featureIllustration(
      'linear-gradient(135deg, #084a37 0%, #0A5C44 100%)',
      <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
        <polyline points="2 20 22 20" />
        <path d="M6 14l6-6 6 6" stroke="#2ECC71" />
      </svg>
    ),
    title: 'Analisi Dati con AI',
    description:
      "Dashboard predittive e report automatizzati che trasformano i tuoi dati in insight azionabili per decisioni più rapide e informate.",
  },
  {
    illustration: featureIllustration(
      'linear-gradient(135deg, #0d7a5c 0%, #0A5C44 100%)',
      <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
      </svg>
    ),
    title: 'Automazione Processi',
    description:
      'Workflow intelligenti che eliminano le attività ripetitive, riducono gli errori e liberano il tuo team per compiti ad alto valore aggiunto.',
  },
  {
    illustration: featureIllustration(
      'linear-gradient(135deg, #063329 0%, #0A5C44 100%)',
      <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
        <path d="M16 3.5C17.5 4.5 18 6 17.5 7.5" stroke="#2ECC71" />
      </svg>
    ),
    title: 'Personalizzazione Contenuti',
    description:
      'Algoritmi di raccomandazione e personalizzazione dinamica dei contenuti per aumentare il coinvolgimento e le conversioni del tuo sito.',
  },
]

export default function AIPage() {
  return (
    <ServiceSubPageTemplate
      title="Intelligenza Artificiale"
      eyebrow="Tecnologia avanzata"
      subtitle="Porta l'intelligenza artificiale nel cuore della tua azienda. Automazione dei processi, analisi predittiva e chatbot evoluti per trasformare l'efficienza operativa e la customer experience."
      heroIllustration={heroIllustration}
      contentTitle="Come integriamo l'AI nel tuo business"
      features={features}
    />
  )
}
