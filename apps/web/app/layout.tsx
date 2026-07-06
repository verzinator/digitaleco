import type { Metadata } from 'next'
import './globals.css'
import CustomCursor from '@/components/ui/CustomCursor'

export const metadata: Metadata = {
  title: {
    default: 'Digital Eco — Agenzia di Comunicazione e Web Design a Venezia',
    template: '%s | Digital Eco — Agenzia Digitale Venezia',
  },
  description:
    'Digital Eco è l\'agenzia di comunicazione, web design e advertising digitale a Venezia. Realizziamo siti web, e-commerce, campagne Google e Meta Ads, SEO e social media per PMI e startup in Veneto e in tutta Italia.',
  keywords: [
    'agenzia digitale Venezia',
    'agenzia comunicazione Venezia',
    'web design Venezia',
    'realizzazione siti web Veneto',
    'e-commerce Venezia',
    'social media marketing Venezia',
    'Google Ads Venezia',
    'Meta Ads Venezia',
    'SEO Venezia',
    'advertising digitale Veneto',
    'agenzia web Venezia',
    'consulenza digitale PMI',
    'branding agenzia Italia',
  ],
  authors: [{ name: 'Digital Eco' }],
  creator: 'Digital Eco',
  metadataBase: new URL('https://digitaleco.it'),
  openGraph: {
    type: 'website',
    locale: 'it_IT',
    url: 'https://digitaleco.it',
    siteName: 'Digital Eco',
    title: 'Digital Eco — Agenzia di Comunicazione e Web Design a Venezia',
    description:
      'Agenzia di comunicazione, web design e advertising digitale a Venezia. Siti web, e-commerce, SEO, social media e campagne Ads per far crescere il tuo business.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Digital Eco — Agenzia di Comunicazione e Web Design a Venezia',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Digital Eco — Agenzia Digitale Venezia',
    description: 'Agenzia di comunicazione, web design, e-commerce, SEO e advertising digitale a Venezia.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://digitaleco.it',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:opsz,wght@9..40,300..700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'ProfessionalService',
              name: 'Digital Eco',
              description: 'Agenzia di comunicazione, web design e advertising digitale a Venezia. Realizziamo siti web, e-commerce, SEO, social media e campagne Google e Meta Ads.',
              url: 'https://digitaleco.it',
              logo: 'https://digitaleco.it/logo-digital-eco.png',
              image: 'https://digitaleco.it/og-image.jpg',
              telephone: '+39 041 000 0000',
              email: 'ciao@digitaleco.it',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Venezia',
                addressRegion: 'Veneto',
                addressCountry: 'IT',
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: 45.4408,
                longitude: 12.3155,
              },
              areaServed: [
                { '@type': 'City', name: 'Venezia' },
                { '@type': 'State', name: 'Veneto' },
                { '@type': 'Country', name: 'Italia' },
              ],
              serviceType: [
                'Web Design',
                'Sviluppo E-Commerce',
                'SEO',
                'Social Media Marketing',
                'Google Ads',
                'Meta Ads',
                'Branding',
                'Comunicazione Aziendale',
              ],
              priceRange: '€€',
              openingHours: 'Mo-Fr 09:00-18:00',
              sameAs: [
                'https://linkedin.com/company/digitaleco',
                'https://instagram.com/digitaleco_it',
                'https://facebook.com/digitaleco',
                'https://tiktok.com/@digitaleco',
              ],
            }),
          }}
        />
        <CustomCursor />
        {children}
      </body>
    </html>
  )
}
