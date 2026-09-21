export default {
  name: 'simerationsTrack',
  title: 'Simerations — Track',
  type: 'document',
  fields: [
    {name: 'name', title: 'Track name', type: 'string', validation: (Rule) => Rule.required()},
    {name: 'description', title: 'Description', type: 'text', rows: 2},
    {name: 'order', title: 'Display order', type: 'number', validation: (Rule) => Rule.required()},
  ],
  orderings: [{title: 'Display order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'name', subtitle: 'description'}},
}
