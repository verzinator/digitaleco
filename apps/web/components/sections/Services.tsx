'use client'

import { useRef, useCallback, useEffect, useState } from 'react'
import { motion, useReducedMotion, useInView } from 'framer-motion'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

const SERVICES = [
  {
    title: 'Siti Web',
    subtitle: 'Design che converte',
    illustration: IllustrationWeb,
  },
  {
    title: 'E-Commerce',
    subtitle: 'Vendere online, meglio',
    illustration: IllustrationEcommerce,
  },
  {
    title: 'SEO',
    subtitle: 'Farti trovare su Google',
    illustration: IllustrationSeo,
  },
  {
    title: 'Advertising',
    subtitle: 'Google & Meta Ads',
    illustration: IllustrationAds,
  },
  {
    title: 'Social Media',
    subtitle: 'Presenza che conta',
    illustration: IllustrationSocial,
  },
  {
    title: 'Branding',
    subtitle: 'Identità memorabile',
    illustration: IllustrationBranding,
  },
]

function ServiceCard({
  service,
  index,
}: {
  service: (typeof SERVICES)[0]
  index: number
}) {
  const Illustration = service.illustration
  const rm = useReducedMotion()
  const cardRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(cardRef, { once: true, margin: '-50px' })

  return (
    <div
      ref={cardRef}
      style={{
        background: '#222824',
        borderRadius: '20px',
        border: 'none',
        padding: 'clamp(28px, 3vw, 40px) clamp(24px, 2.5vw, 32px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        gap: '0',
        aspectRatio: 'auto',
        overflow: 'hidden',
        transition: 'border-color 0.4s ease, background 0.4s ease',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = '#0A2E22'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = '#222824'
      }}
    >
      {/* Title */}
      <h3
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.4rem, 1rem + 1.5vw, 2rem)',
          fontWeight: 400,
          fontStyle: 'italic',
          letterSpacing: '-0.02em',
          lineHeight: 1.1,
          color: '#F8F9FA',
          margin: '0 0 8px 0',
        }}
      >
        {service.title}
      </h3>

      {/* Subtitle */}
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '13px',
          fontWeight: 400,
          color: 'rgba(248,249,250,0.45)',
          letterSpacing: '0.01em',
          margin: '0 0 clamp(28px, 3vw, 44px) 0',
          lineHeight: 1.4,
        }}
      >
        {service.subtitle}
      </p>

      {/* Illustration */}
      <div
        className={!rm && isInView ? 'svg-draw-active' : ''}
        style={{
          width: '100%',
          maxWidth: '200px',
          aspectRatio: '1',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Illustration />
      </div>
    </div>
  )
}

const GAP = 20
const SPEED = 0.5 // px per frame

