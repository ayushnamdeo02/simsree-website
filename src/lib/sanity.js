import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const sanityClient = createClient({
  projectId: 'go86psxs',
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: import.meta.env.PROD,
});

const builder = imageUrlBuilder(sanityClient);

export function urlFor(source) {
  return builder.image(source);
}
