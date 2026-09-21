export default {
  name: 'lifeVoice',
  title: 'Life @ SIMSREE — Voice',
  type: 'document',
  description: 'Quotes in the "What the cohort actually remembers" carousel',
  fields: [
    {name: 'quote', title: 'Quote', type: 'text', rows: 4, validation: (Rule) => Rule.required()},
    {name: 'name', title: 'Name', type: 'string', validation: (Rule) => Rule.required()},
    {name: 'programme', title: 'Programme', description: 'e.g. "MMS"', type: 'string'},
    {name: 'meta', title: 'Meta line', description: 'e.g. "Batch 2023-25"', type: 'string'},
    {name: 'role', title: 'Role', type: 'string'},
    {name: 'photo', title: 'Photo', type: 'image', options: {hotspot: true}},
    {name: 'order', title: 'Display order', type: 'number', validation: (Rule) => Rule.required()},
  ],
  orderings: [{title: 'Display order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'name', subtitle: 'quote', media: 'photo'}},
}
