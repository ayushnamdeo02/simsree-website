export default {
  name: 'placementReport',
  title: 'Placements - Report',
  type: 'document',
  fields: [
    {name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required()},
    {name: 'image', title: 'Cover image', type: 'image', options: {hotspot: true}},
    {name: 'tag', title: 'Tag', description: 'e.g. "Current · Archive"', type: 'string'},
    {name: 'description', title: 'Description', type: 'text', rows: 3},
    {name: 'fileUrl', title: 'Download URL', type: 'string'},
    {name: 'downloadLabel', title: 'Download label', type: 'string', initialValue: 'Download'},
    {name: 'order', title: 'Display order', type: 'number', validation: (Rule) => Rule.required()},
  ],
  orderings: [{title: 'Display order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'title', subtitle: 'tag', media: 'image'}},
}
