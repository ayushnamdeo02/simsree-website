export default {
  name: 'batchProfilePage',
  title: 'Batch Profile Page',
  type: 'document',
  groups: [
    {name: 'hero', title: 'Hero'},
    {name: 'selector', title: 'Cohort Selector'},
    {name: 'cta', title: 'Recruiter CTA'},
  ],
  fields: [
    {name: 'heroEyebrow', title: 'Eyebrow', type: 'string', group: 'hero', initialValue: 'For Recruiters · Updated Sept 2025'},
    {name: 'heroTitle', title: 'Title', type: 'string', group: 'hero', initialValue: 'MMS Batch 2024-26 - hiring data at a glance.'},
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
    {name: 'profilePdf', title: 'Batch profile PDF', description: 'Upload here; the hero download button links to it', type: 'file', options: {accept: '.pdf'}, group: 'hero'},

    {name: 'selectorLabel', title: 'Selector label', type: 'string', group: 'selector', initialValue: 'Showing data for cohort'},
    {name: 'selectorPlaceholder', title: 'Selector placeholder', type: 'string', group: 'selector', initialValue: 'Select one...'},

    {name: 'ctaEyebrow', title: 'Eyebrow', type: 'string', group: 'cta', initialValue: 'For Recruiters'},
    {name: 'ctaTitle', title: 'Title', type: 'string', group: 'cta', initialValue: 'Ready to engage with this batch?'},
    {name: 'ctaSubtitle', title: 'Subtitle', type: 'string', group: 'cta', initialValue: 'Three things you can do today - Recruiter Brochure, Campus Slot, Direct Email.'},
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
  preview: {prepare() { return {title: 'Batch Profile Page'} }},
}
