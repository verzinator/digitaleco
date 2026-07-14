'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import AmbientBlobs from '@/components/ui/AmbientBlobs'

const LINES = [
  { text: 'Le idee hanno', dir: 1 },
  { text: 'bisogno di uno', dir: -1 },
  { text: 'spazio per', dir: 1 },
  { text: 'crescere.', dir: -1 },
]

const IMAGES = [
  'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80',
  'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80',
  'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80',
]

function ScrollLine({ text, dir, scrollYProgress }: { text: string; dir: number; scrollYProgress: ReturnType<typeof useScroll>['scrollYProgress'] }) {
  const rm = useReducedMotion()
  const x = useTransform(scrollYProgress, [0, 1], rm ? [0, 0] : [dir * -80, dir * 80])
  const opacity = useTransform(scrollYProgress, [0.25, 0.5], rm ? [1, 1] : [0, 1])

  return (
    <motion.span
      style={{
        x,
        opacity,
        display: 'block',
        fontFamily: 'var(--font-display)',
        fontStyle: 'italic',
        fontSize: 'clamp(3rem, 2rem + 5vw, 7rem)',
        fontWeight: 400,
        color: '#FFFFFF',
        letterSpacing: '-0.03em',
        lineHeight: 1.05,
        whiteSpace: 'nowrap',
        textAlign: 'center',
        textShadow: '0 4px 30px rgba(0,0,0,0.5)',
      }}
    >
      {text}
    </motion.span>
  )
}

function ImageWithOverlay({ src, alt, sizes, overlayOpacity }: { src: string; alt: string; sizes: string; overlayOpacity: ReturnType<typeof useTransform<number, number>> }) {
  return (
    <>
      <Image src={src} alt={alt} fill sizes={sizes} style={{ objectFit: 'cover' }} />
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          background: '#060D09',
          opacity: overlayOpacity,
          pointerEvents: 'none',
        }}
      />
    </>
  )
}

export default function ShowcaseSection() {
  const rm = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const overlayOpacity = useTransform(scrollYProgress, [0.2, 0.5], rm ? [0, 0] : [0, 0.65])

  return (
    <section
      ref={sectionRef}
      aria-label="Showcase"
      style={{
        padding: 'clamp(100px, 12vw, 200px) clamp(24px, 4vw, 48px)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <AmbientBlobs variant="grey" />
      {/* Dot pattern */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='10' cy='10' r='1' fill='%23ffffff12'/%3E%3C/svg%3E")`,
          backgroundSize: '20px 20px',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />

      <style>{`
        .showcase-side-img {
          display: none;
        }
        @media (min-width: 1000px) {
          .showcase-side-img {
            display: block;
          }
        }
      `}</style>

      <div style={{ maxWidth: '1400px', margin: '0 auto', position: 'relative', zIndex: 2 }}>
        <div style={{ position: 'relative' }}>
          {/* Images row — all same height via stretch */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'clamp(16px, 2vw, 32px)',
          }}>
            {/* Left image — desktop only */}
            <div
              className="showcase-side-img"
              style={{
                position: 'relative',
                width: '260px',
                flexShrink: 0,
                aspectRatio: '3 / 4',
                borderRadius: '16px',
                overflow: 'hidden',
              }}
            >
              <ImageWithOverlay src={IMAGES[0]} alt="Lavoro creativo" sizes="200px" overlayOpacity={overlayOpacity} />
            </div>

            {/* Center image */}
            <div style={{
              position: 'relative',
              width: '100%',
              maxWidth: '420px',
              aspectRatio: '3 / 4',
              borderRadius: '24px',
              overflow: 'hidden',
            }}>
              <ImageWithOverlay src={IMAGES[1]} alt="Team al lavoro" sizes="420px" overlayOpacity={overlayOpacity} />
            </div>

            {/* Right image — desktop only */}
            <div
              className="showcase-side-img"
              style={{
                position: 'relative',
                width: '260px',
                flexShrink: 0,
                aspectRatio: '3 / 4',
                borderRadius: '16px',
                overflow: 'hidden',
              }}
            >
              <ImageWithOverlay src={IMAGES[2]} alt="Riunione strategica" sizes="200px" overlayOpacity={overlayOpacity} />
            </div>
          </div>

          {/* Text overlaid — appears with overlay */}
          <div style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'clamp(4px, 1vw, 12px)',
            zIndex: 5,
            pointerEvents: 'none',
          }}>
            <h2 style={{ margin: 0, display: 'contents' }}>
              {LINES.map((line, i) => (
                <ScrollLine key={i} text={line.text} dir={line.dir} scrollYProgress={scrollYProgress} />
              ))}
            </h2>
          </div>
        </div>
      </div>
    </section>
  )
}
