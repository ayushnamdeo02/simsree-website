export default {
  name: 'studentPath',
  title: "Student's Corner - Role Path",
  type: 'document',
  description: 'The "Pick a path" cards that route visitors by who they are',
  fields: [
    {name: 'title', title: 'Role', description: 'e.g. "Prospective Student"', type: 'string', validation: (Rule) => Rule.required()},
    {name: 'description', title: 'Description', type: 'text', rows: 3},
    {
      name: 'icon',
      title: 'Icon',
      type: 'string',
      options: {list: ['prospective', 'recruiter', 'student', 'press', 'partner']},
      initialValue: 'prospective',
    },
    {name: 'url', title: 'Link URL', type: 'string'},
    {name: 'order', title: 'Display order', type: 'number', validation: (Rule) => Rule.required()},
  ],
  orderings: [{title: 'Display order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'title', subtitle: 'description'}},
}
