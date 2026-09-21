export default {
  name: 'footerColumn',
  title: 'Footer Column',
  type: 'object',
  fields: [
    {name: 'heading', title: 'Heading', type: 'string', validation: (Rule) => Rule.required()},
    {
      name: 'links',
      title: 'Links',
      type: 'array',
      of: [{type: 'navLink'}],
    },
  ],
  preview: {
    select: {title: 'heading'},
  },
}
