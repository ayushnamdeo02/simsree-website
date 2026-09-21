export default {
  name: 'campusPage',
  title: 'Campus Life & Facilities Page',
  type: 'document',
  groups: [
    {name: 'hero', title: 'Hero'},
    {name: 'numbers', title: 'The Numbers'},
    {name: 'facilities', title: 'The Facilities Intro'},
    {name: 'testimonials', title: 'Testimonials Intro'},
    {name: 'cta', title: 'Plan Your Visit'},
  ],
  fields: [
    // Hero
    {name: 'heroEyebrow', title: 'Hero eyebrow', type: 'string', group: 'hero', initialValue: 'Campus Life · A SIMSREE Story'},
    {name: 'heroTitle', title: 'Title line 1', type: 'string', group: 'hero', initialValue: "It's not a building."},
    {name: 'heroTitleLine2', title: 'Title line 2', type: 'string', group: 'hero', initialValue: "It's a rhythm."},
    {name: 'heroSubtitle', title: 'Subtitle', type: 'string', group: 'hero'},
    {name: 'heroImage', title: 'Hero image', type: 'image', options: {hotspot: true}, group: 'hero'},

    // The Numbers
    {name: 'numbersEyebrow', title: 'Eyebrow', type: 'string', group: 'numbers', initialValue: 'The Numbers'},
    {name: 'numbersTitle', title: 'Title', type: 'string', group: 'numbers', initialValue: 'A campus that punches above its postcode.'},
    {name: 'numbersTitleHighlight', title: 'Title highlight word(s)', description: 'e.g. "above its"', type: 'string', group: 'numbers', initialValue: 'above its'},
    {name: 'numbersBody', title: 'Body', type: 'text', rows: 5, group: 'numbers'},
    {
      name: 'numbersStats',
      title: 'Stats',
      description: 'e.g. Founded 1983, Campus 2.44c, Facilities 9, To Sea 5min',
      type: 'array',
      group: 'numbers',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'value', title: 'Value', type: 'string'},
            {name: 'label', title: 'Label', type: 'string'},
          ],
          preview: {select: {title: 'value', subtitle: 'label'}},
        },
      ],
    },

    // Facilities intro (facilities are their own document type)
    {name: 'facilitiesEyebrow', title: 'Eyebrow', type: 'string', group: 'facilities', initialValue: 'The Facilities'},
    {name: 'facilitiesTitle', title: 'Title', type: 'string', group: 'facilities', initialValue: 'Nine spaces, each one a different mode.'},
    {name: 'facilitiesTitleHighlight', title: 'Title highlight word(s)', description: 'e.g. "each one a"', type: 'string', group: 'facilities', initialValue: 'each one a'},

    // Testimonials intro (testimonials are their own document type)
    {name: 'testimonialsEyebrow', title: 'Eyebrow', type: 'string', group: 'testimonials', initialValue: 'In Their Words'},
    {name: 'testimonialsTitle', title: 'Title', type: 'string', group: 'testimonials', initialValue: 'What the cohort actually remembers.'},
    {name: 'testimonialsTitleHighlight', title: 'Title highlight word(s)', description: 'e.g. "actually"', type: 'string', group: 'testimonials', initialValue: 'actually'},

    // Plan Your Visit CTA
    {name: 'ctaEyebrow', title: 'Eyebrow', type: 'string', group: 'cta', initialValue: 'Plan Your Visit'},
    {name: 'ctaTitle', title: 'Title', type: 'string', group: 'cta', initialValue: 'See it for yourself.'},
    {name: 'ctaSubtitle', title: 'Subtitle', type: 'text', rows: 2, group: 'cta'},
    {name: 'ctaPrimaryLabel', title: 'Primary CTA label', type: 'string', group: 'cta', initialValue: 'Schedule a campus tour'},
    {name: 'ctaPrimaryUrl', title: 'Primary CTA URL', type: 'string', group: 'cta', initialValue: '/contact'},
    {name: 'ctaSecondaryLabel', title: 'Secondary CTA label', type: 'string', group: 'cta', initialValue: 'Apply to MMS'},
    {name: 'ctaSecondaryUrl', title: 'Secondary CTA URL', type: 'string', group: 'cta', initialValue: '/admissions/mms'},
  ],
  preview: {
    prepare() {
      return {title: 'Campus Life & Facilities Page'}
    },
  },
}
