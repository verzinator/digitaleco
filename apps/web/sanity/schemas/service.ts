import { defineField, defineType } from 'sanity'
import { Monitor } from 'lucide-react'

export const service = defineType({
  name: 'service',
  title: 'Servizio',
  type: 'document',
  icon: Monitor,
  fields: [
    defineField({
      name: 'title',
      title: 'Titolo',
      type: 'string',
      validation: Rule => Rule.required().min(2).max(80),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'shortDescription',
      title: 'Descrizione breve',
      type: 'text',
      rows: 3,
      description: 'Usata nelle card e nei meta. Max 160 caratteri.',
      validation: Rule => Rule.required().max(160),
    }),
    defineField({
      name: 'description',
      title: 'Descrizione estesa',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'icon',
      title: 'Nome icona Lucide',
      type: 'string',
      description: 'Es: Monitor, ShoppingCart, Share2, Megaphone…',
    }),
    defineField({
      name: 'order',
      title: 'Ordinamento',
      type: 'number',
      description: 'Numero più basso = appare prima',
      initialValue: 99,
    }),
  ],
  orderings: [
    {
      title: 'Ordine personalizzato',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'title', subtitle: 'shortDescription' },
  },
})
