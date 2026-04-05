'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'

export default function ZoomSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Tracciamo lo scroll della sezione (lunga 200vh)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const scale        = useTransform(scrollYProgress, [0, 0.5],   [1, 0.85])
  const borderRadius = useTransform(scrollYProgress, [0, 0.5],   [0, 32])

  // Velina: 80% nero, completata al 20% di scroll (rapido su mobile e desktop)
  const overlayOpacity = useTransform(scrollYProgress, [0.02, 0.20], [0, 0.80])

  // Testo: bianco pieno già al 20% di scroll
  const overlayTextOpacity = useTransform(scrollYProgress, [0.05, 0.20], [0, 1])
  const overlayTextY       = useTransform(scrollYProgress, [0.05, 0.20], [24, 0])

  // Testo secondario sotto l'immagine (già esistente)
  const opacityText = useTransform(scrollYProgress, [0.4, 0.7], [0, 1])
  const yText       = useTransform(scrollYProgress, [0.4, 0.7], [40, 0])

  return (
    <section 
      ref={containerRef} 
      style={{ 
        height: '250vh', // Rendo la sezione abbastanza lunga per godersi lo scroll
        position: 'relative',
        background: 'var(--color-bg)'
      }}
    >
      <div 
        style={{ 
          position: 'sticky', 
          top: 0, 
          height: '100vh', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center', 
          overflow: 'hidden' 
        }}
      >
        <motion.div
           style={{
             width: '100vw',
             height: '100vh',
             scale,
             borderRadius,
             overflow: 'hidden',
             position: 'relative',
             boxShadow: 'var(--shadow-lg)'
           }}
        >
          <Image
            src="/modern_office.png"
            alt="Il nostro ufficio"
            fill
            priority
            style={{ objectFit: 'cover' }}
          />

          {/* Velina nera — si intensifica con lo scroll */}
          <motion.div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              background: '#000000',
              opacity: overlayOpacity,
              pointerEvents: 'none',
            }}
          />

          {/* Testo sopra la velina */}
          <motion.div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: overlayTextOpacity,
              y: overlayTextY,
              pointerEvents: 'none',
              paddingInline: 'var(--space-6)',
            }}
          >
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-3xl)',
                fontWeight: 700,
                color: '#FFFFFF',
                textAlign: 'center',
                lineHeight: 1.15,
                maxWidth: '760px',
                opacity: 1,
                textShadow: 'none',
              }}
            >
              E lo facciamo con il nostro metodo
            </h2>
          </motion.div>
        </motion.div>

        {/* Testo in Baskerville che appare sotto l'immagine */}
        <motion.div
          style={{
            marginTop: 'var(--space-10)',
            opacity: opacityText,
            y: yText,
            textAlign: 'center',
            maxWidth: '800px',
            paddingInline: 'var(--space-6)',
            position: 'absolute',
            bottom: '10vh' // Posizionato in basso per apparire quando c'è spazio
          }}
        >
          <h2 
            style={{ 
              fontFamily: 'var(--font-display)', 
              fontSize: 'var(--text-3xl)', 
              color: 'var(--color-primary)',
              lineHeight: 1.1,
              marginBottom: 'var(--space-4)'
            }}
          >
            Lavoriamo dove le idee prendono forma.
          </h2>
          <p 
            style={{ 
              fontFamily: 'var(--font-body)', 
              fontSize: 'var(--text-lg)',
              color: 'var(--color-text-muted)',
              lineHeight: 1.6
            }}
          >
            Uno spazio progettato per la collaborazione e l&apos;eccellenza digitale. 
            Il nostro ufficio è il cuore pulsante dove costruiamo il futuro del tuo brand.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
