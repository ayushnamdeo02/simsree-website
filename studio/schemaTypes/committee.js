export default {
  name: 'committee',
  title: 'Student System - Committee',
  type: 'document',
  description:
    'One per committee. Feeds its card in the directory AND its own detail page at /students/committees/<slug>, so the two can never disagree.',
  groups: [
    {name: 'card', title: 'Directory Card'},
    {name: 'hero', title: 'Detail - Hero'},
    {name: 'about', title: 'Detail - What It Does'},
    {name: 'team', title: 'Detail - Team'},
    {name: 'voice', title: 'Detail - Member Voice'},
    {name: 'join', title: 'Detail - Join CTA'},
  ],
  fields: [
    // Directory card
    {name: 'name', title: 'Name', type: 'string', group: 'card', validation: (Rule) => Rule.required()},
    {name: 'image', title: 'Image', type: 'image', options: {hotspot: true}, group: 'card'},
    {name: 'description', title: 'Description', type: 'text', rows: 2, group: 'card', validation: (Rule) => Rule.required()},
    {
      name: 'category',
      title: 'Category',
      description: 'Used by the directory filter chips',
      type: 'string',
      options: {list: ['Academic', 'Corporate', 'Cultural', 'Social', 'Leadership']},
      group: 'card',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'URL slug',
      description:
        'Gives this committee its own page, e.g. "placement" becomes /students/committees/placement. Leave empty and the card will not link anywhere.',
      type: 'slug',
      options: {source: 'name', maxLength: 60},
      group: 'card',
    },
    {name: 'order', title: 'Display order', type: 'number', group: 'card', validation: (Rule) => Rule.required()},

    // Detail hero
    {name: 'heroEyebrow', title: 'Eyebrow', description: 'e.g. "Corporate · Student-Run Committee"', type: 'string', group: 'hero'},
    {name: 'tagline', title: 'Tagline', description: 'The quoted line under the title', type: 'string', group: 'hero'},
    {name: 'heroImage', title: 'Hero image', type: 'image', options: {hotspot: true}, group: 'hero'},
    {name: 'contactEmail', title: 'Contact email', type: 'string', group: 'hero'},
    {
      name: 'stats',
      title: 'Stat cards',
      type: 'array',
      group: 'hero',
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

    // About
    {name: 'aboutTitle', title: 'Title', description: 'The committee name is highlighted automatically if it appears here', type: 'string', group: 'about'},
    {name: 'aboutBody', title: 'Body', type: 'text', rows: 4, group: 'about'},
    {
      name: 'activities',
      title: 'What it does',
      type: 'array',
      group: 'about',
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
    {name: 'skillsTitle', title: 'Skills panel title', type: 'string', group: 'about', initialValue: 'Skills you build'},
    {name: 'skills', title: 'Skills', description: 'Shown as chips', type: 'array', of: [{type: 'string'}], group: 'about'},
    {name: 'equivalentTitle', title: 'Equivalent panel title', type: 'string', group: 'about', initialValue: 'Real-world equivalent'},
    {name: 'equivalentValue', title: 'Equivalent role', description: 'e.g. "Startup Founder / Venture Analyst"', type: 'string', group: 'about'},

    // Team
    {name: 'teamEyebrow', title: 'Eyebrow', type: 'string', group: 'team', initialValue: 'Spotlight'},
    {name: 'teamTitle', title: 'Title', type: 'string', group: 'team', initialValue: 'What committees actually do.'},
    {name: 'teamTitleHighlight', title: 'Title highlight word(s)', type: 'string', group: 'team', initialValue: 'actually do.'},
    {name: 'teamSubtitle', title: 'Subtitle', type: 'string', group: 'team'},
    {
      name: 'team',
      title: 'Team members',
      type: 'array',
      group: 'team',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'name', title: 'Name', type: 'string', validation: (Rule) => Rule.required()},
            {name: 'role', title: 'Role', type: 'string'},
            {name: 'photo', title: 'Photo', type: 'image', options: {hotspot: true}},
          ],
          preview: {select: {title: 'name', subtitle: 'role', media: 'photo'}},
        },
      ],
    },

    // Member voice
    {name: 'voiceEyebrow', title: 'Eyebrow', type: 'string', group: 'voice', initialValue: 'Member Voice'},
    {name: 'voiceTitle', title: 'Title', type: 'string', group: 'voice', initialValue: 'In their own words'},
    {name: 'voiceTitleHighlight', title: 'Title highlight word(s)', type: 'string', group: 'voice', initialValue: 'own words'},
    {name: 'voiceAttribution', title: 'Attribution', description: 'e.g. "Tanmay Thomare · Chairperson, Placement 2023-25"', type: 'string', group: 'voice'},
    {name: 'voiceQuote', title: 'Quote', type: 'text', rows: 3, group: 'voice'},

    // Join CTA
    {
      name: 'showJoin',
      title: 'Show the Join section',
      description: 'Turn on to show the "Get Involved / Join" block at the bottom of this committee page',
      type: 'boolean',
      group: 'join',
      initialValue: false,
    },
    {name: 'joinEyebrow', title: 'Eyebrow', type: 'string', group: 'join', initialValue: 'Get Involved'},
    {name: 'joinTitle', title: 'Title', description: 'The committee name is highlighted automatically if it appears here', type: 'string', group: 'join'},
    {name: 'joinBody', title: 'Body', type: 'text', rows: 3, group: 'join'},
    {
      name: 'joinButtons',
      title: 'Buttons',
      type: 'array',
      group: 'join',
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
  orderings: [{title: 'Display order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'name', subtitle: 'category', media: 'image'}},
}
