import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ImageHero from '@/components/sections/ImageHero'
import Hero from '@/components/sections/Hero'
import Projects from '@/components/sections/Projects'
import ContactForm from '@/components/sections/ContactForm'
import FAQ from '@/components/sections/FAQ'
import Services from '@/components/sections/Services'
import Partners from '@/components/sections/Partners'
import SplashScreen from '@/components/ui/SplashScreen'
import GlobalGradient from '@/components/ui/GlobalGradient'
import AmbientBlobs from '@/components/ui/AmbientBlobs'

export default function HomePage() {
  return (
    <>
      <SplashScreen />
      <GlobalGradient />
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <div style={{ background: '#060D09', position: 'relative', '--mx': '50%', '--my': '50%' } as React.CSSProperties}>
          <AmbientBlobs />
          {/* Dot pattern */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='10' cy='10' r='1' fill='%23ffffff12'/%3E%3C/svg%3E")`,
              backgroundSize: '20px 20px',
              pointerEvents: 'none',
              zIndex: 1,
            }}
          />
          <ImageHero />
          <Hero />
        </div>
        <Projects />
        <Services />
        <ContactForm />
        <div style={{ background: '#060D09', position: 'relative' }}>
          <FAQ />
          <Partners />
          <Footer />
        </div>
      </main>
    </>
  )
}
