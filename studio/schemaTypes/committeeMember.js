export default {
  name: 'committeeMember',
  title: 'Placement Contact - Committee Member',
  type: 'document',
  description: 'The photo grid under "Meet the Team"',
  fields: [
    {name: 'name', title: 'Name', type: 'string', validation: (Rule) => Rule.required()},
    {name: 'photo', title: 'Photo', type: 'image', options: {hotspot: true}},
    {name: 'role', title: 'Role', description: 'e.g. "Placement Chairperson"', type: 'string'},
    {name: 'email', title: 'Email', type: 'string'},
    {name: 'phone', title: 'Phone', type: 'string'},
    {name: 'order', title: 'Display order', type: 'number', validation: (Rule) => Rule.required()},
  ],
  orderings: [{title: 'Display order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'name', subtitle: 'role', media: 'photo'}},
}
