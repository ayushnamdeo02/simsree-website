export default {
  name: 'contactRole',
  title: 'Contact - Role Path',
  type: 'document',
  description:
    'One per role in the picker. Each shows its own panel - a form, cards, or both. Empty parts are hidden.',
  groups: [
    {name: 'card', title: 'Picker Card'},
    {name: 'panel', title: 'Panel'},
  ],
  fields: [
    {name: 'name', title: 'Role name', description: 'e.g. "Prospective Student"', type: 'string', group: 'card', validation: (Rule) => Rule.required()},
    {name: 'cardDescription', title: 'Card description', type: 'string', group: 'card'},
    {
      name: 'icon',
      title: 'Icon',
      type: 'string',
      options: {list: ['student', 'recruiter', 'alumnus', 'press', 'vendor']},
      group: 'card',
      initialValue: 'student',
    },
    {name: 'order', title: 'Display order', type: 'number', group: 'card', validation: (Rule) => Rule.required()},

    // Panel
    {name: 'panelEyebrow', title: 'Eyebrow', type: 'string', group: 'panel'},
    {name: 'panelTitle', title: 'Title', type: 'string', group: 'panel'},
    {name: 'panelTitleHighlight', title: 'Title highlight word(s)', type: 'string', group: 'panel'},
    {name: 'panelSubtitle', title: 'Subtitle', type: 'text', rows: 2, group: 'panel'},
    {
      name: 'panelButtons',
      title: 'Buttons',
      type: 'array',
      group: 'panel',
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
    {
      name: 'showForm',
      title: 'Show the enquiry form?',
      description: 'Turn on for roles that should send a message rather than just see contacts',
      type: 'boolean',
      group: 'panel',
      initialValue: false,
    },
    {name: 'formSubmitLabel', title: 'Form submit label', type: 'string', group: 'panel', initialValue: 'Send Message'},
    {name: 'formFootnote', title: 'Form footnote', description: 'Small line under the form', type: 'string', group: 'panel'},
    {
      name: 'cards',
      title: 'Panel cards',
      description: 'The bordered cards under the panel copy',
      type: 'array',
      group: 'panel',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'title', title: 'Title', type: 'string'},
            {name: 'body', title: 'Body', type: 'text', rows: 3},
            {name: 'linkLabel', title: 'Link label', type: 'string'},
            {name: 'linkUrl', title: 'Link URL', type: 'string'},
          ],
          preview: {select: {title: 'title', subtitle: 'body'}},
        },
      ],
    },
    {
      name: 'banner',
      title: 'Contact banner',
      description: 'Optional navy strip under the cards, e.g. the SIMAA office row',
      type: 'object',
      group: 'panel',
      fields: [
        {name: 'title', title: 'Title', type: 'string'},
        {name: 'detail', title: 'Detail line', type: 'string'},
        {name: 'callLabel', title: 'Call button label', type: 'string', initialValue: 'Call'},
        {name: 'callUrl', title: 'Call URL', type: 'string'},
        {name: 'emailLabel', title: 'Email button label', type: 'string', initialValue: 'Email'},
        {name: 'emailUrl', title: 'Email URL', type: 'string'},
      ],
    },
  ],
  orderings: [{title: 'Display order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'name', subtitle: 'cardDescription'}},
}
