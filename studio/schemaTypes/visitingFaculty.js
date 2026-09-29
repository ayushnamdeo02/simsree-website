export default {
  name: 'visitingFaculty',
  title: 'Faculty - Visiting Faculty',
  type: 'document',
  description: 'Industry practitioners teaching electives and short modules',
  fields: [
    {name: 'name', title: 'Name', type: 'string', validation: (Rule) => Rule.required()},
    {name: 'photo', title: 'Photo', type: 'image', options: {hotspot: true}},
    {name: 'tag', title: 'Tag', description: 'Small coloured label, e.g. "Finance"', type: 'string'},
    {name: 'role', title: 'Current role', description: 'e.g. "MD, Global Markets · Barclays"', type: 'string'},
    {name: 'teaches', title: 'Teaches', description: 'e.g. "Trading Floor Realities"', type: 'string'},
    {name: 'since', title: 'Visiting since', description: 'e.g. "Visiting since 2019 · SIMSREE alum \u201908"', type: 'string'},
    {name: 'order', title: 'Display order', type: 'number', validation: (Rule) => Rule.required()},
  ],
  orderings: [{title: 'Display order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'name', subtitle: 'role', media: 'photo'}},
}
