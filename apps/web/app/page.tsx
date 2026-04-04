import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import ZoomSection from '@/components/sections/ZoomSection'
import ValueProposition from '@/components/sections/ValueProposition'
import Services from '@/components/sections/Services'
import Portfolio from '@/components/sections/Portfolio'
import Stats from '@/components/sections/Stats'
import ContactForm from '@/components/sections/ContactForm'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        {/* 1. Hero */}
        <Hero />

        {/* 1.5 Image Zoom Effect */}
        <ZoomSection />

        {/* 2. Value proposition */}
        <ValueProposition />

        {/* 3. Services */}
        <Services />

        {/* 4. Portfolio */}
        <Portfolio />

        {/* 5. Animated stats / counters */}
        <Stats />

        {/* 6. Contact form */}
        <ContactForm />
      </main>
      <Footer />
    </>
  )
}
