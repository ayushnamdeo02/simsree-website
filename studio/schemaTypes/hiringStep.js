export default {
  name: 'hiringStep',
  title: 'Placements - Hiring Step',
  type: 'document',
  fields: [
    {name: 'timing', title: 'Timing label', description: 'e.g. "Day 0 · 45-60 min"', type: 'string'},
    {name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required()},
    {name: 'description', title: 'Description', type: 'text', rows: 3},
    {name: 'meta', title: 'Meta line', description: 'e.g. "Run by: Placement Committee"', type: 'string'},
    {name: 'order', title: 'Display order', description: 'Also shown as the 01/02/03 badge', type: 'number', validation: (Rule) => Rule.required()},
  ],
  orderings: [{title: 'Display order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'title', subtitle: 'timing'}},
}
