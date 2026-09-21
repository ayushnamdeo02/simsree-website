export default {
  name: 'festPartner',
  title: 'Flagship Events — Partner',
  type: 'document',
  description: 'Logos in the scrolling partner strip',
  fields: [
    {name: 'name', title: 'Partner name', type: 'string', validation: (Rule) => Rule.required()},
    {name: 'logo', title: 'Logo', type: 'image', options: {hotspot: true}},
    {name: 'order', title: 'Display order', type: 'number', validation: (Rule) => Rule.required()},
  ],
  orderings: [{title: 'Display order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'name', media: 'logo'}},
}
