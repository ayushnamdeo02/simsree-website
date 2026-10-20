export default {
  name: 'campusTestimonial',
  title: 'Campus - Testimonial',
  type: 'document',
  fields: [
    {name: 'quote', title: 'Quote', type: 'text', rows: 3, validation: (Rule) => Rule.required()},
    {name: 'photo', title: 'Photo', type: 'image', options: {hotspot: true}},
    {name: 'name', title: 'Name', type: 'string', validation: (Rule) => Rule.required()},
    {name: 'programme', title: 'Programme', description: 'Shown in brackets after the name, e.g. "MMS"', type: 'string'},
    {name: 'meta', title: 'Meta line', description: 'e.g. "MMS · Batch 2024"', type: 'string'},
    {name: 'order', title: 'Display order', type: 'number', validation: (Rule) => Rule.required()},
  ],
  orderings: [{title: 'Display order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'name', subtitle: 'meta', media: 'photo'}},
}
