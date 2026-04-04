import { defineField, defineType } from 'sanity'
import { MessageSquare } from 'lucide-react'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonianza',
  type: 'document',
  icon: MessageSquare,
  fields: [
    defineField({
      name: 'author',
      title: 'Nome e cognome',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Ruolo / Azienda',
      type: 'string',
      description: 'Es: "CEO, Azienda Esempio"',
    }),
    defineField({
      name: 'avatar',
      title: 'Foto profilo',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Testo alternativo',
          type: 'string',
        }),
      ],
    }),
    defineField({
      name: 'quote',
      title: 'Citazione',
      type: 'text',
      rows: 4,
      validation: Rule => Rule.required().min(20).max(400),
    }),
    defineField({
      name: 'rating',
      title: 'Valutazione (1-5)',
      type: 'number',
      options: {
        list: [1, 2, 3, 4, 5],
        layout: 'radio',
      },
      initialValue: 5,
    }),
    defineField({
      name: 'featured',
      title: 'In evidenza',
      type: 'boolean',
      description: 'Mostra questa testimonianza nella home page',
      initialValue: false,
    }),
    defineField({
      name: 'project',
      title: 'Progetto correlato',
      type: 'reference',
      to: [{ type: 'project' }],
    }),
  ],
  preview: {
    select: {
      title: 'author',
      subtitle: 'role',
      media: 'avatar',
    },
  },
})
