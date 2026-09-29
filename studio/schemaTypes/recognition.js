export default {
  name: 'recognition',
  title: 'News - Recognition',
  type: 'document',
  description: 'The "Recognised by those who notice" cards',
  fields: [
    {name: 'year', title: 'Year', type: 'string', validation: (Rule) => Rule.required()},
    {name: 'title', title: 'Title', description: 'e.g. "Best B-school Fest"', type: 'string', validation: (Rule) => Rule.required()},
    {name: 'source', title: 'Source', description: 'e.g. "The Hindu BusinessLine"', type: 'string'},
    {name: 'order', title: 'Display order', type: 'number', validation: (Rule) => Rule.required()},
  ],
  orderings: [{title: 'Display order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'title', subtitle: 'source'}},
}
