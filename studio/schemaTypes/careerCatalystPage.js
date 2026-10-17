export default {
  name: 'careerCatalystPage',
  title: 'Career Catalyst Program Page',
  type: 'document',
  groups: [
    {name: 'hero', title: 'Hero'},
    {name: 'intro', title: 'Learning from Industry Leaders'},
    {name: 'moments', title: 'Moments'},
  ],
  fields: [
    {name: 'heroTitle', title: 'Title', type: 'string', group: 'hero', initialValue: 'Career Catalyst Program'},
    {name: 'heroDescription', title: 'Description', type: 'text', rows: 2, group: 'hero'},
    {name: 'heroImage', title: 'Hero image', type: 'image', options: {hotspot: true}, group: 'hero'},

    {name: 'introTitle', title: 'Title', description: 'Text before the line break', type: 'string', group: 'intro', initialValue: 'Learning from'},
    {name: 'introTitleHighlight', title: 'Title second line (blue)', type: 'string', group: 'intro', initialValue: 'Industry Leaders.'},
    {name: 'introLead', title: 'Lead paragraph', description: 'Larger serif paragraph under the title', type: 'text', rows: 3, group: 'intro'},
    {name: 'introBody', title: 'Body', type: 'text', rows: 8, group: 'intro'},
    {
      name: 'introImages',
      title: 'Photos (2x2 grid)',
      description: 'Four photos, shown in a 2x2 grid beside the text',
      type: 'array',
      group: 'intro',
      of: [{type: 'image', options: {hotspot: true}}],
      validation: (Rule) => Rule.max(4),
    },

    {name: 'momentsTitle', title: 'Title', description: 'First line', type: 'string', group: 'moments', initialValue: 'Moments from the'},
    {name: 'momentsTitleHighlight', title: 'Title rest (blue)', type: 'string', group: 'moments', initialValue: 'Career Catalyst Program.'},
    {name: 'momentsBody', title: 'Body', type: 'text', rows: 10, group: 'moments'},
    {name: 'momentsImage', title: 'Photo', type: 'image', options: {hotspot: true}, group: 'moments'},
  ],
  preview: {prepare: () => ({title: 'Career Catalyst Program Page'})},
}
