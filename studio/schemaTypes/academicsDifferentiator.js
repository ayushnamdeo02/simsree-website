export default {
  name: 'academicsDifferentiator',
  title: 'Academics - Differentiator',
  type: 'document',
  description: 'The numbered "Five things other B-schools cannot give you" cards',
  fields: [
    {name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required()},
    {name: 'description', title: 'Description', type: 'text', rows: 3, validation: (Rule) => Rule.required()},
    {name: 'order', title: 'Display order', description: 'Also shown as the 01/02/03 number', type: 'number', validation: (Rule) => Rule.required()},
  ],
  orderings: [{title: 'Display order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'title', subtitle: 'description'}},
}
