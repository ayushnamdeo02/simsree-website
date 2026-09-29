export default {
  name: 'placementPartner',
  title: 'Placements - Recruiting Partner',
  type: 'document',
  fields: [
    {name: 'name', title: 'Company name', type: 'string', validation: (Rule) => Rule.required()},
    {name: 'logo', title: 'Logo', type: 'image', options: {hotspot: true}},
    {
      name: 'sector',
      title: 'Sector',
      description: 'Drives the filter chips on the Recruiting Partners page',
      type: 'string',
      options: {list: ['BFSI', 'Consulting', 'FMCG', 'IT. Tech', 'Pharma', 'Manufacturing', 'Media']},
    },
    {name: 'order', title: 'Display order', type: 'number', validation: (Rule) => Rule.required()},
  ],
  orderings: [{title: 'Display order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'name', subtitle: 'sector', media: 'logo'}},
}
