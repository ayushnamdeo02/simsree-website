export default {
  name: 'cityChapter',
  title: 'Alumni Portal — City Chapter',
  type: 'document',
  fields: [
    {name: 'city', title: 'City', type: 'string', validation: (Rule) => Rule.required()},
    {name: 'image', title: 'Image', type: 'image', options: {hotspot: true}},
    {name: 'memberCount', title: 'Member count badge', description: 'e.g. "1,200+ alumni"', type: 'string'},
    {name: 'convener', title: 'Convener', description: 'e.g. "Convener · Karan Mehta · MMS \'09"', type: 'string'},
    {name: 'meetInfo', title: 'Meet info', description: 'e.g. "Next meetup · 14 Feb 2026 · Bandra Kurla Complex"', type: 'string'},
    {name: 'order', title: 'Display order', type: 'number', validation: (Rule) => Rule.required()},
  ],
  orderings: [{title: 'Display order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'city', subtitle: 'memberCount', media: 'image'}},
}
