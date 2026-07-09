'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

const projectsData = [
  {
    id: '1',
    title: 'Relais Villa Fontana',
    tags: ['Web Design', 'Sviluppo Sito', 'Google Ads', 'SEO'],
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1600&q=80',
    slug: 'relais-villa-fontana',
  },
  {
    id: '2',
    title: 'Artigiani del Gusto',
    tags: ['E-Commerce', 'Sviluppo Sito', 'SEO'],
    image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1600&q=80',
    slug: 'artigiani-gusto',
  },
  {
    id: '3',
    title: 'Studio Legale Meroni',
    tags: ['Branding', 'Web Design', 'SEO'],
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80',
    slug: 'studio-legale-meroni',
  },
]

function ProjectCard({ item, index }: { item: (typeof projectsData)[0]; index: number }) {
  const rm = useReducedMotion()
  const num = String(index + 1).padStart(2, '0')

  return (
    <motion.article
      initial={rm ? false : { opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.9, delay: 0.05, ease: EASE }}
    >
      <Link
        href={`/portfolio/${item.slug}`}
        className="group"
        style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
      >
        {/* Image first — full width */}
        <div
          data-cursor="project"
          className="project-image-container"
          style={{
            position: 'relative',
            width: '100%',
            aspectRatio: '16 / 9',
            borderRadius: '8px',
            overflow: 'hidden',
          }}
        >
          <style>{`
            @media (max-width: 640px) {
              .project-image-container {
                aspect-ratio: 4 / 3 !important;
                margin-left: calc(-1 * clamp(24px, 4vw, 48px) + 12px) !important;
                margin-right: calc(-1 * clamp(24px, 4vw, 48px) + 12px) !important;
                width: auto !important;
                border-radius: 12px !important;
              }
            }
          `}</style>
          <motion.div
            style={{ width: '100%', height: '100%' }}
            whileHover={rm ? {} : { scale: 1.03 }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <Image
              src={item.image}
              alt={`Progetto ${item.title}`}
              fill
              sizes="100vw"
              style={{ objectFit: 'cover' }}
            />
          </motion.div>
        </div>

        {/* Info bar below image — number + title left, tags right */}
        <div className={`project-info-bar-${index}`} style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          gap: 'clamp(16px, 3vw, 32px)',
          paddingTop: 'clamp(12px, 1.5vw, 20px)',
        }}>
          <style>{`
            .project-info-bar-${index} {
              flex-wrap: nowrap;
            }
            @media (max-width: 640px) {
              .project-info-bar-${index} {
                flex-wrap: wrap !important;
              }
            }
          `}</style>

          <div style={{ display: 'flex', alignItems: 'baseline', gap: 'clamp(12px, 2vw, 24px)', minWidth: 0 }}>
            {/* Number */}
            <span style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(11px, 0.9vw, 13px)',
              fontWeight: 400,
              color: 'rgba(6, 13, 9, 0.3)',
              letterSpacing: '0.08em',
              flexShrink: 0,
            }}>
              {num}
            </span>

            {/* Title */}
            <h3 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.4rem, 1rem + 1.8vw, 2.2rem)',
              fontWeight: 400,
              fontStyle: 'italic',
              letterSpacing: '-0.02em',
              color: '#060D09',
              lineHeight: 1.2,
              margin: 0,
              transition: 'color 0.3s ease',
            }}>
              {item.title}
            </h3>
          </div>

          {/* Tags — pill style */}
          <div style={{
            display: 'flex',
            gap: '8px',
            flexWrap: 'wrap',
            flexShrink: 0,
          }}>
            {item.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'clamp(10px, 0.8vw, 12px)',
                  fontWeight: 500,
                  color: 'rgba(6, 13, 9, 0.6)',
                  letterSpacing: '0.02em',
                  whiteSpace: 'nowrap',
                  padding: '5px 12px',
                  borderRadius: '999px',
                  border: '1px solid rgba(6, 13, 9, 0.12)',
                  background: 'rgba(6, 13, 9, 0.04)',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
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
        position: 'relative',
        background: '#F5F5F3',
        paddingBlock: 'clamp(80px, 10vw, 160px)',
      }}
    >
      {/* Dot pattern */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'radial-gradient(rgba(0, 0, 0, 0.1) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
          backgroundAttachment: 'fixed',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />
      <div style={{ position: 'relative', zIndex: 2, maxWidth: '1400px', margin: '0 auto', padding: '0 clamp(24px, 4vw, 48px)' }}>
        {/* Header — title left, description right, same level */}
        <motion.h2
          id="projects-title"
          className="projects-title"
          initial={rm ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: EASE }}
          style={{
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            fontSize: 'clamp(2.2rem, 1rem + 4vw, 4rem)',
            lineHeight: 1.05,
            letterSpacing: '-0.035em',
            color: '#060D09',
            margin: 0,
            maxWidth: '8em',
            marginBottom: 'clamp(80px, 12vw, 180px)',
          }}
        >
          <style>{`
            @media (max-width: 768px) {
              .projects-title {
                max-width: none !important;
              }
            }
          `}</style>
          Quello che abbiamo fatto{' '}
          <em style={{ fontStyle: 'italic', color: 'var(--color-primary)' }}>parla per noi</em>
        </motion.h2>

        {/* Project list */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(80px, 10vw, 140px)' }}>
          {projectsData.map((item, i) => (
            <ProjectCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
