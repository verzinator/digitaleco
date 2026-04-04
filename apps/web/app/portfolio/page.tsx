'use client'

import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

const projects = [
  {
    title: 'Relais Villa Fontana',
    description: 'Sito web e campagna Google Ads per struttura ricettiva di lusso in Toscana.',
    bg: 'linear-gradient(135deg, #0A5C44 0%, #0d7a5c 100%)',
  },
  {
    title: 'Artigiani del Gusto',
    description: 'E-commerce con integrazione marketplace per prodotti gastronomici artigianali.',
    bg: 'linear-gradient(135deg, #063329 0%, #0A5C44 100%)',
  },
  {
    title: 'Studio Legale Meroni',
    description: 'Brand identity, sito istituzionale e strategia SEO per studio legale milanese.',
    bg: 'linear-gradient(135deg, #084a37 0%, #0d7a5c 100%)',
  },
  {
    title: 'TechFlow SRL',
    description: 'Campagne Meta e LinkedIn Ads con funnel di lead generation B2B.',
    bg: 'linear-gradient(135deg, #0d7a5c 0%, #2ECC71 100%)',
  },
  {
    title: 'Moda Italiana Export',
    description: 'Strategia di export digitale verso mercati tedeschi e francesi con localizzazione.',
    bg: 'linear-gradient(135deg, #0A5C44 0%, #084a37 100%)',
  },
  {
    title: 'Clinica Sorriso',
    description: 'Social media management e video referenziali per studio odontoiatrico.',
    bg: 'linear-gradient(135deg, #063329 0%, #0d7a5c 100%)',
  },
  {
    title: 'Costruzioni Bianchi',
    description: 'Comunicazione aziendale e PR digitale per impresa edile di medie dimensioni.',
    bg: 'linear-gradient(135deg, #0d7a5c 0%, #0A5C44 100%)',
  },
  {
    title: 'PetWorld Italia',
    description: 'Gestione Amazon e Zalando con ottimizzazione listing e campagne Sponsored.',
    bg: 'linear-gradient(135deg, #084a37 0%, #063329 100%)',
  },
  {
    title: 'Accademia Digitale',
    description: 'Chatbot AI, automazione processi e content marketing per ente formativo.',
    bg: 'linear-gradient(135deg, #0A5C44 0%, #2ECC71 100%)',
  },
]

const projectIcons = [
  // Hotel/villa
  <svg key="0" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>,
  // Shopping bag
  <svg key="1" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>,
  // Briefcase
  <svg key="2" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>,
  // Trending up
  <svg key="3" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
  // Globe
  <svg key="4" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
  // Video
  <svg key="5" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2"/></svg>,
  // Building
  <svg key="6" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="9" y1="22" x2="9" y2="2"/><line x1="15" y1="22" x2="15" y2="2"/><line x1="4" y1="7" x2="20" y2="7"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="17" x2="20" y2="17"/></svg>,
  // Package/box
  <svg key="7" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>,
  // CPU/AI
  <svg key="8" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="4" y="4" width="16" height="16" rx="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="14" x2="23" y2="14"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="14" x2="4" y2="14"/></svg>,
]

export default function PortfolioPage() {
  return (
    <>
      <style>{`
        .port-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        .port-card {
          border-radius: 16px;
          overflow: hidden;
          background: var(--color-surface);
          border: 1px solid rgba(26,26,46,0.08);
          box-shadow: 0 2px 12px rgba(26,26,46,0.06);
          transition: transform 200ms ease, box-shadow 200ms ease;
          cursor: pointer;
        }
        .port-card:hover {
          transform: scale(1.02);
          box-shadow: 0 8px 32px rgba(26,26,46,0.12);
        }
        .port-form input,
        .port-form textarea {
          width: 100%;
          border: 1.5px solid rgba(26,26,46,0.15);
          border-radius: 8px;
          padding: 12px;
          font-family: var(--font-body);
          font-size: var(--text-base);
          color: var(--color-text);
          background: var(--color-surface);
          outline: none;
          transition: border-color 150ms ease;
          box-sizing: border-box;
        }
        .port-form input:focus,
        .port-form textarea:focus {
          border-color: var(--color-primary);
        }
        .port-submit:hover {
          background: #25b863 !important;
        }
        @media (max-width: 900px) {
          .port-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        @media (max-width: 600px) {
          .port-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      <Navbar />

      <main id="main-content" tabIndex={-1}>

        {/* ── Hero ── */}
        <section
          aria-label="Intestazione pagina portfolio"
          style={{
            paddingTop: 'calc(72px + var(--space-20))',
            paddingBottom: 'var(--space-24)',
            background: 'var(--color-bg)',
            textAlign: 'center',
          }}
        >
          <div className="container">
            <p className="eyebrow" style={{ marginBottom: 'var(--space-3)' }}>
              Lasciati ispirare da chi ha già creduto nell&apos;innovazione
            </p>
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-3xl)',
                lineHeight: 1.1,
                color: 'var(--color-text)',
                marginBottom: 'var(--space-6)',
              }}
            >
              Best Project
            </h1>
          </div>
        </section>

        {/* ── Projects Grid ── */}
        <section
          style={{
            paddingTop: 'var(--space-4)',
            paddingBottom: 'var(--space-24)',
            background: 'var(--color-bg)',
          }}
        >
          <div className="container">
            <div className="port-grid">
              {projects.map((project, i) => (
                <article key={project.title} className="port-card">
                  {/* Image area 16/9 */}
                  <div
                    style={{
                      aspectRatio: '16/9',
                      background: project.bg,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        position: 'absolute',
                        inset: 0,
                        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)',
                        backgroundSize: '18px 18px',
                      }}
                    />
                    {projectIcons[i]}
                  </div>
                  {/* Text */}
                  <div style={{ padding: '24px', textAlign: 'left' }}>
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
                      {project.title}
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
                      {project.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── Contact Form ── */}
        <section
          style={{
            background: 'var(--color-surface-offset)',
            paddingBlock: 'var(--space-24)',
          }}
        >
          <div className="container">
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-2xl)',
                color: 'var(--color-text)',
                textAlign: 'center',
                lineHeight: 1.15,
                maxWidth: '600px',
                margin: '0 auto var(--space-12)',
              }}
            >
              Hai un&apos;idea pazzesca? Vediamo come crearla assieme
            </h2>

            <form
              className="port-form"
              style={{
                maxWidth: '600px',
                margin: '0 auto',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-4)',
              }}
              onSubmit={e => e.preventDefault()}
            >
              <input type="text" name="name" placeholder="Nome e cognome" required />
              <input type="text" name="company" placeholder="Azienda" />
              <input type="email" name="email" placeholder="Email" required />
              <input type="tel" name="phone" placeholder="Telefono" />
              <textarea
                name="message"
                placeholder="Raccontaci il tuo progetto..."
                rows={5}
                required
                style={{ resize: 'vertical' }}
              />
              <div style={{ textAlign: 'center', marginTop: 'var(--space-2)' }}>
                <button
                  type="submit"
                  className="port-submit"
                  style={{
                    background: 'var(--color-accent)',
                    color: 'var(--color-primary)',
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--text-base)',
                    fontWeight: 600,
                    padding: '14px 48px',
                    borderRadius: '999px',
                    border: 'none',
                    cursor: 'pointer',
                    transition: 'background 150ms ease',
                    letterSpacing: '0.01em',
                  }}
                >
                  Parliamone!
                </button>
              </div>
            </form>
          </div>
        </section>

      </main>

      <Footer />
    </>
  )
}
