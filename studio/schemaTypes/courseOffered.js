export default {
  name: 'courseOffered',
  title: 'Course Offered',
  type: 'document',
  fields: [
    {
      name: 'icon',
      title: 'Icon',
      description: 'Pick one of the supported icons. Anything else falls back to the graduation cap.',
      type: 'string',
      options: {list: ['GraduationCap', 'Briefcase', 'BookOpen', 'FileSearch']},
      initialValue: 'GraduationCap',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'order',
      title: 'Display order',
      type: 'number',
      validation: (Rule) => Rule.required(),
    },
  ],
  orderings: [
    {title: 'Display order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]},
  ],
  preview: {
    select: {title: 'title', subtitle: 'description'},
  },
}
