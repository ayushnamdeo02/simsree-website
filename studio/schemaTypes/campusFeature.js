export default {
  name: 'campusFeature',
  title: 'Campus - Feature Row',
  type: 'document',
  fields: [
    {name: 'number', title: 'Number', description: 'e.g. "01"', type: 'string', validation: (Rule) => Rule.required()},
    {name: 'title', title: 'Title', description: 'e.g. "Inside the financial mile."', type: 'string', validation: (Rule) => Rule.required()},
    {name: 'body', title: 'Body', type: 'text', rows: 6, validation: (Rule) => Rule.required()},
    {name: 'image', title: 'Image', type: 'image', options: {hotspot: true}},
    {name: 'order', title: 'Display order', type: 'number', validation: (Rule) => Rule.required()},
  ],
  orderings: [{title: 'Display order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'title', subtitle: 'number', media: 'image'}},
}
