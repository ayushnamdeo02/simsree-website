export default {
  name: 'honour',
  title: 'Rankings — Recent Honour',
  type: 'document',
  fields: [
    {name: 'image', title: 'Image', type: 'image', options: {hotspot: true}},
    {name: 'date', title: 'Date label', description: 'e.g. "Nov 2025" or "2024"', type: 'string', validation: (Rule) => Rule.required()},
    {name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required()},
    {name: 'description', title: 'Description', type: 'text', rows: 3, validation: (Rule) => Rule.required()},
    {name: 'linkLabel', title: 'Link label', description: 'e.g. "View citation", "View notification"', type: 'string'},
    {name: 'linkUrl', title: 'Link URL', type: 'string'},
    {name: 'order', title: 'Display order', type: 'number', validation: (Rule) => Rule.required()},
  ],
  orderings: [{title: 'Display order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'title', subtitle: 'date', media: 'image'}},
}
