export default {
  name: 'simerationsPage',
  title: 'Simerations Page',
  type: 'document',
  groups: [
    {name: 'hero', title: 'Hero'},
    {name: 'stats', title: 'Stats'},
    {name: 'editions', title: 'Editions Intro'},
    {name: 'tracks', title: 'Tracks Intro'},
    {name: 'dates', title: 'Key Dates'},
    {name: 'archive', title: 'Archive Intro'},
    {name: 'sponsor', title: 'Sponsor CTA'},
  ],
  fields: [
    // Hero
    {name: 'heroEyebrow', title: 'Eyebrow', type: 'string', group: 'hero', initialValue: "SIMSREE's Flagship Management Fest"},
    {name: 'heroTitle', title: 'Title', type: 'string', group: 'hero', initialValue: 'Simerations - the annual show.'},
    {name: 'heroTitleBreakAfter', title: 'Line break after', type: 'string', group: 'hero', initialValue: ' -'},
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

    // Stats
    {
      name: 'stats',
      title: 'Stat cards',
      type: 'array',
      group: 'stats',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'label', title: 'Label', type: 'string'},
            {name: 'value', title: 'Value', type: 'string'},
            {name: 'dark', title: 'Dark (navy) background?', type: 'boolean', initialValue: false},
          ],
          preview: {select: {title: 'value', subtitle: 'label'}},
        },
      ],
    },

    // Editions
    {name: 'editionsEyebrow', title: 'Eyebrow', type: 'string', group: 'editions', initialValue: 'Edition'},
    {name: 'editionsTitle', title: 'Title', type: 'string', group: 'editions', initialValue: 'Pick an edition'},
    {name: 'editionsSubtitle', title: 'Subtitle', type: 'string', group: 'editions', initialValue: 'Every past edition, archived.'},

    // Tracks
    {name: 'tracksEyebrow', title: 'Eyebrow', description: 'The track count is prefixed automatically', type: 'string', group: 'tracks', initialValue: 'Tracks'},
    {name: 'tracksTitle', title: 'Title', type: 'string', group: 'tracks', initialValue: '2026 · 18-19 Sept'},
    {name: 'tracksTitleHighlight', title: 'Title highlight word(s)', type: 'string', group: 'tracks', initialValue: '18-19 Sept'},
    {name: 'tracksSubtitle', title: 'Subtitle', type: 'string', group: 'tracks', initialValue: 'Each track has its own prize pool and partner sponsor.'},

    // Key dates
    {name: 'datesEyebrow', title: 'Eyebrow', type: 'string', group: 'dates', initialValue: 'Key Dates'},
    {name: 'datesTitle', title: 'Title', type: 'string', group: 'dates', initialValue: 'Mark your calendar'},
    {name: 'datesTitleHighlight', title: 'Title highlight word(s)', type: 'string', group: 'dates', initialValue: 'calendar'},
    {name: 'datesSubtitle', title: 'Subtitle', type: 'string', group: 'dates', initialValue: 'One click adds it to iCal / Google / Outlook.'},
    {name: 'calendarCtaLabel', title: 'Calendar button label', type: 'string', group: 'dates', initialValue: 'Add to calendar (.ics)'},
    {name: 'calendarEventName', title: 'Calendar event name', description: 'Used inside the downloaded .ics file', type: 'string', group: 'dates', initialValue: 'Simerations 2026'},
    {
      name: 'keyDates',
      title: 'Key dates',
      type: 'array',
      group: 'dates',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'label', title: 'Label', description: 'e.g. "1 July"', type: 'string', validation: (Rule) => Rule.required()},
            {name: 'description', title: 'Description', type: 'string'},
            {name: 'date', title: 'Calendar date', description: 'Optional - included in the .ics download when set', type: 'date', options: {dateFormat: 'YYYY-MM-DD'}},
          ],
          preview: {select: {title: 'label', subtitle: 'description'}},
        },
      ],
    },

    // Archive
    {name: 'archiveEyebrow', title: 'Eyebrow', type: 'string', group: 'archive', initialValue: 'Past Editions'},
    {name: 'archiveTitle', title: 'Title', type: 'string', group: 'archive', initialValue: 'Archive · 2023-2025'},
    {name: 'archiveTitleHighlight', title: 'Title highlight word(s)', type: 'string', group: 'archive', initialValue: '2023-2025'},
    {name: 'archiveSubtitle', title: 'Subtitle', type: 'string', group: 'archive', initialValue: 'Open any card for winners + gallery.'},

    // Sponsor CTA
    {name: 'sponsorEyebrow', title: 'Eyebrow', type: 'string', group: 'sponsor', initialValue: 'Become a Sponsor'},
    {name: 'sponsorTitle', title: 'Title', type: 'string', group: 'sponsor', initialValue: 'Three tiers · 50-college reach'},
    {name: 'sponsorTitleHighlight', title: 'Title highlight word(s)', type: 'string', group: 'sponsor', initialValue: '50-college reach'},
    {name: 'sponsorSubtitle', title: 'Subtitle', type: 'text', rows: 2, group: 'sponsor'},
    {
      name: 'sponsorButtons',
      title: 'Buttons',
      type: 'array',
      group: 'sponsor',
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
  ],
  preview: {prepare() { return {title: 'Simerations Page'} }},
}
