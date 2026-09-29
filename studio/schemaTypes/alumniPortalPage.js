export default {
  name: 'alumniPortalPage',
  title: 'Alumni Portal Page',
  type: 'document',
  groups: [
    {name: 'hero', title: 'Hero'},
    {name: 'stats', title: 'Stats'},
    {name: 'calendar', title: 'Calendar Intro'},
    {name: 'services', title: 'Services Intro'},
    {name: 'chapters', title: 'City Chapters Intro'},
    {name: 'giveBack', title: 'Give Back'},
    {name: 'voices', title: 'Voices Intro'},
    {name: 'cta', title: 'Register CTA'},
  ],
  fields: [
    // Hero
    {name: 'heroEyebrow', title: 'Eyebrow', type: 'string', group: 'hero', initialValue: 'SIMAA · Est. 1989 · 5,000+ members'},
    {name: 'heroTitle', title: 'Title', type: 'string', group: 'hero', initialValue: 'Alumni Portal.'},
    {name: 'heroDescription', title: 'Description', type: 'text', rows: 3, group: 'hero'},
    {name: 'heroImage', title: 'Hero image', type: 'image', options: {hotspot: true}, group: 'hero'},
    {name: 'heroPrimaryCtaLabel', title: 'Primary CTA label', type: 'string', group: 'hero', initialValue: 'Register on Gateway'},
    {name: 'heroPrimaryCtaUrl', title: 'Primary CTA URL', type: 'string', group: 'hero', initialValue: '#register'},
    {name: 'heroSecondaryCtaLabel', title: 'Secondary CTA label', type: 'string', group: 'hero', initialValue: 'Browse member services'},
    {name: 'heroSecondaryCtaUrl', title: 'Secondary CTA URL', type: 'string', group: 'hero', initialValue: '#services'},
    {name: 'heroTertiaryCtaLabel', title: 'Tertiary CTA label', type: 'string', group: 'hero', initialValue: 'Find your chapter'},
    {name: 'heroTertiaryCtaUrl', title: 'Tertiary CTA URL', type: 'string', group: 'hero', initialValue: '#chapters'},

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

    // Calendar intro
    {name: 'calendarEyebrow', title: 'Eyebrow', type: 'string', group: 'calendar', initialValue: 'Upcoming for Alumni'},
    {name: 'calendarTitle', title: 'Title', type: 'string', group: 'calendar', initialValue: 'What is on the SIMAA calendar.'},
    {name: 'calendarTitleHighlight', title: 'Title highlight word(s)', type: 'string', group: 'calendar', initialValue: 'SIMAA calendar.'},
    {name: 'calendarSubtitle', title: 'Subtitle', type: 'string', group: 'calendar', initialValue: 'Batchmeets, sector panels, mentorship sessions - open to all registered alumni.'},

    // Services intro
    {name: 'servicesEyebrow', title: 'Eyebrow', type: 'string', group: 'services', initialValue: 'SIMAA · The Official Body'},
    {name: 'servicesTitle', title: 'Title', description: 'The count is prefixed automatically', type: 'string', group: 'services', initialValue: 'services for SIMSREE alumni.'},
    {name: 'servicesSubtitle', title: 'Subtitle', type: 'string', group: 'services', initialValue: 'Filter by category. Every service is included with your SIMAA registration.'},

    // Chapters intro
    {name: 'chaptersEyebrow', title: 'Eyebrow', type: 'string', group: 'chapters', initialValue: 'City Chapters'},
    {name: 'chaptersTitle', title: 'Title', type: 'string', group: 'chapters', initialValue: 'Find your chapter convener.'},
    {name: 'chaptersTitleHighlight', title: 'Title highlight word(s)', type: 'string', group: 'chapters', initialValue: 'chapter convener.'},
    {name: 'chaptersSubtitle', title: 'Subtitle', type: 'string', group: 'chapters', initialValue: 'Six active city chapters · run by elected alumni conveners on rotating two-year terms.'},
    {name: 'chaptersCtaLabel', title: 'CTA label', type: 'string', group: 'chapters', initialValue: 'Browse all 12 cities'},
    {name: 'chaptersCtaUrl', title: 'CTA URL', type: 'string', group: 'chapters'},

    // Give Back
    {name: 'giveBackEyebrow', title: 'Eyebrow', type: 'string', group: 'giveBack', initialValue: 'Four Ways to Give Back'},
    {name: 'giveBackTitle', title: 'Title', type: 'string', group: 'giveBack', initialValue: 'Plug in. Pay it forward.'},
    {name: 'giveBackTitleHighlight', title: 'Title highlight word(s)', type: 'string', group: 'giveBack', initialValue: 'Pay it forward.'},
    {name: 'giveBackSubtitle', title: 'Subtitle', type: 'string', group: 'giveBack', initialValue: 'Every SIMSREE alumnus has at least one of these to give: time, network, expertise, or capital.'},
    {
      name: 'giveBackCards',
      title: 'Cards',
      type: 'array',
      group: 'giveBack',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'label', title: 'Label', description: 'e.g. "Mentor"', type: 'string'},
            {name: 'title', title: 'Title', type: 'string'},
            {name: 'description', title: 'Description', type: 'text', rows: 3},
            {name: 'linkLabel', title: 'Link label', type: 'string'},
            {name: 'linkUrl', title: 'Link URL', type: 'string'},
          ],
          preview: {select: {title: 'title', subtitle: 'label'}},
        },
      ],
    },

    // Voices intro
    {name: 'voicesEyebrow', title: 'Eyebrow', type: 'string', group: 'voices', initialValue: 'The Voices'},
    {name: 'voicesTitle', title: 'Title', type: 'string', group: 'voices', initialValue: 'Eight talks worth your afternoon.'},
    {name: 'voicesTitleHighlight', title: 'Title highlight word(s)', type: 'string', group: 'voices'},
    {name: 'voicesSubtitle', title: 'Subtitle', type: 'string', group: 'voices', initialValue: 'A curated feed. The full library lives on YouTube @TEDxSIMSREE.'},

    // Register CTA
    {name: 'ctaEyebrow', title: 'Eyebrow', type: 'string', group: 'cta', initialValue: 'Become a SIMAA member'},
    {name: 'ctaTitle', title: 'Title', type: 'string', group: 'cta', initialValue: 'Register on the Gateway.'},
    {name: 'ctaTitleHighlight', title: 'Title highlight word(s)', type: 'string', group: 'cta', initialValue: 'Gateway.'},
    {name: 'ctaSubtitle', title: 'Subtitle', type: 'text', rows: 3, group: 'cta'},
    {name: 'ctaPrimaryLabel', title: 'Primary CTA label', type: 'string', group: 'cta', initialValue: 'Register now'},
    {name: 'ctaPrimaryUrl', title: 'Primary CTA URL', type: 'string', group: 'cta'},
    {name: 'ctaSecondaryLabel', title: 'Secondary CTA label', type: 'string', group: 'cta', initialValue: 'Email SIMAA office'},
    {name: 'ctaSecondaryUrl', title: 'Secondary CTA URL', type: 'string', group: 'cta'},
    {
      name: 'ctaFacts',
      title: 'Side facts',
      description: 'Small stat rows beside the CTA, e.g. "2 min to register"',
      type: 'array',
      group: 'cta',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'value', title: 'Value', type: 'string'},
            {name: 'label', title: 'Label', type: 'string'},
          ],
          preview: {select: {title: 'value', subtitle: 'label'}},
        },
      ],
    },
    {
      name: 'ctaContact',
      title: 'Contact lines',
      description: 'Address, email, phone shown beside the CTA',
      type: 'array',
      group: 'cta',
      of: [{type: 'string'}],
    },
  ],
  preview: {prepare() { return {title: 'Alumni Portal Page'} }},
}
