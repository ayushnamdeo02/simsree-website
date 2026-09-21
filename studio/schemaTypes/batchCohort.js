export default {
  name: 'batchCohort',
  title: 'Batch Profile — Cohort',
  type: 'document',
  description:
    'One per batch. The cohort dropdown lists these, so adding next year’s batch needs no code.',
  groups: [
    {name: 'basics', title: 'Basics'},
    {name: 'panels', title: 'Data Panels'},
    {name: 'summary', title: 'Summary Cards'},
  ],
  fields: [
    {name: 'name', title: 'Cohort name', description: 'e.g. "MMS Batch 2024-26"', type: 'string', group: 'basics', validation: (Rule) => Rule.required()},
    {name: 'isCurrent', title: 'Current cohort?', description: 'The one shown by default', type: 'boolean', group: 'basics', initialValue: false},

    {name: 'headline', title: 'Cohort headline', type: 'string', group: 'basics', initialValue: 'A batch built for breadth.'},
    {name: 'headlineHighlight', title: 'Headline highlight word(s)', type: 'string', group: 'basics', initialValue: 'breadth.'},
    {name: 'headlineSubtitle', title: 'Headline subtitle', type: 'text', rows: 2, group: 'basics'},

    // Hero stat cards
    {
      name: 'stats',
      title: 'Stat cards',
      description: 'The four cards beside the cohort headline',
      type: 'array',
      group: 'basics',
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

    // Bar-chart panels
    {
      name: 'panels',
      title: 'Data panels',
      description:
        'Each becomes a labelled bar chart. Percentages within a panel should total 100.',
      type: 'array',
      group: 'panels',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'title', title: 'Panel title', type: 'string', validation: (Rule) => Rule.required()},
            {name: 'dark', title: 'Navy panel?', type: 'boolean', initialValue: false},
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
    },

    // Average-profile panel (label/value, not a chart)
    {name: 'profileTitle', title: 'Average profile panel title', type: 'string', group: 'panels', initialValue: 'Average profile'},
    {
      name: 'profileRows',
      title: 'Average profile rows',
      type: 'array',
      group: 'panels',
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

    // Summary cards under the panels
    {
      name: 'summaryCards',
      title: 'Summary cards',
      description: 'The four cards below the data panels',
      type: 'array',
      group: 'summary',
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

    {name: 'order', title: 'Display order', type: 'number', validation: (Rule) => Rule.required()},
  ],
  orderings: [{title: 'Display order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'name', subtitle: 'headline'}},
}
