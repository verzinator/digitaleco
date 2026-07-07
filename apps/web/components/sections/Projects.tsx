'use client'

import { useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

const projectsData = [
  {
    id: '1',
    title: 'Relais Villa Fontana',
    category: 'Web · Google Ads',
    description: 'Sito web e campagna Google Ads per struttura ricettiva di lusso in Toscana.',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=80',
    slug: 'relais-villa-fontana',
  },
  {
    id: '2',
    title: 'Artigiani del Gusto',
    category: 'E-Commerce · SEO',
    description: 'E-commerce con integrazione marketplace per prodotti gastronomici artigianali.',
    image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1200&q=80',
    slug: 'artigiani-gusto',
  },
  {
    id: '3',
    title: 'Studio Legale Meroni',
    category: 'Brand · SEO · Web',
    description: 'Brand identity, sito istituzionale e strategia SEO per studio legale milanese.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80',
    slug: 'studio-legale-meroni',
  },
]

function ProjectCard({
  item,
  index,
}: {
  item: (typeof projectsData)[0]
  index: number
}) {
  const rm = useReducedMotion()
  const isReversed = index % 2 !== 0
  const [hovered, setHovered] = useState(false)

  const cardRadius = hovered && !rm ? 48 : 32
  const imgRadius = cardRadius - 8

  return (
    <motion.article
      initial={rm ? false : { opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{
        duration: 0.9,
        delay: rm ? 0 : 0.15,
        ease: EASE,
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group bg-surface"
      style={{
        overflow: 'hidden',
        borderRadius: `${cardRadius}px`,
        border: '1px solid oklch(from #1A1A2E l c h / 0.08)',
        boxShadow: hovered ? '0 16px 48px oklch(from #1A1A2E l c h / 0.10)' : '0 4px 24px oklch(from #1A1A2E l c h / 0.05)',
        transition: 'border-radius 400ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 400ms cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      <Link
        href={`/portfolio/${item.slug}`}
        className={`grid grid-cols-1 md:grid-cols-[1fr_1fr] no-underline text-inherit ${isReversed ? 'md:[direction:rtl]' : ''}`}
        style={{ padding: '8px' }}
      >
        {/* Image */}
        <div
          className="relative aspect-square md:aspect-square overflow-hidden [direction:ltr]"
          style={{
            borderRadius: `${imgRadius}px`,
            transition: 'border-radius 400ms cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          <motion.div
            className="w-full h-full"
            whileHover={rm ? {} : {
              scale: 1.04,
              transition: { duration: 0.6, ease: EASE },
            }}
          >
            <Image
              src={item.image}
              alt={`Progetto ${item.title}`}
              fill
              sizes="(min-width: 768px) 55vw, 100vw"
              className="object-cover"
            />
          </motion.div>
        </div>

        {/* Content */}
        <div
          className="flex flex-col justify-center [direction:ltr]"
          style={{
            padding: 'clamp(40px, 5vw, 64px) clamp(36px, 5vw, 72px)',
          }}
        >
          {/* Category eyebrow */}
          <p
            className="font-body"
            style={{
              fontSize: '10px',
              fontWeight: 600,
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'var(--color-primary)',
              marginBottom: '16px',
            }}
          >
            {item.category}
          </p>

          {/* Title */}
          <h3
            className="font-display"
            style={{
              fontSize: 'clamp(2rem, 1.2rem + 3vw, 3.5rem)',
              fontWeight: 400,
              fontStyle: 'italic',
              letterSpacing: '-0.02em',
              color: 'var(--color-text)',
              lineHeight: 1.15,
              marginBottom: '16px',
            }}
          >
            {item.title}
          </h3>

          {/* Description */}
          <p
            className="font-body"
            style={{
              fontSize: 'var(--text-base)',
              color: 'var(--color-text-muted)',
              lineHeight: 1.7,
              maxWidth: '440px',
              marginBottom: '28px',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {item.description}
          </p>

          {/* CTA link */}
          <span
            className="font-body inline-flex items-center gap-2"
            style={{
              fontSize: '13px',
              fontWeight: 600,
              letterSpacing: '0.04em',
              color: 'var(--color-primary)',
            }}
          >
            Scopri il progetto
            <ArrowRight
              size={15}
              className="transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1"
            />
          </span>
        </div>
      </Link>
    </motion.article>
  )
}

export default function Projects() {
  const rm = useReducedMotion()

  return (
    <section
      id="projects"
      aria-labelledby="projects-title"
      style={{
        background: 'var(--color-bg)',
        paddingBlock: 'clamp(80px, 10vw, 160px)',
      }}
    >
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 clamp(24px, 4vw, 48px)' }}>
        {/* Header */}
        <motion.div
          initial={rm ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: EASE }}
          style={{ marginBottom: 'clamp(48px, 6vw, 80px)' }}
        >
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '10px',
            fontWeight: 600,
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: 'var(--color-primary)',
            marginBottom: '12px',
          }}>
            Portfolio lavori
          </p>
          <h2
            id="projects-title"
            style={{
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              fontSize: 'clamp(2rem, 1rem + 3.5vw, 3.5rem)',
              lineHeight: 1.1,
              letterSpacing: '-0.035em',
              color: 'var(--color-text)',
            }}
          >
            Quello che abbiamo fatto{' '}
            <em style={{ fontStyle: 'italic', color: 'var(--color-accent)' }}>parla per noi</em>
          </h2>
        </motion.div>

        {/* Stacked cards */}
        <div className="flex flex-col" style={{ gap: 'clamp(64px, 8vw, 120px)' }}>
          {projectsData.map((item, i) => (
            <ProjectCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
