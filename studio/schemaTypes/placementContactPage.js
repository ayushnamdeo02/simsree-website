export default {
  name: 'placementContactPage',
  title: 'Placement Contact Page',
  type: 'document',
  groups: [
    {name: 'hero', title: 'Hero'},
    {name: 'contacts', title: 'Quick Contacts Intro'},
    {name: 'channels', title: 'Email vs WhatsApp'},
    {name: 'team', title: 'Meet the Team Intro'},
  ],
  fields: [
    // Hero
    {name: 'heroEyebrow', title: 'Eyebrow', type: 'string', group: 'hero', initialValue: 'Direct Line to the Cell'},
    {name: 'heroTitle', title: 'Title', type: 'string', group: 'hero', initialValue: 'Reach the Placement Office.'},
    {name: 'heroTitleItalic', title: 'Italic portion of title', type: 'string', group: 'hero', initialValue: 'Placement Office.'},
    {name: 'heroDescription', title: 'Description', type: 'text', rows: 3, group: 'hero'},
    {name: 'heroImage', title: 'Hero image', type: 'image', options: {hotspot: true}, group: 'hero'},
    {name: 'heroPrimaryCtaLabel', title: 'Primary CTA label', type: 'string', group: 'hero', initialValue: 'Call Paras Surve'},
    {name: 'heroPrimaryCtaUrl', title: 'Primary CTA URL', type: 'string', group: 'hero'},
    {name: 'heroSecondaryCtaLabel', title: 'Secondary CTA label', type: 'string', group: 'hero', initialValue: 'Email the placement cell'},
    {name: 'heroSecondaryCtaUrl', title: 'Secondary CTA URL', type: 'string', group: 'hero'},

    // Quick contacts
    {name: 'contactsEyebrow', title: 'Eyebrow', type: 'string', group: 'contacts', initialValue: 'Placement Committee · Student Contacts'},
    {name: 'contactsTitle', title: 'Title', type: 'string', group: 'contacts', initialValue: 'Call · WhatsApp · Email'},
    {name: 'contactsTitleHighlight', title: 'Title highlight word(s)', type: 'string', group: 'contacts', initialValue: 'WhatsApp'},
    {name: 'contactsSubtitle', title: 'Subtitle', type: 'string', group: 'contacts', initialValue: 'Every number below is current'},

    // Channels
    {name: 'channelsEyebrow', title: 'Eyebrow', type: 'string', group: 'channels', initialValue: 'What to Send When'},
    {name: 'channelsTitle', title: 'Title', type: 'string', group: 'channels', initialValue: 'Email vs. WhatsApp'},
    {name: 'channelsTitleHighlight', title: 'Title highlight word(s)', type: 'string', group: 'channels', initialValue: 'vs.'},
    {name: 'channelsSubtitle', title: 'Subtitle', type: 'string', group: 'channels', initialValue: 'Match the right channel to the right need.'},
    {
      name: 'channelCards',
      title: 'Channel cards',
      type: 'array',
      group: 'channels',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'title', title: 'Title', type: 'string'},
            {name: 'description', title: 'Description', type: 'text', rows: 3},
          ],
          preview: {select: {title: 'title', subtitle: 'description'}},
        },
      ],
      validation: (Rule) => Rule.max(2),
    },

    // Team
    {name: 'teamEyebrow', title: 'Eyebrow', type: 'string', group: 'team', initialValue: 'Meet the Team'},
    {name: 'teamTitle', title: 'Title', type: 'string', group: 'team', initialValue: 'Placement Committee · 2025-26.'},
    {name: 'teamTitleHighlight', title: 'Title highlight word(s)', type: 'string', group: 'team', initialValue: '2025-26.'},
    {name: 'teamSubtitle', title: 'Subtitle', type: 'text', rows: 2, group: 'team', initialValue: 'Student-led · faculty-mentored · always reachable. Reach out for partner enquiries, JD distribution, or campus visits.'},
  ],
  preview: {prepare() { return {title: 'Placement Contact Page'} }},
}
