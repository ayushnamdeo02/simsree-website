export default {
  name: 'coreValue',
  title: 'History - Core Value',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      description: 'e.g. "Excellence", "Collaboration", "Integrity"',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'order',
      title: 'Display order',
      type: 'number',
      validation: (Rule) => Rule.required(),
    },
  ],
  orderings: [
    {title: 'Display order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]},
  ],
  preview: {
    select: {title: 'title', subtitle: 'description'},
  },
}
