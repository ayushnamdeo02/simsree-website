export default {
  name: 'eventsPage',
  title: 'Events Page',
  type: 'document',
  groups: [
    {name: 'hero', title: 'Hero'},
    {name: 'flagships', title: 'Flagships Intro'},
    {name: 'calendar', title: 'Calendar Intro'},
    {name: 'industry', title: 'Industry Intro'},
  ],
  fields: [
    {name: 'heroEyebrow', title: 'Eyebrow', type: 'string', group: 'hero', initialValue: 'Always Something Happening'},
    {name: 'heroTitle', title: 'Title', type: 'string', group: 'hero', initialValue: 'There are no quiet weeks at SIMSREE.'},
    {name: 'heroTitleItalic', title: 'Italic portion of title', type: 'string', group: 'hero', initialValue: 'SIMSREE.'},
    {name: 'heroTitleBreakAfter', title: 'Line break after', type: 'string', group: 'hero', initialValue: 'weeks'},
    {name: 'heroDescription', title: 'Description', type: 'text', rows: 3, group: 'hero'},
    {name: 'heroImage', title: 'Hero image', type: 'image', options: {hotspot: true}, group: 'hero'},
    {
      name: 'heroButtons',
      title: 'Buttons',
      type: 'array',
      group: 'hero',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'label', title: 'Label', type: 'string'},
            {name: 'url', title: 'URL', type: 'string'},
            {name: 'primary', title: 'Primary (filled) style?', type: 'boolean', initialValue: false},
          ],
          preview: {select: {title: 'label', subtitle: 'url'}},
        },
      ],
    },

    {name: 'flagshipsEyebrow', title: 'Eyebrow', type: 'string', group: 'flagships', initialValue: 'Signature'},
    {name: 'flagshipsTitle', title: 'Title', description: 'The count is prefixed automatically', type: 'string', group: 'flagships', initialValue: 'flagships worth planning your year around'},
    {name: 'flagshipsTitleHighlight', title: 'Title highlight word(s)', type: 'string', group: 'flagships', initialValue: 'flagships'},
    {name: 'flagshipsSubtitle', title: 'Subtitle', type: 'string', group: 'flagships', initialValue: 'Four flagships · all student-organised.'},

    {name: 'calendarEyebrow', title: 'Eyebrow', type: 'string', group: 'calendar', initialValue: 'Live Calendar · Filter + Browse'},
    {name: 'calendarTitle', title: 'Title', type: 'string', group: 'calendar', initialValue: 'Browse by date, filter by type.'},
    {name: 'calendarTitleHighlight', title: 'First highlight word(s)', type: 'string', group: 'calendar', initialValue: 'date,'},
    {name: 'calendarTitleHighlightTwo', title: 'Second highlight word(s)', type: 'string', group: 'calendar', initialValue: 'type.'},
    {name: 'calendarSubtitle', title: 'Subtitle', type: 'text', rows: 2, group: 'calendar'},

    {name: 'industryEyebrow', title: 'Eyebrow', type: 'string', group: 'industry', initialValue: 'Industry Events'},
    {name: 'industryTitle', title: 'Title', type: 'string', group: 'industry', initialValue: 'Curated industry programmes'},
    {name: 'industrySubtitle', title: 'Subtitle', type: 'text', rows: 2, group: 'industry'},
  ],
  preview: {prepare() { return {title: 'Events Page'} }},
}
