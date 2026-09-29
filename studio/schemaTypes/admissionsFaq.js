export default {
  name: 'admissionsFaq',
  title: 'Admissions - FAQ',
  type: 'document',
  fields: [
    {name: 'question', title: 'Question', type: 'string', validation: (Rule) => Rule.required()},
    {name: 'answer', title: 'Answer', type: 'text', rows: 4, validation: (Rule) => Rule.required()},
    {name: 'order', title: 'Display order', type: 'number', validation: (Rule) => Rule.required()},
  ],
  orderings: [{title: 'Display order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'question', subtitle: 'answer'}},
}
