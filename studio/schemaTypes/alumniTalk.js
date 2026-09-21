export default {
  name: 'alumniTalk',
  title: 'Alumni Portal — Talk',
  type: 'document',
  fields: [
    {name: 'name', title: 'Speaker name', type: 'string', validation: (Rule) => Rule.required()},
    {name: 'image', title: 'Image', type: 'image', options: {hotspot: true}},
    {name: 'tag', title: 'Tag', description: 'e.g. "Founder · Funding"', type: 'string'},
    {name: 'meta', title: 'Meta line', description: 'e.g. "MMS \'15 · 21 minutes ago"', type: 'string'},
    {name: 'description', title: 'Description', type: 'text', rows: 3},
    {name: 'linkUrl', title: 'Link URL', type: 'string'},
    {name: 'order', title: 'Display order', type: 'number', validation: (Rule) => Rule.required()},
  ],
  orderings: [{title: 'Display order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'name', subtitle: 'tag', media: 'image'}},
}
