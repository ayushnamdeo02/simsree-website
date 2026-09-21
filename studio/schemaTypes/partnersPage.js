export default {
  name: 'partnersPage',
  title: 'Recruiting Partners Page',
  type: 'document',
  groups: [
    {name: 'hero', title: 'Hero'},
    {name: 'grid', title: 'Partner Grid'},
    {name: 'cta', title: 'Join CTA'},
  ],
  fields: [
    // Hero
    {name: 'heroEyebrow', title: 'Eyebrow', type: 'string', group: 'hero', initialValue: "Renamed from 'List of Recruiters'"},
    {name: 'heroTitle', title: 'Title', description: 'The count is prefixed automatically from the partner list', type: 'string', group: 'hero', initialValue: 'companies already recruit here.'},
    {name: 'heroDescription', title: 'Description', type: 'text', rows: 2, group: 'hero'},
    {name: 'heroImage', title: 'Hero image', type: 'image', options: {hotspot: true}, group: 'hero'},
    {name: 'heroCtaLabel', title: 'CTA label', type: 'string', group: 'hero', initialValue: 'Become a recruiting partner'},
    {name: 'heroCtaUrl', title: 'CTA URL', type: 'string', group: 'hero', initialValue: '/placements/contact'},

    // Grid
    {name: 'gridEyebrow', title: 'Eyebrow', type: 'string', group: 'grid', initialValue: 'Recruiting Partners'},
    {name: 'gridTitle', title: 'Title', description: 'The count is prefixed automatically', type: 'string', group: 'grid', initialValue: 'companies. Pick a sector.'},
    {name: 'gridTitleHighlight', title: 'Title highlight word(s)', type: 'string', group: 'grid', initialValue: 'Pick a sector.'},
    {name: 'gridSubtitle', title: 'Subtitle', type: 'text', rows: 2, group: 'grid', initialValue: 'Filter by industry — or move your cursor over the grid to bring any logo into focus.'},
    {name: 'searchPlaceholder', title: 'Search box placeholder', type: 'string', group: 'grid', initialValue: 'Search for a company'},

    // CTA
    {name: 'ctaEyebrow', title: 'Eyebrow', type: 'string', group: 'cta', initialValue: 'Want to Join This List?'},
    {name: 'ctaTitle', title: 'Title', type: 'string', group: 'cta', initialValue: 'Tell us who you want to hire'},
    {name: 'ctaSubtitle', title: 'Subtitle', type: 'string', group: 'cta', initialValue: "We'll set up your campus visit · brochure on request."},
    {
      name: 'ctaButtons',
      title: 'Buttons',
      type: 'array',
      group: 'cta',
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
  preview: {prepare() { return {title: 'Recruiting Partners Page'} }},
}
