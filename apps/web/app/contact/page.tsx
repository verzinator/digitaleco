import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ContactForm from '@/components/sections/ContactForm'

export const metadata: Metadata = {
  title: 'Contatti',
  description:
    'Contattaci per una consulenza gratuita. Parla con il nostro team di esperti e scopri come possiamo far crescere il tuo business online.',
}

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        {/* Page hero */}
        <section
          aria-label="Intestazione pagina contatti"
          style={{
            paddingTop: 'calc(72px + var(--space-20))',
            paddingBottom: 'var(--space-8)',
            background: 'var(--color-bg)',
          }}
        >
          <div className="container">
            <p className="eyebrow" style={{ marginBottom: 'var(--space-3)' }}>
              Parliamoci
            </p>
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--text-3xl)',
                lineHeight: 1.1,
                color: 'var(--color-text)',
                maxWidth: '640px',
                marginBottom: 'var(--space-4)',
              }}
            >
              Iniziamo qualcosa di grande
            </h1>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--text-lg)',
                color: 'var(--color-text-muted)',
                maxWidth: '560px',
                lineHeight: 1.65,
              }}
            >
              Hai un progetto in mente? Scrivici. La consulenza iniziale è
              sempre gratuita e senza impegno.
            </p>
          </div>
        </section>

        <ContactForm />
      </main>
      <Footer />
    </>
  )
}
