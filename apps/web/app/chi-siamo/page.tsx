import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Projects from '@/components/sections/Projects'
import Partners from '@/components/sections/Partners'

export const metadata: Metadata = {
  title: 'Chi Siamo',
  description:
    "Digital Eco è un'agenzia di comunicazione, marketing e soluzioni AI con sede a Venezia. Strategia, contenuti e tecnologia per far crescere aziende e brand.",
  alternates: { canonical: '/chi-siamo' },
}

const BG = '#0F1410'

// Le foto vere del gruppo, le stesse della fascia "uno spazio per crescere" in home
const PHOTOS = [
  { src: '/foto/sede-make-group.jpg', alt: "La sede del gruppo, vista dall'ingresso", caption: 'La sede' },
  { src: '/foto/seminario-ai.jpg', alt: "Il seminario sull'intelligenza artificiale davanti alla platea", caption: 'Seminario AI' },
  { src: '/foto/evento-networking.jpg', alt: 'Ospiti durante il momento di networking nella sede Digital Eco', caption: 'Networking' },
]

// Una riga per servizio: porta alle pagine dedicate
const SERVICES = [
  { label: 'Strategia', href: '/strategia' },
  { label: 'Siti web & e-commerce', href: '/siti-web' },
  { label: 'Social media', href: '/social-media' },
  { label: 'Advertising', href: '/advertising' },
  { label: 'Intelligenza artificiale', href: '/ai' },
  { label: 'Comunicazione aziendale', href: '/comunicazione-aziendale' },
  { label: 'Video referenziali', href: '/video-referenziali' },
  { label: 'Export digitale', href: '/export-digitale' },
  { label: 'Marketplace', href: '/marketplace' },
]

