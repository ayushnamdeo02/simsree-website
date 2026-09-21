export default {
  name: 'admissionsPage',
  title: 'Admissions Page',
  type: 'document',
  groups: [
    {name: 'hero', title: 'Hero'},
    {name: 'alert', title: 'Important Notice'},
    {name: 'programmes', title: 'Programmes Intro'},
    {name: 'eligibility', title: 'Eligibility Table'},
    {name: 'dates', title: 'Key Dates'},
    {name: 'reasons', title: 'Five Reasons'},
    {name: 'faq', title: 'FAQ Intro'},
    {name: 'cta', title: 'Closing CTA'},
  ],
  fields: [
    // Hero
    {name: 'heroEyebrow', title: 'Eyebrow', type: 'string', group: 'hero', initialValue: 'AY 2026-27 · Cycles Open'},
    {name: 'heroTitle', title: 'Title', type: 'string', group: 'hero', initialValue: 'Apply to SIMSREE.'},
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

    // Alert
    {name: 'alertLabel', title: 'Label', type: 'string', group: 'alert', initialValue: 'Important:'},
    {name: 'alertText', title: 'Text', type: 'text', rows: 3, group: 'alert'},

    // Programmes intro
    {name: 'programmesEyebrow', title: 'Eyebrow', type: 'string', group: 'programmes', initialValue: 'All Five Programmes'},
    {name: 'programmesTitle', title: 'Title', type: 'string', group: 'programmes', initialValue: 'Pick your programme.'},
    {name: 'programmesSubtitle', title: 'Subtitle', type: 'string', group: 'programmes', initialValue: 'Open any card for its full admission guide.'},
    {
      name: 'extraCards',
      title: 'Extra cards',
      description: 'Cards shown after the programmes, e.g. "Downloads & Affidavits"',
      type: 'array',
      group: 'programmes',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'eyebrow', title: 'Eyebrow', type: 'string'},
            {name: 'title', title: 'Title', type: 'string'},
            {name: 'summary', title: 'Summary', type: 'text', rows: 3},
            {name: 'image', title: 'Image', type: 'image', options: {hotspot: true}},
            {name: 'url', title: 'URL', type: 'string'},
          ],
          preview: {select: {title: 'title', subtitle: 'eyebrow', media: 'image'}},
        },
      ],
    },

    // Eligibility table
    {name: 'eligibilityEyebrow', title: 'Eyebrow', type: 'string', group: 'eligibility', initialValue: 'Eligibility · Side-by-side'},
    {name: 'eligibilityTitle', title: 'Title', type: 'string', group: 'eligibility', initialValue: 'See where you qualify.'},
    {name: 'eligibilitySubtitle', title: 'Subtitle', type: 'string', group: 'eligibility', initialValue: 'Compare eligibility, admission path, and requirements across all five programmes.'},

    // Key dates
    {name: 'datesEyebrow', title: 'Eyebrow', type: 'string', group: 'dates', initialValue: 'AY 2026-27 · Key Dates'},
    {name: 'datesTitle', title: 'Title', type: 'string', group: 'dates', initialValue: 'When does each cycle run?'},
    {name: 'datesTitleHighlight', title: 'Title highlight word(s)', type: 'string', group: 'dates', initialValue: 'cycle run?'},
    {name: 'datesSubtitle', title: 'Subtitle', type: 'string', group: 'dates', initialValue: 'Tentative dates below — each programme notification PDF has the exact ones.'},

    // Reasons
    {name: 'reasonsEyebrow', title: 'Eyebrow', type: 'string', group: 'reasons', initialValue: 'Why SIMSREE'},
    {name: 'reasonsTitle', title: 'Title', type: 'string', group: 'reasons', initialValue: 'Five reasons you will choose us too.'},
    {name: 'reasonsTitleHighlight', title: 'Title highlight word(s)', type: 'string', group: 'reasons', initialValue: 'choose us too.'},
    {name: 'reasonsSubtitle', title: 'Subtitle', type: 'string', group: 'reasons', initialValue: 'What the notification PDF will not tell you.'},
    {
      name: 'reasons',
      title: 'Reason cards',
      type: 'array',
      group: 'reasons',
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

    // FAQ
    {name: 'faqEyebrow', title: 'Eyebrow', type: 'string', group: 'faq', initialValue: 'Frequently Asked'},
    {name: 'faqTitle', title: 'Title', type: 'string', group: 'faq', initialValue: 'Your admission questions, answered.'},
    {name: 'faqTitleHighlight', title: 'Title highlight word(s)', type: 'string', group: 'faq', initialValue: 'admission'},
    {name: 'faqSubtitle', title: 'Subtitle', type: 'string', group: 'faq', initialValue: 'Find detailed FAQs on each programme guide.'},
    {name: 'faqImage', title: 'Side image', type: 'image', options: {hotspot: true}, group: 'faq'},

    // CTA
    {name: 'ctaEyebrow', title: 'Eyebrow', type: 'string', group: 'cta', initialValue: 'Take the Next Step'},
    {name: 'ctaTitle', title: 'Title', type: 'string', group: 'cta', initialValue: 'Three ways to get going'},
    {name: 'ctaSubtitle', title: 'Subtitle', type: 'text', rows: 2, group: 'cta', initialValue: 'Pick your programme guide · download the brochure · or talk to a current student.'},
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
  preview: {prepare() { return {title: 'Admissions Page'} }},
}
