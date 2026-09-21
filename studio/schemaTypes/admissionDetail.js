export default {
  name: 'admissionDetail',
  title: 'Admissions — Admission Guide Page',
  type: 'document',
  description:
    'One per admission guide (MMS, M.Sc. Finance, MFM, MMM, PhD). The slug decides the URL, e.g. "mms" becomes /admissions/mms.',
  groups: [
    {name: 'hero', title: 'Hero'},
    {name: 'stats', title: 'Stat Cards'},
    {name: 'dates', title: 'Key Dates'},
    {name: 'eligibility', title: 'Eligibility'},
    {name: 'process', title: 'Admission Process'},
    {name: 'fees', title: 'Fees'},
    {name: 'documents', title: 'Documents'},
    {name: 'faq', title: 'FAQ'},
    {name: 'cta', title: 'Closing CTA'},
  ],
  fields: [
    {
      name: 'slug',
      title: 'URL slug',
      description: 'Decides the page URL, e.g. "mms" becomes /admissions/mms',
      type: 'slug',
      options: {source: 'shortName', maxLength: 40},
      group: 'hero',
      validation: (Rule) => Rule.required(),
    },
    {name: 'shortName', title: 'Short name', description: 'e.g. "MMS" — used in the breadcrumb', type: 'string', group: 'hero', validation: (Rule) => Rule.required()},

    // Hero
    {name: 'heroEyebrow', title: 'Eyebrow', description: 'e.g. "MMS · AY 2026-27"', type: 'string', group: 'hero'},
    {name: 'heroTitle', title: 'Title', type: 'string', group: 'hero', validation: (Rule) => Rule.required()},
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

    // Stat cards
    {
      name: 'stats',
      title: 'Stat cards',
      description: 'The four bordered cards under the hero',
      type: 'array',
      group: 'stats',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'label', title: 'Label', description: 'e.g. "Cycle"', type: 'string'},
            {name: 'value', title: 'Value', description: 'e.g. "AY 2026-27"', type: 'string'},
            {name: 'note', title: 'Note', description: 'Small line under the value', type: 'string'},
          ],
          preview: {select: {title: 'value', subtitle: 'note'}},
        },
      ],
    },

    // Steps band — optional navy strip of icon cards under the stats
    {name: 'stepsBandTitle', title: 'Steps band title', description: 'Optional navy band under the stat cards, e.g. "Steps for Admission". Leave empty to hide it.', type: 'string', group: 'stats'},
    {name: 'stepsBandSubtitle', title: 'Steps band subtitle', type: 'string', group: 'stats'},
    {
      name: 'stepsBand',
      title: 'Steps band cards',
      type: 'array',
      group: 'stats',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'title', title: 'Title', description: 'e.g. "Online Application"', type: 'string'},
            {name: 'note', title: 'Note', type: 'string'},
            {
              name: 'icon',
              title: 'Icon',
              type: 'string',
              options: {list: ['form', 'shortlist', 'assessment', 'final']},
              initialValue: 'form',
            },
          ],
          preview: {select: {title: 'title', subtitle: 'note'}},
        },
      ],
    },

    // Key dates timeline
    {name: 'datesEyebrow', title: 'Eyebrow', type: 'string', group: 'dates', initialValue: 'Key Dates · AY 2026-27'},
    {name: 'datesTitle', title: 'Title', type: 'string', group: 'dates', initialValue: 'When does the MMS cycle run?'},
    {name: 'datesTitleHighlight', title: 'Title highlight word(s)', type: 'string', group: 'dates'},
    {name: 'datesSubtitle', title: 'Subtitle', type: 'text', rows: 2, group: 'dates'},
    {
      name: 'timeline',
      title: 'Timeline steps',
      description: 'Rendered as a numbered horizontal strip on navy',
      type: 'array',
      group: 'dates',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'month', title: 'Month', description: 'e.g. "Apr 2026"', type: 'string'},
            {name: 'label', title: 'Label', description: 'e.g. "Notification"', type: 'string'},
            {name: 'note', title: 'Note', type: 'string'},
            {name: 'highlight', title: 'Highlight this step?', description: 'Shown as the current/final stage', type: 'boolean', initialValue: false},
          ],
          preview: {select: {title: 'label', subtitle: 'month'}},
        },
      ],
    },

    // Eligibility
    {name: 'eligibilityEyebrow', title: 'Eyebrow', type: 'string', group: 'eligibility', initialValue: 'Eligibility'},
    {name: 'eligibilityTitle', title: 'Title', type: 'string', group: 'eligibility', initialValue: 'See if you qualify.'},
    {name: 'eligibilityTitleHighlight', title: 'Title highlight word(s)', type: 'string', group: 'eligibility', initialValue: 'qualify.'},
    {name: 'eligibilitySubtitle', title: 'Subtitle', type: 'text', rows: 2, group: 'eligibility'},
    {
      name: 'eligibilityCards',
      title: 'Eligibility cards',
      type: 'array',
      group: 'eligibility',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'title', title: 'Title', type: 'string'},
            {name: 'description', title: 'Description', type: 'text', rows: 3},
            {name: 'footnote', title: 'Footnote', description: 'Small line at the foot of the card', type: 'string'},
            {name: 'warning', title: 'Warning style?', description: 'Renders on a cream background with an "Important" badge', type: 'boolean', initialValue: false},
          ],
          preview: {select: {title: 'title', subtitle: 'description'}},
        },
      ],
    },

    // Process
    {name: 'processEyebrow', title: 'Eyebrow', type: 'string', group: 'process', initialValue: 'Admission Process'},
    {name: 'processTitle', title: 'Title', type: 'string', group: 'process', initialValue: 'How you are selected.'},
    {name: 'processTitleHighlight', title: 'Title highlight word(s)', type: 'string', group: 'process', initialValue: 'selected.'},
    {name: 'processSubtitle', title: 'Subtitle', type: 'text', rows: 2, group: 'process'},
    {
      name: 'processSteps',
      title: 'Process steps',
      type: 'array',
      group: 'process',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'title', title: 'Title', type: 'string'},
            {name: 'description', title: 'Description', type: 'text', rows: 3},
            {name: 'footnote', title: 'Footnote', description: 'Small caps line under the description', type: 'string'},
            {name: 'complete', title: 'Final step?', description: 'Renders with a tick and a cream background', type: 'boolean', initialValue: false},
          ],
          preview: {select: {title: 'title', subtitle: 'description'}},
        },
      ],
    },

    // Fees
    {name: 'feesEyebrow', title: 'Eyebrow', type: 'string', group: 'fees', initialValue: 'Fees'},
    {name: 'feesTitle', title: 'Title', type: 'string', group: 'fees', initialValue: 'What you will pay.'},
    {name: 'feesTitleHighlight', title: 'Title highlight word(s)', type: 'string', group: 'fees'},
    {name: 'feesSubtitle', title: 'Subtitle', type: 'text', rows: 2, group: 'fees'},
    {name: 'feesTotalLabel', title: 'Total panel label', type: 'string', group: 'fees', initialValue: 'Programme total'},
    {name: 'feesTotalValue', title: 'Total value', description: 'e.g. "~₹4.5L"', type: 'string', group: 'fees'},
    {name: 'feesTotalNote', title: 'Total note', description: 'e.g. "Across 4 semesters · 2 years"', type: 'string', group: 'fees'},
    {
      name: 'feesBreakdown',
      title: 'Total panel rows',
      type: 'array',
      group: 'fees',
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
    {
      name: 'feesPanels',
      title: 'Side panels',
      description: 'Small panels beside the total, e.g. per instalment, scholarships, payment via',
      type: 'array',
      group: 'fees',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'label', title: 'Label', type: 'string'},
            {name: 'value', title: 'Value', type: 'string'},
            {name: 'note', title: 'Note', type: 'string'},
          ],
          preview: {select: {title: 'label', subtitle: 'value'}},
        },
      ],
    },

    {name: 'feesFootnote', title: 'Fees footnote', description: 'Optional note under the fees panels, shown with an info icon', type: 'text', rows: 3, group: 'fees'},
    {name: 'feesFootnoteHighlight', title: 'Highlight the fees footnote?', description: 'Renders it on a cream background for emphasis', type: 'boolean', initialValue: false, group: 'fees'},

    // Documents
    {name: 'documentsEyebrow', title: 'Eyebrow', type: 'string', group: 'documents', initialValue: 'Documents Required'},
    {name: 'documentsTitle', title: 'Title', type: 'string', group: 'documents', initialValue: 'What to bring.'},
    {name: 'documentsTitleHighlight', title: 'Title highlight word(s)', type: 'string', group: 'documents', initialValue: 'bring.'},
    {
      name: 'documentGroups',
      title: 'Document groups',
      type: 'array',
      group: 'documents',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'title', title: 'Group title', type: 'string'},
            {name: 'items', title: 'Items', type: 'array', of: [{type: 'string'}]},
          ],
          preview: {select: {title: 'title'}},
        },
      ],
      validation: (Rule) => Rule.max(2),
    },
    {name: 'documentsCtaLabel', title: 'CTA label', type: 'string', group: 'documents', initialValue: 'Download all forms (PDF)'},
    {name: 'documentsCtaUrl', title: 'CTA URL', type: 'string', group: 'documents', initialValue: '/admissions/downloads'},

    // FAQ
    {name: 'faqEyebrow', title: 'Eyebrow', type: 'string', group: 'faq', initialValue: 'FAQ'},
    {name: 'faqTitle', title: 'Title', type: 'string', group: 'faq', initialValue: 'Your questions, answered.'},
    {name: 'faqTitleHighlight', title: 'Title highlight word(s)', type: 'string', group: 'faq', initialValue: 'answered.'},
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
    {name: 'ctaEyebrow', title: 'Eyebrow', type: 'string', group: 'cta', initialValue: 'Ready?'},
    {name: 'ctaTitle', title: 'Title', type: 'string', group: 'cta', initialValue: 'Start your MMS application.'},
    {name: 'ctaTitleHighlight', title: 'Title highlight word(s)', type: 'string', group: 'cta'},
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
