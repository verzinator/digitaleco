import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Sanity CDN
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/images/**',
      },
      // Unsplash (used in placeholder portfolio items)
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  // Strict mode for better React error detection
  reactStrictMode: true,
  // Google ha indicizzato /chi-siamo/ e /contatti/ del sito precedente: le pagine
  // vivono li', e i vecchi indirizzi del rifacimento ci portano con un 301.
  async redirects() {
    return [
      { source: '/about', destination: '/chi-siamo', permanent: true },
      { source: '/contact', destination: '/contatti', permanent: true },
      // Pagina portfolio nascosta per ora: il codice resta, chi ci arriva
      // torna ai progetti in home. Temporaneo, non 301.
      { source: '/portfolio', destination: '/#projects', permanent: false },
    ]
  },
}

export default nextConfig
