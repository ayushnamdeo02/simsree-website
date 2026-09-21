export default {
  name: 'whySimsreeFactor',
  title: 'Why SIMSREE — Factor',
  type: 'document',
  fields: [
    {
      name: 'tag',
      title: 'Tag',
      description: 'e.g. "Academic Rigour"',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
    },
    {
      name: 'linkLabel',
      title: 'Link label',
      description: 'e.g. "Explore academics"',
      type: 'string',
    },
    {
      name: 'linkUrl',
      title: 'Link URL',
      type: 'string',
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
    select: {title: 'title', subtitle: 'tag', media: 'image'},
  },
}
