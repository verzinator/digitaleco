import type { Metadata } from 'next'
import LegalPage from '@/components/legal/LegalPage'
import { COMPANY, COMPANY_ADDRESS, CONTACT_EMAIL, CONTACT_PHONE } from '@/lib/contacts'

export const metadata: Metadata = {
  title: 'Note legali',
  description: 'Dati societari di Digital Eco S.r.l.',
  alternates: { canonical: '/legal' },
}

export default function LegalNotesPage() {
  return (
    <LegalPage
      lead="Note"
      accent="legali"
      updated="7 ottobre 2026"
      intro="Informazioni sulla società che gestisce questo sito, ai sensi dell’art. 7 del D.Lgs. 70/2003 e dell’art. 2250 del Codice civile."
      sections={[
        {
          title: 'Chi gestisce il sito',
          body: [
            [
              `Ragione sociale: ${COMPANY.name}`,
              `Sede: ${COMPANY_ADDRESS}`,
              `Partita IVA: ${COMPANY.vat}`,
              `Email: ${CONTACT_EMAIL}`,
              `Telefono: ${CONTACT_PHONE}`,
            ],
          ],
        },
        {
          title: 'Diritto d’autore',
          body: [
            `I contenuti del sito sono di proprietà di ${COMPANY.name} o dei rispettivi titolari. Le condizioni di utilizzo sono descritte nei termini di servizio.`,
          ],
        },
        {
          title: 'Marchi',
          body: [
            'Digital Eco fa parte di un gruppo di società. I marchi Make Group, Make Consulting, Make Finance, Makelab e KanbanlogiQ, come quelli dei clienti citati nei casi studio, appartengono ai rispettivi proprietari.',
          ],
        },
        {
          title: 'Dati personali e cookie',
          body: [
            'Come trattiamo i dati di chi visita il sito e di chi ci contatta è spiegato nella privacy policy; l’uso dei cookie nella cookie policy.',
          ],
        },
      ]}
    />
  )
}
