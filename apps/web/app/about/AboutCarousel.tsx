'use client'

import { useRef, useCallback } from 'react'
import Link from 'next/link'
import { useReducedMotion } from 'framer-motion'

const projects = [
  {
    title: 'Ristorante La Pergola',
    category: 'Web Design',
    href: '/portfolio/ristorante-la-pergola',
    image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=1200&q=80',
  },
  {
    title: 'ModaVerde',
    category: 'E-Commerce',
    href: '/portfolio/modaverde',
    image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1200&q=80',
  },
  {
    title: 'Studio Legale Ferretti',
    category: 'Web Design',
    href: '/portfolio/studio-ferretti',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80',
  },
  {
    title: 'FitnessHub Italia',
    category: 'Social Media',
    href: '/portfolio/fitnesshub',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200&q=80',
  },
  {
    title: 'Oleificio Russo',
    category: 'E-Commerce',
    href: '/portfolio/oleificio-russo',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=1200&q=80',
  },
  {
    title: 'Banca Regionale Alpina',
    category: 'Advertising',
    href: '/portfolio/banca-alpina',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80',
  },
]

export default function AboutCarousel() {
  const trackRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()

  const scrollByCard = useCallback(
    (dir: 1 | -1) => {
      const track = trackRef.current
      if (!track) return
      const firstCard = track.querySelector<HTMLElement>('.carousel-card')
      if (!firstCard) return
      const cardWidth = firstCard.offsetWidth + 24
      track.scrollBy({
        left: dir * cardWidth,
        behavior: reduceMotion ? 'instant' : 'smooth',
      })
    },
    [reduceMotion],
  )

  return (
    <>
      <style>{`
        .carousel-track::-webkit-scrollbar { display: none; }
        .carousel-card img { transition: transform 400ms cubic-bezier(0.16, 1, 0.3, 1); }
        .carousel-card:hover img { transform: scale(1.04); }
        .carousel-nav-btn:hover {
          background: var(--color-surface-offset) !important;
          border-color: var(--color-primary) !important;
        }
      `}</style>

      {/* Track */}
      <div
        ref={trackRef}
        className="carousel-track"
        style={{
          display: 'flex',
          gap: '24px',
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          scrollbarWidth: 'none',
          paddingInline: 'max(var(--space-6), calc((100vw - 900px) / 2))',
          paddingBlock: 'var(--space-4)',
        }}
      >
        {projects.map((project) => (
          <Link
            key={project.href}
            href={project.href}
            className="carousel-card"
            aria-label={`Vedi progetto: ${project.title}`}
            style={{
              flex: '0 0 min(70vw, 840px)',
              aspectRatio: '16 / 9',
              position: 'relative',
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden',
              scrollSnapAlign: 'center',
              display: 'block',
              boxShadow: 'var(--shadow-lg)',
              textDecoration: 'none',
            }}
          >
            {/* Image */}
            <img
              src={project.image}
              alt={project.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />

            {/* Gradient overlay */}
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(to top, rgba(10,20,15,0.82) 0%, rgba(10,20,15,0.20) 50%, transparent 100%)',
              }}
            />

            {/* Info */}
            <div
              style={{
                position: 'absolute',
                bottom: 'var(--space-6)',
                left: 'var(--space-6)',
              }}
            >
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: 'var(--text-xs)',
                  fontWeight: 700,
                  letterSpacing: '0.10em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.65)',
                  marginBottom: '4px',
                }}
              >
                {project.category}
              </p>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'var(--text-xl)',
                  fontWeight: 700,
                  color: '#FFFFFF',
                  lineHeight: 1.2,
                }}
              >
                {project.title}
              </h3>
            </div>
          </Link>
        ))}
      </div>

      {/* Navigation buttons */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 'var(--space-4)',
          marginTop: 'var(--space-8)',
        }}
      >
        <button
          onClick={() => scrollByCard(-1)}
          aria-label="Progetto precedente"
          className="carousel-nav-btn"
          style={{
            width: '52px',
            height: '52px',
            borderRadius: '50%',
            border: '1px solid var(--color-border)',
            background: 'var(--color-surface)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition:
              'background var(--transition-interactive), border-color var(--transition-interactive)',
            flexShrink: 0,
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M12.5 15L7.5 10L12.5 5"
              stroke="var(--color-text)"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <button
          onClick={() => scrollByCard(1)}
          aria-label="Progetto successivo"
          className="carousel-nav-btn"
          style={{
            width: '52px',
            height: '52px',
            borderRadius: '50%',
            border: '1px solid var(--color-border)',
            background: 'var(--color-surface)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition:
              'background var(--transition-interactive), border-color var(--transition-interactive)',
            flexShrink: 0,
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M7.5 15L12.5 10L7.5 5"
              stroke="var(--color-text)"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </>
  )
}
