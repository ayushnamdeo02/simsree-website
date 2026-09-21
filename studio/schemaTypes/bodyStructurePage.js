export default {
  name: 'bodyStructurePage',
  title: 'Student Body Structure Page',
  type: 'document',
  description:
    'The committee directory. Cards read from the Committee documents, so adding a committee there adds it here.',
  groups: [
    {name: 'hero', title: 'Hero'},
    {name: 'stats', title: 'Stats'},
    {name: 'callout', title: 'Info Callout'},
    {name: 'filter', title: 'Filter Intro'},
    {name: 'ladder', title: 'Leadership Ladder'},
  ],
  fields: [
    // Hero
    {name: 'heroEyebrow', title: 'Eyebrow', description: 'The committee count is prefixed automatically', type: 'string', group: 'hero', initialValue: 'Committees · One Direction'},
    {name: 'heroTitle', title: 'Title', type: 'string', group: 'hero', initialValue: 'Every committee. Every page.'},
    {name: 'heroTitleBreakAfter', title: 'Line break after', type: 'string', group: 'hero', initialValue: 'committee.'},
    {name: 'heroDescription', title: 'Description', type: 'text', rows: 2, group: 'hero'},
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

    // Info callout
    {name: 'calloutTitle', title: 'Callout title', description: 'Leave empty to hide the callout', type: 'string', group: 'callout', initialValue: 'Student Body Structure — what is this page?'},
    {name: 'calloutBody', title: 'Callout body', type: 'text', rows: 4, group: 'callout'},

    // Filter
    {name: 'filterEyebrow', title: 'Eyebrow', type: 'string', group: 'filter', initialValue: 'Filter'},
    {name: 'filterTitle', title: 'Title', type: 'string', group: 'filter', initialValue: 'Pick a category'},
    {name: 'filterSubtitle', title: 'Subtitle', type: 'string', group: 'filter', initialValue: 'Filter by type — academic, corporate, cultural, social, leadership.'},
    {name: 'cardCtaLabel', title: 'Card link label', type: 'string', group: 'filter', initialValue: 'See what they run'},

    // Leadership ladder
    {name: 'ladderEyebrow', title: 'Eyebrow', type: 'string', group: 'ladder', initialValue: 'The Leadership Ladder'},
    {name: 'ladderTitle', title: 'Title', type: 'string', group: 'ladder', initialValue: 'From member to GS'},
    {name: 'ladderTitleHighlight', title: 'Title highlight word(s)', type: 'string', group: 'ladder', initialValue: 'GS'},
    {name: 'ladderSubtitle', title: 'Subtitle', type: 'text', rows: 2, group: 'ladder'},
    {name: 'ladderImage', title: 'Section image', type: 'image', options: {hotspot: true}, group: 'ladder'},
    {
      name: 'ladderSteps',
      title: 'Ladder steps',
      type: 'array',
      group: 'ladder',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'stage', title: 'Stage label', description: 'e.g. "Step 1" or "Apex"', type: 'string'},
            {name: 'title', title: 'Title', description: 'e.g. "Year 1 · Member"', type: 'string', validation: (Rule) => Rule.required()},
            {name: 'description', title: 'Description', type: 'text', rows: 3},
            {name: 'cohort', title: 'Cohort line', description: 'e.g. "Cohort: ~110 / batch"', type: 'string'},
          ],
          preview: {select: {title: 'title', subtitle: 'description'}},
        },
      ],
    },
  ],
  preview: {prepare() { return {title: 'Student Body Structure Page'} }},
}
