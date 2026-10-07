import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { CONTACT_EMAIL } from '@/lib/contacts'

// Gli stessi campi del modulo (ContactFormFields). Prima l'API chiedeva name e
// message, che il modulo non manda: ogni invio tornava 422 e il lead si perdeva.
const contactSchema = z.object({
  firstName: z.string().trim().min(2).max(100),
  lastName: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(200),
  phone: z.string().trim().max(40).optional(),
  company: z.string().trim().max(200).optional(),
  city: z.string().trim().min(2).max(100),
  privacy: z.boolean().refine(v => v === true),
})

const escapeHtml = (v: string) =>
  v.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!)

/**
 * Manda la richiesta per email con Resend (https://resend.com).
 * RESEND_API_KEY attiva l'invio; CONTACT_TO e CONTACT_FROM sono facoltativi.
 * Finche' il dominio digital-eco.it non e' verificato su Resend, il mittente
 * di prova onboarding@resend.dev consegna solo all'email dell'account Resend.
 */
async function sendEmail(data: z.infer<typeof contactSchema>): Promise<boolean | null> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return null

  const rows: [string, string][] = [
    ['Nome', `${data.firstName} ${data.lastName}`],
    ['Email', data.email],
    ['Telefono', data.phone || '-'],
    ['Azienda', data.company || '-'],
    ['Città', data.city],
  ]

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM || 'Sito Digital Eco <onboarding@resend.dev>',
      to: [process.env.CONTACT_TO || CONTACT_EMAIL],
      reply_to: data.email,
      subject: `Nuova richiesta dal sito: ${data.firstName} ${data.lastName}`,
      text: rows.map(([k, v]) => `${k}: ${v}`).join('\n'),
      html: `<p>Nuova richiesta dal modulo di contatto del sito.</p><table>${rows
        .map(([k, v]) => `<tr><td><strong>${k}</strong></td><td>${escapeHtml(v)}</td></tr>`)
        .join('')}</table><p>Rispondi a questa email per scrivere direttamente a chi ha compilato il modulo.</p>`,
    }),
  })

  if (!res.ok) console.error('Resend send failed:', await res.text())
  return res.ok
}

/** Salva la richiesta nella tabella leads di Supabase, se configurato. */
async function storeLead(data: z.infer<typeof contactSchema>): Promise<boolean | null> {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!supabaseUrl || !supabaseKey) return null

  const res = await fetch(`${supabaseUrl}/rest/v1/leads`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      apikey: supabaseKey,
      Authorization: `Bearer ${supabaseKey}`,
      Prefer: 'return=minimal',
    },
    // La tabella leads ha name e message: i campi in piu' finiscono nel
    // messaggio, cosi' non serve cambiare lo schema del database
    body: JSON.stringify({
      name: `${data.firstName} ${data.lastName}`,
      email: data.email,
      message: [`Telefono: ${data.phone || '-'}`, `Azienda: ${data.company || '-'}`, `Città: ${data.city}`].join('\n'),
      privacy_accepted: data.privacy,
      source: 'website_contact_form',
      created_at: new Date().toISOString(),
    }),
  })

  if (!res.ok) console.error('Supabase insert failed:', await res.text())
  return res.ok
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = contactSchema.parse(body)

    const [emailed, stored] = await Promise.all([sendEmail(data), storeLead(data)])

    // Si conferma solo se la richiesta e' arrivata da qualche parte. Prima,
    // senza nulla configurato, rispondeva "ok" e la richiesta si perdeva.
    if (emailed || stored) {
      return NextResponse.json({ success: true }, { status: 200 })
    }

    if (emailed === null && stored === null) {
      console.error('Contact form: nessuna destinazione configurata (RESEND_API_KEY o Supabase)')
    }
    return NextResponse.json({ error: 'Delivery failed' }, { status: 503 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation error', details: error.errors }, { status: 422 })
    }
    console.error('Contact form error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