function Marquee() {
  const trackRef = useRef<HTMLDivElement>(null)
  const offsetRef = useRef(0)
  const frameRef = useRef<number>(0)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    function tick() {
      if (!track) return
      offsetRef.current -= SPEED

      // Get width of one set (first half of children)
      const children = track.children
      const halfCount = children.length / 2
      let setWidth = 0
      for (let i = 0; i < halfCount; i++) {
        setWidth += (children[i] as HTMLElement).offsetWidth + GAP
      }

      // When scrolled past one full set, reset
      if (Math.abs(offsetRef.current) >= setWidth) {
        offsetRef.current += setWidth
      }

      track.style.transform = `translateX(${offsetRef.current}px)`
      frameRef.current = requestAnimationFrame(tick)
    }

    frameRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameRef.current)
  }, [])

  // Render enough copies to always fill screen
  const items = [...SERVICES, ...SERVICES, ...SERVICES]

  return (
    <div style={{ position: 'relative', zIndex: 1, overflow: 'hidden' }}>
      <div
        ref={trackRef}
        style={{
          display: 'flex',
          gap: `${GAP}px`,
          width: 'max-content',
          willChange: 'transform',
        }}
      >
        {items.map((service, i) => (
          <div
            key={`${service.title}-${i}`}
            style={{ width: 'clamp(260px, 28vw, 340px)', flexShrink: 0 }}
          >
            <ServiceCard service={service} index={i % SERVICES.length} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Services() {
  const rm = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (rm || !dotRef.current) return
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100
    dotRef.current.style.backgroundPosition = `${x}% ${y}%`
  }, [rm])

  return (
    <section
      ref={sectionRef}
      id="servizi"
      aria-labelledby="services-title"
      onMouseMove={handleMouseMove}
      style={{
        background: '#0F1410',
        paddingTop: 'clamp(80px, 10vw, 140px)',
        paddingBottom: 'clamp(80px, 10vw, 140px)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Dot pattern overlay */}
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(circle, rgba(46,204,113,0.08) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          backgroundPosition: '50% 50%',
          transition: 'background-position 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1, padding: '0 clamp(24px, 4vw, 48px)' }}>
        {/* Header */}
        <motion.div
          initial={rm ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, ease: EASE }}
          style={{ marginBottom: 'clamp(48px, 6vw, 72px)' }}
        >
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '10px',
              fontWeight: 600,
              letterSpacing: '0.25em',
              textTransform: 'uppercase',
              color: 'var(--color-accent)',
              marginBottom: '12px',
            }}
          >
            Cosa facciamo
          </p>
          <h2
            id="services-title"
            style={{
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              fontSize: 'clamp(2rem, 1rem + 3.5vw, 3.5rem)',
              lineHeight: 1.1,
              letterSpacing: '-0.035em',
              color: '#F8F9FA',
              margin: 0,
            }}
          >
            Ogni servizio, un{' '}
            <em style={{ fontStyle: 'italic', color: 'var(--color-accent)' }}>risultato</em>
          </h2>
        </motion.div>

      </div>

      {/* Marquee — JS-driven infinite scroll */}
      <Marquee />

      {/* SVG draw animation styles */}
      <style>{`
        @keyframes svg-draw {
          to { stroke-dashoffset: 0; }
        }
        .svg-draw-active path,
        .svg-draw-active line,
        .svg-draw-active circle,
        .svg-draw-active rect,
        .svg-draw-active polyline {
          stroke-dasharray: 500;
          stroke-dashoffset: 500;
          animation: svg-draw 3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .svg-draw-active path:nth-child(2) { animation-delay: 0.08s; }
        .svg-draw-active path:nth-child(3) { animation-delay: 0.16s; }
        .svg-draw-active path:nth-child(4) { animation-delay: 0.24s; }
        .svg-draw-active line:nth-of-type(1) { animation-delay: 0.1s; }
        .svg-draw-active line:nth-of-type(2) { animation-delay: 0.18s; }
        .svg-draw-active line:nth-of-type(3) { animation-delay: 0.26s; }
        .svg-draw-active line:nth-of-type(4) { animation-delay: 0.34s; }
        .svg-draw-active line:nth-of-type(5) { animation-delay: 0.42s; }
        .svg-draw-active circle:nth-of-type(1) { animation-delay: 0.12s; }
        .svg-draw-active circle:nth-of-type(2) { animation-delay: 0.2s; }
        .svg-draw-active circle:nth-of-type(3) { animation-delay: 0.28s; }
        .svg-draw-active circle:nth-of-type(4) { animation-delay: 0.36s; }
        .svg-draw-active circle:nth-of-type(5) { animation-delay: 0.44s; }
        .svg-draw-active circle:nth-of-type(6) { animation-delay: 0.52s; }
        .svg-draw-active rect:nth-of-type(1) { animation-delay: 0.06s; }
        .svg-draw-active rect:nth-of-type(2) { animation-delay: 0.14s; }
        .svg-draw-active rect:nth-of-type(3) { animation-delay: 0.22s; }
        .svg-draw-active rect:nth-of-type(4) { animation-delay: 0.3s; }
        .svg-draw-active rect:nth-of-type(5) { animation-delay: 0.38s; }
        .svg-draw-active rect:nth-of-type(6) { animation-delay: 0.46s; }
      `}</style>
    </section>
  )
}

/* ─── SVG Illustrations ─── */

const S = { stroke: 'rgba(46,204,113,0.5)', fill: 'none', strokeWidth: 1 }
const SA = { stroke: 'rgba(248,249,250,0.12)', fill: 'none', strokeWidth: 0.5 }
const SG = { stroke: 'rgba(46,204,113,0.25)', fill: 'none', strokeWidth: 0.5 }

function IllustrationWeb() {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      {/* Browser window */}
      <rect x="20" y="30" width="160" height="120" rx="8" {...S} />
      <line x1="20" y1="52" x2="180" y2="52" {...S} />
      {/* Browser dots */}
      <circle cx="35" cy="41" r="3" {...S} />
      <circle cx="47" cy="41" r="3" {...S} />
      <circle cx="59" cy="41" r="3" {...S} />
      {/* URL bar */}
      <rect x="72" y="37" width="90" height="8" rx="4" {...SA} />
      {/* Content lines */}
      <rect x="36" y="68" width="60" height="4" rx="2" stroke="rgba(10,92,68,0.35)" fill="none" strokeWidth={0.8} />
      <rect x="36" y="80" width="80" height="3" rx="1.5" {...SA} />
      <rect x="36" y="88" width="70" height="3" rx="1.5" {...SA} />
      <rect x="36" y="96" width="75" height="3" rx="1.5" {...SA} />
      {/* Image placeholder */}
      <rect x="130" y="68" width="36" height="36" rx="4" {...SG} />
      {/* CTA button */}
      <rect x="36" y="116" width="48" height="16" rx="4" stroke="rgba(10,92,68,0.5)" fill="rgba(10,92,68,0.06)" strokeWidth={0.8} />
      {/* Grid lines background */}
      <line x1="100" y1="160" x2="100" y2="180" {...SA} />
      <line x1="80" y1="170" x2="120" y2="170" {...SA} />
      {/* Floating elements */}
      <circle cx="170" cy="170" r="12" {...SG} strokeDasharray="3 3" />
      <rect x="18" y="160" width="24" height="24" rx="6" {...SG} strokeDasharray="3 3" />
    </svg>
  )
}

function IllustrationEcommerce() {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      {/* Shopping bag */}
      <path d="M55 75 L55 160 Q55 170 65 170 L135 170 Q145 170 145 160 L145 75 Z" {...S} />
      {/* Bag handles */}
      <path d="M75 75 L75 55 Q75 35 100 35 Q125 35 125 55 L125 75" {...S} />
      {/* Tag */}
      <circle cx="100" cy="55" r="4" stroke="rgba(10,92,68,0.5)" fill="none" strokeWidth={0.8} />
      {/* Product lines inside bag */}
      <rect x="70" y="95" width="60" height="4" rx="2" {...SA} />
      <rect x="75" y="107" width="50" height="3" rx="1.5" {...SA} />
      {/* Price tag */}
      <rect x="80" y="125" width="40" height="18" rx="4" stroke="rgba(10,92,68,0.35)" fill="rgba(46,204,113,0.06)" strokeWidth={0.8} />
      <rect x="88" y="131" width="24" height="5" rx="2.5" stroke="rgba(10,92,68,0.2)" fill="none" strokeWidth={0.5} />
      {/* Floating cart icon */}
      <circle cx="160" cy="45" r="16" {...SG} strokeDasharray="3 3" />
      {/* Stars */}
      <circle cx="35" cy="100" r="2" fill="rgba(10,92,68,0.2)" />
      <circle cx="170" cy="140" r="2" fill="rgba(10,92,68,0.2)" />
      <circle cx="40" cy="50" r="1.5" fill="rgba(10,92,68,0.15)" />
      {/* Growth arrow */}
      <path d="M155 180 L175 160" {...SG} />
      <path d="M168 160 L175 160 L175 167" stroke="rgba(10,92,68,0.2)" fill="none" strokeWidth={0.5} />
    </svg>
  )
}