export default function ChiSiamoPage() {
  return (
    <div className="cs-page" style={{ background: BG, color: '#F0F5F2' }}>
      <style>{`
        .cs-wrap {
          max-width: 1280px;
          margin: 0 auto;
          padding-inline: clamp(24px, 4vw, 48px);
        }
        /* La regola globale dei titoli usa il colore per fondi chiari */
        .cs-page h1, .cs-page h2, .cs-page h3 { color: #F0F5F2; }
        .cs-eyebrow {
          font-family: var(--font-body);
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.5);
          margin: 0;
        }

        /* Apertura: racconto breve a sinistra, titolo enorme a destra */
        .cs-hero {
          display: grid;
          grid-template-columns: 1fr;
          gap: clamp(32px, 5vw, 64px);
          padding-top: calc(72px + clamp(56px, 9vw, 140px));
          padding-bottom: clamp(64px, 9vw, 140px);
        }
        .cs-hero-title {
          font-family: var(--font-body);
          font-weight: 300;
          font-size: clamp(52px, 8.5vw, 148px);
          line-height: 0.95;
          letter-spacing: -0.045em;
          margin: 0;
        }
        .cs-hero-title em {
          display: block;
          font-family: var(--font-display);
          font-style: italic;
          font-weight: 400;
          letter-spacing: -0.03em;
          color: var(--color-primary);
        }
        .cs-hero-intro {
          display: flex;
          flex-direction: column;
          gap: 20px;
          max-width: 34ch;
        }
        .cs-hero-intro p:not(.cs-eyebrow) {
          font-family: var(--font-body);
          font-size: clamp(15px, 1vw + 0.4rem, 18px);
          font-weight: 300;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.72);
          margin: 0;
        }
        @media (min-width: 900px) {
          .cs-hero {
            grid-template-columns: minmax(0, 1fr) minmax(0, 2fr);
            align-items: end;
          }
          .cs-hero-intro { order: -1; padding-bottom: 12px; }
          .cs-hero-title { text-align: right; }
        }

        /* Foto: la sede grande, le altre due accanto */
        .cs-photos {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(12px, 1.5vw, 20px);
        }
        .cs-photo {
          position: relative;
          margin: 0;
          border-radius: 12px;
          overflow: hidden;
          aspect-ratio: 4 / 5;
          background: rgba(255, 255, 255, 0.04);
        }
        .cs-photo--main {
          grid-column: 1 / -1;
          aspect-ratio: 16 / 9;
        }
        .cs-photo figcaption {
          position: absolute;
          left: 16px;
          bottom: 14px;
          font-family: var(--font-body);
          font-size: 11px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(255, 255, 255, 0.85);
          text-shadow: 0 1px 12px rgba(0, 0, 0, 0.5);
        }
        @media (min-width: 900px) {
          .cs-photos { grid-template-columns: 2fr 1fr; grid-template-rows: 1fr 1fr; }
          .cs-photo--main { grid-column: auto; grid-row: 1 / 3; aspect-ratio: auto; min-height: 560px; }
          .cs-photo { aspect-ratio: auto; }
        }

        /* Radici */
        .cs-roots {
          display: grid;
          grid-template-columns: 1fr;
          gap: clamp(24px, 4vw, 48px);
          padding-block: clamp(80px, 10vw, 160px);
        }
        .cs-roots h2 {
          font-family: var(--font-display);
          font-style: italic;
          font-weight: 400;
          font-size: clamp(32px, 3.5vw + 0.5rem, 60px);
          line-height: 1.05;
          letter-spacing: -0.03em;
          margin: 0;
        }
        .cs-roots p:not(.cs-eyebrow) {
          font-family: var(--font-body);
          font-size: clamp(16px, 1vw + 0.5rem, 20px);
          font-weight: 300;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.72);
          margin: 0;
          max-width: 56ch;
        }
        @media (min-width: 900px) {
          .cs-roots { grid-template-columns: minmax(0, 1fr) minmax(0, 1.4fr); }
        }

        /* Il nome: DIGITAL e ECO, due parole grandi con la loro ragione */
        .cs-name {
          display: grid;
          grid-template-columns: 1fr;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }
        .cs-name-item {
          padding-block: clamp(40px, 5vw, 72px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .cs-name-word {
          font-family: var(--font-display);
          font-style: italic;
          font-weight: 400;
          font-size: clamp(64px, 9vw, 160px);
          line-height: 0.9;
          letter-spacing: -0.04em;
          margin: 0;
        }
        .cs-name-item p:not(.cs-eyebrow):not(.cs-name-word) {
          font-family: var(--font-body);
          font-size: 15px;
          font-weight: 300;
          line-height: 1.75;
          color: rgba(255, 255, 255, 0.68);
          margin: 0;
          max-width: 44ch;
        }
        @media (min-width: 900px) {
          .cs-name { grid-template-columns: 1fr 1fr; }
          .cs-name-item:first-child { padding-right: clamp(24px, 4vw, 64px); border-right: 1px solid rgba(255, 255, 255, 0.1); }
          .cs-name-item:last-child { padding-left: clamp(24px, 4vw, 64px); }
        }

        /* Cosa facciamo: un elenco che porta alle pagine dei servizi */
        .cs-services {
          display: grid;
          grid-template-columns: 1fr;
          gap: clamp(32px, 5vw, 64px);
          padding-block: clamp(80px, 10vw, 160px);
        }
        .cs-services h2 {
          font-family: var(--font-body);
          font-weight: 300;
          font-size: clamp(32px, 3.5vw + 0.5rem, 60px);
          line-height: 1.05;
          letter-spacing: -0.035em;
          margin: 12px 0 0;
        }
        .cs-services h2 em {
          font-family: var(--font-display);
          font-style: italic;
          font-weight: 400;
        }
        .cs-services ol {
          list-style: none;
          margin: 0;
          padding: 0;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }
        .cs-services li a {
          display: grid;
          grid-template-columns: 48px 1fr auto;
          align-items: baseline;
          padding-block: 18px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          color: rgba(255, 255, 255, 0.86);
          text-decoration: none;
          font-family: var(--font-body);
          font-size: clamp(18px, 1vw + 0.6rem, 24px);
          font-weight: 300;
          letter-spacing: -0.01em;
          transition: color 200ms ease, padding 300ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        .cs-services li a span:first-child {
          font-size: 12px;
          letter-spacing: 0.08em;
          color: rgba(255, 255, 255, 0.35);
          font-variant-numeric: tabular-nums;
        }
        .cs-services li a span:last-child {
          color: rgba(255, 255, 255, 0.35);
          transition: transform 300ms cubic-bezier(0.16, 1, 0.3, 1), color 200ms ease;
        }
        .cs-services li a:hover { color: #FFFFFF; padding-left: 8px; }
        .cs-services li a:hover span:last-child { color: #FFFFFF; transform: translateX(4px); }
        .cs-services li a:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 4px; }
        @media (min-width: 900px) {
          .cs-services { grid-template-columns: minmax(0, 1fr) minmax(0, 1.4fr); }
        }
        @media (prefers-reduced-motion: reduce) {
          .cs-services li a, .cs-services li a span:last-child { transition: none; }
          .cs-services li a:hover { padding-left: 0; }
          .cs-services li a:hover span:last-child { transform: none; }
        }

        /* Chiusura */
        .cs-cta {
          display: flex;
          flex-direction: column;
          gap: 28px;
          align-items: flex-start;
          padding-block: clamp(80px, 10vw, 160px);
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }
        .cs-cta h2 {
          font-family: var(--font-body);
          font-weight: 300;
          font-size: clamp(36px, 5vw + 0.5rem, 88px);
          line-height: 1;
          letter-spacing: -0.04em;
          margin: 0;
          max-width: 14em;
        }
        .cs-cta h2 em {
          font-family: var(--font-display);
          font-style: italic;
          font-weight: 400;
        }
        @media (min-width: 900px) {
          .cs-cta { flex-direction: row; justify-content: space-between; align-items: flex-end; }
        }
      `}</style>

      <Navbar />

      <main id="main-content" tabIndex={-1}>
        {/* ── Apertura ── */}
        <section aria-labelledby="chi-siamo-title" className="cs-wrap cs-hero">
          <h1 id="chi-siamo-title" className="cs-hero-title">
            Nati a Venezia,
            <em>presenti ovunque.</em>
          </h1>
          <div className="cs-hero-intro">
            <p className="cs-eyebrow">Chi siamo</p>
            <p>
              Digital Eco è un&apos;agenzia di comunicazione, marketing e soluzioni AI con sede a
              Venezia. Aiutiamo aziende, professionisti e brand a crescere online con strategie
              mirate, design di qualità e tecnologia al servizio delle persone.
            </p>
          </div>
        </section>

        {/* ── Foto ── */}
        <section aria-label="La nostra sede e i nostri eventi" className="cs-wrap">
          <div className="cs-photos">
            {PHOTOS.map((photo, i) => (
              <figure key={photo.src} className={i === 0 ? 'cs-photo cs-photo--main' : 'cs-photo'}>
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  priority={i === 0}
                  sizes={i === 0 ? '(max-width: 899px) 100vw, 66vw' : '(max-width: 899px) 50vw, 33vw'}
                  style={{ objectFit: 'cover' }}
                />
                <figcaption>{photo.caption}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* ── Radici ── */}
        <section aria-labelledby="radici-title" className="cs-wrap cs-roots">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <p className="cs-eyebrow">Le nostre radici</p>
            <h2 id="radici-title">Locali nell&apos;anima, globali nella visione</h2>
          </div>
          <p>
            Digital Eco nasce nel cuore della Serenissima, una città dove l&apos;artigianato incontra
            l&apos;innovazione da secoli. Da Venezia portiamo online i valori più autentici dei
            nostri clienti, lavorando ogni giorno con partner in tutta Italia e sui mercati
            internazionali.
          </p>
        </section>

        {/* ── Il nome ── */}
        <section aria-labelledby="nome-title" className="cs-wrap">
          <h2 id="nome-title" className="sr-only">Perché Digital Eco</h2>
          <div className="cs-name">
            <div className="cs-name-item">
              <p className="cs-eyebrow">Siamo</p>
              <p className="cs-name-word">Digital</p>
              <p>
                per la nostra propensione ad abbracciare l&apos;innovazione e la tecnologia,
                dedicando uno spazio di condivisione allo sviluppo di nuove idee e di progetti
                capaci di cogliere le opportunità del mercato online.
              </p>
            </div>
            <div className="cs-name-item">
              <p className="cs-eyebrow">Diamo</p>
              <p className="cs-name-word">Eco</p>
              <p>
                perché il nostro obiettivo è diffondere online i valori e i tratti distintivi dei
                nostri clienti. Dal passaparola tradizionale a quello digitale, diamo eco alla loro
                comunicazione in modo efficace, per vendere online.
              </p>
            </div>
          </div>
        </section>

        {/* ── Cosa facciamo ── */}
        <section aria-labelledby="servizi-title" className="cs-wrap cs-services">
          <div>
            <p className="cs-eyebrow">Cosa facciamo</p>
            <h2 id="servizi-title">
              Tutto quello che serve per <em>farti trovare</em>
            </h2>
          </div>
          <ol>
            {SERVICES.map((service, i) => (
              <li key={service.href}>
                <Link href={service.href}>
                  <span>{String(i + 1).padStart(2, '0')}</span>
                  <span>{service.label}</span>
                  <span aria-hidden="true">→</span>
                </Link>
              </li>
            ))}
          </ol>
        </section>

        {/* ── I progetti, gli stessi della home ── */}
        <Projects />

        {/* ── Il gruppo ── */}
        <Partners />

        {/* ── Chiusura ── */}
        <section aria-labelledby="chi-siamo-cta" className="cs-wrap cs-cta">
          <h2 id="chi-siamo-cta">
            Ci conosciamo? <em>La prima consulenza è gratuita.</em>
          </h2>
          <Link href="/contatti" className="btn-pill btn-pill--light">
            Contattaci
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  )
}
