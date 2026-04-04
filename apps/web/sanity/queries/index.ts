import { groq } from 'next-sanity'

// ── Services ──────────────────────────────────────────────────────────────────

export const servicesQuery = groq`
  *[_type == "service"] | order(order asc) {
    _id,
    title,
    slug,
    shortDescription,
    icon,
    order
  }
`

export const serviceBySlugQuery = groq`
  *[_type == "service" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    shortDescription,
    description,
    icon
  }
`

// ── Projects ──────────────────────────────────────────────────────────────────

export const featuredProjectsQuery = groq`
  *[_type == "project" && featured == true] | order(publishedAt desc) [0..5] {
    _id,
    title,
    slug,
    category,
    client,
    description,
    "coverImage": coverImage {
      asset->{url, metadata{dimensions}},
      alt
    },
    url,
    publishedAt
  }
`

export const allProjectsQuery = groq`
  *[_type == "project"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    category,
    client,
    description,
    "coverImage": coverImage {
      asset->{url, metadata{dimensions}},
      alt
    },
    url,
    publishedAt
  }
`

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    category,
    client,
    description,
    body,
    "coverImage": coverImage {
      asset->{url, metadata{dimensions}},
      alt
    },
    "images": images[] {
      asset->{url, metadata{dimensions}},
      alt
    },
    url,
    publishedAt
  }
`

// ── Testimonials ──────────────────────────────────────────────────────────────

export const featuredTestimonialsQuery = groq`
  *[_type == "testimonial" && featured == true] | order(_createdAt desc) {
    _id,
    author,
    role,
    "avatar": avatar {
      asset->{url},
      alt
    },
    quote,
    rating
  }
`

export const allTestimonialsQuery = groq`
  *[_type == "testimonial"] | order(_createdAt desc) {
    _id,
    author,
    role,
    "avatar": avatar {
      asset->{url},
      alt
    },
    quote,
    rating
  }
`
