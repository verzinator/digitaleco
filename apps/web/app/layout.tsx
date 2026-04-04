import type { Metadata } from 'next'
import './globals.css'
import CustomCursor from '@/components/ui/CustomCursor'

export const metadata: Metadata = {
  title: {
    default: 'Digital Eco — Agenzia Digitale Italiana',
    template: '%s | Digital Eco',
  },
  description:
    'Trasformiamo idee in esperienze digitali memorabili. Web design, e-commerce, social media marketing e advertising per far crescere il tuo business online.',
  keywords: [
    'agenzia digitale',
    'web design',
    'e-commerce',
    'social media marketing',
    'advertising',
    'Italia',
    'digital agency',
  ],
  authors: [{ name: 'Digital Eco' }],
  creator: 'Digital Eco',
  metadataBase: new URL('https://digitaleco.it'),
  openGraph: {
    type: 'website',
    locale: 'it_IT',
    url: 'https://digitaleco.it',
    siteName: 'Digital Eco',
    title: 'Digital Eco — Agenzia Digitale Italiana',
    description:
      'Trasformiamo idee in esperienze digitali memorabili. Web design, e-commerce, social media marketing e advertising.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Digital Eco — Agenzia Digitale',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Digital Eco — Agenzia Digitale Italiana',
    description: 'Web design, e-commerce, social media marketing e advertising.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
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
          href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=DM+Sans:opsz,wght@9..40,300..700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="pt-20">
        <CustomCursor />
        {children}
      </body>
    </html>
  )
}
