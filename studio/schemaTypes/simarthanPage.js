export default {
  name: 'simarthanPage',
  title: 'Simarthan Page',
  type: 'document',
  groups: [
    {name: 'hero', title: 'Hero'},
    {name: 'why', title: 'Why Simarthan Exists'},
    {name: 'does', title: 'What Simarthan Does'},
    {name: 'contact', title: 'Get In Touch'},
  ],
  fields: [
    // Hero
    {name: 'heroEyebrow', title: 'Eyebrow', type: 'string', group: 'hero', initialValue: 'Advancing education. Empowering futures.'},
    {name: 'heroTitle', title: 'Title', type: 'string', group: 'hero', initialValue: 'Simarthan.'},
    {name: 'heroDescription', title: 'Description', type: 'text', rows: 4, group: 'hero'},
    {name: 'heroImage', title: 'Hero image', type: 'image', options: {hotspot: true}, group: 'hero'},
    {name: 'heroPrimaryCtaLabel', title: 'Primary CTA label', type: 'string', group: 'hero', initialValue: 'Visit simarthan.org'},
    {name: 'heroPrimaryCtaUrl', title: 'Primary CTA URL', type: 'string', group: 'hero', initialValue: 'https://simarthan.org'},
    {name: 'heroSecondaryCtaLabel', title: 'Secondary CTA label', type: 'string', group: 'hero', initialValue: 'Email Simarthan'},
    {name: 'heroSecondaryCtaUrl', title: 'Secondary CTA URL', type: 'string', group: 'hero', initialValue: 'mailto:simarthan@simsree.org'},

    // Why
    {name: 'whyEyebrow', title: 'Eyebrow', type: 'string', group: 'why', initialValue: 'Purpose Before Profit'},
    {name: 'whyTitle', title: 'Title', type: 'string', group: 'why', initialValue: 'Why Simarthan exists'},
    {name: 'whyBody', title: 'Body paragraphs', type: 'array', of: [{type: 'text', rows: 3}], group: 'why'},
    {
      name: 'whyEquation',
      title: 'Name equation',
      description: 'Three boxes shown as A + B = C',
      type: 'object',
      group: 'why',
      fields: [
        {name: 'first', title: 'First box', type: 'string', initialValue: 'SIMSREE The institute'},
        {name: 'second', title: 'Second box', type: 'string', initialValue: 'अर्थन् arthan Sanskrit · purpose'},
        {name: 'result', title: 'Result box', type: 'string', initialValue: 'Simarthan SIMSREE with purpose'},
      ],
    },
    {name: 'whyImage', title: 'Section image', type: 'image', options: {hotspot: true}, group: 'why'},

    // Does
    {name: 'doesEyebrow', title: 'Eyebrow', type: 'string', group: 'does', initialValue: 'Purpose Before Profit'},
    {name: 'doesTitle', title: 'Title', type: 'string', group: 'does', initialValue: 'What Simarthan does'},
    {name: 'doesSubtitle', title: 'Subtitle', type: 'string', group: 'does', initialValue: "Aligned to SIMSREE's mission."},

    // Contact
    {name: 'contactEyebrow', title: 'Eyebrow', type: 'string', group: 'contact', initialValue: 'Get In Touch'},
    {name: 'contactTitle', title: 'Title', type: 'string', group: 'contact', initialValue: 'Partner with Simarthan'},
    {name: 'contactTitleHighlight', title: 'Title highlight word(s)', type: 'string', group: 'contact', initialValue: 'Simarthan'},
    {name: 'contactSubtitle', title: 'Subtitle', type: 'string', group: 'contact', initialValue: 'For partnerships, sponsorship, research co-funding.'},
    {
      name: 'contactCards',
      title: 'Contact cards',
      type: 'array',
      group: 'contact',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'icon', title: 'Icon', type: 'string', options: {list: ['website', 'email', 'office']}, initialValue: 'website'},
            {name: 'title', title: 'Title', type: 'string'},
            {name: 'value', title: 'Value', type: 'string'},
            {name: 'url', title: 'Link URL', type: 'string'},
          ],
          preview: {select: {title: 'title', subtitle: 'value'}},
        },
      ],
    },
  ],
  preview: {prepare() { return {title: 'Simarthan Page'} }},
}
