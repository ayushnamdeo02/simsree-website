export default {
  name: 'flagshipEvent',
  title: 'Flagship Event',
  type: 'document',
  description:
    'Shared by the homepage flagship strip and the Events landing page, so both always agree.',
  fields: [
    {
      name: 'tag',
      title: 'Tag',
      description: 'e.g. "National Fest"',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'title',
      title: 'Title',
      description: 'e.g. "Simerations"',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
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
      description: 'e.g. "Register your team"',
      type: 'string',
    },
    {
      name: 'linkUrl',
      title: 'Link URL',
      type: 'string',
    },
    {
      name: 'monthBadge',
      title: 'Month badge',
      description: 'Shown on the Events page card, e.g. "SEPT 2026" or "NOV"',
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
