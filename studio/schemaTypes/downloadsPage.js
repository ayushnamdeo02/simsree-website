export default {
  name: 'downloadsPage',
  title: 'Downloads & Affidavits Page',
  type: 'document',
  groups: [
    {name: 'hero', title: 'Hero'},
    {name: 'filter', title: 'Filter Intro'},
    {name: 'files', title: 'Files Intro'},
    {name: 'cta', title: 'Help CTA'},
  ],
  fields: [
    {name: 'heroEyebrow', title: 'Eyebrow', type: 'string', group: 'hero', initialValue: 'All Forms in One Place'},
    {name: 'heroTitle', title: 'Title', type: 'string', group: 'hero', initialValue: 'Downloads & Affidavits.'},
    {name: 'heroDescription', title: 'Description', type: 'text', rows: 3, group: 'hero'},
    {name: 'heroImage', title: 'Hero image', type: 'image', options: {hotspot: true}, group: 'hero'},
    {name: 'heroCtaLabel', title: 'CTA label', type: 'string', group: 'hero', initialValue: 'Back to admissions'},
    {name: 'heroCtaUrl', title: 'CTA URL', type: 'string', group: 'hero', initialValue: '/admissions'},

    {name: 'filterEyebrow', title: 'Eyebrow', type: 'string', group: 'filter', initialValue: 'Filter'},
    {name: 'filterTitle', title: 'Title', type: 'string', group: 'filter', initialValue: 'Filter by category'},
    {name: 'filterTitleHighlight', title: 'Title highlight word(s)', type: 'string', group: 'filter', initialValue: 'category'},
    {name: 'filterSubtitle', title: 'Subtitle', type: 'string', group: 'filter', initialValue: 'Tap any chip to filter.'},
    {name: 'filterLabel', title: 'Filter label', type: 'string', group: 'filter', initialValue: 'Filter by:'},

    {name: 'filesEyebrow', title: 'Eyebrow', type: 'string', group: 'files', initialValue: 'All Files'},
    {name: 'filesTitle', title: 'Title', type: 'string', group: 'files', initialValue: 'Download the current-year PDFs'},
    {name: 'filesTitleHighlight', title: 'Title highlight word(s)', type: 'string', group: 'files', initialValue: 'Download the current-year'},
    {name: 'filesSubtitle', title: 'Subtitle', type: 'string', group: 'files', initialValue: 'Government of Maharashtra signs off most of these · updated annually.'},

    {name: 'ctaEyebrow', title: 'Eyebrow', type: 'string', group: 'cta', initialValue: 'Need More Help?'},
    {name: 'ctaTitle', title: 'Title', type: 'string', group: 'cta', initialValue: 'Talk to admissions.'},
    {name: 'ctaSubtitle', title: 'Subtitle', type: 'string', group: 'cta', initialValue: 'All forms in one place. Still stuck? Call us.'},
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
  preview: {prepare() { return {title: 'Downloads & Affidavits Page'} }},
}
