export default {
  name: 'mdpProgramme',
  title: 'Development Programmes - MDP',
  type: 'document',
  description: 'Rows in the MDP fee table',
  fields: [
    {name: 'name', title: 'Programme', type: 'string', validation: (Rule) => Rule.required()},
    {name: 'dates', title: 'Dates', description: 'e.g. "14-16 May 2026"', type: 'string'},
    {name: 'format', title: 'Format', description: 'e.g. "3-day in-person"', type: 'string'},
    {name: 'fee', title: 'Fee', description: 'e.g. "₹15,000"', type: 'string'},
    {name: 'ctaLabel', title: 'Button label', type: 'string', initialValue: 'Reserve your seat'},
    {name: 'ctaUrl', title: 'Button URL', type: 'string'},
    {name: 'order', title: 'Display order', type: 'number', validation: (Rule) => Rule.required()},
  ],
  orderings: [{title: 'Display order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'name', subtitle: 'dates'}},
}
