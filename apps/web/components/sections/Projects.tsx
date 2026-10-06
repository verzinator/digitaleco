'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { PROJECT_HERO_IMAGES } from '@/lib/projects'

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

const projectsData = [
  {
    id: '1',
    title: 'MasterFor',
    tags: ['Analisi', 'Comunicazione', 'Trasformazione Digitale'],
    image: PROJECT_HERO_IMAGES.masterfor,
    slug: 'masterfor',
  },
  {
    id: '2',
    title: 'Villa Irene Cashmere',
    tags: ['Direzione creativa', 'Lookbook', 'Produzione fotografica'],
    image: PROJECT_HERO_IMAGES['villa-irene-cashmere'],
    slug: 'villa-irene-cashmere',
  },
  {
    id: '3',
    title: 'Mondi Piscine',
    tags: ['Content Creation', 'Social Media', 'Reels'],
    image: PROJECT_HERO_IMAGES['mondi-piscine'],
    slug: 'mondi-piscine',
  },
  {
    id: '4',
    title: 'Autodis RTS Group',
    tags: ['Concept creativo', 'Produzione video', 'Riprese POV'],
    image: PROJECT_HERO_IMAGES['autodis-rts'],
    slug: 'autodis-rts',
  },
]

function ProjectCard({ item, index }: { item: (typeof projectsData)[0]; index: number }) {
  const rm = useReducedMotion()

  return (
    <motion.article
      initial={rm ? false : { opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: EASE, delay: rm ? 0 : index * 0.12 }}
      style={{ height: '100%' }}
    >
      <Link
        href={`/portfolio/${item.slug}`}
        className="project-card"
        style={{ textDecoration: 'none', color: 'inherit', display: 'block', height: '100%' }}
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
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            transition: 'background 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease',
          }}
        >
          {/* Immagine verticale: è lei a dare il ritmo alla fila */}
          <div
            className="project-media"
            data-cursor="project"
            style={{
              position: 'relative',
              width: '100%',
              overflow: 'hidden',
            }}
          >
            <Image
              src={item.image}
              alt={`Progetto ${item.title}`}
              fill
              sizes="(max-width: 699px) 100vw, 50vw"
              style={{ objectFit: 'cover' }}
            />
          </div>

          {/* Info below */}
          <div className="project-info-bar" style={{
            padding: 'clamp(16px, 2vw, 24px)',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
            flex: 1,
          }}>
            <h3 style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(1.5rem, 1rem + 1.5vw, 2.2rem)',
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

            <div className="project-tags" style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
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
        .projects-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 40px;
        }
        /* Quattro progetti a coppie, 2x2: in fila da quattro le card erano
           troppo strette per leggere le foto */
        @media (min-width: 700px) {
          .projects-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: clamp(24px, 3vw, 48px);
          }
        }
        /* Da telefono la card occupa tutta la larghezza: con l'immagine 2:3
           diventava piu' alta dello schermo. In colonna sta piu' bassa, e
           torna verticale piena quando le tre card vanno affiancate. */
        .project-media {
          aspect-ratio: 4 / 5;
        }
        @media (min-width: 700px) {
          .project-media {
            aspect-ratio: 3 / 4;
          }
        }
        /* A due colonne su schermo largo la card e' larga: in 2:3 la foto
           supererebbe l'altezza dello schermo */
        @media (min-width: 1100px) {
          .project-media {
            aspect-ratio: 9 / 10;
          }
        }
        .project-card:hover .project-card-inner {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.14);
          box-shadow: 0 8px 40px rgba(0, 0, 0, 0.25);
        }
        .project-card:hover h3 {
          color: rgba(255, 255, 255, 1) !important;
        }
        .project-media img {
          transition: transform 600ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        .project-card:hover .project-media img {
          transform: scale(1.04);
        }
        @media (prefers-reduced-motion: reduce) {
          .project-media img {
            transition: none;
          }
          .project-card:hover .project-media img {
            transform: none;
          }
        }
      `}</style>

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 clamp(24px, 4vw, 48px)' }}>
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

        {/* I progetti, affiancati */}
        <div className="projects-grid">
          {projectsData.map((item, i) => (
            <ProjectCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
