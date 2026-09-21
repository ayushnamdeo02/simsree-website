export default {
  name: 'rankingFramework',
  title: 'Rankings — Framework Card',
  type: 'document',
  fields: [
    {name: 'tag', title: 'Tag', description: 'e.g. "NIRF", "#25", "UoM"', type: 'string', validation: (Rule) => Rule.required()},
    {name: 'accentColor', title: 'Accent border color', type: 'string', options: {list: ['navy', 'sky', 'teal']}, initialValue: 'navy'},
    {name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required()},
    {name: 'description', title: 'Description', type: 'text', rows: 4, validation: (Rule) => Rule.required()},
    {name: 'actionLabel', title: 'Action label', description: 'e.g. "Download NIRF Report", "View framework"', type: 'string'},
    {name: 'actionUrl', title: 'Action URL', type: 'string'},
    {name: 'isDownload', title: 'Is a download link?', type: 'boolean', initialValue: false},
    {name: 'order', title: 'Display order', type: 'number', validation: (Rule) => Rule.required()},
  ],
  orderings: [{title: 'Display order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'title', subtitle: 'tag'}},
}
