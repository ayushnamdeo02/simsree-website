export default {
  name: 'newsPage',
  title: 'News Page',
  type: 'document',
  groups: [
    {name: 'hero', title: 'Hero'},
    {name: 'featured', title: 'Featured Intro'},
    {name: 'numbers', title: 'SIMSREE In Numbers'},
    {name: 'list', title: 'News List Intro'},
    {name: 'why', title: 'Why People Choose'},
    {name: 'recognition', title: 'Recognition Intro'},
    {name: 'press', title: 'Press Contact'},
  ],
  fields: [
    // Hero
    {name: 'heroTitle', title: 'Title', type: 'string', group: 'hero', initialValue: 'From the SIMSREE newsroom.'},
    {name: 'heroTitleBreakAfter', title: 'Line break after', type: 'string', group: 'hero', initialValue: 'the'},
    {name: 'heroTitleHighlight', title: 'Title highlight word(s)', type: 'string', group: 'hero', initialValue: 'newsroom.'},
    {name: 'heroDescription', title: 'Description', type: 'text', rows: 3, group: 'hero'},
    {name: 'heroTags', title: 'Hero tags', description: 'Small pills under the description', type: 'array', of: [{type: 'string'}], group: 'hero'},
    {name: 'heroCollage', title: 'Hero collage images', type: 'array', of: [{type: 'image', options: {hotspot: true}}], group: 'hero', validation: (Rule) => Rule.max(4)},

    // Featured
    {name: 'featuredEyebrow', title: 'Eyebrow', type: 'string', group: 'featured', initialValue: 'Featured Story'},

    // Numbers
    {name: 'numbersTitle', title: 'Title', type: 'string', group: 'numbers', initialValue: 'SIMSREE in numbers'},
    {name: 'numbersFootnote', title: 'Footnote', type: 'text', rows: 2, group: 'numbers'},
    {
      name: 'numbers',
      title: 'Stats',
      type: 'array',
      group: 'numbers',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'value', title: 'Value', type: 'string'},
            {name: 'label', title: 'Label', type: 'string'},
            {name: 'note', title: 'Note', type: 'string'},
          ],
          preview: {select: {title: 'value', subtitle: 'label'}},
        },
      ],
    },

    // List
    {name: 'listEyebrow', title: 'Eyebrow', type: 'string', group: 'list', initialValue: 'Most Recent'},
    {name: 'listTitle', title: 'Title', type: 'string', group: 'list', initialValue: 'The latest SIMSREE news'},
    {name: 'filterLabel', title: 'Filter label', type: 'string', group: 'list', initialValue: 'Filter by'},

    // Why
    {name: 'whyTitle', title: 'Title', type: 'string', group: 'why', initialValue: 'Why people choose SIMSREE'},
    {
      name: 'whyCards',
      title: 'Cards',
      type: 'array',
      group: 'why',
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

    // Recognition
    {name: 'recognitionTitle', title: 'Title', type: 'string', group: 'recognition', initialValue: 'Recognised by those who notice.'},
    {name: 'recognitionTitleHighlight', title: 'Title highlight word(s)', type: 'string', group: 'recognition', initialValue: 'those who notice.'},

    // Press
    {name: 'pressEyebrow', title: 'Eyebrow', type: 'string', group: 'press', initialValue: 'Press Contact'},
    {name: 'pressTitle', title: 'Title', type: 'string', group: 'press', initialValue: 'Contact the SIMSREE press team'},
    {name: 'pressSubtitle', title: 'Subtitle', type: 'string', group: 'press', initialValue: 'Please direct all press enquiries to:'},
    {name: 'pressEmail', title: 'Press email', type: 'string', group: 'press', initialValue: 'press@simsree.org'},
    {name: 'pressAddress', title: 'Address', type: 'string', group: 'press'},
    {name: 'pressConsentLabel', title: 'Consent label', type: 'text', rows: 3, group: 'press'},
    {name: 'pressSubmitLabel', title: 'Submit label', type: 'string', group: 'press', initialValue: 'Submit'},
    {
      name: 'pressEndpointUrl',
      title: 'Form endpoint URL',
      description:
        'Where press enquiries are POSTed as JSON. Leave empty and the form opens a pre-filled email instead.',
      type: 'url',
      group: 'press',
      validation: (Rule) => Rule.uri({scheme: ['https']}),
    },
    {
      name: 'organisationOptions',
      title: 'Organisation dropdown options',
      type: 'array',
      of: [{type: 'string'}],
      group: 'press',
    },
  ],
  preview: {prepare() { return {title: 'News Page'} }},
}
