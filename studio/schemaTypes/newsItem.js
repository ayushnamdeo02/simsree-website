export default {
  name: 'newsItem',
  title: 'News & Announcements',
  type: 'document',
  description:
    'Shared by the homepage news feed and the News page, so both always agree.',
  fields: [
    {
      name: 'tag',
      title: 'Tag',
      type: 'string',
      options: {
        list: ['Admission', 'Award', 'Results', 'Notice', 'Placements', 'Appointment', 'Awards', 'Alumni', 'Events', 'Partnerships'],
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'date',
      title: 'Date label',
      description: 'Shown as-is, e.g. "March 2026"',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Thumbnail image',
      type: 'image',
      options: {hotspot: true},
    },
    {
      name: 'summary',
      title: 'Summary',
      description: 'The line under the title on the News page',
      type: 'text',
      rows: 3,
    },
    {
      name: 'featured',
      title: 'Featured story?',
      description: 'Shows in the large featured card at the top of the News page',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'featuredBadge',
      title: 'Featured badge',
      description: 'e.g. "Placements 2026"',
      type: 'string',
    },
    {
      name: 'featuredRows',
      title: 'Featured detail rows',
      description: 'Small labelled facts under the featured summary, e.g. Filed / Filed by / Coverage',
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
    {
      name: 'actionLabel',
      title: 'Action label',
      description: 'e.g. "Download PDF" or "Read Story"',
      type: 'string',
      initialValue: 'Read more',
    },
    {
      name: 'isDownload',
      title: 'Is a download link?',
      type: 'boolean',
      initialValue: false,
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
    select: {title: 'title', subtitle: 'tag', media: 'image'},
  },
}
