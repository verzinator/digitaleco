import type { Metadata } from 'next'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ChiSiamo from './ChiSiamo'

export const metadata: Metadata = {
  title: 'Chi Siamo',
  description:
    "Digital Eco è un'agenzia di comunicazione, marketing e soluzioni AI con sede a Venezia. Strategia, contenuti e tecnologia per far crescere aziende e brand.",
  alternates: { canonical: '/chi-siamo' },
}

export default function ChiSiamoPage() {
  return (
    <div style={{ background: '#0F1410', color: '#F0F5F2' }}>
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <ChiSiamo />
      </main>
      <Footer />
    </div>
  )
}
