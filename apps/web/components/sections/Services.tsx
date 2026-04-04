'use client'

import { motion, useReducedMotion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import {
  Monitor,
  ShoppingCart,
  Share2,
  Megaphone,
  BarChart3,
  PenTool,
  ArrowRight,
} from 'lucide-react'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

const services = [
  {
    icon: Monitor,
    title: 'Web Design',
    description:
      "Siti web su misura che riflettono l'identità del tuo brand. Dal concept al lancio, curiamo ogni pixel.",
    href: '/soluzioni-digitali',
    color: '#0A5C44',
  },
  {
    icon: ShoppingCart,
    title: 'E-Commerce',
    description:
      'Negozi online performanti e sicuri. Integrazione con i principali gateway di pagamento e piattaforme logistiche.',
    href: '/soluzioni-digitali',
    color: '#2ECC71',
  },
  {
    icon: Share2,
    title: 'Social Media',
    description:
      'Strategia editoriale, contenuti originali e community management per ogni piattaforma social.',
    href: '/soluzioni-digitali',
    color: '#0A5C44',
  },
  {
    icon: Megaphone,
    title: 'Advertising',
    description:
      'Campagne Google Ads, Meta Ads e LinkedIn Ads ottimizzate per il massimo ROI con budget di qualsiasi dimensione.',
    href: '/soluzioni-digitali',
    color: '#2ECC71',
  },
  {
    icon: BarChart3,
    title: 'Analytics & SEO',
    description:
      'Dati che guidano le decisioni. Monitoraggio, reportistica e ottimizzazione continua per crescere online.',
    href: '/soluzioni-digitali',
    color: '#0A5C44',
  },
  {
    icon: PenTool,
    title: 'Brand Identity',
    description:
      'Logo, palette colori, tipografia e brand guidelines che rendono il tuo marchio riconoscibile e memorabile.',
    href: '/soluzioni-digitali',
    color: '#2ECC71',
  },
]

function ServiceCard({
  service,
  index,
}: {
  service: (typeof services)[0]
  index: number
}) {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-60px 0px' })
  const reduceMotion = useReducedMotion()
  const Icon = service.icon

  return (
    <motion.article
      ref={ref}
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.5,
        delay: reduceMotion ? 0 : index * 0.08,
        ease: EASE,
      }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: 'var(--space-8)',
        background: 'var(--color-surface)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-md)',
        boxShadow: 'var(--shadow-sm)',
        transition:
          'box-shadow var(--transition-interactive), transform var(--transition-interactive)',
        textDecoration: 'none',
        position: 'relative',
        overflow: 'hidden',
      }}
      whileHover={
        reduceMotion
          ? {}
          : {
            y: -3,
            boxShadow: '0 12px 32px oklch(0.2 0.01 80 / 0.12)',
          }
      }
    >
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '80px',
          height: '80px',
          background: `radial-gradient(circle at top right, oklch(from ${service.color} l c h / 0.06), transparent 70%)`,
          pointerEvents: 'none',
        }}
      />

      <div
        aria-hidden="true"
        style={{
          width: '52px',
          height: '52px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: `oklch(from ${service.color} l c h / 0.08)`,
          borderRadius: 'var(--radius-sm)',
          marginBottom: 'var(--space-6)',
          flexShrink: 0,
        }}
      >
        <Icon size={24} color={service.color} strokeWidth={1.5} />
      </div>

      <h3
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'var(--text-xl)',
          color: 'var(--color-text)',
          marginBottom: 'var(--space-3)',
          lineHeight: 1.2,
        }}
      >
        {service.title}
      </h3>
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-sm)',
          color: 'var(--color-text-muted)',
          lineHeight: 1.7,
          flex: 1,
          marginBottom: 'var(--space-6)',
        }}
      >
        {service.description}
      </p>

      <Link
        href={service.href}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 'var(--space-2)',
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--text-sm)',
          fontWeight: 600,
          color: 'var(--color-primary)',
          textDecoration: 'none',
          minHeight: '44px',
          transition: 'gap var(--transition-interactive)',
        }}
        onMouseEnter={e => {
          const arrow = e.currentTarget.querySelector('svg')
          if (arrow) arrow.style.transform = 'translateX(4px)'
        }}
        onMouseLeave={e => {
          const arrow = e.currentTarget.querySelector('svg')
          if (arrow) arrow.style.transform = 'translateX(0)'
        }}
        aria-label={`Scopri il servizio ${service.title}`}
      >
        Scopri di più
        <ArrowRight
          size={16}
          aria-hidden="true"
          style={{ transition: 'transform var(--transition-interactive)' }}
        />
      </Link>
    </motion.article>
  )
}

export default function Services() {
  const titleRef = useRef<HTMLDivElement>(null)
  const isTitleInView = useInView(titleRef, { once: true, margin: '-60px 0px' })
  const reduceMotion = useReducedMotion()

  return (
    <section
      id="services"
      aria-labelledby="services-title"
      style={{
        background: 'var(--color-bg)',
        paddingBlock: 'var(--space-24)',
      }}
    >
      <div className="container">
        <motion.div
          ref={titleRef}
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          animate={isTitleInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: EASE }}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            marginBottom: 'var(--space-12)',
          }}
        >
          <p className="eyebrow" style={{ marginBottom: 'var(--space-3)' }}>
            Cosa facciamo
          </p>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              width: '100%',
              flexWrap: 'wrap',
              gap: 'var(--space-6)',
            }}
          >
            <h2
              id="services-title"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-2xl)',
                lineHeight: 1.15,
                color: 'var(--color-text)',
                maxWidth: '480px',
              }}
            >
              Strategie digitali per il tuo successo
            </h2>

          </div>
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 'var(--space-6)',
          }}
        >
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
