/**
 * Recapiti e dati societari ufficiali, in un posto solo. La posta di
 * digital-eco.it è attiva (Outlook); digitaleco.it, senza trattino, non ha
 * server di posta.
 */
export const CONTACT_EMAIL = 'info@digital-eco.it'
export const CONTACT_PHONE = '+39 347 754 1636'

// Indirizzo della scheda Google dell'attività. Le banche dati camerali
// riportano sedi legali diverse: da verificare sulla visura.
export const COMPANY = {
  name: 'Digital Eco S.r.l.',
  vat: '04658340270',
  street: 'Viale Ancona, 43',
  postalCode: '30175',
  city: 'Venezia',
  province: 'VE',
}

export const COMPANY_ADDRESS = `${COMPANY.street}, ${COMPANY.postalCode} ${COMPANY.city} ${COMPANY.province}`
