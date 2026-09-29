export default {
  name: 'industryProgramme',
  title: 'Events - Industry Programme',
  type: 'document',
  fields: [
    {name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required()},
    {name: 'badge', title: 'Badge', description: 'e.g. "2-5 Day Intensive"', type: 'string'},
    {name: 'description', title: 'Description', type: 'text', rows: 3},
    {name: 'image', title: 'Image', type: 'image', options: {hotspot: true}},
    {name: 'ctaLabel', title: 'Link label', type: 'string', initialValue: 'Open'},
    {name: 'ctaUrl', title: 'Link URL', type: 'string'},
    {name: 'order', title: 'Display order', type: 'number', validation: (Rule) => Rule.required()},
  ],
  orderings: [{title: 'Display order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'title', subtitle: 'badge', media: 'image'}},
}
