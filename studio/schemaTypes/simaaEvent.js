export default {
  name: 'simaaEvent',
  title: 'Alumni Portal - SIMAA Event',
  type: 'document',
  fields: [
    {name: 'day', title: 'Day of week', description: 'e.g. "Sat"', type: 'string'},
    {name: 'date', title: 'Date number', description: 'e.g. "22"', type: 'string', validation: (Rule) => Rule.required()},
    {name: 'month', title: 'Month + year', description: 'e.g. "Feb 2026"', type: 'string'},
    {name: 'category', title: 'Category', description: 'e.g. "Flagship", "Networking"', type: 'string'},
    {name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required()},
    {name: 'description', title: 'Description', type: 'text', rows: 2},
    {name: 'ctaLabel', title: 'CTA label', description: 'e.g. "RSVP", "Volunteer"', type: 'string'},
    {name: 'ctaUrl', title: 'CTA URL', type: 'string'},
    {name: 'order', title: 'Display order', type: 'number', validation: (Rule) => Rule.required()},
  ],
  orderings: [{title: 'Display order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'title', subtitle: 'month'}},
}
