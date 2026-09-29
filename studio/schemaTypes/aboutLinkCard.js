export default {
  name: 'aboutLinkCard',
  title: 'About Page - Link Card',
  type: 'document',
  fields: [
    {
      name: 'section',
      title: 'Section',
      description: 'Which group of cards this belongs to on the About page',
      type: 'string',
      options: {list: ['Campus & Culture', 'Alumni Network']},
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
    },
    {
      name: 'badge',
      title: 'Badge',
      description: 'Small label like "New" shown on the card, leave blank for none',
      type: 'string',
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
      rows: 2,
      validation: (Rule) => Rule.required(),
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
    select: {title: 'title', subtitle: 'section'},
  },
}
