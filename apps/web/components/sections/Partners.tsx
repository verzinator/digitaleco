'use client'

import { motion } from 'framer-motion'

// I marchi del gruppo, nella versione bianca su fondo trasparente.
const partnerLogos = [
  { id: 'make-group', name: 'Make Group', src: '/partners/make-group.png' },
  { id: 'make-consulting', name: 'Make Consulting', src: '/partners/make-consulting.png' },
  { id: 'make-finance', name: 'Make Finance', src: '/partners/make-finance.png' },
  { id: 'makelab', name: 'Makelab Business School', src: '/partners/makelab.png' },
  { id: 'kanbanlogiq', name: 'KanbanlogiQ', src: '/partners/kanbanlogiq.png' },
]

export default function Partners() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{
        maxWidth: '1200px',
        margin: '0 auto',
        // Il riquadro non deve toccare la fascia puntinata che finisce qui sopra.
        padding: '80px 32px 120px',
        position: 'relative',
        zIndex: 2,
      }}
    >
      <div
        style={{
          background: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '16px',
          padding: '32px 40px',
          display: 'flex',
          alignItems: 'center',
          gap: '40px',
        }}
        className="partners-box"
      >
        {/* Text */}
        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '22px',
            fontStyle: 'italic',
            fontWeight: 400,
            color: 'rgba(255,255,255,0.5)',
            lineHeight: 1.5,
            whiteSpace: 'nowrap',
            flexShrink: 0,
            margin: 0,
          }}
          className="partners-text"
        >
          Parte del gruppo
        </h3>

        {/* Logos */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '32px',
            flex: 1,
            justifyContent: 'flex-end',
            flexWrap: 'wrap',
          }}
          className="partners-logos"
        >
          {partnerLogos.map((logo) => (
            <img
              key={logo.id}
              src={logo.src}
              alt={logo.name}
              style={{
                // I file sono ritagliati sul marchio, senza margine trasparente:
                // così l'altezza è quella del segno e i cinque restano in riga.
                height: '26px',
                width: 'auto',
                maxWidth: '160px',
                objectFit: 'contain',
                opacity: 0.5,
                filter: 'brightness(0) invert(1)',
              }}
            />
          ))}
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 768px) {
          .partners-box {
            flex-direction: column !important;
            text-align: center;
            padding: 28px 24px !important;
            gap: 24px !important;
          }
          .partners-text {
            white-space: normal !important;
          }
          .partners-logos {
            justify-content: center !important;
            gap: 24px !important;
          }
        }
      `}</style>
    </motion.section>
  )
}
