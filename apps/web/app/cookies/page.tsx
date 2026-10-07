import type { Metadata } from 'next'
import LegalPage from '@/components/legal/LegalPage'
import { COMPANY, CONTACT_EMAIL } from '@/lib/contacts'

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'Quali cookie usa il sito di Digital Eco e come gestirli.',
  alternates: { canonical: '/cookies' },
}

export default function CookiesPage() {
  return (
    <LegalPage
        lead="Cookie"
        accent="policy"
        updated="7 ottobre 2026"
        intro={`Questa pagina spiega come il sito di ${COMPANY.name} usa i cookie, nel rispetto dell’art. 122 del Codice privacy e delle Linee guida del Garante del 10 giugno 2021.`}
        sections={[
          {
            title: 'Cosa sono i cookie',
            body: [
              'Sono piccoli file di testo che un sito salva nel tuo browser per ricordare informazioni durante la visita o tra una visita e l’altra. Alcuni servono a far funzionare il sito, altri a misurarne l’uso o a mostrare pubblicità mirata.',
            ],
          },
          {
            title: 'Quali cookie usiamo',
            body: [
              'Il sito non usa cookie di profilazione, né cookie pubblicitari, né strumenti di statistica che tracciano le tue visite.',
              'Possono essere usati solo cookie e strumenti tecnici strettamente necessari a mostrare le pagine e a proteggere il sito. Per questi la legge non richiede il consenso, per questo non ti mostriamo un banner.',
            ],
          },
          {
            title: 'Servizi di terze parti',
            body: [
              'Per mostrare i caratteri tipografici usiamo Google Fonts: quando apri una pagina, il tuo browser li scarica dai server di Google, che riceve così il tuo indirizzo IP. Google Fonts non installa cookie. Trovi come Google tratta questi dati nella sua informativa (policies.google.com/privacy).',
            ],
          },
          {
            title: 'Come gestire i cookie',
            body: [
              'Puoi vedere e cancellare i cookie, o bloccarli, dalle impostazioni del tuo browser (Chrome, Safari, Firefox, Edge). Se blocchi i cookie tecnici alcune parti del sito potrebbero non funzionare.',
            ],
          },
          {
            title: 'Se cambia qualcosa',
            body: [
              'Se in futuro aggiungeremo strumenti di statistica o di marketing, aggiorneremo questa pagina e ti chiederemo il consenso prima di attivarli.',
              `Per domande scrivici a ${CONTACT_EMAIL}. Per sapere come trattiamo i tuoi dati leggi la privacy policy.`,
            ],
          },
        ]}
    />
  )
}
