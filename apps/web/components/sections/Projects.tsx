'use client'

import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
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
  {
    id: '4',
    title: 'Bottega del Mare',
    tags: ['Web Design', 'E-Commerce', 'Social Media'],
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&q=80',
    slug: 'bottega-del-mare',
  },
]

function ProjectCard({ item, index }: { item: (typeof projectsData)[0]; index: number }) {
  const rm = useReducedMotion()
  const num = String(index + 1).padStart(2, '0')
  const cardRef = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start end', 'start 0.3'],
  })

  const scale = useTransform(scrollYProgress, [0, 1], rm ? [1, 1] : [0.92, 1])
  const opacity = useTransform(scrollYProgress, [0, 0.6], rm ? [1, 1] : [0, 1])
  const y = useTransform(scrollYProgress, [0, 1], rm ? [0, 0] : [60, 0])
  // Image parallax — image moves slower than card
  const imgY = useTransform(scrollYProgress, [0, 1], rm ? [0, 0] : [-20, 20])

  return (
    <motion.article
      ref={cardRef}
      style={{ scale, opacity, y }}
    >
      <Link
        href={`/portfolio/${item.slug}`}
        className="project-card"
        style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
      >
        <div
          className="project-card-inner"
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderRadius: '8px',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            overflow: 'hidden',
            transition: 'background 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease',
          }}
        >
          {/* Image with parallax */}
          <div
            data-cursor="project"
            style={{
              position: 'relative',
              width: '100%',
              aspectRatio: '16 / 9',
              overflow: 'hidden',
            }}
          >
            <motion.div
              style={{ width: '100%', height: '120%', y: imgY, position: 'absolute', top: '-10%', left: 0 }}
              whileHover={rm ? {} : { scale: 1.03 }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <Image
                src={item.image}
                alt={`Progetto ${item.title}`}
                fill
                sizes="1100px"
                style={{ objectFit: 'cover' }}
              />
            </motion.div>
          </div>

          {/* Info below */}
          <div className="project-info-bar" style={{
            padding: 'clamp(16px, 2vw, 24px)',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}>
            <div className="project-title-row" style={{ display: 'flex', alignItems: 'baseline', gap: '12px', minWidth: 0 }}>
              <span style={{
                fontFamily: 'var(--font-body)',
                fontSize: '20px',
                fontWeight: 400,
                color: 'rgba(255, 255, 255, 0.2)',
                letterSpacing: '0.08em',
                flexShrink: 0,
              }}>
                {num}
              </span>
              <h3 style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.3rem, 0.9rem + 1.2vw, 1.8rem)',
                fontWeight: 400,
                fontStyle: 'italic',
                letterSpacing: '-0.02em',
                color: 'rgba(255, 255, 255, 0.9)',
                lineHeight: 1.2,
                margin: 0,
                transition: 'color 0.3s ease',
              }}>
                {item.title}
              </h3>
              <div className="project-tags-desktop" style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginLeft: 'auto' }}>
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: '10px',
                      fontWeight: 500,
                      color: 'rgba(255, 255, 255, 0.5)',
                      letterSpacing: '0.02em',
                      whiteSpace: 'nowrap',
                      padding: '3px 8px',
                      height: '24px',
                      lineHeight: '16px',
                      boxSizing: 'border-box',
                      borderRadius: '999px',
                      border: '1px solid rgba(255, 255, 255, 0.15)',
                      background: 'rgba(255, 255, 255, 0.05)',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="project-tags-mobile" style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '10px',
                    fontWeight: 500,
                    color: 'rgba(255, 255, 255, 0.5)',
                    letterSpacing: '0.02em',
                    whiteSpace: 'nowrap',
                    padding: '3px 8px',
                    height: '24px',
                    lineHeight: '16px',
                    boxSizing: 'border-box',
                    borderRadius: '999px',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    background: 'rgba(255, 255, 255, 0.05)',
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
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
        background: '#0F1410',
        paddingBlock: 'clamp(80px, 10vw, 160px)',
      }}
    >
      <style>{`
        .project-card:hover .project-card-inner {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.14);
          box-shadow: 0 8px 40px rgba(0, 0, 0, 0.25);
        }
        .project-card:hover h3 {
          color: rgba(255, 255, 255, 1) !important;
        }
        .project-tags-desktop {
          display: none !important;
        }
        .project-tags-mobile {
          display: flex !important;
        }
        @media (min-width: 768px) {
          .project-tags-desktop {
            display: flex !important;
          }
          .project-tags-mobile {
            display: none !important;
          }
        }
      `}</style>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 clamp(24px, 4vw, 48px)' }}>
        {/* Header */}
        <motion.h2
          id="projects-title"
          initial={rm ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: EASE }}
          style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 300,
            fontSize: 'clamp(28px, 4vw + 1rem, 68px)',
            lineHeight: 1.1,
            letterSpacing: '-0.035em',
            color: '#F0F5F2',
            margin: '0 auto',
            textAlign: 'center',
            maxWidth: '12em',
            marginBottom: 'clamp(60px, 8vw, 120px)',
          }}
        >
          Quello che abbiamo fatto
          <br />
          <em style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 400, color: 'var(--color-primary)' }}>parla per noi</em>
        </motion.h2>

        {/* Project stack */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'clamp(24px, 3vw, 40px)' }}>
          {projectsData.map((item, i) => (
            <ProjectCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
