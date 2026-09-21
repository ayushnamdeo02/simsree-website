export default {
  name: 'achievementsPage',
  title: 'Achievements Page',
  type: 'document',
  groups: [
    {name: 'hero', title: 'Hero'},
    {name: 'filter', title: 'Filter Intro'},
    {name: 'list', title: 'List Settings'},
    {name: 'submit', title: 'Submit Band'},
    {name: 'collage', title: 'Photo Collage'},
  ],
  fields: [
    // Hero
    {name: 'heroEyebrow', title: 'Eyebrow', type: 'string', group: 'hero', initialValue: 'The Scoreboard'},
    {name: 'heroTitle', title: 'Title', type: 'string', group: 'hero', initialValue: 'Where our students win.'},
    {name: 'heroTitleItalic', title: 'Italic portion of title', type: 'string', group: 'hero', initialValue: 'win.'},
    {name: 'heroDescription', title: 'Description', type: 'text', rows: 2, group: 'hero'},
    {name: 'heroImage', title: 'Hero image', type: 'image', options: {hotspot: true}, group: 'hero'},
    {
      name: 'heroButtons',
      title: 'Buttons',
      type: 'array',
      group: 'hero',
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

    // Filter
    {name: 'filterEyebrow', title: 'Eyebrow', type: 'string', group: 'filter', initialValue: 'Filter'},
    {name: 'filterTitle', title: 'Title', type: 'string', group: 'filter', initialValue: 'Pick a category'},
    {name: 'filterSubtitle', title: 'Subtitle', type: 'string', group: 'filter', initialValue: 'Tap a category to filter instantly.'},

    // List
    {name: 'pageSize', title: 'Rows shown before "Load more"', type: 'number', group: 'list', initialValue: 6, validation: (Rule) => Rule.min(1).max(50)},
    {name: 'loadMoreLabel', title: 'Load more button label', type: 'string', group: 'list', initialValue: 'Load more achievements'},

    // Submit band
    {name: 'submitEyebrow', title: 'Eyebrow', type: 'string', group: 'submit', initialValue: 'Submit'},
    {name: 'submitTitle', title: 'Title', type: 'string', group: 'submit', initialValue: 'Won something? Tell us.'},
    {name: 'submitTitleHighlight', title: 'Title highlight word(s)', type: 'string', group: 'submit', initialValue: 'Tell us.'},
    {name: 'submitDescription', title: 'Description', type: 'text', rows: 3, group: 'submit'},
    {name: 'submitCtaLabel', title: 'CTA label', type: 'string', group: 'submit', initialValue: 'Add your achievement'},
    {name: 'submitCtaUrl', title: 'CTA URL', type: 'string', group: 'submit'},
    {name: 'submitListTitle', title: 'Right column title', type: 'string', group: 'submit', initialValue: 'What you can submit'},
    {
      name: 'submitStats',
      title: 'Stats',
      description: 'The figures under the submit copy',
      type: 'array',
      group: 'submit',
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

    // Collage
    {
      name: 'collage',
      title: 'Photo collage',
      description: 'Five images. The first renders large on the left.',
      type: 'array',
      group: 'collage',
      of: [{type: 'image', options: {hotspot: true}}],
      validation: (Rule) => Rule.max(5),
    },
  ],
  preview: {prepare() { return {title: 'Achievements Page'} }},
}
