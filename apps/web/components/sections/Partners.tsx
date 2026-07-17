'use client'

import { motion } from 'framer-motion'

const partnerLogos = [
  { name: 'Make Consulting', src: '/Make-Consulting-nero.png' },
  { name: 'Make Consulting', src: '/Make-Consulting-nero.png' },
  { name: 'Make Consulting', src: '/Make-Consulting-nero.png' },
  { name: 'Make Consulting', src: '/Make-Consulting-nero.png' },
  { name: 'Make Consulting', src: '/Make-Consulting-nero.png' },
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
        padding: '0 32px 120px',
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
          {partnerLogos.map((logo, i) => (
            <img
              key={logo.name}
              src={logo.src}
              alt={logo.name}
              style={{
                height: '28px',
                width: 'auto',
                maxWidth: '120px',
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
