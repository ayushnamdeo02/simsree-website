export default {
  name: 'simarthanActivity',
  title: 'Simarthan - Activity Card',
  type: 'document',
  fields: [
    {name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required()},
    {name: 'description', title: 'Description', type: 'text', rows: 3, validation: (Rule) => Rule.required()},
    {name: 'order', title: 'Display order', description: 'Also shown as the 01/02/03 number badge', type: 'number', validation: (Rule) => Rule.required()},
  ],
  orderings: [{title: 'Display order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'title', subtitle: 'description'}},
}
