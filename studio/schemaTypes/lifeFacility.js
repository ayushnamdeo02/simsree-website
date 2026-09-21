export default {
  name: 'lifeFacility',
  title: 'Life @ SIMSREE — Facility',
  type: 'document',
  description: 'The alternating image + text rows. The count drives the section heading.',
  fields: [
    {name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required()},
    {name: 'image', title: 'Image', type: 'image', options: {hotspot: true}},
    {name: 'description', title: 'Description', type: 'text', rows: 4},
    {name: 'order', title: 'Display order', type: 'number', validation: (Rule) => Rule.required()},
  ],
  orderings: [{title: 'Display order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'title', subtitle: 'description', media: 'image'}},
}
