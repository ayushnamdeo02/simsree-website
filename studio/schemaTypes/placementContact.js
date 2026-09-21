export default {
  name: 'placementContact',
  title: 'Placement Contact — Quick Contact',
  type: 'document',
  description: 'The circular avatar row near the top of the Placement Contact page',
  fields: [
    {name: 'name', title: 'Name', type: 'string', validation: (Rule) => Rule.required()},
    {name: 'photo', title: 'Photo', type: 'image', options: {hotspot: true}},
    {name: 'role', title: 'Role', description: 'e.g. "Placement Committee"', type: 'string'},
    {name: 'phone', title: 'Phone', description: 'Shown and used for the call link', type: 'string'},
    {name: 'email', title: 'Email', description: 'Used instead of phone when there is no number', type: 'string'},
    {name: 'note', title: 'Note', description: 'Small trailing line, e.g. "institutional queries"', type: 'string'},
    {name: 'order', title: 'Display order', type: 'number', validation: (Rule) => Rule.required()},
  ],
  orderings: [{title: 'Display order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'name', subtitle: 'role', media: 'photo'}},
}