function IllustrationSeo() {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      {/* Magnifying glass */}
      <circle cx="90" cy="85" r="40" {...S} />
      <line x1="120" y1="115" x2="155" y2="150" stroke="rgba(10,92,68,0.4)" strokeWidth={2} strokeLinecap="round" />
      {/* Search lines inside lens */}
      <rect x="68" y="72" width="44" height="3" rx="1.5" stroke="rgba(10,92,68,0.35)" fill="none" strokeWidth={0.8} />
      <rect x="68" y="82" width="36" height="3" rx="1.5" {...SA} />
      <rect x="68" y="92" width="40" height="3" rx="1.5" {...SA} />
      {/* Chart behind */}
      <path d="M30 170 L30 140 L60 125 L90 135 L120 110 L150 100 L180 85" {...SG} />
      <path d="M30 170 L180 170" {...SA} />
      {/* Ranking dots */}
      <circle cx="60" cy="125" r="3" stroke="rgba(10,92,68,0.35)" fill="rgba(10,92,68,0.08)" strokeWidth={0.6} />
      <circle cx="120" cy="110" r="3" stroke="rgba(10,92,68,0.35)" fill="rgba(10,92,68,0.08)" strokeWidth={0.6} />
      <circle cx="180" cy="85" r="3" stroke="rgba(10,92,68,0.5)" fill="rgba(10,92,68,0.1)" strokeWidth={0.6} />
      {/* Arrow up */}
      <path d="M170 50 L170 30" stroke="rgba(10,92,68,0.4)" strokeWidth={1} />
      <path d="M164 36 L170 30 L176 36" stroke="rgba(10,92,68,0.4)" strokeWidth={1} fill="none" />
    </svg>
  )
}

