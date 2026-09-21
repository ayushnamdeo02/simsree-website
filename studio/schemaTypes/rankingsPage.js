export default {
  name: 'rankingsPage',
  title: 'Rankings Page',
  type: 'document',
  groups: [
    {name: 'hero', title: 'Hero'},
    {name: 'stats', title: 'Stats'},
    {name: 'frameworks', title: 'National Rankings Intro'},
    {name: 'honours', title: 'Recent Honours Intro'},
    {name: 'accreditations', title: 'Accreditations Intro'},
    {name: 'verify', title: 'Verification & Documents'},
  ],
  fields: [
    // Hero
    {name: 'heroEyebrow', title: 'Eyebrow', type: 'string', group: 'hero', initialValue: 'Independently Verified'},
    {name: 'heroTitle', title: 'Title', type: 'string', group: 'hero', initialValue: 'Ranked, accredited, and verifiable — proof you can show a recruiter.'},
    {name: 'heroTitleHighlight', title: 'Title highlight word(s)', description: 'The part shown in a lighter/italic style, e.g. "proof you can show a recruiter."', type: 'string', group: 'hero', initialValue: 'proof you can show a recruiter.'},
    {name: 'heroDescription', title: 'Description', type: 'text', rows: 3, group: 'hero'},
    {name: 'heroImage', title: 'Hero image', type: 'image', options: {hotspot: true}, group: 'hero'},
    {name: 'heroPrimaryCtaLabel', title: 'Primary CTA label', type: 'string', group: 'hero', initialValue: 'Download the NIRF report (PDF)'},
    {name: 'heroPrimaryCtaUrl', title: 'Primary CTA URL', type: 'string', group: 'hero'},
    {name: 'heroSecondaryCtaLabel', title: 'Secondary CTA label', type: 'string', group: 'hero', initialValue: 'See all accreditations'},
    {name: 'heroSecondaryCtaUrl', title: 'Secondary CTA URL', type: 'string', group: 'hero', initialValue: '#accreditations'},

    // Stats
    {
      name: 'stats',
      title: 'Stat chips',
      description: 'e.g. IIRF National #25, 40+ Years, Latest FPSB Award 2025, 2024 Homi Bhabha SU Approval',
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

    // National Rankings intro (cards are their own document type)
    {name: 'frameworksEyebrow', title: 'Eyebrow', type: 'string', group: 'frameworks', initialValue: 'National Rankings'},
    {name: 'frameworksTitle', title: 'Title', type: 'string', group: 'frameworks', initialValue: 'Where we stand'},
    {name: 'frameworksTitleHighlight', title: 'Title highlight word(s)', description: 'e.g. "stand"', type: 'string', group: 'frameworks', initialValue: 'stand'},
    {name: 'frameworksSubtitle', title: 'Subtitle', type: 'string', group: 'frameworks', initialValue: "Year-on-year position across India's most respected ranking frameworks."},

    // Recent Honours intro
    {name: 'honoursEyebrow', title: 'Eyebrow', type: 'string', group: 'honours', initialValue: 'Awards & Recognition'},
    {name: 'honoursTitle', title: 'Title', type: 'string', group: 'honours', initialValue: 'Recent honours'},
    {name: 'honoursTitleHighlight', title: 'Title highlight word(s)', description: 'e.g. "honours"', type: 'string', group: 'honours', initialValue: 'honours'},
    {name: 'honoursSubtitle', title: 'Subtitle', type: 'string', group: 'honours', initialValue: 'Independent recognition from industry bodies and government.'},

    // Accreditations intro
    {name: 'accreditationsEyebrow', title: 'Eyebrow', type: 'string', group: 'accreditations', initialValue: 'Accreditations'},
    {name: 'accreditationsTitle', title: 'Title', type: 'string', group: 'accreditations', initialValue: 'Officially recognised.'},
    {name: 'accreditationsTitleHighlight', title: 'Title highlight word(s)', description: 'e.g. "recognised."', type: 'string', group: 'accreditations', initialValue: 'recognised.'},
    {name: 'accreditationsSubtitle', title: 'Subtitle', type: 'string', group: 'accreditations', initialValue: 'Approvals, accreditations, and compliance standards.'},

    // Verification & Documents
    {name: 'verifyEyebrow', title: 'Eyebrow', type: 'string', group: 'verify', initialValue: 'Verification & Documents'},
    {name: 'verifyTitle', title: 'Title', type: 'string', group: 'verify', initialValue: 'Download every ranking PDF'},
    {name: 'verifySubtitle', title: 'Subtitle', type: 'string', group: 'verify', initialValue: 'Public access to NIRF data sheets, accreditation certificates, and award citations.'},
  ],
  preview: {
    prepare() {
      return {title: 'Rankings Page'}
    },
  },
}
