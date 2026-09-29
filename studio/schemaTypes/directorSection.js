export default {
  name: 'directorSection',
  title: "Director's Message - Section",
  type: 'document',
  fields: [
    {
      name: 'number',
      title: 'Number',
      description: 'e.g. "01"',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'title',
      title: 'Title',
      description: 'e.g. "A privilege."',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'titleHighlight',
      title: 'Title highlight word(s)',
      description: 'The italicized/colored word(s) in the title, e.g. "privilege."',
      type: 'string',
    },
    {
      name: 'body',
      title: 'Body',
      description: 'Paragraph(s) - separate paragraphs with a blank line',
      type: 'text',
      rows: 6,
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'boldClosing',
      title: 'Bold closing line',
      description: 'Optional short bold line at the end, e.g. "They have practised it."',
      type: 'string',
    },
    {
      name: 'pills',
      title: 'Stat pills',
      description: 'Optional small pills shown under the body, e.g. "Faculty · scholar-practitioners"',
      type: 'array',
      of: [{type: 'string'}],
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
    select: {title: 'title', subtitle: 'number'},
  },
}
