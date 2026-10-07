import type { Metadata } from 'next'
import LegalPage from '@/components/legal/LegalPage'
import { COMPANY, COMPANY_ADDRESS, CONTACT_EMAIL } from '@/lib/contacts'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Come Digital Eco tratta i dati personali di chi visita il sito e di chi ci contatta.',
  alternates: { canonical: '/privacy' },
}

export default function PrivacyPage() {
  return (
    <LegalPage
      lead="Privacy"
      accent="policy"
      updated="7 ottobre 2026"
      intro={`Questa informativa spiega quali dati personali raccogliamo attraverso il sito, perché li usiamo e quali diritti hai. È resa ai sensi degli articoli 13 e 14 del Regolamento (UE) 2016/679 ("GDPR") e del D.Lgs. 196/2003 ("Codice privacy").`}
      sections={[
        {
          title: 'Titolare del trattamento',
          body: [
            `${COMPANY.name}, con sede in ${COMPANY_ADDRESS}, P.IVA ${COMPANY.vat}. Per qualsiasi domanda sui tuoi dati puoi scriverci a ${CONTACT_EMAIL}.`,
          ],
        },
        {
          title: 'Quali dati raccogliamo',
          body: [
            'Dati di navigazione. I sistemi che fanno funzionare il sito registrano, come avviene per qualsiasi sito, alcune informazioni tecniche: indirizzo IP, tipo di browser, pagine visitate, data e ora della richiesta. Servono a far funzionare il sito e a proteggerlo, non a identificarti.',
            'Dati che ci dai tu. Se compili il modulo di contatto ci comunichi nome, cognome, email, città e, se vuoi, telefono e azienda. Se ci scrivi o ci chiami, trattiamo i dati che ci fornisci in quel momento.',
            'Non raccogliamo dati particolari (per esempio relativi alla salute) e ti chiediamo di non inserirli nei messaggi.',
          ],
        },
        {
          title: 'Perché li usiamo e su quale base',
          body: [
            [
              'Rispondere alle tue richieste e preparare una proposta: è necessario per dare seguito a una tua richiesta prima di un eventuale contratto (art. 6.1.b GDPR).',
              'Gestire il rapporto, se diventi nostro cliente, e adempiere agli obblighi fiscali e contabili (art. 6.1.b e 6.1.c GDPR).',
              'Far funzionare il sito in modo sicuro e prevenire abusi: è nostro legittimo interesse (art. 6.1.f GDPR).',
            ],
            'Non usiamo i tuoi dati per inviarti newsletter o comunicazioni promozionali senza il tuo consenso, e non li vendiamo a nessuno.',
          ],
        },
        {
          title: 'È obbligatorio darci i dati?',
          body: [
            'No. Però senza nome, email e città non possiamo rispondere alla richiesta inviata dal modulo. Telefono e azienda sono facoltativi.',
          ],
        },
        {
          title: 'Chi può vedere i dati',
          body: [
            'I dati sono trattati dal nostro personale autorizzato e dai fornitori che ci aiutano a gestire il sito, nominati responsabili del trattamento:',
            [
              'Vercel Inc., che ospita il sito;',
              'Supabase Inc., che conserva le richieste inviate dal modulo;',
              'Microsoft, che fornisce la nostra posta elettronica;',
              'Google LLC, che fornisce i caratteri tipografici del sito (Google Fonts) e riceve per questo l’indirizzo IP del visitatore.',
            ],
            'Alcuni di questi fornitori hanno sede negli Stati Uniti. Il trasferimento avviene sulla base dell’EU-U.S. Data Privacy Framework o delle clausole contrattuali standard approvate dalla Commissione europea.',
            'Possiamo comunicare i dati anche a consulenti (per esempio il commercialista) e alle autorità, quando la legge lo richiede.',
          ],
        },
        {
          title: 'Per quanto tempo li conserviamo',
          body: [
            [
              'Richieste di contatto che non diventano un rapporto di lavoro: 24 mesi dall’ultimo contatto.',
              'Dati legati a un contratto: 10 anni dalla sua conclusione, come previsto dalla legge.',
              'Dati di navigazione: per il tempo tecnico necessario, di norma non oltre qualche settimana.',
            ],
          ],
        },
        {
          title: 'I tuoi diritti',
          body: [
            'Puoi chiederci in qualsiasi momento di accedere ai tuoi dati, di correggerli, di cancellarli, di limitarne l’uso, di riceverli in un formato leggibile o di opporti al trattamento (articoli 15–22 GDPR). Basta scrivere a ' +
              CONTACT_EMAIL +
              '. Ti rispondiamo entro un mese.',
            'Se ritieni che il trattamento non sia corretto puoi presentare reclamo al Garante per la protezione dei dati personali (www.garanteprivacy.it).',
          ],
        },
        {
          title: 'Decisioni automatizzate',
          body: ['Non prendiamo decisioni basate unicamente su trattamenti automatizzati, profilazione compresa.'],
        },
        {
          title: 'Modifiche',
          body: [
            'Possiamo aggiornare questa informativa, per esempio se cambiano i servizi del sito. La data in alto indica l’ultima versione.',
          ],
        },
      ]}
    />
  )
}
