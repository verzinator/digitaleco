import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ContactFormFields from '@/components/sections/ContactFormFields'
import { CONTACT_EMAIL, CONTACT_PHONE, COMPANY_ADDRESS } from '@/lib/contacts'

export const metadata: Metadata = {
  title: 'Contatti',
  description:
    'Contatta Digital Eco, agenzia di comunicazione a Venezia: scrivici, chiamaci o compila il modulo. La prima consulenza è gratuita e senza impegno.',
  alternates: { canonical: '/contatti' },
}

const RECAPITI = [
  { label: 'Email', value: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
  { label: 'Telefono', value: CONTACT_PHONE, href: `tel:${CONTACT_PHONE.replace(/\s/g, '')}` },
  { label: 'Dove siamo', value: COMPANY_ADDRESS, href: 'https://www.google.com/maps/search/?api=1&query=Digital+Eco+Viale+Ancona+43+Venezia' },
  { label: 'Quando', value: 'Lun–Ven, 9:00–18:00' },
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

        /* Apertura come i titoli della home: centrata, sans leggero e corsivo verde */
        .ct-hero {
          text-align: center;
          padding-top: calc(72px + clamp(56px, 8vw, 120px));
          padding-bottom: clamp(56px, 7vw, 104px);
        }
        .ct-hero h1 {
          font-family: var(--font-body);
          font-weight: 300;
          font-size: clamp(28px, 4vw + 1rem, 68px);
          line-height: 1.1;
          letter-spacing: -0.035em;
          max-width: 12em;
          margin: 0 auto;
        }
        .ct-hero h1 em {
          font-family: var(--font-display);
          font-style: italic;
          font-weight: 400;
          color: var(--color-primary);
        }
        .ct-hero p {
          font-family: var(--font-body);
          font-size: clamp(15px, 1vw + 0.4rem, 18px);
          font-weight: 300;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.68);
          max-width: 52ch;
          margin: clamp(20px, 2.5vw, 32px) auto 0;
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
        /* Recapiti: un riquadro per voce, lo stesso vetro delle card dei progetti */
        .ct-list {
          margin: 0;
          padding: 0;
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .ct-box {
          display: flex;
          flex-direction: column;
          gap: 8px;
          padding: clamp(20px, 2.2vw, 28px);
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 8px;
          color: inherit;
          text-decoration: none;
          transition: background 400ms ease, border-color 400ms ease, box-shadow 400ms ease;
        }
        a.ct-box:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.16);
          box-shadow: 0 8px 40px rgba(0, 0, 0, 0.25);
        }
        a.ct-box:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 3px; }
        .ct-box-label {
          font-family: var(--font-body);
          font-size: 11px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.45);
        }
        .ct-box-value {
          font-family: var(--font-body);
          font-size: clamp(17px, 0.8vw + 0.7rem, 22px);
          font-weight: 300;
          letter-spacing: -0.01em;
          color: rgba(255, 255, 255, 0.9);
          overflow-wrap: anywhere;
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
          <h1 id="contatti-title">
            Parliamo del tuo
            <br />
            <em>prossimo progetto</em>
          </h1>
          <p>
            Scrivici, chiamaci o passa a trovarci a Venezia. La prima consulenza è gratuita e senza
            impegno.
          </p>
        </section>

        <section id="consulenza" aria-label="Recapiti e modulo di contatto" className="ct-wrap ct-body">
          <ul className="ct-list">
            {RECAPITI.map((r) => (
              <li key={r.label}>
                {r.href ? (
                  <a className="ct-box" href={r.href}>
                    <span className="ct-box-label">{r.label}</span>
                    <span className="ct-box-value">{r.value}</span>
                  </a>
                ) : (
                  <div className="ct-box">
                    <span className="ct-box-label">{r.label}</span>
                    <span className="ct-box-value">{r.value}</span>
                  </div>
                )}
              </li>
            ))}
          </ul>

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
