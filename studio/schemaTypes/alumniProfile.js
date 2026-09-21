export default {
  name: 'alumniProfile',
  title: 'Alumni — Directory Profile',
  type: 'document',
  fields: [
    {name: 'name', title: 'Name', type: 'string', validation: (Rule) => Rule.required()},
    {name: 'photo', title: 'Photo', type: 'image', options: {hotspot: true}},
    {name: 'role', title: 'Role', description: 'e.g. "Senior Manager"', type: 'string'},
    {name: 'company', title: 'Company / location', description: 'e.g. "Deloitte Consulting · Bengaluru"', type: 'string'},
    {name: 'batch', title: 'Batch', description: 'e.g. "MMS \'11"', type: 'string'},
    {
      name: 'sector',
      title: 'Sector',
      description: 'Used by the directory filter chips',
      type: 'string',
      options: {list: ['Finance', 'Media', 'Entrepreneurship', 'Consulting', 'Public Sector']},
      validation: (Rule) => Rule.required(),
    },
    {name: 'order', title: 'Display order', type: 'number', validation: (Rule) => Rule.required()},
  ],
  orderings: [{title: 'Display order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'name', subtitle: 'company', media: 'photo'}},
}
