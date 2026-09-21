export default {
  name: 'reportTab',
  title: 'Reports Hub — Tab',
  type: 'document',
  groups: [
    {name: 'tab', title: 'Tab & Heading'},
    {name: 'file', title: 'Report File'},
    {name: 'panels', title: 'Panels'},
  ],
  fields: [
    // Tab & heading
    {name: 'pillLabel', title: 'Hero pill label', description: 'Short label on the hero buttons, e.g. "Final 2024-25"', type: 'string', group: 'tab', validation: (Rule) => Rule.required()},
    {name: 'tabLabel', title: 'Tab label', description: 'Longer label on the tab row, e.g. "Download the final report · 2024-25"', type: 'string', group: 'tab', validation: (Rule) => Rule.required()},
    {name: 'eyebrow', title: 'Eyebrow', description: 'e.g. "MMS · M.Sc. Finance"', type: 'string', group: 'tab'},
    {name: 'title', title: 'Title', type: 'string', group: 'tab', validation: (Rule) => Rule.required()},
    {name: 'titleHighlight', title: 'Title highlight word(s)', description: 'Rendered in teal', type: 'string', group: 'tab'},
    {name: 'subtitle', title: 'Subtitle', type: 'string', group: 'tab'},

    // Report file banner
    {name: 'fileTitle', title: 'File title', description: 'e.g. "SIMSREE Final Placement Report · 2024-25"', type: 'string', group: 'file'},
    {name: 'fileMeta', title: 'File meta line', description: 'e.g. "42 pages · 4.2 MB · Crisil-audited · PDF"', type: 'string', group: 'file'},
    {name: 'fileCtaLabel', title: 'Download button label', type: 'string', group: 'file', initialValue: 'Download'},
    {name: 'fileUrl', title: 'Download URL', type: 'string', group: 'file'},

    // Panels
    {
      name: 'chartPanel',
      title: 'Chart panel',
      description: 'Labelled bar chart, e.g. "By sector" or "Stipend distribution". Leave empty to hide.',
      type: 'object',
      group: 'panels',
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
                {name: 'label', title: 'Label', type: 'string', validation: (Rule) => Rule.required()},
                {name: 'value', title: 'Percentage', description: 'Number only, e.g. 42 for 42%', type: 'number', validation: (Rule) => Rule.required().min(0).max(100)},
              ],
              preview: {select: {title: 'label', subtitle: 'value'}},
            },
          ],
        },
      ],
    },
    {
      name: 'logoPanel',
      title: 'Logo panel',
      description: 'e.g. "Top recruiters". Sits beside the chart panel. Leave empty to hide.',
      type: 'object',
      group: 'panels',
      fields: [
        {name: 'title', title: 'Panel title', type: 'string'},
        {
          name: 'logos',
          title: 'Logos',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {name: 'name', title: 'Company name', type: 'string', validation: (Rule) => Rule.required()},
                {name: 'logo', title: 'Logo', type: 'image', options: {hotspot: true}},
              ],
              preview: {select: {title: 'name', media: 'logo'}},
            },
          ],
        },
      ],
    },
    {
      name: 'statPanel',
      title: 'Hero-number panel',
      description: 'e.g. "PPO conversion" — a paragraph plus one large figure. Sits beside the chart panel. Leave empty to hide.',
      type: 'object',
      group: 'panels',
      fields: [
        {name: 'title', title: 'Panel title', type: 'string'},
        {name: 'description', title: 'Description', type: 'text', rows: 3},
        {name: 'value', title: 'Hero number', description: 'e.g. "62%"', type: 'string'},
      ],
    },
    {
      name: 'metricCards',
      title: 'Metric cards',
      description: 'Row of small figure + caption cards, used by the Executive tab. Leave empty to hide.',
      type: 'array',
      group: 'panels',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'value', title: 'Value', description: 'e.g. "+38%"', type: 'string', validation: (Rule) => Rule.required()},
            {name: 'label', title: 'Label', type: 'string', validation: (Rule) => Rule.required()},
          ],
          preview: {select: {title: 'value', subtitle: 'label'}},
        },
      ],
    },

    {name: 'archiveTitle', title: 'Archive heading', description: 'e.g. "Archive · Past 4 Years". Leave empty to hide the archive list.', type: 'string', group: 'panels'},
    {
      name: 'archive',
      title: 'Archive entries',
      type: 'array',
      group: 'panels',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'title', title: 'Title', description: 'e.g. "MMS 2023-24 · Avg ₹14.2L · 98%"', type: 'string', validation: (Rule) => Rule.required()},
            {name: 'meta', title: 'Meta line', description: 'e.g. "31 pages · 3.1 MB"', type: 'string'},
            {name: 'fileUrl', title: 'Download URL', type: 'string'},
          ],
          preview: {select: {title: 'title', subtitle: 'meta'}},
        },
      ],
    },

    {name: 'order', title: 'Display order', type: 'number', validation: (Rule) => Rule.required()},
  ],
  orderings: [{title: 'Display order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'pillLabel', subtitle: 'title'}},
}
