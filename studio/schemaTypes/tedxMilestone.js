export default {
  name: 'tedxMilestone',
  title: 'TEDxSIMSREE - History Milestone',
  type: 'document',
  description: 'The numbered vertical timeline',
  fields: [
    {name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required()},
    {name: 'description', title: 'Description', type: 'text', rows: 3},
    {name: 'order', title: 'Display order', description: 'Also shown as the 01/02/03 marker', type: 'number', validation: (Rule) => Rule.required()},
  ],
  orderings: [{title: 'Display order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'title', subtitle: 'description'}},
}
