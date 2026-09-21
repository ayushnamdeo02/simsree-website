export default {
  name: 'studentTestimonial',
  title: "Student's Corner — Testimonial",
  type: 'document',
  description: 'Quotes in the Voices carousel',
  fields: [
    {name: 'quote', title: 'Quote', type: 'text', rows: 4, validation: (Rule) => Rule.required()},
    {name: 'name', title: 'Name', type: 'string', validation: (Rule) => Rule.required()},
    {name: 'programme', title: 'Programme', description: 'e.g. "MMS"', type: 'string'},
    {name: 'meta', title: 'Meta line', description: 'e.g. "Batch 2022-24"', type: 'string'},
    {name: 'role', title: 'Role', description: 'e.g. "Chairperson, Placement Committee"', type: 'string'},
    {name: 'photo', title: 'Photo', type: 'image', options: {hotspot: true}},
    {name: 'order', title: 'Display order', type: 'number', validation: (Rule) => Rule.required()},
  ],
  orderings: [{title: 'Display order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'name', subtitle: 'quote', media: 'photo'}},
}
