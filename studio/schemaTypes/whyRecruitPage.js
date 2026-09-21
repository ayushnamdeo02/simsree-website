export default {
  name: 'whyRecruitPage',
  title: 'Why Recruit Page',
  type: 'document',
  groups: [
    {name: 'hero', title: 'Hero'},
    {name: 'reasons', title: 'Six Reasons'},
    {name: 'outcomes', title: 'Batch Outcomes'},
    {name: 'cta', title: 'Start Hiring CTA'},
  ],
  fields: [
    // Hero
    {name: 'heroEyebrow', title: 'Eyebrow', type: 'string', group: 'hero', initialValue: 'For Recruiters'},
    {name: 'heroTitle', title: 'Title', type: 'string', group: 'hero', initialValue: 'Hire practitioners. Not just graduates.'},
    {name: 'heroTitleItalic', title: 'Italic portion of title', description: 'Rendered in italic serif, e.g. "practitioners."', type: 'string', group: 'hero', initialValue: 'practitioners.'},
    {name: 'heroTitleBreakAfter', title: 'Line break after', description: 'Text after this substring starts a new line, e.g. "practitioners."', type: 'string', group: 'hero', initialValue: 'practitioners.'},
    {name: 'heroDescription', title: 'Description', type: 'text', rows: 3, group: 'hero'},
    {name: 'heroImage', title: 'Hero image', type: 'image', options: {hotspot: true}, group: 'hero'},
    {name: 'heroPrimaryCtaLabel', title: 'Primary CTA label', type: 'string', group: 'hero', initialValue: 'Book a campus visit'},
    {name: 'heroPrimaryCtaUrl', title: 'Primary CTA URL', type: 'string', group: 'hero', initialValue: '/placements/contact'},
    {name: 'heroSecondaryCtaLabel', title: 'Secondary CTA label', type: 'string', group: 'hero', initialValue: 'Download the recruiter brochure (PDF)'},
    {name: 'heroSecondaryCtaUrl', title: 'Secondary CTA URL', type: 'string', group: 'hero'},

    // Reasons intro
    {name: 'reasonsEyebrow', title: 'Eyebrow', type: 'string', group: 'reasons', initialValue: 'Six Reasons'},
    {name: 'reasonsTitle', title: 'Title', type: 'string', group: 'reasons', initialValue: 'Why hire from SIMSREE'},
    {name: 'reasonsTitleHighlight', title: 'Title highlight word(s)', type: 'string', group: 'reasons', initialValue: 'SIMSREE'},
    {name: 'reasonsSubtitle', title: 'Subtitle', type: 'string', group: 'reasons', initialValue: 'Every point links to the evidence.'},

    // Outcomes
    {name: 'outcomesEyebrow', title: 'Eyebrow', type: 'string', group: 'outcomes', initialValue: 'Last Batch Outcomes'},
    {name: 'outcomesTitle', title: 'Title', type: 'string', group: 'outcomes', initialValue: 'See where the cohort landed'},
    {name: 'outcomesTitleHighlight', title: 'Title highlight word(s)', type: 'string', group: 'outcomes', initialValue: 'landed'},
    {name: 'outcomesSubtitle', title: 'Subtitle', type: 'string', group: 'outcomes', initialValue: 'See the MMS 2023-25 final placement breakdown.'},
    {
      name: 'breakdowns',
      title: 'Breakdown panels',
      description: 'Each panel is a labelled bar chart. Percentages should total 100 within a panel.',
      type: 'array',
      group: 'outcomes',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'title', title: 'Panel title', description: 'e.g. "By sector"', type: 'string', validation: (Rule) => Rule.required()},
            {
              name: 'rows',
              title: 'Rows',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {name: 'label', title: 'Label', type: 'string', validation: (Rule) => Rule.required()},
                    {name: 'value', title: 'Percentage', description: 'Number only, e.g. 42 for 42%', type: 'number', validation: (Rule) => Rule.required().min(0).max(100)},
                  ],
                  preview: {select: {title: 'label', subtitle: 'value'}},
                },
              ],
            },
          ],
          preview: {select: {title: 'title'}},
        },
      ],
      validation: (Rule) => Rule.max(2),
    },

    // CTA
    {name: 'ctaEyebrow', title: 'Eyebrow', type: 'string', group: 'cta', initialValue: 'Recruit This Year'},
    {name: 'ctaTitle', title: 'Title', type: 'string', group: 'cta', initialValue: 'Three ways to start hiring'},
    {name: 'ctaSubtitle', title: 'Subtitle', type: 'string', group: 'cta', initialValue: 'Pick the path that fits where you are.'},
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
  preview: {prepare() { return {title: 'Why Recruit Page'} }},
}
