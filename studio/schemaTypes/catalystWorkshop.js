export default {
  name: 'catalystWorkshop',
  title: 'Development Programmes — Career Catalyst Workshop',
  type: 'document',
  fields: [
    {name: 'name', title: 'Workshop name', type: 'string', validation: (Rule) => Rule.required()},
    {name: 'summary', title: 'Summary', description: 'e.g. "90-min · live edits · ₹2,500."', type: 'string'},
    {name: 'ctaLabel', title: 'Button label', type: 'string', initialValue: 'Book my seat'},
    {name: 'ctaUrl', title: 'Button URL', type: 'string'},
    {name: 'order', title: 'Display order', type: 'number', validation: (Rule) => Rule.required()},
  ],
  orderings: [{title: 'Display order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'name', subtitle: 'summary'}},
}
