export default {
  name: 'achievement',
  title: 'Achievements - Entry',
  type: 'document',
  fields: [
    {name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required()},
    {name: 'image', title: 'Image', type: 'image', options: {hotspot: true}},
    {name: 'badge', title: 'Badge', description: 'Small pill, e.g. "Case · Winner"', type: 'string'},
    {
      name: 'category',
      title: 'Category',
      description: 'Drives the filter chips',
      type: 'string',
      options: {list: ['Case Competitions', 'Scholarships', 'Publications', 'Sports', 'External Recognition']},
      validation: (Rule) => Rule.required(),
    },
    {name: 'summary', title: 'Summary line', description: 'The line under the title, e.g. "Team SIMSREE-Mavericks · MMS 2024-26 · ₹3L + Global Final invite"', type: 'string'},
    {name: 'detail', title: 'Detail', description: 'Shown when the row is expanded', type: 'text', rows: 4},
    {
      name: 'metaRows',
      title: 'Meta rows',
      description: 'Small labelled facts at the foot of the expanded row',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'label', title: 'Label', description: 'e.g. "Team"', type: 'string'},
            {name: 'value', title: 'Value', type: 'string'},
          ],
          preview: {select: {title: 'label', subtitle: 'value'}},
        },
      ],
    },
    {name: 'year', title: 'Year', description: 'Used by the "browse by year" link', type: 'string'},
    {name: 'order', title: 'Display order', type: 'number', validation: (Rule) => Rule.required()},
  ],
  orderings: [{title: 'Display order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'title', subtitle: 'summary', media: 'image'}},
}
