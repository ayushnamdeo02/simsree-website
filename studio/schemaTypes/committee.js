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
    {name: 'events', title: 'Detail - Upcoming Events'},
    {name: 'year', title: 'Detail - Year in the Committee'},
    {name: 'team', title: 'Detail - Team'},
    {name: 'voice', title: 'Detail - Member Voice'},
    {name: 'join', title: 'Detail - Join CTA'},
  ],
  fields: [
    // Directory card
    {name: 'name', title: 'Name', type: 'string', group: 'card', validation: (Rule) => Rule.required()},
    {name: 'image', title: 'Image', type: 'image', options: {hotspot: true}, group: 'card'},
    {
      name: 'logo',
      title: 'Logo',
      description: 'Shown on the committee directory card (Student-Driven System). Use a transparent or white-background PNG; when empty, the card shows the image above.',
      type: 'image',
      group: 'card',
    },
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
    {name: 'contactEmail', title: 'Contact email', description: 'Used for the "Email …" hero button', type: 'string', group: 'hero'},
    {
      name: 'showHeroButtons',
      title: 'Show hero buttons',
      description: 'The "Email …" and "All committees" buttons under the hero text',
      type: 'boolean',
      group: 'hero',
      initialValue: false,
    },
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
    {
      name: 'aboutStyle',
      title: 'Layout',
      description: 'List: white section with the activities in one card. Cards: navy section with numbered activity cards.',
      type: 'string',
      group: 'about',
      options: {list: [{title: 'List (white)', value: 'list'}, {title: 'Cards (navy)', value: 'cards'}], layout: 'radio'},
      initialValue: 'list',
    },
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

    // Upcoming events (optional; the section shows once events are added)
    {name: 'eventsEyebrow', title: 'Eyebrow', type: 'string', group: 'events', initialValue: 'Always Something Happening'},
    {name: 'eventsTitle', title: 'Title', description: 'e.g. "Upcoming Placement Events"', type: 'string', group: 'events'},
    {name: 'eventsTitleHighlight', title: 'Title highlight word(s)', type: 'string', group: 'events'},
    {name: 'eventsSubtitle', title: 'Subtitle', type: 'string', group: 'events'},
    {
      name: 'events',
      title: 'Events',
      type: 'array',
      group: 'events',
      of: [
        {
          type: 'object',
          name: 'committeeEvent',
          fields: [
            {name: 'date', title: 'Date', type: 'date', validation: (Rule) => Rule.required()},
            {name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required()},
            {name: 'description', title: 'Description', type: 'string'},
            {name: 'ctaLabel', title: 'Button label', type: 'string', initialValue: 'Register Now'},
            {name: 'ctaUrl', title: 'Button URL', type: 'string'},
          ],
          preview: {select: {title: 'title', subtitle: 'date'}},
        },
      ],
    },
    {name: 'eventsCtaLabel', title: 'Calendar button label', type: 'string', group: 'events', initialValue: 'See the full calendar'},
    {name: 'eventsCtaUrl', title: 'Calendar button URL', type: 'string', group: 'events', initialValue: '/events#calendar'},

    // A year in the committee (optional; shows once entries are added)
    {name: 'yearEyebrow', title: 'Eyebrow', type: 'string', group: 'year', initialValue: 'A Year in the Committee'},
    {name: 'yearTitle', title: 'Title', description: 'e.g. "What we ran in 2025-26"', type: 'string', group: 'year'},
    {name: 'yearTitleHighlight', title: 'Title highlight word(s)', type: 'string', group: 'year'},
    {name: 'yearSubtitle', title: 'Subtitle', type: 'string', group: 'year'},
    {
      name: 'yearItems',
      title: 'Timeline',
      type: 'array',
      group: 'year',
      of: [
        {
          type: 'object',
          name: 'yearItem',
          fields: [
            {name: 'month', title: 'Month', type: 'string', validation: (Rule) => Rule.required()},
            {name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required()},
            {name: 'tag', title: 'Tag', description: 'e.g. "Flagship", "Internal"', type: 'string'},
            {name: 'description', title: 'Description', type: 'string'},
          ],
          preview: {select: {title: 'title', subtitle: 'month'}},
        },
      ],
    },

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
  preview: {select: {title: 'name', subtitle: 'category', media: 'logo'}},
}
