export default {
  name: 'studentSystemPage',
  title: 'Student-Driven System Page',
  type: 'document',
  groups: [
    {name: 'hero', title: 'Hero'},
    {name: 'stats', title: 'Stats'},
    {name: 'philosophy', title: 'Philosophy'},
    {name: 'system', title: 'The System'},
    {name: 'track', title: 'Leadership Track'},
    {name: 'directory', title: 'Committee Directory Intro'},
    {name: 'spotlight', title: 'Spotlight'},
    {name: 'impact', title: 'Impact Numbers'},
    {name: 'cta', title: 'Apply CTA'},
  ],
  fields: [
    // Hero
    {name: 'heroEyebrow', title: 'Eyebrow', type: 'string', group: 'hero', initialValue: 'The SIMSREE study works'},
    {name: 'heroTitle', title: 'Title line 1', type: 'string', group: 'hero', initialValue: 'Run by students.'},
    {name: 'heroTitleLine2', title: 'Title line 2', type: 'string', group: 'hero', initialValue: 'Built for leaders.'},
    {name: 'heroDescription', title: 'Description', type: 'text', rows: 3, group: 'hero'},
    {name: 'heroImage', title: 'Hero image', type: 'image', options: {hotspot: true}, group: 'hero'},
    {name: 'heroPrimaryCtaLabel', title: 'Primary CTA label', type: 'string', group: 'hero', initialValue: 'See all 13 committees'},
    {name: 'heroPrimaryCtaUrl', title: 'Primary CTA URL', type: 'string', group: 'hero', initialValue: '#directory'},
    {name: 'heroSecondaryCtaLabel', title: 'Secondary CTA label', type: 'string', group: 'hero', initialValue: 'Meet student leaders'},
    {name: 'heroSecondaryCtaUrl', title: 'Secondary CTA URL', type: 'string', group: 'hero', initialValue: '/students/leadership'},

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

    // Philosophy
    {name: 'philosophyEyebrow', title: 'Eyebrow', type: 'string', group: 'philosophy', initialValue: 'The SIMSREE Philosophy'},
    {name: 'philosophyQuote', title: 'Quote', type: 'text', rows: 3, group: 'philosophy'},
    {name: 'philosophyAttribution', title: 'Attribution', type: 'string', group: 'philosophy', initialValue: 'Chinese Proverb'},
    {name: 'philosophyMeta', title: 'Meta line', type: 'string', group: 'philosophy', initialValue: 'The guiding philosophy of SIMSREE since 1983'},

    // The System
    {name: 'systemEyebrow', title: 'Eyebrow', type: 'string', group: 'system', initialValue: 'The System'},
    {name: 'systemTitle', title: 'Title', type: 'string', group: 'system', initialValue: 'Not a student body. An engine.'},
    {name: 'systemTitleHighlight', title: 'Title highlight word(s)', type: 'string', group: 'system', initialValue: 'An engine.'},
    {name: 'systemBody', title: 'Body', description: 'Separate paragraphs with a blank line', type: 'text', rows: 8, group: 'system'},
    {name: 'systemPrimaryCtaLabel', title: 'Primary CTA label', type: 'string', group: 'system', initialValue: 'See all committees'},
    {name: 'systemPrimaryCtaUrl', title: 'Primary CTA URL', type: 'string', group: 'system', initialValue: '#directory'},
    {name: 'systemSecondaryCtaLabel', title: 'Secondary CTA label', type: 'string', group: 'system', initialValue: 'How to get involved'},
    {name: 'systemSecondaryCtaUrl', title: 'Secondary CTA URL', type: 'string', group: 'system', initialValue: '/students'},
    {
      name: 'systemImages',
      title: 'Collage images',
      description: 'Four images shown beside the text',
      type: 'array',
      group: 'system',
      of: [{type: 'image', options: {hotspot: true}}],
    },

    // Leadership Track
    {name: 'trackEyebrow', title: 'Eyebrow', type: 'string', group: 'track', initialValue: 'From Student to Leader'},
    {name: 'trackTitle', title: 'Title', type: 'string', group: 'track', initialValue: 'Your two-year leadership track.'},
    {name: 'trackTitleHighlight', title: 'Title highlight word(s)', type: 'string', group: 'track', initialValue: 'two-year'},
    {name: 'trackBody', title: 'Body', type: 'text', rows: 4, group: 'track'},
    {name: 'trackImage', title: 'Image', type: 'image', options: {hotspot: true}, group: 'track'},
    {
      name: 'trackSteps',
      title: 'Steps',
      type: 'array',
      group: 'track',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'title', title: 'Title', type: 'string'},
            {name: 'description', title: 'Description', type: 'string'},
          ],
          preview: {select: {title: 'title', subtitle: 'description'}},
        },
      ],
    },
    {name: 'trackCalloutTitle', title: 'Callout title', type: 'string', group: 'track', initialValue: 'What makes this rare'},
    {name: 'trackCalloutBody', title: 'Callout body', type: 'text', rows: 2, group: 'track'},

    // Directory intro
    {name: 'directoryEyebrow', title: 'Eyebrow', type: 'string', group: 'directory', initialValue: 'The Committee Directory'},
    {name: 'directoryTitle', title: 'Title', description: 'The committee count is prefixed automatically', type: 'string', group: 'directory', initialValue: 'active committees'},
    {name: 'directorySubtitle', title: 'Subtitle', type: 'string', group: 'directory', initialValue: 'Each one runs a real domain with real accountability. Click any to open its dedicated page.'},

    // Spotlight
    {name: 'spotlightEyebrow', title: 'Eyebrow', type: 'string', group: 'spotlight', initialValue: 'Spotlight'},
    {name: 'spotlightTitle', title: 'Title', type: 'string', group: 'spotlight', initialValue: 'What committees actually do.'},
    {name: 'spotlightTitleHighlight', title: 'Title highlight word(s)', type: 'string', group: 'spotlight', initialValue: 'actually do.'},
    {name: 'spotlightSubtitle', title: 'Subtitle', type: 'string', group: 'spotlight', initialValue: 'Three signature committees · three real stakes.'},
    {
      name: 'spotlightCards',
      title: 'Cards',
      type: 'array',
      group: 'spotlight',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'label', title: 'Label', description: 'e.g. "Spotlight 01"', type: 'string'},
            {name: 'title', title: 'Title', type: 'string'},
            {name: 'description', title: 'Description', type: 'text', rows: 4},
            {name: 'linkLabel', title: 'Link label', type: 'string'},
            {name: 'linkUrl', title: 'Link URL', type: 'string'},
          ],
          preview: {select: {title: 'title', subtitle: 'label'}},
        },
      ],
    },

    // Impact
    {name: 'impactEyebrow', title: 'Eyebrow', type: 'string', group: 'impact', initialValue: 'Impact Numbers'},
    {name: 'impactTitle', title: 'Title', type: 'string', group: 'impact', initialValue: 'What student leadership looks like at scale.'},
    {name: 'impactTitleHighlight', title: 'Title highlight word(s)', type: 'string', group: 'impact', initialValue: 'at scale.'},
    {name: 'impactSubtitle', title: 'Subtitle', type: 'string', group: 'impact', initialValue: 'The numbers that matter.'},
    {
      name: 'impactStats',
      title: 'Impact stats',
      type: 'array',
      group: 'impact',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'value', title: 'Value', type: 'string'},
            {name: 'label', title: 'Label', type: 'string'},
            {name: 'description', title: 'Description', type: 'string'},
          ],
          preview: {select: {title: 'value', subtitle: 'label'}},
        },
      ],
    },

    // Apply CTA
    {name: 'ctaEyebrow', title: 'Eyebrow', type: 'string', group: 'cta', initialValue: 'Ready to lead, not just learn?'},
    {name: 'ctaTitle', title: 'Title', type: 'string', group: 'cta', initialValue: 'Apply to MMS 2026–28.'},
    {name: 'ctaTitleHighlight', title: 'Title highlight word(s)', type: 'string', group: 'cta', initialValue: 'MMS 2026–28.'},
    {name: 'ctaSubtitle', title: 'Subtitle', type: 'text', rows: 2, group: 'cta'},
    {name: 'ctaPrimaryLabel', title: 'Primary CTA label', type: 'string', group: 'cta', initialValue: 'Start your application'},
    {name: 'ctaPrimaryUrl', title: 'Primary CTA URL', type: 'string', group: 'cta', initialValue: '/admissions/mms'},
    {name: 'ctaSecondaryLabel', title: 'Secondary CTA label', type: 'string', group: 'cta', initialValue: 'Talk to a current student'},
    {name: 'ctaSecondaryUrl', title: 'Secondary CTA URL', type: 'string', group: 'cta', initialValue: '/contact'},
    {name: 'ctaTertiaryLabel', title: 'Tertiary CTA label', type: 'string', group: 'cta', initialValue: 'Download the brochure (PDF)'},
    {name: 'ctaTertiaryUrl', title: 'Tertiary CTA URL', type: 'string', group: 'cta', initialValue: '/brochure'},
  ],
  preview: {prepare() { return {title: 'Student-Driven System Page'} }},
}
