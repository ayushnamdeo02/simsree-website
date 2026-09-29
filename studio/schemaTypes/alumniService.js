export default {
  name: 'alumniService',
  title: 'Alumni Portal - Service',
  type: 'document',
  fields: [
    {name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required()},
    {name: 'image', title: 'Image', type: 'image', options: {hotspot: true}},
    {name: 'description', title: 'Description', type: 'text', rows: 3, validation: (Rule) => Rule.required()},
    {name: 'meta', title: 'Meta line', description: 'Small line under the description, e.g. "6 cities · Free for SIMAA members"', type: 'string'},
    {
      name: 'category',
      title: 'Category',
      description: 'Used by the services filter chips',
      type: 'string',
      options: {list: ['Networking', 'Mentorship', 'Learning', 'Recognition', 'Careers']},
      validation: (Rule) => Rule.required(),
    },
    {name: 'order', title: 'Display order', type: 'number', validation: (Rule) => Rule.required()},
  ],
  orderings: [{title: 'Display order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'title', subtitle: 'category', media: 'image'}},
}
