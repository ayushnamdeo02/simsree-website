export default {
  name: 'tedxPage',
  title: 'TEDxSIMSREE Page',
  type: 'document',
  groups: [
    {name: 'hero', title: 'Hero'},
    {name: 'strip', title: 'Fact Strip'},
    {name: 'what', title: 'What We Do'},
    {name: 'editions', title: 'Editions Intro'},
    {name: 'reach', title: 'Our Impact'},
    {name: 'themes', title: 'Themes Intro'},
    {name: 'talks', title: 'Talks Intro'},
    {name: 'involved', title: 'Get Involved'},
    {name: 'history', title: 'History Intro'},
    {name: 'licence', title: 'Licence Panel'},
    {name: 'cta', title: 'Closing CTA'},
  ],
  fields: [
    // Hero
    {name: 'heroEyebrow', title: 'Eyebrow', type: 'string', group: 'hero', initialValue: 'TEDxSIMSREE'},
    {name: 'heroTitle', title: 'Title', type: 'string', group: 'hero', initialValue: 'Ideas worth spreading.'},
    {name: 'heroTitleItalic', title: 'Italic portion of title', type: 'string', group: 'hero', initialValue: 'spreading.'},
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

    // Navy fact strip
    {
      name: 'factStrip',
      title: 'Fact strip items',
      description: 'The navy row under the hero',
      type: 'array',
      group: 'strip',
      of: [{type: 'string'}],
    },

    // What we do
    {name: 'whatEyebrow', title: 'Eyebrow', type: 'string', group: 'what', initialValue: 'What We Do'},
    {name: 'whatTitle', title: 'Title', type: 'string', group: 'what', initialValue: 'Three things, done seriously.'},
    {name: 'whatTitleHighlight', title: 'Title highlight word(s)', type: 'string', group: 'what'},
    {
      name: 'whatCards',
      title: 'Cards',
      type: 'array',
      group: 'what',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'title', title: 'Title', type: 'string'},
            {name: 'description', title: 'Description', type: 'text', rows: 3},
            {name: 'image', title: 'Image', type: 'image', options: {hotspot: true}},
            {name: 'linkLabel', title: 'Link label', type: 'string'},
            {name: 'linkUrl', title: 'Link URL', type: 'string'},
          ],
          preview: {select: {title: 'title', subtitle: 'description', media: 'image'}},
        },
      ],
    },

    // Editions
    {name: 'editionsEyebrow', title: 'Eyebrow', type: 'string', group: 'editions', initialValue: 'Programme Spotlight'},
    {name: 'editionsTitle', title: 'Title', description: 'The count is prefixed automatically', type: 'string', group: 'editions', initialValue: 'editions · seven conversations.'},
    {name: 'editionsTitleHighlight', title: 'Title highlight word(s)', type: 'string', group: 'editions'},
    {name: 'editionsSubtitle', title: 'Subtitle', type: 'text', rows: 2, group: 'editions'},
    {name: 'editionsCtaLabel', title: 'CTA label', type: 'string', group: 'editions', initialValue: 'Browse all 42 talks'},
    {name: 'editionsCtaUrl', title: 'CTA URL', type: 'string', group: 'editions'},

    // Reach
    {name: 'reachEyebrow', title: 'Eyebrow', type: 'string', group: 'reach', initialValue: 'Our Impact'},
    {name: 'reachTitle', title: 'Title', type: 'string', group: 'reach', initialValue: 'Small room. Long shadow.'},
    {name: 'reachSubtitle', title: 'Subtitle', type: 'text', rows: 2, group: 'reach'},
    {
      name: 'reachStats',
      title: 'Stats',
      type: 'array',
      group: 'reach',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'value', title: 'Value', type: 'string'},
            {name: 'label', title: 'Label', type: 'string'},
            {name: 'note', title: 'Note', type: 'string'},
          ],
          preview: {select: {title: 'value', subtitle: 'label'}},
        },
      ],
    },

    // Themes
    {name: 'themesEyebrow', title: 'Eyebrow', type: 'string', group: 'themes', initialValue: 'Programme Spotlight'},
    {name: 'themesTitle', title: 'Title', type: 'string', group: 'themes', initialValue: 'Ideas change three things at a time.'},
    {name: 'themesTitleHighlight', title: 'Title highlight word(s)', type: 'string', group: 'themes'},
    {
      name: 'themeCards',
      title: 'Theme cards',
      type: 'array',
      group: 'themes',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'badge', title: 'Badge', type: 'string'},
            {name: 'title', title: 'Title', type: 'string'},
            {name: 'description', title: 'Description', type: 'text', rows: 3},
            {name: 'image', title: 'Image', type: 'image', options: {hotspot: true}},
            {name: 'meta', title: 'Meta line', type: 'string'},
            {name: 'linkLabel', title: 'Link label', type: 'string'},
            {name: 'linkUrl', title: 'Link URL', type: 'string'},
          ],
          preview: {select: {title: 'title', subtitle: 'badge', media: 'image'}},
        },
      ],
    },

    // Talks
    {name: 'talksEyebrow', title: 'Eyebrow', type: 'string', group: 'talks', initialValue: 'The Talks'},
    {name: 'talksTitle', title: 'Title', description: 'The count is prefixed automatically', type: 'string', group: 'talks', initialValue: 'talks worth your afternoon.'},
    {name: 'talksTitleHighlight', title: 'Title highlight word(s)', type: 'string', group: 'talks'},
    {name: 'talksSubtitle', title: 'Subtitle', type: 'string', group: 'talks', initialValue: 'A curated start. The full library lives on YouTube @TEDxSIMSREE.'},

    // Get involved
    {name: 'involvedEyebrow', title: 'Eyebrow', type: 'string', group: 'involved', initialValue: 'Get Involved'},
    {name: 'involvedTitle', title: 'Title', type: 'string', group: 'involved', initialValue: 'Three ways to be part of this.'},
    {name: 'involvedTitleHighlight', title: 'Title highlight word(s)', type: 'string', group: 'involved'},
    {
      name: 'involvedCards',
      title: 'Cards',
      type: 'array',
      group: 'involved',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'title', title: 'Title', type: 'string'},
            {name: 'description', title: 'Description', type: 'text', rows: 3},
            {name: 'linkLabel', title: 'Link label', type: 'string'},
            {name: 'linkUrl', title: 'Link URL', type: 'string'},
          ],
          preview: {select: {title: 'title', subtitle: 'description'}},
        },
      ],
    },

    // History
    {name: 'historyEyebrow', title: 'Eyebrow', type: 'string', group: 'history', initialValue: 'History'},
    {name: 'historyTitle', title: 'Title', type: 'string', group: 'history', initialValue: 'From a hostel room in 2016 to the auditorium today.'},
    {name: 'historyTitleBreakAfter', title: 'Line break after', type: 'string', group: 'history', initialValue: '2016'},

    // Licence
    {name: 'licenceEyebrow', title: 'Eyebrow', type: 'string', group: 'licence', initialValue: 'Who We Are'},
    {name: 'licenceTitle', title: 'Title', type: 'string', group: 'licence', initialValue: 'A student-run TEDx, independently organized, in Mumbai.'},
    {name: 'licenceTitleHighlight', title: 'Title highlight word(s)', type: 'string', group: 'licence', initialValue: 'independently organized,'},
    {name: 'licenceBody', title: 'Body', type: 'text', rows: 5, group: 'licence'},
    {name: 'licenceImage', title: 'Image', type: 'image', options: {hotspot: true}, group: 'licence'},
    {
      name: 'licenceRows',
      title: 'Licence detail rows',
      type: 'array',
      group: 'licence',
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

    // CTA
    {name: 'ctaEyebrow', title: 'Eyebrow', type: 'string', group: 'cta', initialValue: 'Stay Looped'},
    {name: 'ctaTitle', title: 'Title', type: 'string', group: 'cta', initialValue: 'An idea found you? Bring it back.'},
    {name: 'ctaTitleHighlight', title: 'Title highlight word(s)', type: 'string', group: 'cta', initialValue: 'Bring it back.'},
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
  preview: {prepare() { return {title: 'TEDxSIMSREE Page'} }},
}
