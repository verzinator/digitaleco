import { defineField, defineType } from 'sanity'
import { FolderOpen } from 'lucide-react'

export const project = defineType({
  name: 'project',
  title: 'Progetto',
  type: 'document',
  icon: FolderOpen,
  fields: [
    defineField({
      name: 'title',
      title: 'Titolo progetto',
      type: 'string',
      validation: Rule => Rule.required().min(2).max(100),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Categoria',
      type: 'string',
      options: {
        list: [
          { title: 'Web Design', value: 'Web Design' },
          { title: 'E-Commerce', value: 'E-Commerce' },
          { title: 'Social Media', value: 'Social Media' },
          { title: 'Advertising', value: 'Advertising' },
          { title: 'Brand Identity', value: 'Brand Identity' },
          { title: 'Analytics & SEO', value: 'Analytics & SEO' },
        ],
        layout: 'radio',
      },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'client',
      title: 'Cliente',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Descrizione breve',
      type: 'text',
      rows: 3,
      validation: Rule => Rule.required().max(200),
    }),
    defineField({
      name: 'coverImage',
      title: 'Immagine di copertina',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          title: 'Testo alternativo',
          type: 'string',
          validation: Rule => Rule.required(),
        }),
      ],
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'images',
      title: 'Galleria immagini',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              title: 'Testo alternativo',
              type: 'string',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'body',
      title: 'Descrizione estesa',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'url',
      title: 'URL del progetto',
      type: 'url',
    }),
    defineField({
      name: 'featured',
      title: 'In evidenza',
      type: 'boolean',
      description: 'Mostra questo progetto in home page',
      initialValue: false,
    }),
    defineField({
      name: 'publishedAt',
      title: 'Data di pubblicazione',
      type: 'date',
    }),
  ],
  orderings: [
    {
      title: 'Data (più recenti prima)',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'coverImage',
    },
  },
})
