import type { Metadata } from 'next'
import LegalPage from '@/components/legal/LegalPage'
import { COMPANY, CONTACT_EMAIL } from '@/lib/contacts'

export const metadata: Metadata = {
  title: 'Termini di servizio',
  description: 'Le condizioni di uso del sito di Digital Eco.',
  alternates: { canonical: '/terms' },
}

export default function TermsPage() {
  return (
    <LegalPage
      lead="Termini di"
      accent="servizio"
      updated="7 ottobre 2026"
      intro={`Queste condizioni regolano l’uso del sito di ${COMPANY.name}. Navigando il sito le accetti; se non sei d’accordo ti chiediamo di non usarlo.`}
      sections={[
        {
          title: 'A cosa serve il sito',
          body: [
            'Il sito presenta Digital Eco, i suoi servizi e alcuni lavori realizzati per i clienti. I contenuti hanno scopo informativo e non costituiscono un’offerta commerciale vincolante.',
            'I nostri servizi sono regolati da preventivi e contratti specifici, concordati di volta in volta con ciascun cliente. In caso di differenze, prevale quanto scritto nel contratto.',
          ],
        },
        {
          title: 'Richieste dal modulo di contatto',
          body: [
            'Inviare una richiesta dal sito non crea alcun obbligo, né per te né per noi. Ti ricontattiamo per capire il progetto e, se ha senso per entrambi, ti proponiamo un preventivo.',
            'Ti chiediamo di inserire dati veri e di non inviare contenuti offensivi, illeciti o che violino diritti di altri.',
          ],
        },
        {
          title: 'Proprietà dei contenuti',
          body: [
            'Testi, grafica, fotografie, video e codice del sito appartengono a Digital Eco o ai rispettivi titolari, e sono protetti dalla legge sul diritto d’autore (L. 633/1941).',
            'I lavori mostrati nei casi studio sono stati realizzati per i rispettivi clienti, a cui appartengono i marchi e i prodotti rappresentati. Gli altri marchi citati appartengono ai rispettivi proprietari.',
            'Puoi condividere i link alle nostre pagine. Non puoi copiare, modificare o riutilizzare i contenuti per altri scopi senza il nostro permesso scritto.',
          ],
        },
        {
          title: 'Link ad altri siti',
          body: [
            'Il sito può contenere link a siti di terzi, come i profili social o i siti dei clienti. Non controlliamo quei siti e non siamo responsabili dei loro contenuti né di come trattano i dati.',
          ],
        },
        {
          title: 'Responsabilità',
          body: [
            'Curiamo il sito con attenzione e lo teniamo aggiornato, ma non possiamo garantire che sia sempre disponibile o privo di errori. Nei limiti consentiti dalla legge, non rispondiamo di danni derivanti dall’uso del sito o dall’impossibilità di usarlo.',
          ],
        },
        {
          title: 'Modifiche',
          body: [
            'Possiamo aggiornare questi termini. La versione valida è quella pubblicata su questa pagina, con la data indicata in alto.',
          ],
        },
        {
          title: 'Legge applicabile e foro',
          body: [
            'Questi termini sono regolati dalla legge italiana. Per le controversie con aziende e professionisti è competente in via esclusiva il Foro di Venezia. Se sei un consumatore, resta competente il giudice del luogo in cui risiedi.',
            `Per qualsiasi domanda scrivici a ${CONTACT_EMAIL}.`,
          ],
        },
      ]}
    />
  )
}
