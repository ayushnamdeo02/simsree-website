export default {
  name: 'statCard',
  title: 'Stat Card',
  type: 'document',
  fields: [
    {
      name: 'label',
      title: 'Label',
      description: 'e.g. "Years of Excellence"',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'value',
      title: 'Value',
      description: 'e.g. "40+" or "#25"',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'dark',
      title: 'Dark (navy) background?',
      type: 'boolean',
      initialValue: false,
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
    select: {title: 'label', subtitle: 'value'},
  },
}
