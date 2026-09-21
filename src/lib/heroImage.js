import { urlFor } from './sanity';

// Background URL for a PageHero: the Sanity image when one is set, else the Figma
// fallback shipped in public/images.
//
// Figma fills the hero in one of two ways. "fill" crops the photo like CSS cover.
// "stretch" squashes the whole photo into the 1458x767 frame; Sanity's fit=scale
// reproduces that, so at 1440 the frame matches the design exactly.
export function heroImage(image, fallback, { stretch = false } = {}) {
  if (!image) return fallback;
  try {
    const b = urlFor(image).auto('format');
    return stretch ? b.width(1458).height(767).fit('scale').url() : b.width(1920).url();
  } catch {
    return fallback;
  }
}
