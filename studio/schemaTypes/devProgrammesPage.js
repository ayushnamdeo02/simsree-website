export default {
  name: 'devProgrammesPage',
  title: 'Development Programmes Page',
  type: 'document',
  groups: [
    {name: 'hero', title: 'Hero'},
    {name: 'mdp', title: 'MDP Tab'},
    {name: 'catalyst', title: 'Career Catalyst Tab'},
    {name: 'custom', title: 'Custom In-Company Tab'},
    {name: 'calendar', title: 'Calendar Intro'},
    {name: 'faq', title: 'FAQ'},
    {name: 'cta', title: 'Closing CTA'},
  ],
  fields: [
    // Hero
    {name: 'heroEyebrow', title: 'Eyebrow', type: 'string', group: 'hero', initialValue: 'For Working Professionals'},
    {name: 'heroTitle', title: 'Title', type: 'string', group: 'hero', initialValue: 'Development Programmes.'},
    {name: 'heroTitleItalic', title: 'Italic portion of title', type: 'string', group: 'hero', initialValue: 'Programmes.'},
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

    // MDP tab
    {name: 'mdpTabLabel', title: 'Tab label', type: 'string', group: 'mdp', initialValue: 'MDP'},
    {name: 'mdpEyebrow', title: 'Eyebrow', type: 'string', group: 'mdp', initialValue: 'For Working Professionals'},
    {name: 'mdpTitle', title: 'Title', type: 'string', group: 'mdp', initialValue: 'MDPs · 2-5 day intensives.'},
    {name: 'mdpTitleHighlight', title: 'Title highlight word(s)', type: 'string', group: 'mdp', initialValue: 'MDPs'},
    {name: 'mdpSubtitle', title: 'Subtitle', type: 'text', rows: 2, group: 'mdp'},

    // Career Catalyst tab
    {name: 'catalystTabLabel', title: 'Tab label', type: 'string', group: 'catalyst', initialValue: 'Career Catalyst'},
    {name: 'catalystEyebrow', title: 'Eyebrow', type: 'string', group: 'catalyst', initialValue: 'For Early-Career Professionals'},
    {name: 'catalystTitle', title: 'Title', type: 'string', group: 'catalyst', initialValue: 'Career Catalyst · short workshops.'},
    {name: 'catalystTitleHighlight', title: 'Title highlight word(s)', type: 'string', group: 'catalyst', initialValue: 'Career Catalyst'},
    {name: 'catalystSubtitle', title: 'Subtitle', type: 'string', group: 'catalyst', initialValue: 'CV clinics, mock case workshops, interview bootcamps. Three productised tracks.'},
    {
      name: 'catalystOutcomes',
      title: 'Outcome stats',
      description: 'The three cards under the workshop list',
      type: 'array',
      group: 'catalyst',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'value', title: 'Value', description: 'e.g. "62%"', type: 'string'},
            {name: 'description', title: 'Description', type: 'text', rows: 2},
          ],
          preview: {select: {title: 'value', subtitle: 'description'}},
        },
      ],
    },

    // Custom tab
    {name: 'customTabLabel', title: 'Tab label', type: 'string', group: 'custom', initialValue: 'Custom in-company'},
    {name: 'customEyebrow', title: 'Eyebrow', type: 'string', group: 'custom', initialValue: 'Custom For Your Team'},
    {name: 'customTitle', title: 'Title', type: 'string', group: 'custom', initialValue: 'In-company MDP.'},
    {name: 'customTitleHighlight', title: 'Title highlight word(s)', type: 'string', group: 'custom', initialValue: 'MDP.'},
    {name: 'customSubtitle', title: 'Subtitle', type: 'text', rows: 2, group: 'custom'},
    {name: 'customCtaLabel', title: 'CTA label', type: 'string', group: 'custom', initialValue: 'Talk to MDP Office'},
    {name: 'customCtaUrl', title: 'CTA URL', type: 'string', group: 'custom'},

    // Calendar
    {name: 'calendarEyebrow', title: 'Eyebrow', type: 'string', group: 'calendar', initialValue: 'Calendar · 2026'},
    {name: 'calendarTitle', title: 'Title', type: 'string', group: 'calendar', initialValue: 'Upcoming programmes.'},
    {name: 'calendarTitleHighlight', title: 'Title highlight word(s)', type: 'string', group: 'calendar', initialValue: 'programmes.'},
    {name: 'calendarSubtitle', title: 'Subtitle', type: 'text', rows: 2, group: 'calendar'},

    // FAQ
    {name: 'faqEyebrow', title: 'Eyebrow', type: 'string', group: 'faq', initialValue: 'FAQ'},
    {name: 'faqTitle', title: 'Title', type: 'string', group: 'faq', initialValue: 'Common questions.'},
    {name: 'faqTitleHighlight', title: 'Title highlight word(s)', type: 'string', group: 'faq', initialValue: 'questions.'},
    {
      name: 'faqs',
      title: 'Questions',
      type: 'array',
      group: 'faq',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'question', title: 'Question', type: 'string', validation: (Rule) => Rule.required()},
            {name: 'answer', title: 'Answer', type: 'text', rows: 3},
          ],
          preview: {select: {title: 'question', subtitle: 'answer'}},
        },
      ],
    },

    // CTA
    {name: 'ctaEyebrow', title: 'Eyebrow', type: 'string', group: 'cta', initialValue: 'Need Something Different?'},
    {name: 'ctaTitle', title: 'Title', type: 'string', group: 'cta', initialValue: 'A custom MDP for your team.'},
    {name: 'ctaSubtitle', title: 'Subtitle', type: 'text', rows: 2, group: 'cta'},
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
  preview: {prepare() { return {title: 'Development Programmes Page'} }},
}
