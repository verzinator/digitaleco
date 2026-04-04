'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

const portfolioItems = [
  {
    id: '1',
    title: 'Relais Villa Fontana',
    description: 'Sito web e campagna Google Ads per struttura ricettiva di lusso in Toscana.',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80',
    slug: 'ristorante-la-pergola',
  },
  {
    id: '2',
    title: 'Artigiani del Gusto',
    description: 'E-commerce con integrazione marketplace per prodotti gastronomici artigianali.',
    image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=80',
    slug: 'modaverde',
  },
  {
    id: '3',
    title: 'Studio Legale Meroni',
    description: 'Brand identity, sito istituzionale e strategia SEO per studio legale milanese.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
    slug: 'studio-ferretti',
  },
  {
    id: '4',
    title: 'TechFlow SRL',
    description: 'Campagne Meta e LinkedIn Ads con funnel di lead generation B2B.',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80',
    slug: 'fitnesshub',
  },
  {
    id: '5',
    title: 'Oleificio Russo',
    description: 'Brand identity + e-commerce B2B per produttore di olio extravergine.',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800&q=80',
    slug: 'oleificio-russo',
  },
  {
    id: '6',
    title: 'Banca Alpina',
    description: 'Campagne Google & Meta Ads con gestione budget ad alto volume.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
    slug: 'banca-alpina',
  },
]

function PortfolioCard({
  item,
  index,
}: {
  item: (typeof portfolioItems)[0]
  index: number
}) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 0.5,
        delay: reduceMotion ? 0 : (index % 3) * 0.1,
        ease: EASE,
      }}
      style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '16px',
        overflow: 'hidden',
        background: 'var(--color-surface)',
        border: '1px solid rgba(26,26,46,0.08)',
        boxShadow: '0 2px 12px rgba(26,26,46,0.06)',
        transition: 'transform 200ms ease, box-shadow 200ms ease',
        cursor: 'pointer',
      }}
      whileHover={reduceMotion ? {} : { scale: 1.02, boxShadow: '0 8px 32px rgba(26,26,46,0.12)' }}
    >
      <Link
        href={`/portfolio/${item.slug}`}
        style={{
          textDecoration: 'none',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
        aria-label={`Vedi il progetto ${item.title}`}
      >
        <div
          style={{
            position: 'relative',
            aspectRatio: '16/9',
            width: '100%',
            overflow: 'hidden',
          }}
        >
          <Image
            src={item.image}
            alt={`Screenshot del progetto ${item.title}`}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
            loading="lazy"
            style={{ objectFit: 'cover' }}
          />
        </div>

        <div style={{ padding: '24px', textAlign: 'left', flexGrow: 1 }}>
          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-lg)',
              fontWeight: 700,
              color: 'var(--color-text)',
              marginBottom: '12px',
              lineHeight: 1.2,
            }}
          >
            {item.title}
          </h3>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--text-sm)',
              color: 'var(--color-text-muted)',
              lineHeight: 1.65,
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {item.description}
          </p>
        </div>
      </Link>
    </motion.article>
  )
}

export default function Portfolio() {
  const reduceMotion = useReducedMotion()

  return (
    <section
      id="portfolio"
      aria-labelledby="portfolio-title"
      style={{
        background: 'var(--color-bg)',
        paddingBlock: 'var(--space-24)',
      }}
    >
      <div className="container">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: EASE }}
          style={{
            textAlign: 'center',
            marginBottom: 'var(--space-16)',
          }}
        >
          <p className="eyebrow" style={{ marginBottom: 'var(--space-3)' }}>
            I nostri lavori
          </p>
          <h2
            id="portfolio-title"
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'var(--text-3xl)',
              lineHeight: 1.1,
              color: 'var(--color-text)',
              marginInline: 'auto',
              maxWidth: '700px',
            }}
          >
            Progetti che parlano da soli
          </h2>
        </motion.div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 'var(--space-6)',
            marginBottom: 'var(--space-16)',
            alignItems: 'stretch',
          }}
        >
          {portfolioItems.map((item, i) => (
            <PortfolioCard key={item.id} item={item} index={i} />
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Link
            href="/portfolio"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
              fontFamily: 'var(--font-body)',
              fontWeight: 600,
              fontSize: 'var(--text-base)',
              color: 'var(--color-text-inverse)',
              background: 'var(--color-primary)',
              padding: 'var(--space-4) var(--space-10)',
              borderRadius: 'var(--radius-sm)',
              textDecoration: 'none',
              transition: 'transform var(--transition-interactive), background var(--transition-interactive)',
            }}
          >
            Dai un occhio ai nostri lavori
            <ArrowRight size={18} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}
