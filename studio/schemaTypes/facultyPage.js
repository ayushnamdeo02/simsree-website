export default {
  name: 'facultyPage',
  title: 'Faculty Directory Page',
  type: 'document',
  groups: [
    {name: 'hero', title: 'Hero'},
    {name: 'stats', title: 'Stats'},
    {name: 'core', title: 'Core Faculty Intro'},
    {name: 'visiting', title: 'Visiting Faculty Intro'},
    {name: 'research', title: 'Research Areas'},
  ],
  fields: [
    // Hero
    {name: 'heroEyebrow', title: 'Eyebrow', type: 'string', group: 'hero', initialValue: 'Scholarship + Industry Experience'},
    {name: 'heroTitle', title: 'Title', type: 'string', group: 'hero', initialValue: 'Meet the people who’ll teach you.'},
    {name: 'heroTitleBreakAfter', title: 'Line break after', type: 'string', group: 'hero', initialValue: 'people'},
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

    // Core
    {name: 'coreEyebrow', title: 'Eyebrow', type: 'string', group: 'core', initialValue: 'Permanent · Across Disciplines'},
    {name: 'coreTitle', title: 'Title', type: 'string', group: 'core', initialValue: 'Core faculty.'},
    {name: 'coreSubtitle', title: 'Subtitle', type: 'string', group: 'core', initialValue: 'Every one combines doctoral scholarship with corporate practice.'},
    {name: 'filterLabel', title: 'Filter label', type: 'string', group: 'core', initialValue: 'Filter by:'},

    // Visiting
    {name: 'visitingEyebrow', title: 'Eyebrow', type: 'string', group: 'visiting', initialValue: 'Industry Practitioners'},
    {name: 'visitingTitle', title: 'Title', type: 'string', group: 'visiting', initialValue: 'Visiting faculty.'},
    {name: 'visitingSubtitle', title: 'Subtitle', type: 'text', rows: 2, group: 'visiting', initialValue: 'Senior industry practitioners teach electives and short modules — many are SIMSREE alumni giving back.'},

    // Research
    {name: 'researchEyebrow', title: 'Eyebrow', type: 'string', group: 'research', initialValue: 'Research Clusters'},
    {name: 'researchTitle', title: 'Title', type: 'string', group: 'research', initialValue: 'Research areas.'},
    {name: 'researchTitleHighlight', title: 'Title highlight word(s)', type: 'string', group: 'research', initialValue: 'areas.'},
    {name: 'researchSubtitle', title: 'Subtitle', type: 'text', rows: 2, group: 'research', initialValue: 'Active research clusters — open to PhD enquiries and industry collaborations.'},
    {name: 'researchImage', title: 'Section image', type: 'image', options: {hotspot: true}, group: 'research'},
  ],
  preview: {prepare() { return {title: 'Faculty Directory Page'} }},
}