function IllustrationAds() {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      {/* Target / bullseye */}
      <circle cx="100" cy="100" r="65" {...SA} />
      <circle cx="100" cy="100" r="45" {...SG} />
      <circle cx="100" cy="100" r="25" stroke="rgba(10,92,68,0.35)" fill="none" strokeWidth={0.8} />
      <circle cx="100" cy="100" r="6" stroke="rgba(10,92,68,0.55)" fill="rgba(10,92,68,0.1)" strokeWidth={1} />
      {/* Crosshair lines */}
      <line x1="100" y1="25" x2="100" y2="70" {...SA} />
      <line x1="100" y1="130" x2="100" y2="175" {...SA} />
      <line x1="25" y1="100" x2="70" y2="100" {...SA} />
      <line x1="130" y1="100" x2="175" y2="100" {...SA} />
      {/* Data points */}
      <circle cx="78" cy="72" r="4" stroke="rgba(10,92,68,0.4)" fill="rgba(10,92,68,0.08)" strokeWidth={0.8} />
      <circle cx="130" cy="82" r="3" stroke="rgba(10,92,68,0.35)" fill="rgba(10,92,68,0.06)" strokeWidth={0.6} />
      <circle cx="110" cy="125" r="3.5" stroke="rgba(10,92,68,0.35)" fill="rgba(10,92,68,0.06)" strokeWidth={0.6} />
      {/* Connecting lines */}
      <line x1="78" y1="72" x2="100" y2="100" {...SG} strokeDasharray="3 3" />
      <line x1="130" y1="82" x2="100" y2="100" {...SG} strokeDasharray="3 3" />
      <line x1="110" y1="125" x2="100" y2="100" {...SG} strokeDasharray="3 3" />
    </svg>
  )
}

