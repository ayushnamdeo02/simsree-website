export default {
  name: 'reportsHubPage',
  title: 'Reports Hub Page',
  type: 'document',
  groups: [
    {name: 'hero', title: 'Hero'},
    {name: 'stats', title: 'Stats'},
  ],
  fields: [
    {name: 'heroEyebrow', title: 'Eyebrow', type: 'string', group: 'hero', initialValue: 'All Reports in One Place'},
    {name: 'heroTitle', title: 'Title', type: 'string', group: 'hero', initialValue: 'Placement proof you can download.'},
    {name: 'heroTitleBreakAfter', title: 'Line break after', description: 'Text after this substring starts a new line', type: 'string', group: 'hero', initialValue: 'proof'},
    {name: 'heroDescription', title: 'Description', type: 'text', rows: 3, group: 'hero'},
    {name: 'heroImage', title: 'Hero image', type: 'image', options: {hotspot: true}, group: 'hero'},
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
  ],
  preview: {prepare() { return {title: 'Reports Hub Page'} }},
}
