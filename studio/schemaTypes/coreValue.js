export default {
  name: 'coreValue',
  title: 'History - Core Value',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      description: 'e.g. "Excellence", "Collaboration", "Integrity"',
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
      name: 'icon',
      title: 'Icon',
      description: 'Shown in the white circle at the top of the card',
      type: 'string',
      options: {
        list: [
          {title: 'Trophy', value: 'trophy'},
          {title: 'People', value: 'people'},
          {title: 'Shield', value: 'shield'},
          {title: 'Open book', value: 'book'},
          {title: 'Heart', value: 'heart'},
          {title: 'Sun', value: 'sun'},
          {title: 'Lightbulb', value: 'lightbulb'},
          {title: 'Target', value: 'target'},
          {title: 'Handshake', value: 'handshake'},
          {title: 'Compass', value: 'compass'},
          {title: 'Graduation cap', value: 'graduation'},
          {title: 'Rocket', value: 'rocket'},
        ],
      },
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
