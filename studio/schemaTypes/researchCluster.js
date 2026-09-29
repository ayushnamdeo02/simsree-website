export default {
  name: 'researchCluster',
  title: 'Faculty - Research Cluster',
  type: 'document',
  description: 'Numbered research areas open to PhD enquiries',
  fields: [
    {name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required()},
    {name: 'description', title: 'Description', type: 'text', rows: 2},
    {name: 'leads', title: 'Faculty leads', description: 'e.g. "Dr. Mehta · Dr. Iyer · Dr. Deshpande"', type: 'string'},
    {name: 'order', title: 'Display order', description: 'Also shown as the 01/02/03 number', type: 'number', validation: (Rule) => Rule.required()},
  ],
  orderings: [{title: 'Display order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'title', subtitle: 'leads'}},
}
