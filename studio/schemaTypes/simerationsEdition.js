export default {
  name: 'simerationsEdition',
  title: 'Simerations — Edition',
  type: 'document',
  description: 'One per year. Drives the edition filter, the detail cards and the archive strip.',
  fields: [
    {name: 'year', title: 'Year', description: 'e.g. "2026"', type: 'string', validation: (Rule) => Rule.required()},
    {name: 'title', title: 'Title', description: 'e.g. "Simerations 2026"', type: 'string', validation: (Rule) => Rule.required()},
    {name: 'upcoming', title: 'Upcoming edition?', type: 'boolean', initialValue: false},
    {name: 'image', title: 'Image', type: 'image', options: {hotspot: true}},
    {name: 'summary', title: 'Summary line', description: 'e.g. "18-19 September 2026 · 5 tracks · 500+ delegates expected."', type: 'text', rows: 3},
    {
      name: 'rows',
      title: 'Detail rows',
      description: 'Labelled facts under the summary, e.g. Theme / Format / Prize pool',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'label', title: 'Label', type: 'string'},
            {name: 'value', title: 'Value', type: 'string'},
          ],
          preview: {select: {title: 'label', subtitle: 'value'}},
        },
      ],
    },
    {name: 'archiveSummary', title: 'Archive card summary', description: 'Shown in the archive strip, e.g. "600 delegates · 50 colleges · Theme: AI in Management"', type: 'text', rows: 2},
    {name: 'archiveCtaLabel', title: 'Archive link label', type: 'string', initialValue: 'Gallery + Winners'},
    {name: 'archiveCtaUrl', title: 'Archive link URL', type: 'string'},
    {name: 'order', title: 'Display order', type: 'number', validation: (Rule) => Rule.required()},
  ],
  orderings: [{title: 'Display order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'title', subtitle: 'summary', media: 'image'}},
}
