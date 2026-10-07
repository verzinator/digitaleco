import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

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

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = contactSchema.parse(body)

    // Store lead in Supabase
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (supabaseUrl && supabaseKey) {
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
          message: [
            `Telefono: ${data.phone || '-'}`,
            `Azienda: ${data.company || '-'}`,
            `Città: ${data.city}`,
          ].join('\n'),
          privacy_accepted: data.privacy,
          source: 'website_contact_form',
          created_at: new Date().toISOString(),
        }),
      })

      if (!res.ok) {
        console.error('Supabase insert failed:', await res.text())
        return NextResponse.json({ error: 'Database error' }, { status: 500 })
      }
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Validation error', details: error.errors }, { status: 422 })
    }
    console.error('Contact form error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
