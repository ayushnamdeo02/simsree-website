export default {
  name: 'navLink',
  title: 'Link',
  type: 'object',
  fields: [
    {name: 'label', title: 'Label', type: 'string', validation: (Rule) => Rule.required()},
    {name: 'path', title: 'Path', description: 'e.g. /about or /academics/mms', type: 'string', validation: (Rule) => Rule.required()},
  ],
  preview: {
    select: {title: 'label', subtitle: 'path'},
  },
}
