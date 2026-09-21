export default {
  name: 'lifePage',
  title: 'Life @ SIMSREE Page',
  type: 'document',
  groups: [
    {name: 'hero', title: 'Hero'},
    {name: 'numbers', title: 'The Numbers'},
    {name: 'facilities', title: 'Facilities Intro'},
    {name: 'voices', title: 'Voices Intro'},
    {name: 'cta', title: 'Visit CTA'},
  ],
  fields: [
    // Hero
    {name: 'heroEyebrow', title: 'Eyebrow', type: 'string', group: 'hero', initialValue: 'Campus Life · SIMSREE 2025'},
    {name: 'heroTitle', title: 'Title', type: 'string', group: 'hero', initialValue: "It's not a building. It's a rhythm."},
    {name: 'heroTitleBreakAfter', title: 'Line break after', type: 'string', group: 'hero', initialValue: 'building.'},
    {name: 'heroDescription', title: 'Description', type: 'text', rows: 2, group: 'hero'},
    {name: 'heroImage', title: 'Hero image', type: 'image', options: {hotspot: true}, group: 'hero'},

    // The numbers
    {name: 'numbersEyebrow', title: 'Eyebrow', type: 'string', group: 'numbers', initialValue: 'The Numbers'},
    {name: 'numbersTitle', title: 'Title', type: 'string', group: 'numbers', initialValue: 'A campus that punches above its postcode.'},
    {name: 'numbersTitleHighlight', title: 'Title highlight word(s)', type: 'string', group: 'numbers', initialValue: 'above its'},
    {name: 'numbersBody', title: 'Body', type: 'text', rows: 4, group: 'numbers'},
    {
      name: 'stats',
      title: 'Stat cards',
      type: 'array',
      group: 'numbers',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'label', title: 'Label', type: 'string'},
            {name: 'value', title: 'Value', type: 'string'},
            {name: 'dark', title: 'Dark (navy) background?', type: 'boolean', initialValue: false},
          ],
          preview: {select: {title: 'value', subtitle: 'label'}},
        },
      ],
    },

    // Facilities intro
    {name: 'facilitiesEyebrow', title: 'Eyebrow', type: 'string', group: 'facilities', initialValue: 'The Facilities'},
    {name: 'facilitiesTitle', title: 'Title', description: 'The facility count is prefixed automatically', type: 'string', group: 'facilities', initialValue: 'spaces, each one a different mode.'},
    {name: 'facilitiesTitleHighlight', title: 'Title highlight word(s)', type: 'string', group: 'facilities', initialValue: 'each one a'},

    // Voices intro
    {name: 'voicesEyebrow', title: 'Eyebrow', type: 'string', group: 'voices', initialValue: 'In Their Words'},
    {name: 'voicesTitle', title: 'Title', type: 'string', group: 'voices', initialValue: 'What the cohort actually remembers.'},
    {name: 'voicesTitleHighlight', title: 'Title highlight word(s)', type: 'string', group: 'voices', initialValue: 'actually'},

    // CTA
    {name: 'ctaEyebrow', title: 'Eyebrow', type: 'string', group: 'cta', initialValue: 'Plan Your Visit'},
    {name: 'ctaTitle', title: 'Title', type: 'string', group: 'cta', initialValue: 'See it for yourself.'},
    {name: 'ctaSubtitle', title: 'Subtitle', type: 'text', rows: 2, group: 'cta'},
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
  preview: {prepare() { return {title: 'Life @ SIMSREE Page'} }},
}
