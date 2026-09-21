export default {
  name: 'timelineMilestone',
  title: 'History — Timeline Milestone',
  type: 'document',
  fields: [
    {
      name: 'year',
      title: 'Year',
      description: 'e.g. "1983" or "2024" — also shown large and faded opposite the card',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'category',
      title: 'Category tag',
      description: 'e.g. "Founding", "Expansion", "Research", "Recognition", "Structure"',
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
      rows: 3,
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'source',
      title: 'Source citation',
      description: 'Small italic attribution line at the bottom of the card, e.g. "PhD programme"',
      type: 'string',
    },
    {
      name: 'icon',
      title: 'Icon / photo',
      description: 'Optional small circular icon or photo shown on the timeline marker',
      type: 'image',
    },
    {
      name: 'variant',
      title: 'Card style',
      description: 'Default white, Highlight (cream) for a standout year, or Current (navy) for the live milestone',
      type: 'string',
      options: {list: [
        {title: 'Default', value: 'default'},
        {title: 'Highlight', value: 'highlight'},
        {title: 'Current', value: 'current'},
      ]},
      initialValue: 'default',
    },
    {
      name: 'ghostLabel',
      title: 'Ghost label',
      description: 'Large faded text shown opposite the card. Defaults to the year; set e.g. "NOW" for the current milestone.',
      type: 'string',
    },
    {
      name: 'order',
      title: 'Display order',
      description: 'Chronological order, earliest first',
      type: 'number',
      validation: (Rule) => Rule.required(),
    },
  ],
  orderings: [
    {title: 'Display order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]},
  ],
  preview: {
    select: {title: 'title', subtitle: 'year'},
  },
}
