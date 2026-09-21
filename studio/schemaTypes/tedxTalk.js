export default {
  name: 'tedxTalk',
  title: 'TEDxSIMSREE — Talk',
  type: 'document',
  fields: [
    {name: 'speaker', title: 'Speaker name', type: 'string', validation: (Rule) => Rule.required()},
    {name: 'photo', title: 'Photo', type: 'image', options: {hotspot: true}},
    {name: 'edition', title: 'Edition label', description: 'e.g. "TEDxSIMSREE · 2023"', type: 'string'},
    {name: 'role', title: 'Role / affiliation', type: 'string'},
    {name: 'title', title: 'Talk title', type: 'string'},
    {name: 'summary', title: 'Summary', type: 'text', rows: 2},
    {name: 'watchLabel', title: 'Watch link label', type: 'string', initialValue: 'Watch the talk'},
    {name: 'watchUrl', title: 'Watch URL', type: 'string'},
    {name: 'order', title: 'Display order', type: 'number', validation: (Rule) => Rule.required()},
  ],
  orderings: [{title: 'Display order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'speaker', subtitle: 'title', media: 'photo'}},
}
