// Development Programmes page — the Naval Dockyard MDP story, top to bottom.
const button = {
  type: 'object',
  fields: [
    {name: 'label', title: 'Label', type: 'string'},
    {name: 'url', title: 'URL', type: 'string'},
    {name: 'primary', title: 'Primary (filled) style?', type: 'boolean', initialValue: false},
  ],
  preview: {select: {title: 'label', subtitle: 'url'}},
}

const photo = {
  type: 'image',
  options: {hotspot: true},
  fields: [{name: 'alt', title: 'Alt text', type: 'string'}],
}

const titleFields = (group, defaults = {}) => [
  {name: `${group}Eyebrow`, title: 'Eyebrow', type: 'string', group, initialValue: defaults.eyebrow},
  {name: `${group}Title`, title: 'Title', type: 'string', group},
  {name: `${group}TitleHighlight`, title: 'Title highlight word(s)', description: 'Shown in Eastern Blue', type: 'string', group},
]

export default {
  name: 'devProgrammesPage',
  title: 'Development Programmes Page',
  type: 'document',
  groups: [
    {name: 'hero', title: 'Hero'},
    {name: 'facts', title: 'Key Facts'},
    {name: 'overview', title: '01 Overview'},
    {name: 'curriculum', title: '02 Curriculum'},
    {name: 'experiential', title: 'Experiential Learning'},
    {name: 'culmination', title: '04 Culmination'},
    {name: 'pictures', title: 'Programme in Pictures'},
    {name: 'people', title: '05 People'},
    {name: 'cta', title: '06 Reflection & CTA'},
  ],
  fields: [
    // Hero
    {name: 'heroEyebrow', title: 'Eyebrow', type: 'string', group: 'hero', initialValue: 'For Working Professionals'},
    {name: 'heroTitle', title: 'Title', type: 'string', group: 'hero', initialValue: 'Development Programmes.'},
    {name: 'heroTitleItalic', title: 'Italic portion of title', type: 'string', group: 'hero', initialValue: 'Programmes.'},
    {name: 'heroDescription', title: 'Description', type: 'text', rows: 3, group: 'hero'},
    {name: 'heroImage', title: 'Hero image', type: 'image', options: {hotspot: true}, group: 'hero'},
    {name: 'heroButtons', title: 'Buttons', type: 'array', group: 'hero', of: [button]},

    // Key facts
    {
      name: 'facts',
      title: 'Key facts',
      description: 'The four cards under the hero',
      type: 'array',
      group: 'facts',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'value', title: 'Value', description: 'e.g. "10 Days"', type: 'string'},
            {name: 'label', title: 'Label', description: 'e.g. "Programme duration"', type: 'string'},
          ],
          preview: {select: {title: 'value', subtitle: 'label'}},
        },
      ],
    },

    // 01 Overview
    ...titleFields('overview'),
    {name: 'overviewBody', title: 'Body', description: 'Leave a blank line between paragraphs.', type: 'text', rows: 10, group: 'overview'},
    {name: 'overviewImage', title: 'Photo', ...photo, group: 'overview'},
    {name: 'overviewQuote', title: 'Quote bar', type: 'string', group: 'overview'},
    {name: 'overviewQuoteSource', title: 'Quote source', type: 'string', group: 'overview'},

    // 02 Curriculum
    ...titleFields('curriculum'),
    {name: 'curriculumIntro', title: 'Intro (right of the title)', type: 'text', rows: 3, group: 'curriculum'},
    {
      name: 'pillars',
      title: 'Pillars',
      description: 'Numbered 01, 02… automatically in this order',
      type: 'array',
      group: 'curriculum',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'title', title: 'Title', type: 'string'},
            {name: 'description', title: 'Description', type: 'text', rows: 2},
            {name: 'methods', title: 'Methods line', description: 'e.g. "Interactive lectures · Strategic diagnostics"', type: 'string'},
          ],
          preview: {select: {title: 'title', subtitle: 'methods'}},
        },
      ],
    },

    // Experiential learning
    ...titleFields('experiential'),
    {name: 'experientialBody', title: 'Body', description: 'Leave a blank line between paragraphs.', type: 'text', rows: 8, group: 'experiential'},
    {name: 'experientialImage', title: 'Photo', ...photo, group: 'experiential'},
    {name: 'experientialTags', title: 'Tags', type: 'array', of: [{type: 'string'}], group: 'experiential'},

    // 04 Culmination
    ...titleFields('culmination'),
    {name: 'culminationSubtitle', title: 'Subtitle', type: 'text', rows: 2, group: 'culmination'},
    {
      name: 'milestones',
      title: 'Rows',
      type: 'array',
      group: 'culmination',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'label', title: 'Label', description: 'e.g. "01 / Recognition"', type: 'string'},
            {name: 'title', title: 'Title', type: 'string'},
            {name: 'description', title: 'Description', type: 'text', rows: 2},
          ],
          preview: {select: {title: 'title', subtitle: 'label'}},
        },
      ],
    },
    {
      name: 'gallery',
      title: 'Photo mosaic',
      description: 'Five photos: the first is the large one on the left.',
      type: 'array',
      group: 'culmination',
      of: [photo],
      options: {layout: 'grid'},
    },

    // Programme in pictures
    ...titleFields('pictures'),
    {name: 'picturesSubtitle', title: 'Subtitle', type: 'text', rows: 2, group: 'pictures'},
    {name: 'pictures', title: 'Photos', description: 'Three photos in a row', type: 'array', group: 'pictures', of: [photo], options: {layout: 'grid'}},

    // 05 People
    ...titleFields('people'),
    {name: 'peopleSubtitle', title: 'Subtitle', type: 'text', rows: 2, group: 'people'},
    {
      name: 'peopleRows',
      title: 'Rows',
      type: 'array',
      group: 'people',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'heading', title: 'Heading', type: 'string'},
            {
              name: 'entries',
              title: 'Entries',
              description: 'Each entry is one paragraph: the bold lead (e.g. a name) followed by the rest.',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {name: 'lead', title: 'Bold lead', type: 'string'},
                    {name: 'text', title: 'Rest of the paragraph', type: 'text', rows: 3},
                  ],
                  preview: {select: {title: 'lead', subtitle: 'text'}},
                },
              ],
            },
          ],
          preview: {select: {title: 'heading'}},
        },
      ],
    },

    // 06 Reflection & CTA
    ...titleFields('cta'),
    {name: 'ctaBody', title: 'Body', description: 'Leave a blank line between paragraphs.', type: 'text', rows: 8, group: 'cta'},
    {name: 'ctaButtonLabel', title: 'Button label', type: 'string', group: 'cta'},
    {name: 'ctaButtonUrl', title: 'Button URL', type: 'string', group: 'cta'},
  ],
  preview: {prepare() { return {title: 'Development Programmes Page'} }},
}
