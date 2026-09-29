export default {
  name: 'lifeFeature',
  title: 'Life @ SIMSREE - Feature Row',
  type: 'document',
  description: 'The numbered image + text rows near the top of the page',
  fields: [
    {name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required()},
    {name: 'image', title: 'Image', type: 'image', options: {hotspot: true}},
    {name: 'body', title: 'Body paragraphs', type: 'array', of: [{type: 'text', rows: 3}]},
    {name: 'order', title: 'Display order', description: 'Also shown as the 01/02/03 badge', type: 'number', validation: (Rule) => Rule.required()},
  ],
  orderings: [{title: 'Display order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'title', media: 'image'}},
}
