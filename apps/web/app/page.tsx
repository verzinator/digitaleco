import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ImageHero from '@/components/sections/ImageHero'
import Hero from '@/components/sections/Hero'
import Projects from '@/components/sections/Projects'
import ContactForm from '@/components/sections/ContactForm'
import FAQ from '@/components/sections/FAQ'
import StatsStrip from '@/components/sections/StatsStrip'
import ScrollReveal from '@/components/sections/ScrollReveal'
import Services from '@/components/sections/Services'
import SplashScreen from '@/components/ui/SplashScreen'
import GlobalGradient from '@/components/ui/GlobalGradient'

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Quanto costa realizzare un sito web a Venezia?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Il costo varia in base alle funzionalità: un sito vetrina parte da circa 2.000€, un e-commerce da 4.000€. Offriamo una consulenza gratuita per definire un preventivo su misura per le tue esigenze.',
      },
    },
    {
      '@type': 'Question',
      name: 'Quali servizi di comunicazione digitale offrite?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Offriamo web design e sviluppo siti, e-commerce, gestione social media, campagne Google Ads e Meta Ads, ottimizzazione SEO, branding, comunicazione aziendale e consulenza strategica digitale.',
      },
    },
    {
      '@type': 'Question',
      name: 'In quanto tempo viene consegnato un sito web?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Un sito vetrina viene consegnato in 3-4 settimane, un e-commerce in 6-8 settimane. Definiamo tempistiche precise durante la consulenza iniziale gratuita.',
      },
    },
    {
      '@type': 'Question',
      name: 'Lavorate solo con aziende di Venezia e del Veneto?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'La nostra sede è a Venezia ma lavoriamo con clienti in tutta Italia, sia in presenza che da remoto. Abbiamo esperienza con PMI, startup e professionisti nei settori artigianato, food, moda e turismo.',
      },
    },
    {
      '@type': 'Question',
      name: 'Come funziona la consulenza digitale gratuita?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Compili il form di contatto, ti ricontattiamo entro 24 ore per una call conoscitiva. Analizziamo insieme il tuo progetto e ti proponiamo una strategia digitale personalizzata senza impegno.',
      },
    },
    {
      '@type': 'Question',
      name: 'Gestite anche le campagne pubblicitarie online?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Sì, gestiamo campagne Google Ads, Meta Ads (Facebook e Instagram) e advertising su TikTok. Ci occupiamo di strategia, creazione annunci, ottimizzazione e reportistica mensile dei risultati.',
      },
    },
  ],
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <SplashScreen />
      <GlobalGradient />
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <ImageHero />
        <div style={{ background: '#060D09' }}>
          <Hero />
          <Projects />
        </div>
        <StatsStrip />
        <Services />
        <ScrollReveal />
        <ContactForm />
        <FAQ />
      </main>
      <Footer />
    </>
  )
}
