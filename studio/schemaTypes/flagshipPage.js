export default {
  name: 'flagshipPage',
  title: 'Flagship Events Page',
  type: 'document',
  groups: [
    {name: 'hero', title: 'Hero'},
    {name: 'strip', title: 'Fact Strip'},
    {name: 'partners', title: 'Partners'},
    {name: 'promise', title: 'Promise Band'},
    {name: 'featured', title: 'Featured Intro'},
    {name: 'lineup', title: 'Lineup Intro'},
    {name: 'creative', title: 'Creative Band'},
    {name: 'process', title: 'How We Run A Fest'},
    {name: 'testimonials', title: 'Testimonials Intro'},
    {name: 'ledger', title: 'Student Ledger'},
    {name: 'cta', title: 'Closing CTA'},
  ],
  fields: [
    // Hero
    {name: 'heroEyebrow', title: 'Eyebrow', type: 'string', group: 'hero', initialValue: 'Flagship Events'},
    {name: 'heroTitle', title: 'Title', type: 'string', group: 'hero', initialValue: 'Eight fests. One campus. One year.'},
    {name: 'heroTitleBreakAfter', title: 'Line break after', description: 'Breaks after each occurrence', type: 'string', group: 'hero', initialValue: '.'},
    {name: 'heroDescription', title: 'Description', type: 'text', rows: 3, group: 'hero'},
    {name: 'heroCtaLabel', title: 'CTA label', type: 'string', group: 'hero', initialValue: 'Events calendar'},
    {name: 'heroCtaUrl', title: 'CTA URL', type: 'string', group: 'hero', initialValue: '/events'},
    {
      name: 'heroStats',
      title: 'Hero stats',
      type: 'array',
      group: 'hero',
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
    {
      name: 'heroCollage',
      title: 'Hero collage images',
      description: 'Four images beside the hero copy',
      type: 'array',
      group: 'hero',
      of: [{type: 'image', options: {hotspot: true}}],
      validation: (Rule) => Rule.max(4),
    },

    // Fact strip
    {name: 'factStrip', title: 'Fact strip items', type: 'array', of: [{type: 'string'}], group: 'strip'},

    // Partners
    {name: 'partnersLabel', title: 'Partners label', type: 'string', group: 'partners', initialValue: 'Partnered with'},

    // Promise
    {name: 'promiseEyebrow', title: 'Eyebrow', type: 'string', group: 'promise', initialValue: 'Promise'},
    {name: 'promiseTitle', title: 'Title', type: 'string', group: 'promise', initialValue: 'WE’RE TRUE TO THE WORK.'},
    {name: 'promiseTitleHighlight', title: 'Title highlight word(s)', type: 'string', group: 'promise', initialValue: 'TRUE'},
    {name: 'promiseBody', title: 'Body', type: 'text', rows: 5, group: 'promise'},
    {name: 'promiseCtaLabel', title: 'CTA label', type: 'string', group: 'promise', initialValue: 'Events calendar'},
    {name: 'promiseCtaUrl', title: 'CTA URL', type: 'string', group: 'promise', initialValue: '/events'},

    // Featured
    {name: 'featuredTitle', title: 'Title', description: 'The count is appended automatically', type: 'string', group: 'featured', initialValue: 'Featured fests'},
    {name: 'featuredCtaLabel', title: 'CTA label', type: 'string', group: 'featured', initialValue: 'Browse all 42 talks'},
    {name: 'featuredCtaUrl', title: 'CTA URL', type: 'string', group: 'featured', initialValue: '#lineup'},

    // Lineup
    {name: 'lineupTitle', title: 'Title', description: 'The count is appended automatically', type: 'string', group: 'lineup', initialValue: 'The full lineup'},

    // Creative band
    {name: 'creativeTitle', title: 'Title', type: 'string', group: 'creative', initialValue: 'Creative that slaps.'},
    {name: 'creativeTitleItalic', title: 'Italic portion', type: 'string', group: 'creative', initialValue: 'slaps.'},
    {name: 'creativeBody', title: 'Body', type: 'text', rows: 3, group: 'creative'},
    {name: 'creativeCtaLabel', title: 'CTA label', type: 'string', group: 'creative', initialValue: 'Get involved'},
    {name: 'creativeCtaUrl', title: 'CTA URL', type: 'string', group: 'creative', initialValue: '/contact'},

    // Process
    {name: 'processTitle', title: 'Title', type: 'string', group: 'process', initialValue: 'How we run a fest'},
    {
      name: 'processSteps',
      title: 'Steps',
      type: 'array',
      group: 'process',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'title', title: 'Title', type: 'string'},
            {name: 'description', title: 'Description', type: 'text', rows: 3},
          ],
          preview: {select: {title: 'title', subtitle: 'description'}},
        },
      ],
    },

    // Testimonials
    {name: 'testimonialsTitle', title: 'Title', description: 'The count is appended automatically', type: 'string', group: 'testimonials', initialValue: 'What they say'},

    // Ledger
    {name: 'ledgerEyebrow', title: 'Eyebrow', type: 'string', group: 'ledger', initialValue: 'About the Student Body'},
    {name: 'ledgerTitle', title: 'Title', type: 'string', group: 'ledger', initialValue: 'Eight teams. One campus ledger.'},
    {name: 'ledgerTitleHighlight', title: 'Title highlight word(s)', type: 'string', group: 'ledger', initialValue: 'campus'},
    {name: 'ledgerBody', title: 'Body', type: 'text', rows: 4, group: 'ledger'},
    {name: 'ledgerImage', title: 'Image', type: 'image', options: {hotspot: true}, group: 'ledger'},
    {name: 'ledgerCtaLabel', title: 'CTA label', type: 'string', group: 'ledger', initialValue: 'See the student body'},
    {name: 'ledgerCtaUrl', title: 'CTA URL', type: 'string', group: 'ledger', initialValue: '/students/body-structure'},

    // CTA
    {name: 'ctaTitle', title: 'Title', type: 'string', group: 'cta', initialValue: "LET'S RUN SOMETHING GREAT."},
    {name: 'ctaSubtitle', title: 'Subtitle', type: 'string', group: 'cta'},
    {
      name: 'ctaButtons',
      title: 'Buttons',
      type: 'array',
      group: 'cta',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'label', title: 'Label', type: 'string'},
            {name: 'url', title: 'URL', type: 'string'},
            {name: 'primary', title: 'Primary (filled) style?', type: 'boolean', initialValue: false},
          ],
          preview: {select: {title: 'label', subtitle: 'url'}},
        },
      ],
    },
  ],
  preview: {prepare() { return {title: 'Flagship Events Page'} }},
}
