export default {
  name: 'accreditation',
  title: 'Rankings - Accreditation',
  type: 'document',
  fields: [
    {
      name: 'icon',
      title: 'Icon',
      description: 'Name of a lucide-react icon, e.g. "FileCheck", "GraduationCap", "ShieldCheck", "ExternalLink"',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required()},
    {name: 'description', title: 'Description', type: 'text', rows: 3, validation: (Rule) => Rule.required()},
    {name: 'linkUrl', title: 'Link URL', type: 'string'},
    {name: 'order', title: 'Display order', type: 'number', validation: (Rule) => Rule.required()},
  ],
  orderings: [{title: 'Display order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'title', subtitle: 'icon'}},
}
