export default {
  name: 'hallOfFameEntry',
  title: 'Alumni — Hall of Fame',
  type: 'document',
  fields: [
    {
      name: 'tags',
      title: 'Tags',
      description: 'Small labels above the quote, e.g. "Finance", "International"',
      type: 'array',
      of: [{type: 'string'}],
    },
    {name: 'quote', title: 'Quote', type: 'text', rows: 4, validation: (Rule) => Rule.required()},
    {name: 'photo', title: 'Photo', type: 'image', options: {hotspot: true}},
    {name: 'name', title: 'Name', type: 'string', validation: (Rule) => Rule.required()},
    {name: 'role', title: 'Role', type: 'string'},
    {name: 'company', title: 'Company / location', type: 'string'},
    {name: 'batch', title: 'Batch', type: 'string'},
    {name: 'order', title: 'Display order', type: 'number', validation: (Rule) => Rule.required()},
  ],
  orderings: [{title: 'Display order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'name', subtitle: 'role', media: 'photo'}},
}
