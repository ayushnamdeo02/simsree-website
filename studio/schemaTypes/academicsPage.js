export default {
  name: 'academicsPage',
  title: 'Academics Page',
  type: 'document',
  groups: [
    {name: 'hero', title: 'Hero'},
    {name: 'approach', title: 'Approach'},
    {name: 'tiers', title: 'Tier Headings'},
    {name: 'compare', title: 'Comparison Table'},
    {name: 'differentiators', title: 'Differentiators Intro'},
    {name: 'faculty', title: 'Faculty'},
    {name: 'cta', title: 'Apply CTA'},
  ],
  fields: [
    // Hero
    {name: 'heroEyebrow', title: 'Eyebrow', type: 'string', group: 'hero', initialValue: 'Five Programmes · One Institute'},
    {name: 'heroTitle', title: 'Title', type: 'string', group: 'hero', initialValue: 'Find the programme that fits your next move.'},
    {name: 'heroTitleBreakAfter', title: 'Line break after', description: 'Text after this substring starts a new line', type: 'string', group: 'hero', initialValue: 'the'},
    {name: 'heroDescription', title: 'Description', type: 'text', rows: 2, group: 'hero'},
    {name: 'heroImage', title: 'Hero image', type: 'image', options: {hotspot: true}, group: 'hero'},
    {name: 'heroPrimaryCtaLabel', title: 'Primary CTA label', type: 'string', group: 'hero', initialValue: 'See all programmes'},
    {name: 'heroPrimaryCtaUrl', title: 'Primary CTA URL', type: 'string', group: 'hero'},
    {name: 'heroSecondaryCtaLabel', title: 'Secondary CTA label', type: 'string', group: 'hero', initialValue: 'Compare all five'},
    {name: 'heroSecondaryCtaUrl', title: 'Secondary CTA URL', type: 'string', group: 'hero', initialValue: '#compare'},
    {name: 'heroTertiaryCtaLabel', title: 'Tertiary CTA label', type: 'string', group: 'hero', initialValue: 'See how to apply'},
    {name: 'heroTertiaryCtaUrl', title: 'Tertiary CTA URL', type: 'string', group: 'hero', initialValue: '/admissions'},

    // Approach
    {name: 'approachEyebrow', title: 'Eyebrow', type: 'string', group: 'approach', initialValue: 'Why SIMSREE Academics'},
    {name: 'approachTitle', title: 'Title', type: 'string', group: 'approach', initialValue: 'Practise management — don’t just study it.'},
    {name: 'approachTitleHighlight', title: 'Title highlight word(s)', type: 'string', group: 'approach', initialValue: 'Practise'},
    {name: 'approachSubtitle', title: 'Subtitle', type: 'text', rows: 2, group: 'approach'},
    {
      name: 'approachCards',
      title: 'Cards',
      type: 'array',
      group: 'approach',
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
    },

    // Tier headings
    {name: 'fullTimeEyebrow', title: 'Full-time eyebrow', type: 'string', group: 'tiers', initialValue: 'Full-time Programmes'},
    {name: 'fullTimeTitle', title: 'Full-time title', type: 'string', group: 'tiers', initialValue: 'Got two years? Go full-time.'},
    {name: 'fullTimeTitleHighlight', title: 'Full-time highlight', type: 'string', group: 'tiers', initialValue: 'Go full-time.'},
    {name: 'fullTimeSubtitle', title: 'Full-time subtitle', type: 'text', rows: 2, group: 'tiers'},

    {name: 'executiveEyebrow', title: 'Executive eyebrow', type: 'string', group: 'tiers', initialValue: 'Executive Programmes'},
    {name: 'executiveTitle', title: 'Executive title', type: 'string', group: 'tiers', initialValue: 'Can’t pause your career? Study weekends'},
    {name: 'executiveTitleHighlight', title: 'Executive highlight', type: 'string', group: 'tiers', initialValue: 'your career?'},
    {name: 'executiveSubtitle', title: 'Executive subtitle', type: 'text', rows: 2, group: 'tiers'},

    {name: 'doctoralEyebrow', title: 'Doctoral eyebrow', type: 'string', group: 'tiers', initialValue: 'Doctoral'},
    {name: 'doctoralTitle', title: 'Doctoral title', type: 'string', group: 'tiers', initialValue: 'Build a research career.'},
    {name: 'doctoralTitleHighlight', title: 'Doctoral highlight', type: 'string', group: 'tiers', initialValue: 'research'},
    {name: 'doctoralSubtitle', title: 'Doctoral subtitle', type: 'text', rows: 2, group: 'tiers'},

    // Comparison
    {name: 'compareEyebrow', title: 'Eyebrow', type: 'string', group: 'compare', initialValue: 'Compare'},
    {name: 'compareTitle', title: 'Title', type: 'string', group: 'compare', initialValue: 'Compare all five in one view.'},
    {name: 'compareTitleHighlight', title: 'Title highlight word(s)', type: 'string', group: 'compare', initialValue: 'all five'},
    {name: 'compareSubtitle', title: 'Subtitle', type: 'string', group: 'compare', initialValue: 'Duration, mode, intake, admission path and approximate fees — all at a glance.'},

    // Differentiators
    {name: 'differentiatorsEyebrow', title: 'Eyebrow', type: 'string', group: 'differentiators', initialValue: 'Why SIMSREE Academics'},
    {name: 'differentiatorsTitle', title: 'Title', type: 'string', group: 'differentiators', initialValue: 'Five things other B-schools can’t give you.'},
    {name: 'differentiatorsTitleHighlight', title: 'Title highlight word(s)', type: 'string', group: 'differentiators', initialValue: 'B-schools can’t give you.'},
    {name: 'differentiatorsSubtitle', title: 'Subtitle', type: 'string', group: 'differentiators', initialValue: 'Beyond the curriculum — what sets your degree apart.'},

    // Faculty
    {name: 'facultyEyebrow', title: 'Eyebrow', type: 'string', group: 'faculty', initialValue: 'Faculty'},
    {name: 'facultyTitle', title: 'Title', type: 'string', group: 'faculty', initialValue: 'Meet the people who’ll teach you.'},
    {name: 'facultySubtitle', title: 'Subtitle', type: 'text', rows: 2, group: 'faculty', initialValue: 'Core faculty across all disciplines + a rotating panel of senior industry visiting faculty.'},
    {
      name: 'facultyCards',
      title: 'Faculty cards',
      type: 'array',
      group: 'faculty',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'title', title: 'Title', type: 'string'},
            {name: 'description', title: 'Description', type: 'text', rows: 3},
            {name: 'image', title: 'Image', type: 'image', options: {hotspot: true}},
            {name: 'ctaLabel', title: 'CTA label', type: 'string'},
            {name: 'ctaUrl', title: 'CTA URL', type: 'string'},
          ],
          preview: {select: {title: 'title', subtitle: 'description', media: 'image'}},
        },
      ],
      validation: (Rule) => Rule.max(2),
    },

    // Apply CTA
    {name: 'ctaEyebrow', title: 'Eyebrow', type: 'string', group: 'cta', initialValue: 'Ready to Apply?'},
    {name: 'ctaTitle', title: 'Title', type: 'string', group: 'cta', initialValue: 'Apply to MMS 2026-28.'},
    {name: 'ctaTitleHighlight', title: 'Title highlight word(s)', type: 'string', group: 'cta', initialValue: 'MMS 2026-28.'},
    {name: 'ctaSubtitle', title: 'Subtitle', type: 'text', rows: 3, group: 'cta'},
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
  preview: {prepare() { return {title: 'Academics Page'} }},
}
