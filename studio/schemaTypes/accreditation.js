export default {
  name: 'accreditation',
  title: 'Rankings - Recognition',
  type: 'document',
  fields: [
    {
      name: 'highlight',
      title: 'Highlight',
      description: 'Large text at the top of the card, e.g. "25th" or "Academic Excellence"',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {name: 'title', title: 'Title', description: 'e.g. "IIRF Ranking 2024"', type: 'string', validation: (Rule) => Rule.required()},
    {name: 'description', title: 'Description', type: 'text', rows: 3, validation: (Rule) => Rule.required()},
    {name: 'linkUrl', title: 'Link URL', description: 'Optional: makes the whole card a link', type: 'string'},
    {name: 'order', title: 'Display order', type: 'number', validation: (Rule) => Rule.required()},
  ],
  orderings: [{title: 'Display order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'highlight', subtitle: 'title'}},
}
