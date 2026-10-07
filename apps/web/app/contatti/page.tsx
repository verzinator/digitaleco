import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ContactFormFields from '@/components/sections/ContactFormFields'
import { CONTACT_EMAIL, CONTACT_PHONE } from '@/lib/contacts'

export const metadata: Metadata = {
  title: 'Contatti',
  description:
    'Contatta Digital Eco, agenzia di comunicazione a Venezia: scrivici, chiamaci o compila il modulo. La prima consulenza è gratuita e senza impegno.',
  alternates: { canonical: '/contatti' },
}

const SOCIAL = [
  { label: 'LinkedIn', href: 'https://linkedin.com/company/digitaleco' },
  { label: 'Instagram', href: 'https://instagram.com/digitaleco_it' },
  { label: 'Facebook', href: 'https://facebook.com/digitaleco' },
  { label: 'TikTok', href: 'https://tiktok.com/@digitaleco' },
]

export default function ContattiPage() {
  return (
    <div className="ct-page" style={{ background: '#0F1410', color: '#F0F5F2' }}>
      <style>{`
        .ct-wrap {
          max-width: 1280px;
          margin: 0 auto;
          padding-inline: clamp(24px, 4vw, 48px);
        }
        /* La regola globale dei titoli usa il colore per fondi chiari */
        .ct-page h1 { color: #F0F5F2; }
        .ct-eyebrow {
          font-family: var(--font-body);
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.5);
          margin: 0;
        }

        /* Apertura: titolo enorme a destra, due righe di invito a sinistra */
        .ct-hero {
          display: grid;
          grid-template-columns: 1fr;
          gap: clamp(28px, 4vw, 56px);
          padding-top: calc(72px + clamp(56px, 9vw, 140px));
          padding-bottom: clamp(56px, 7vw, 112px);
        }
        .ct-hero h1 {
          font-family: var(--font-display);
          font-style: italic;
          font-weight: 400;
          font-size: clamp(72px, 13vw, 220px);
          line-height: 0.85;
          letter-spacing: -0.05em;
          margin: 0;
        }
        .ct-hero-intro {
          display: flex;
          flex-direction: column;
          gap: 16px;
          max-width: 32ch;
        }
        .ct-hero-intro p:not(.ct-eyebrow) {
          font-family: var(--font-body);
          font-size: clamp(15px, 1vw + 0.4rem, 18px);
          font-weight: 300;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.72);
          margin: 0;
        }
        @media (min-width: 900px) {
          .ct-hero { grid-template-columns: minmax(0, 1fr) auto; align-items: end; }
          .ct-hero-intro { order: -1; padding-bottom: 16px; }
          .ct-hero h1 { text-align: right; }
        }

        /* Recapiti a righe a sinistra, modulo a destra */
        .ct-body {
          display: grid;
          grid-template-columns: 1fr;
          gap: clamp(40px, 5vw, 72px);
          padding-bottom: clamp(80px, 10vw, 160px);
          scroll-margin-top: 96px;
        }
        @media (min-width: 900px) {
          .ct-body { grid-template-columns: minmax(0, 1fr) minmax(0, 1.25fr); align-items: start; }
        }
        .ct-list {
          margin: 0;
          border-top: 1px solid rgba(255, 255, 255, 0.12);
        }
        .ct-row {
          display: grid;
          grid-template-columns: 120px 1fr;
          gap: 16px;
          align-items: baseline;
          padding-block: 20px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.12);
        }
        .ct-row dt {
          font-family: var(--font-body);
          font-size: 11px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.45);
        }
        .ct-row dd {
          margin: 0;
          font-family: var(--font-body);
          font-size: clamp(17px, 0.8vw + 0.7rem, 22px);
          font-weight: 300;
          letter-spacing: -0.01em;
          color: rgba(255, 255, 255, 0.9);
          display: flex;
          flex-wrap: wrap;
          gap: 4px 18px;
        }
        .ct-row a {
          color: inherit;
          text-decoration: none;
          background-image: linear-gradient(currentColor, currentColor);
          background-size: 0% 1px;
          background-position: 0 100%;
          background-repeat: no-repeat;
          transition: background-size 300ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        .ct-row a:hover { background-size: 100% 1px; }
        .ct-row a:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 4px; }
        @media (max-width: 480px) {
          .ct-row { grid-template-columns: 1fr; gap: 6px; }
        }

        /* Il modulo resta chiaro, come in home: una scheda staccata dal fondo */
        .ct-form {
          background: var(--color-bg);
          color: var(--color-text);
          border-radius: 16px;
          padding: clamp(24px, 3.5vw, 48px);
        }
        .ct-form h2 {
          font-family: var(--font-display);
          font-style: italic;
          font-weight: 400;
          font-size: clamp(28px, 2vw + 1rem, 40px);
          line-height: 1.1;
          letter-spacing: -0.02em;
          margin: 0 0 clamp(20px, 2.5vw, 32px);
          color: var(--color-text);
        }
      `}</style>

      <Navbar />

      <main id="main-content" tabIndex={-1}>
        <section aria-labelledby="contatti-title" className="ct-wrap ct-hero">
          <h1 id="contatti-title">Parliamone.</h1>
          <div className="ct-hero-intro">
            <p className="ct-eyebrow">Contatti</p>
            <p>
              Hai un progetto in mente? Scrivici, chiamaci o passa a trovarci a Venezia. La prima
              consulenza è gratuita e senza impegno.
            </p>
          </div>
        </section>

        <section id="consulenza" aria-label="Recapiti e modulo di contatto" className="ct-wrap ct-body">
          <div>
            <dl className="ct-list">
              <div className="ct-row">
                <dt>Email</dt>
                <dd><a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></dd>
              </div>
              <div className="ct-row">
                <dt>Telefono</dt>
                <dd><a href={`tel:${CONTACT_PHONE.replace(/\s/g, '')}`}>{CONTACT_PHONE}</a></dd>
              </div>
              <div className="ct-row">
                <dt>Dove siamo</dt>
                <dd>Venezia, Veneto</dd>
              </div>
              <div className="ct-row">
                <dt>Quando</dt>
                <dd>Lun–Ven, 9:00–18:00</dd>
              </div>
              <div className="ct-row">
                <dt>Social</dt>
                <dd>
                  {SOCIAL.map((s) => (
                    <a key={s.href} href={s.href} target="_blank" rel="noopener noreferrer">
                      {s.label}
                    </a>
                  ))}
                </dd>
              </div>
            </dl>
          </div>

          <div className="ct-form">
            <h2>Raccontaci il tuo progetto</h2>
            <ContactFormFields idPrefix="ct" />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
