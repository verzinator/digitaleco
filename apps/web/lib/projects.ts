/**
 * L'immagine di apertura di ogni progetto: la stessa che apre la pagina del
 * progetto e che fa da copertina alla sua card in home. Sta qui perché le due
 * viste non possano più scollarsi.
 */
export const PROJECT_HERO_IMAGES = {
  masterfor: '/progetti/progetto-1-5.jpeg',
  'villa-irene-cashmere': '/progetti/villa-irene-cashmere/emo-1106.jpg',
  'mondi-piscine': 'https://images.unsplash.com/photo-1572331165267-854da2b10ccc?w=2000&q=85',
  // TODO: segnaposto, da sostituire con uno scatto del set RTS
  'autodis-rts': 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?w=2000&q=85',
} as const

export type ProjectSlug = keyof typeof PROJECT_HERO_IMAGES
