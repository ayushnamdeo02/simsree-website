export default {
  name: 'programme',
  title: 'Academics - Programme',
  type: 'document',
  description:
    'One per programme. Feeds the tier cards and the comparison table, so both always agree.',
  groups: [
    {name: 'card', title: 'Card'},
    {name: 'table', title: 'Comparison Table'},
    {name: 'admissions', title: 'Admissions'},
  ],
  fields: [
    {name: 'name', title: 'Programme name', description: 'e.g. "Masters of Management Studies"', type: 'string', group: 'card', validation: (Rule) => Rule.required()},
    {name: 'shortName', title: 'Short name', description: 'Used in the comparison table, e.g. "MMS"', type: 'string', group: 'table', validation: (Rule) => Rule.required()},
    {
      name: 'tier',
      title: 'Tier',
      description: 'Which section of the page this card appears in',
      type: 'string',
      options: {
        list: [
          {title: 'Full-time', value: 'fullTime'},
          {title: 'Executive', value: 'executive'},
          {title: 'Doctoral', value: 'doctoral'},
        ],
      },
      group: 'card',
      validation: (Rule) => Rule.required(),
    },
    {name: 'image', title: 'Card image', type: 'image', options: {hotspot: true}, group: 'card'},
    {name: 'badge', title: 'Badge line', description: 'The small pill above the name, e.g. "Full-time · 2 years · 120 seats"', type: 'string', group: 'card'},
    {name: 'description', title: 'Description', type: 'text', rows: 4, group: 'card'},
    {
      name: 'points',
      title: 'Bullet points',
      type: 'array',
      of: [{type: 'string'}],
      group: 'card',
    },
    {name: 'primaryCtaLabel', title: 'Primary CTA label', type: 'string', group: 'card'},
    {name: 'primaryCtaUrl', title: 'Primary CTA URL', type: 'string', group: 'card'},
    {name: 'secondaryCtaLabel', title: 'Secondary CTA label', type: 'string', group: 'card'},
    {name: 'secondaryCtaUrl', title: 'Secondary CTA URL', type: 'string', group: 'card'},

    // Comparison table row
    {name: 'duration', title: 'Duration', description: 'e.g. "2 years"', type: 'string', group: 'table'},
    {name: 'mode', title: 'Mode', description: 'e.g. "Full-time on-campus"', type: 'string', group: 'table'},
    {name: 'seats', title: 'Seats', type: 'string', group: 'table'},
    {name: 'fees', title: 'Fees', description: 'e.g. "~₹6.5L"', type: 'string', group: 'table'},
    {name: 'admissionVia', title: 'Admission via', type: 'string', group: 'table'},

    // Admissions page — the eligibility table, key dates and admission card all
    // read from here, so admissions data cannot drift from the programme pages.
    {name: 'admissionCardEyebrow', title: 'Admission card eyebrow', description: 'e.g. "Maharashtra CET"', type: 'string', group: 'admissions'},
    {name: 'admissionCardTitle', title: 'Admission card title', description: 'e.g. "MMS Admissions"', type: 'string', group: 'admissions'},
    {name: 'admissionCardSummary', title: 'Admission card summary', type: 'text', rows: 3, group: 'admissions'},
    {name: 'admissionCardImage', title: 'Admission card image', type: 'image', options: {hotspot: true}, group: 'admissions'},
    {name: 'admissionGuideUrl', title: 'Guide URL', description: 'Where "Open guide" links to', type: 'string', group: 'admissions'},
    {name: 'eligibility', title: 'Eligibility', description: 'Eligibility column in the comparison table', type: 'text', rows: 2, group: 'admissions'},
    {name: 'entranceSelection', title: 'Entrance / selection', type: 'string', group: 'admissions'},
    {name: 'workExNeeded', title: 'Work-ex needed', type: 'string', group: 'admissions'},
    {name: 'keyDatesLabel', title: 'Key dates card label', description: 'Small label above the name, e.g. "Full-time". Leave empty to omit this programme from the key dates row.', type: 'string', group: 'admissions'},
    {name: 'keyDatesName', title: 'Key dates card name', description: 'Defaults to the short name; set to combine programmes, e.g. "MFM / MMM"', type: 'string', group: 'admissions'},
    {
      name: 'keyDates',
      title: 'Key dates',
      type: 'array',
      group: 'admissions',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'label', title: 'Label', description: 'e.g. "Notification"', type: 'string'},
            {name: 'value', title: 'Value', description: 'e.g. "Apr 2026"', type: 'string'},
          ],
          preview: {select: {title: 'label', subtitle: 'value'}},
        },
      ],
    },

    {name: 'order', title: 'Display order', type: 'number', validation: (Rule) => Rule.required()},
  ],
  orderings: [{title: 'Display order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'name', subtitle: 'badge', media: 'image'}},
}
