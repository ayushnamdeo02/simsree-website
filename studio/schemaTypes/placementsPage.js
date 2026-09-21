export default {
  name: 'placementsPage',
  title: 'Placements Page',
  type: 'document',
  groups: [
    {name: 'hero', title: 'Hero'},
    {name: 'stats', title: 'Stats'},
    {name: 'paths', title: 'Two Paths'},
    {name: 'partners', title: 'Recruiting Partners'},
    {name: 'process', title: 'How Placement Works'},
    {name: 'reports', title: 'Reports'},
    {name: 'cell', title: 'Placement Office CTA'},
    {name: 'journey', title: 'Placement Journey'},
    {name: 'facts', title: 'Fact Panels'},
  ],
  fields: [
    // Hero
    {name: 'heroEyebrow', title: 'Eyebrow', type: 'string', group: 'hero', initialValue: 'For Recruiters'},
    {name: 'heroTitle', title: 'Title', type: 'string', group: 'hero', initialValue: 'Hire from the 2024-26 batch.'},
    {name: 'heroTitleItalic', title: 'Italic portion of title', description: 'Rendered in italic serif, e.g. "2024-26 batch."', type: 'string', group: 'hero', initialValue: '2024-26 batch.'},
    {name: 'heroDescription', title: 'Description', type: 'text', rows: 3, group: 'hero'},
    {name: 'heroImage', title: 'Hero image', type: 'image', options: {hotspot: true}, group: 'hero'},
    {name: 'heroPrimaryCtaLabel', title: 'Primary CTA label', type: 'string', group: 'hero', initialValue: 'Book a campus visit'},
    {name: 'heroPrimaryCtaUrl', title: 'Primary CTA URL', type: 'string', group: 'hero'},
    {name: 'heroSecondaryCtaLabel', title: 'Secondary CTA label', type: 'string', group: 'hero', initialValue: 'See why recruit here'},
    {name: 'heroSecondaryCtaUrl', title: 'Secondary CTA URL', type: 'string', group: 'hero', initialValue: '/placements/why-recruit'},
    {name: 'heroTertiaryCtaLabel', title: 'Tertiary CTA label', type: 'string', group: 'hero', initialValue: 'Download the recruiter brochure (PDF)'},
    {name: 'heroTertiaryCtaUrl', title: 'Tertiary CTA URL', type: 'string', group: 'hero'},

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

    // Two paths
    {name: 'pathsEyebrow', title: 'Eyebrow', type: 'string', group: 'paths', initialValue: 'Two Paths'},
    {name: 'pathsTitle', title: 'Title', type: 'string', group: 'paths', initialValue: 'Pick your next step.'},
    {name: 'pathsTitleHighlight', title: 'Title highlight word(s)', type: 'string', group: 'paths', initialValue: 'next step.'},
    {name: 'pathsSubtitle', title: 'Subtitle', type: 'string', group: 'paths', initialValue: 'Get what you need, wherever you are starting.'},
    {
      name: 'pathCards',
      title: 'Path cards',
      description: 'Two cards — the first renders on navy, the second on white',
      type: 'array',
      group: 'paths',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'label', title: 'Label', description: 'e.g. "Recruiter Path"', type: 'string'},
            {name: 'title', title: 'Title', type: 'string'},
            {name: 'steps', title: 'Numbered steps', type: 'array', of: [{type: 'string'}]},
            {name: 'body', title: 'Body text', description: 'Used instead of steps when steps are empty', type: 'text', rows: 3},
            {name: 'primaryCtaLabel', title: 'Primary CTA label', type: 'string'},
            {name: 'primaryCtaUrl', title: 'Primary CTA URL', type: 'string'},
            {name: 'secondaryCtaLabel', title: 'Secondary CTA label', type: 'string'},
            {name: 'secondaryCtaUrl', title: 'Secondary CTA URL', type: 'string'},
          ],
          preview: {select: {title: 'title', subtitle: 'label'}},
        },
      ],
      validation: (Rule) => Rule.max(2),
    },

    // Partners
    {name: 'partnersEyebrow', title: 'Eyebrow', type: 'string', group: 'partners', initialValue: 'Our Recruiting Partners'},
    {name: 'partnersTitle', title: 'Title', type: 'string', group: 'partners', initialValue: 'Pick a sector. We have a partner there.'},
    {name: 'partnersSubtitle', title: 'Subtitle', type: 'text', rows: 3, group: 'partners'},
    {name: 'partnersCtaLabel', title: 'CTA label', type: 'string', group: 'partners', initialValue: 'Final Report 2024-25'},
    {name: 'partnersCtaUrl', title: 'CTA URL', type: 'string', group: 'partners'},

    // Process
    {name: 'processEyebrow', title: 'Eyebrow', type: 'string', group: 'process', initialValue: 'How Placement Works'},
    {name: 'processTitle', title: 'Title', type: 'string', group: 'process', initialValue: 'Student-driven · faculty-guided.'},
    {name: 'processTitleHighlight', title: 'Title highlight word(s)', type: 'string', group: 'process', initialValue: 'faculty-guided.'},
    {name: 'processSubtitle', title: 'Subtitle', type: 'string', group: 'process', initialValue: 'Here is how hiring works, in six steps.'},

    // Reports
    {name: 'reportsEyebrow', title: 'Eyebrow', type: 'string', group: 'reports', initialValue: 'Reports'},
    {name: 'reportsTitle', title: 'Title', type: 'string', group: 'reports', initialValue: 'Detailed outcomes per year'},
    {name: 'reportsTitleHighlight', title: 'Title highlight word(s)', type: 'string', group: 'reports', initialValue: 'outcomes'},
    {name: 'reportsSubtitle', title: 'Subtitle', type: 'string', group: 'reports', initialValue: 'Three reports · final, summer, executive · current year + multi-year archive.'},

    // Placement office CTA
    {name: 'cellEyebrow', title: 'Eyebrow', type: 'string', group: 'cell', initialValue: 'Direct Line to the Cell'},
    {name: 'cellTitle', title: 'Title', type: 'string', group: 'cell', initialValue: 'Speak to the Placement Office.'},
    {name: 'cellSubtitle', title: 'Subtitle', description: 'Contact line under the title', type: 'string', group: 'cell'},
    {
      name: 'cellButtons',
      title: 'Buttons',
      type: 'array',
      group: 'cell',
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

    // Journey
    {name: 'journeyEyebrow', title: 'Eyebrow', type: 'string', group: 'journey', initialValue: 'The Placement Journey'},
    {name: 'journeyTitle', title: 'Title', type: 'string', group: 'journey', initialValue: 'Six steps · fully transparent.'},
    {name: 'journeyTitleHighlight', title: 'Title highlight word(s)', type: 'string', group: 'journey', initialValue: 'fully transparent.'},
    {name: 'journeySubtitle', title: 'Subtitle', type: 'text', rows: 2, group: 'journey', initialValue: 'Every interaction with a recruiter follows the same student-led, faculty-mentored process. No black box.'},
    {name: 'journeyImage', title: 'Section image', type: 'image', options: {hotspot: true}, group: 'journey'},

    // Fact panels
    {
      name: 'factPanels',
      title: 'Fact panels',
      description: 'Three bordered panels at the foot of the page',
      type: 'array',
      group: 'facts',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'title', title: 'Panel title', type: 'string'},
            {
              name: 'rows',
              title: 'Rows',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {name: 'label', title: 'Label', type: 'string'},
                    {name: 'value', title: 'Value', type: 'string'},
                  ],
                  preview: {select: {title: 'label', subtitle: 'value'}},
                },
              ],
            },
          ],
          preview: {select: {title: 'title'}},
        },
      ],
      validation: (Rule) => Rule.max(3),
    },
  ],
  preview: {prepare() { return {title: 'Placements Page'} }},
}
