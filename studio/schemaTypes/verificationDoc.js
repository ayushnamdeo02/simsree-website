export default {
  name: 'verificationDoc',
  title: 'Rankings — Verification Document',
  type: 'document',
  fields: [
    {name: 'tag', title: 'Tag', description: 'e.g. "NIRF", "AICTE", "VERIFY"', type: 'string', validation: (Rule) => Rule.required()},
    {name: 'title', title: 'Title', description: 'e.g. "NIRF data sheet 2025"', type: 'string', validation: (Rule) => Rule.required()},
    {name: 'detail', title: 'Detail line', description: 'e.g. "Ministry of Education · 2.4 MB"', type: 'string'},
    {name: 'actionLabel', title: 'Action label', description: 'e.g. "Download NIRF data sheet", "Open portal"', type: 'string'},
    {name: 'actionUrl', title: 'Action URL', type: 'string'},
    {name: 'isExternal', title: 'Opens externally (not a download)?', type: 'boolean', initialValue: false},
    {name: 'order', title: 'Display order', type: 'number', validation: (Rule) => Rule.required()},
  ],
  orderings: [{title: 'Display order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'title', subtitle: 'tag'}},
}
