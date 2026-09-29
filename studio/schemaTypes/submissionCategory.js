export default {
  name: 'submissionCategory',
  title: 'Achievements - Submission Category',
  type: 'document',
  description: 'The "What you can submit" rows in the submit band',
  fields: [
    {name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required()},
    {name: 'examples', title: 'Examples', description: 'e.g. "L\u2019Oreal Brandstorm · ITC Interrobang · Bain CoLab"', type: 'text', rows: 2},
    {
      name: 'icon',
      title: 'Icon',
      type: 'string',
      options: {list: ['case', 'scholarship', 'publication', 'sports', 'external']},
      initialValue: 'case',
    },
    {name: 'order', title: 'Display order', type: 'number', validation: (Rule) => Rule.required()},
  ],
  orderings: [{title: 'Display order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'title', subtitle: 'examples'}},
}
