export default {
  name: 'studentsPage',
  title: "Student's Corner Page",
  type: 'document',
  groups: [
    {name: 'hero', title: 'Hero'},
    {name: 'stats', title: 'Stats'},
    {name: 'paths', title: 'Pick a Path'},
    {name: 'explore', title: 'Explore Intro'},
    {name: 'voices', title: 'Voices Intro'},
    {name: 'cta', title: 'Apply CTA'},
  ],
  fields: [
    // Hero
    {name: 'heroEyebrow', title: 'Eyebrow', type: 'string', group: 'hero', initialValue: 'The Student-Driven Institute'},
    {name: 'heroTitle', title: 'Title', type: 'string', group: 'hero', initialValue: "Students don't just attend. They run it."},
    {name: 'heroTitleItalic', title: 'Italic portion of title', type: 'string', group: 'hero', initialValue: 'attend.'},
    {name: 'heroTitleBreakAfter', title: 'Line break after', type: 'string', group: 'hero', initialValue: 'attend.'},
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

    // Pick a path
    {name: 'pathsEyebrow', title: 'Eyebrow', type: 'string', group: 'paths', initialValue: "I'm here as..."},
    {name: 'pathsTitle', title: 'Title', type: 'string', group: 'paths', initialValue: 'Pick a path'},
    {name: 'pathsSubtitle', title: 'Subtitle', type: 'string', group: 'paths', initialValue: 'Pick your role · we surface the page built for you.'},

    // Explore
    {name: 'exploreEyebrow', title: 'Eyebrow', type: 'string', group: 'explore', initialValue: 'Explore'},
    {name: 'exploreTitle', title: 'Title', description: 'The card count is prefixed automatically', type: 'string', group: 'explore', initialValue: 'places to start'},
    {name: 'exploreSubtitle', title: 'Subtitle', type: 'string', group: 'explore', initialValue: 'Every card opens a full page — dive into what matters to you.'},

    // Voices
    {name: 'voicesEyebrow', title: 'Eyebrow', type: 'string', group: 'voices', initialValue: 'Voices'},
    {name: 'voicesTitle', title: 'Title', type: 'string', group: 'voices', initialValue: '"It wasn’t extracurricular. It was the curriculum."'},
    {name: 'voicesTitleHighlight', title: 'Title highlight word(s)', type: 'string', group: 'voices', initialValue: 'curriculum'},
    {name: 'voicesSubtitle', title: 'Subtitle', type: 'string', group: 'voices', initialValue: 'Three current students share what running a SIMSREE committee actually taught them.'},

    // CTA
    {name: 'ctaTitle', title: 'Title', type: 'string', group: 'cta', initialValue: 'Apply to SIMSREE.'},
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
  preview: {prepare() { return {title: "Student's Corner Page"} }},
}
