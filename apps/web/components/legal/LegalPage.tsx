import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export type LegalSection = {
  title: string
  /** Paragrafi; un array dentro l'array diventa un elenco puntato */
  body: (string | string[])[]
}

/**
 * Pagina legale: titolo centrato come in home, poi titoletti e testo.
 * Niente altro, deve solo leggersi bene.
 */
export default function LegalPage({
  lead,
  accent,
  updated,
  intro,
  sections,
}: {
  lead: string
  accent: string
  updated: string
  intro?: string
  sections: LegalSection[]
}) {
  return (
    <div className="legal-page" style={{ background: '#0F1410', color: '#F0F5F2' }}>
      <style>{`
        .legal-page h1, .legal-page h2 { color: #F0F5F2; }
        .legal-head {
          text-align: center;
          padding: calc(72px + clamp(56px, 8vw, 120px)) clamp(24px, 4vw, 48px) clamp(48px, 6vw, 80px);
        }
        .legal-head h1 {
          font-family: var(--font-body);
          font-weight: 300;
          font-size: clamp(28px, 4vw + 1rem, 68px);
          line-height: 1.1;
          letter-spacing: -0.035em;
          margin: 0 auto;
          max-width: 12em;
        }
        .legal-head h1 em {
          font-family: var(--font-display);
          font-style: italic;
          font-weight: 400;
          color: var(--color-primary);
        }
        .legal-head p {
          font-family: var(--font-body);
          font-size: 13px;
          letter-spacing: 0.04em;
          color: rgba(255, 255, 255, 0.45);
          margin: clamp(16px, 2vw, 24px) 0 0;
        }
        .legal-body {
          max-width: 720px;
          margin: 0 auto;
          padding: 0 clamp(24px, 4vw, 48px) clamp(96px, 12vw, 160px);
          font-family: var(--font-body);
          font-size: 16px;
          font-weight: 300;
          line-height: 1.75;
          color: rgba(255, 255, 255, 0.74);
        }
        .legal-body > p:first-child { margin-top: 0; }
        .legal-body h2 {
          font-family: var(--font-display);
          font-style: italic;
          font-weight: 400;
          font-size: clamp(24px, 1.5vw + 1rem, 32px);
          line-height: 1.2;
          letter-spacing: -0.02em;
          margin: clamp(48px, 6vw, 64px) 0 16px;
        }
        .legal-body p { margin: 0 0 16px; }
        .legal-body ul { margin: 0 0 16px; padding-left: 20px; }
        .legal-body li { margin-bottom: 8px; }
        .legal-body a { color: #F0F5F2; text-underline-offset: 3px; }
      `}</style>

      <Navbar />

      <main id="main-content" tabIndex={-1}>
        <header className="legal-head">
          <h1>
            {lead} <em>{accent}</em>
          </h1>
          <p>Ultimo aggiornamento: {updated}</p>
        </header>

        <article className="legal-body">
          {intro && <p>{intro}</p>}
          {sections.map((section) => (
            <section key={section.title}>
              <h2>{section.title}</h2>
              {section.body.map((block, i) =>
                Array.isArray(block) ? (
                  <ul key={i}>
                    {block.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p key={i}>{block}</p>
                ),
              )}
            </section>
          ))}
        </article>
      </main>

      <Footer />
    </div>
  )
}