function IllustrationSocial() {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      {/* Central node */}
      <circle cx="100" cy="100" r="20" {...S} />
      <circle cx="100" cy="100" r="6" fill="rgba(10,92,68,0.15)" stroke="rgba(10,92,68,0.4)" strokeWidth={0.8} />
      {/* Orbiting nodes */}
      <circle cx="50" cy="50" r="14" stroke="rgba(46,204,113,0.35)" fill="none" strokeWidth={0.8} />
      <circle cx="155" cy="55" r="12" stroke="rgba(46,204,113,0.35)" fill="none" strokeWidth={0.8} />
      <circle cx="45" cy="145" r="10" stroke="rgba(46,204,113,0.35)" fill="none" strokeWidth={0.8} />
      <circle cx="160" cy="140" r="15" stroke="rgba(46,204,113,0.35)" fill="none" strokeWidth={0.8} />
      <circle cx="100" cy="175" r="11" stroke="rgba(46,204,113,0.35)" fill="none" strokeWidth={0.8} />
      {/* Connection lines */}
      <line x1="62" y1="60" x2="84" y2="84" {...SG} />
      <line x1="145" y1="63" x2="116" y2="86" {...SG} />
      <line x1="53" y1="138" x2="84" y2="114" {...SG} />
      <line x1="148" y1="132" x2="116" y2="112" {...SG} />
      <line x1="100" y1="165" x2="100" y2="120" {...SG} />
      {/* Orbit ring */}
      <circle cx="100" cy="100" r="68" {...SA} strokeDasharray="4 6" />
      {/* Pulse rings */}
      <circle cx="100" cy="100" r="35" {...SA} strokeDasharray="2 8" />
      {/* Small interaction dots */}
      <circle cx="50" cy="50" r="3" fill="rgba(10,92,68,0.1)" />
      <circle cx="155" cy="55" r="3" fill="rgba(10,92,68,0.1)" />
      <circle cx="160" cy="140" r="3" fill="rgba(10,92,68,0.1)" />
    </svg>
  )
}

function IllustrationBranding() {
  return (
    <svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      {/* Diamond shape */}
      <path d="M100 25 L165 100 L100 175 L35 100 Z" {...S} />
      {/* Inner diamond */}
      <path d="M100 55 L140 100 L100 145 L60 100 Z" stroke="rgba(46,204,113,0.35)" fill="none" strokeWidth={0.8} />
      {/* Core */}
      <path d="M100 80 L120 100 L100 120 L80 100 Z" stroke="rgba(10,92,68,0.4)" fill="rgba(46,204,113,0.06)" strokeWidth={0.8} />
      {/* Horizontal & vertical axis */}
      <line x1="35" y1="100" x2="165" y2="100" {...SA} />
      <line x1="100" y1="25" x2="100" y2="175" {...SA} />
      {/* Corner accents */}
      <circle cx="100" cy="25" r="3" stroke="rgba(10,92,68,0.35)" fill="rgba(10,92,68,0.08)" strokeWidth={0.6} />
      <circle cx="165" cy="100" r="3" stroke="rgba(10,92,68,0.35)" fill="rgba(10,92,68,0.08)" strokeWidth={0.6} />
      <circle cx="100" cy="175" r="3" stroke="rgba(10,92,68,0.35)" fill="rgba(10,92,68,0.08)" strokeWidth={0.6} />
      <circle cx="35" cy="100" r="3" stroke="rgba(10,92,68,0.35)" fill="rgba(10,92,68,0.08)" strokeWidth={0.6} />
      {/* Radiating guidelines */}
      <line x1="67" y1="62" x2="50" y2="45" {...SA} strokeDasharray="2 4" />
      <line x1="133" y1="62" x2="150" y2="45" {...SA} strokeDasharray="2 4" />
      <line x1="133" y1="138" x2="150" y2="155" {...SA} strokeDasharray="2 4" />
      <line x1="67" y1="138" x2="50" y2="155" {...SA} strokeDasharray="2 4" />
    </svg>
  )
}
