export default {
  name: 'calendarEvent',
  title: 'Events - Calendar Event',
  type: 'document',
  description: 'Feeds the live calendar. Dates drive the month grid and the day dots.',
  fields: [
    {name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required()},
    {name: 'date', title: 'Date', type: 'date', options: {dateFormat: 'YYYY-MM-DD'}, validation: (Rule) => Rule.required()},
    {
      name: 'type',
      title: 'Type',
      description: 'Drives the filter chips',
      type: 'string',
      options: {
        list: [
          'Guest Lectures',
          'Corporate Interactions',
          'MDP',
          'Career Catalyst',
          'Simerations',
          'TEDxSIMSREE',
          'Mrudgandha',
        ],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'audience',
      title: 'Audience',
      description: 'Colours the calendar dot',
      type: 'string',
      options: {list: [{title: 'Student event', value: 'student'}, {title: 'MDP / Corporate', value: 'corporate'}]},
      initialValue: 'student',
    },
    {name: 'meta', title: 'Meta line', description: 'e.g. "Corporate Relations · 3pm Auditorium"', type: 'string'},
    {name: 'image', title: 'Image', type: 'image', options: {hotspot: true}},
    {name: 'description', title: 'Description', description: 'Shown when the row is expanded', type: 'text', rows: 3},
    {
      name: 'detailRows',
      title: 'Detail rows',
      description: 'Small labelled facts in the expanded row, e.g. Speaker / Format',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'label', title: 'Label', type: 'string'},
            {name: 'value', title: 'Value', type: 'string'},
          ],
          preview: {select: {title: 'label', subtitle: 'value'}},
        },
      ],
    },
    {name: 'ctaLabel', title: 'CTA label', type: 'string', initialValue: 'Save my seat'},
    {name: 'ctaUrl', title: 'CTA URL', type: 'string'},
  ],
  orderings: [{title: 'Date', name: 'dateAsc', by: [{field: 'date', direction: 'asc'}]}],
  preview: {select: {title: 'title', subtitle: 'date', media: 'image'}},
}
