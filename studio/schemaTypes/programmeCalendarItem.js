export default {
  name: 'programmeCalendarItem',
  title: 'Development Programmes — Calendar Item',
  type: 'document',
  description: 'Expandable rows in the upcoming-programmes calendar',
  fields: [
    {name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required()},
    {name: 'date', title: 'Date', type: 'date', options: {dateFormat: 'YYYY-MM-DD'}, validation: (Rule) => Rule.required()},
    {
      name: 'track',
      title: 'Track',
      description: 'Drives the filter chips',
      type: 'string',
      options: {list: ['MDP', 'Career Catalyst']},
      validation: (Rule) => Rule.required(),
    },
    {name: 'meta', title: 'Meta line', description: 'e.g. "3-day · ₹15,000 · Hybrid"', type: 'string'},
    {name: 'description', title: 'Description', description: 'Shown when expanded', type: 'text', rows: 4},
    {name: 'image', title: 'Image', type: 'image', options: {hotspot: true}},
    {
      name: 'detailRows',
      title: 'Detail rows',
      description: 'e.g. Duration / Format / Fee / Faculty',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'label', title: 'Label', type: 'string'},
            {name: 'value', title: 'Value', type: 'string'},
          ],
          preview: {select: {title: 'label', subtitle: 'value'}},
        },
      ],
    },
    {name: 'order', title: 'Display order', type: 'number', validation: (Rule) => Rule.required()},
  ],
  orderings: [{title: 'Display order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'title', subtitle: 'meta'}},
}
