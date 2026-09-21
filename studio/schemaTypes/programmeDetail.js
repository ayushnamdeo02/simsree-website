export default {
  name: 'programmeDetail',
  title: 'Academics — Programme Detail Page',
  type: 'document',
  description:
    'One per programme detail page (MMS, M.Sc. Finance, MFM, MMM, PhD). The slug decides the URL.',
  groups: [
    {name: 'hero', title: 'Hero'},
    {name: 'stats', title: 'Stats'},
    {name: 'overview', title: 'Overview'},
    {name: 'specialisations', title: 'Specialisations'},
    {name: 'curriculum', title: 'Curriculum'},
    {name: 'eligibility', title: 'Eligibility'},
    {name: 'outcomes', title: 'Placement & Outcomes'},
    {name: 'voice', title: 'Student Voice'},
    {name: 'cta', title: 'Apply CTA'},
  ],
  fields: [
    {
      name: 'slug',
      title: 'URL slug',
      description: 'Decides the page URL, e.g. "mms" becomes /academics/mms',
      type: 'slug',
      options: {source: 'shortName', maxLength: 40},
      group: 'hero',
      validation: (Rule) => Rule.required(),
    },
    {name: 'shortName', title: 'Short name', description: 'e.g. "MMS" — used in the breadcrumb', type: 'string', group: 'hero', validation: (Rule) => Rule.required()},

    // Hero
    {name: 'heroBadge', title: 'Badge line', description: 'e.g. "Full-time · 2 years · 120 seats · 2 years"', type: 'string', group: 'hero'},
    {name: 'heroTitle', title: 'Title', type: 'string', group: 'hero', validation: (Rule) => Rule.required()},
    {name: 'heroSubtitle', title: 'Subtitle under the title', type: 'string', group: 'hero'},
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

    // Overview
    {name: 'overviewTitle', title: 'Title', type: 'string', group: 'overview', initialValue: 'Two years that make you management-ready.'},
    {name: 'overviewTitleHighlight', title: 'Title highlight word(s)', type: 'string', group: 'overview'},
    {name: 'overviewTitleBreakAfter', title: 'Line break after', description: 'Optional — text after this substring starts a new line', type: 'string', group: 'overview'},
    {name: 'overviewSubtitle', title: 'Subtitle', type: 'string', group: 'overview'},
    {name: 'glanceTitle', title: 'At-a-glance panel title', type: 'string', group: 'overview', initialValue: 'Programme at a glance'},
    {
      name: 'glanceRows',
      title: 'At-a-glance rows',
      type: 'array',
      group: 'overview',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'label', title: 'Label', description: 'e.g. "Duration"', type: 'string'},
            {name: 'value', title: 'Value', type: 'string'},
          ],
          preview: {select: {title: 'label', subtitle: 'value'}},
        },
      ],
    },

    // Specialisations
    {name: 'specialisationsTitle', title: 'Title', type: 'string', group: 'specialisations', initialValue: 'Specialise where you want to work.'},
    {name: 'specialisationsTitleHighlight', title: 'Title highlight word(s)', type: 'string', group: 'specialisations', initialValue: 'Specialise'},
    {name: 'specialisationsSubtitle', title: 'Subtitle', type: 'string', group: 'specialisations'},
    {
      name: 'specialisations',
      title: 'Specialisations',
      description: 'Leave empty to hide this section (e.g. for PhD)',
      type: 'array',
      group: 'specialisations',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'title', title: 'Title', type: 'string'},
            {name: 'description', title: 'Description', type: 'text', rows: 2},
          ],
          preview: {select: {title: 'title', subtitle: 'description'}},
        },
      ],
    },

    // Curriculum
    {name: 'curriculumTitle', title: 'Title', type: 'string', group: 'curriculum', initialValue: 'What you’ll learn.'},
    {name: 'curriculumTitleHighlight', title: 'Title highlight word(s)', type: 'string', group: 'curriculum', initialValue: 'learn.'},
    {name: 'curriculumSubtitle', title: 'Subtitle', type: 'text', rows: 2, group: 'curriculum'},
    {
      name: 'curriculum',
      title: 'Curriculum sections',
      description: 'Each becomes an expandable row. The first is open by default.',
      type: 'array',
      group: 'curriculum',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'title', title: 'Title', description: 'e.g. "Semester 1 · Foundations"', type: 'string', validation: (Rule) => Rule.required()},
            {name: 'body', title: 'Body', type: 'text', rows: 4},
          ],
          preview: {select: {title: 'title', subtitle: 'body'}},
        },
      ],
    },

    {
      name: 'curriculumCallout',
      title: 'Callout under the curriculum',
      description:
        'Optional navy panel below the curriculum, e.g. a certification partnership. Leave the title empty to hide it.',
      type: 'object',
      group: 'curriculum',
      fields: [
        {name: 'title', title: 'Title', type: 'string'},
        {name: 'description', title: 'Description', type: 'text', rows: 4},
      ],
    },

    // Eligibility
    {name: 'eligibilityTitle', title: 'Title', type: 'string', group: 'eligibility', initialValue: 'Who can apply.'},
    {name: 'eligibilityTitleHighlight', title: 'Title highlight word(s)', type: 'string', group: 'eligibility', initialValue: 'apply.'},
    {
      name: 'eligibilityCards',
      title: 'Cards',
      type: 'array',
      group: 'eligibility',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'title', title: 'Title', type: 'string'},
            {name: 'description', title: 'Description', type: 'text', rows: 4},
          ],
          preview: {select: {title: 'title', subtitle: 'description'}},
        },
      ],
      validation: (Rule) => Rule.max(2),
    },
    {name: 'eligibilityCtaLabel', title: 'CTA label', type: 'string', group: 'eligibility', initialValue: 'Start your application · see dates'},
    {name: 'eligibilityCtaUrl', title: 'CTA URL', type: 'string', group: 'eligibility', initialValue: '/admissions'},

    // Outcomes
    {name: 'outcomesTitle', title: 'Title', type: 'string', group: 'outcomes', initialValue: 'Where MMS graduates land.'},
    {name: 'outcomesTitleHighlight', title: 'Title highlight word(s)', type: 'string', group: 'outcomes'},
    {name: 'snapshotTitle', title: 'Snapshot panel title', description: 'Name THIS programme’s own cohort, e.g. "Snapshot · MMS 2023-25". Never show another programme’s placement data here. Leave empty to hide the panel.', type: 'string', group: 'outcomes'},
    {
      name: 'snapshotPoints',
      title: 'Snapshot bullet points',
      description:
        'This programme’s own outcomes. Executive and doctoral programmes should not carry full-time MMS placement figures.',
      type: 'array',
      group: 'outcomes',
      of: [{type: 'string'}],
    },
    {name: 'snapshotCtaLabel', title: 'Snapshot CTA label', type: 'string', group: 'outcomes', initialValue: 'See the full placement report'},
    {name: 'snapshotCtaUrl', title: 'Snapshot CTA URL', type: 'string', group: 'outcomes', initialValue: '/placements/reports'},
    {name: 'recruitersTitle', title: 'Recruiters panel title', type: 'string', group: 'outcomes', initialValue: 'Top recruiters'},
    {
      name: 'recruiters',
      title: 'Recruiter names',
      description: 'Shown as chips. Leave empty to hide the panel.',
      type: 'array',
      group: 'outcomes',
      of: [{type: 'string'}],
    },
    {name: 'recruitersCtaLabel', title: 'Recruiters CTA label', type: 'string', group: 'outcomes', initialValue: 'See all 120+ recruiters'},
    {name: 'recruitersCtaUrl', title: 'Recruiters CTA URL', type: 'string', group: 'outcomes', initialValue: '/placements/partners'},

    // Student voice
    {name: 'voiceQuote', title: 'Quote', type: 'text', rows: 3, group: 'voice'},
    {name: 'voiceName', title: 'Name', type: 'string', group: 'voice'},
    {name: 'voiceMeta', title: 'Meta line', description: 'e.g. "MMS · Batch 2022-24 · Chairperson, Placement Committee"', type: 'string', group: 'voice'},
    {name: 'voicePhoto', title: 'Photo', type: 'image', options: {hotspot: true}, group: 'voice'},

    // CTA
    {name: 'ctaEyebrow', title: 'Eyebrow', type: 'string', group: 'cta', initialValue: 'Ready to Apply?'},
    {name: 'ctaTitle', title: 'Title', type: 'string', group: 'cta', initialValue: 'AY 2026-27 cycle is open.'},
    {name: 'ctaTitleHighlight', title: 'Title highlight word(s)', type: 'string', group: 'cta', initialValue: 'cycle is open.'},
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
  preview: {select: {title: 'heroTitle', subtitle: 'shortName', media: 'heroImage'}},
}
