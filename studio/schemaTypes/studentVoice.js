export default {
  name: 'studentVoice',
  title: 'Homepage - Student Voice',
  type: 'document',
  fields: [
    {name: 'quote', title: 'Quote', type: 'text', rows: 4, validation: (Rule) => Rule.required()},
    {name: 'photo', title: 'Photo', type: 'image', options: {hotspot: true}},
    {name: 'name', title: 'Name', type: 'string', validation: (Rule) => Rule.required()},
    {name: 'meta', title: 'Meta line', description: 'e.g. "MMS · Batch 2022–24"', type: 'string'},
    {name: 'order', title: 'Display order', type: 'number', validation: (Rule) => Rule.required()},
  ],
  orderings: [{title: 'Display order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'name', subtitle: 'meta', media: 'photo'}},
}
