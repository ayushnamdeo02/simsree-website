export default {
  name: 'upcomingEvent',
  title: 'Upcoming Event',
  type: 'document',
  fields: [
    {
      name: 'day',
      title: 'Day of week',
      description: 'e.g. "Fri"',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'date',
      title: 'Date number',
      description: 'e.g. "06"',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'month',
      title: 'Month',
      description: 'e.g. "May"',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'year',
      title: 'Year',
      description: 'Shown under the month in the date badge, e.g. "2024"',
      type: 'string',
    },
    {
      name: 'meta',
      title: 'Meta line',
      description: 'e.g. "Corporate Relations · 3pm Auditorium"',
      type: 'string',
    },
    {
      name: 'cta',
      title: 'CTA label',
      description: 'e.g. "Reserve a seat", "Apply to attend", "See event details"',
      type: 'string',
    },
    {
      name: 'link',
      title: 'Link URL',
      type: 'string',
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
    select: {title: 'title', subtitle: 'meta'},
  },
}
