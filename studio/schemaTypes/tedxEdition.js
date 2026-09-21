export default {
  name: 'tedxEdition',
  title: 'TEDxSIMSREE — Edition',
  type: 'document',
  description: 'The photo-tile grid. The count drives the section heading.',
  fields: [
    {name: 'year', title: 'Year', type: 'string', validation: (Rule) => Rule.required()},
    {name: 'theme', title: 'Theme', description: 'e.g. "Unstoppable"', type: 'string', validation: (Rule) => Rule.required()},
    {name: 'description', title: 'Description', type: 'text', rows: 2},
    {name: 'image', title: 'Image', type: 'image', options: {hotspot: true}},
    {name: 'wide', title: 'Wide tile?', description: 'Spans two columns in the grid', type: 'boolean', initialValue: false},
    {name: 'order', title: 'Display order', type: 'number', validation: (Rule) => Rule.required()},
  ],
  orderings: [{title: 'Display order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'theme', subtitle: 'year', media: 'image'}},
}
