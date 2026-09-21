export default {
  name: 'navItem',
  title: 'Nav Item',
  type: 'object',
  fields: [
    {name: 'label', title: 'Label', type: 'string', validation: (Rule) => Rule.required()},
    {name: 'path', title: 'Path', type: 'string', validation: (Rule) => Rule.required()},
    {
      name: 'children',
      title: 'Dropdown links',
      type: 'array',
      of: [{type: 'navLink'}],
    },
  ],
  preview: {
    select: {title: 'label', subtitle: 'path'},
  },
}
