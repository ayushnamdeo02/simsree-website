export default {
  name: 'festTestimonial',
  title: 'Flagship Events - Testimonial',
  type: 'document',
  fields: [
    {name: 'quote', title: 'Quote', type: 'text', rows: 4, validation: (Rule) => Rule.required()},
    {name: 'name', title: 'Name', type: 'string', validation: (Rule) => Rule.required()},
    {name: 'role', title: 'Role', description: 'e.g. "CMO · Asian Paints"', type: 'string'},
    {name: 'photo', title: 'Photo', type: 'image', options: {hotspot: true}},
    {name: 'order', title: 'Display order', type: 'number', validation: (Rule) => Rule.required()},
  ],
  orderings: [{title: 'Display order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'name', subtitle: 'quote', media: 'photo'}},
}
