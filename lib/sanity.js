import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'


import { apiVersion, dataset, projectId } from '../src/sanity/env'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
})

// ✅ Add this helper to build image URLs
const builder = imageUrlBuilder(client)

export function urlFor(source) {
  return builder.image(source)
}

