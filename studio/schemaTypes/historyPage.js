export default {
  name: 'historyPage',
  title: 'History Page',
  type: 'document',
  groups: [
    {name: 'hero', title: 'Hero'},
    {name: 'location', title: 'Location Advantage'},
    {name: 'timeline', title: 'Timeline Intro'},
    {name: 'vision', title: 'Vision & Mission'},
    {name: 'values', title: 'Core Values Intro'},
    {name: 'cta', title: 'Continue Exploring'},
  ],
  fields: [
    // Hero
    {name: 'heroEyebrow', title: 'Eyebrow', type: 'string', group: 'hero', initialValue: 'Established · 1983'},
    {name: 'heroTitle', title: 'Title', type: 'string', group: 'hero', initialValue: 'A legacy built over four decades.'},
    {name: 'heroTitleHighlight', title: 'Title highlight word(s)', description: 'The part of the title shown in a different weight/line, e.g. "over four decades."', type: 'string', group: 'hero', initialValue: 'over four decades.'},
    {name: 'heroDescription', title: 'Description', type: 'text', rows: 4, group: 'hero'},
    {name: 'heroImage', title: 'Hero image', type: 'image', options: {hotspot: true}, group: 'hero'},
    {name: 'heroPrimaryCtaLabel', title: 'Primary CTA label', type: 'string', group: 'hero', initialValue: 'Explore the timeline'},
    {name: 'heroPrimaryCtaUrl', title: 'Primary CTA URL', type: 'string', group: 'hero', initialValue: '#timeline'},
    {name: 'heroSecondaryCtaLabel', title: 'Secondary CTA label', type: 'string', group: 'hero', initialValue: "Read the Director's message"},
    {name: 'heroSecondaryCtaUrl', title: 'Secondary CTA URL', type: 'string', group: 'hero', initialValue: '/about/directors-message'},
    {
      name: 'heroStrip',
      title: 'Hero bottom strip',
      description: 'The thin navy bar of milestones across the bottom of the hero image, e.g. "1983 · Founded", "1990s · Executive Programmes"',
      type: 'array',
      group: 'hero',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'year', title: 'Year/decade', description: 'e.g. "1983" or "1990s"', type: 'string'},
            {name: 'label', title: 'Label', description: 'e.g. "Founded" or "Executive Programmes"', type: 'string'},
          ],
          preview: {select: {title: 'year', subtitle: 'label'}},
        },
      ],
    },

    // Location Advantage
    {name: 'locationEyebrow', title: 'Eyebrow', type: 'string', group: 'location', initialValue: 'Location Advantage'},
    {name: 'locationTitle', title: 'Title', type: 'string', group: 'location', initialValue: "Steps from India's financial core."},
    {name: 'locationTitleHighlight', title: 'Title highlight word(s)', description: 'e.g. "financial core."', type: 'string', group: 'location', initialValue: 'financial core.'},
    {name: 'locationBody', title: 'Body', type: 'text', rows: 4, group: 'location'},
    {name: 'locationQuote', title: 'Pull-quote', type: 'text', rows: 2, group: 'location', initialValue: 'At the centre of commerce - not on its periphery.'},
    {name: 'locationImage', title: 'Image', type: 'image', options: {hotspot: true}, group: 'location'},
    {
      name: 'locationStats',
      title: 'Distance stats',
      description: 'e.g. 2 min to Churchgate station, 0.5 km to BSE, 1 km to RBI HQ',
      type: 'array',
      group: 'location',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'value', title: 'Value', description: 'e.g. "2 min"', type: 'string'},
            {name: 'label', title: 'Label', description: 'e.g. "to Churchgate station"', type: 'string'},
          ],
          preview: {select: {title: 'value', subtitle: 'label'}},
        },
      ],
    },

    // Timeline intro
    {name: 'timelineEyebrow', title: 'Eyebrow', type: 'string', group: 'timeline', initialValue: 'Milestones'},
    {name: 'timelineTitle', title: 'Title', type: 'string', group: 'timeline', initialValue: 'Defining moments.'},
    {name: 'timelineTitleHighlight', title: 'Title highlight word(s)', description: 'e.g. "Defining moments."', type: 'string', group: 'timeline', initialValue: 'Defining moments.'},
    {name: 'timelineIntro', title: 'Intro paragraph', type: 'text', rows: 3, group: 'timeline', initialValue: "From 1983 to today - the moments that shaped SIMSREE. Scroll through forty years of building India's premier management institute."},

    // Vision & Mission
    {name: 'visionEyebrow', title: 'Eyebrow', type: 'string', group: 'vision', initialValue: 'Purpose'},
    {name: 'visionSectionTitle', title: 'Section title', type: 'string', group: 'vision', initialValue: 'Vision & Mission.'},
    {name: 'visionSectionTitleHighlight', title: 'Section title highlight word(s)', description: 'e.g. "Mission."', type: 'string', group: 'vision', initialValue: 'Mission.'},
    {name: 'visionSectionSubtitle', title: 'Section subtitle', type: 'string', group: 'vision', initialValue: 'Two statements that have not changed since 1983.'},
    {name: 'visionLabel', title: 'Vision card label', type: 'string', group: 'vision', initialValue: 'Our Vision'},
    {name: 'visionNumber', title: 'Vision card number', type: 'string', group: 'vision', initialValue: '01'},
    {name: 'visionTitle', title: 'Vision statement', type: 'string', group: 'vision', initialValue: 'To be a leader in management education.'},
    {name: 'visionTitleHighlight', title: 'Vision statement highlight word(s)', description: 'e.g. "management education."', type: 'string', group: 'vision', initialValue: 'management education.'},
    {name: 'visionDescription', title: 'Vision description', type: 'text', rows: 3, group: 'vision'},
    {name: 'missionLabel', title: 'Mission card label', type: 'string', group: 'vision', initialValue: 'Our Mission'},
    {name: 'missionNumber', title: 'Mission card number', type: 'string', group: 'vision', initialValue: '02'},
    {name: 'missionTitle', title: 'Mission statement', type: 'string', group: 'vision', initialValue: 'Four commitments we make.'},
    {name: 'missionIntro', title: 'Mission intro line', description: 'Short line above the commitments list', type: 'text', rows: 2, group: 'vision'},
    {name: 'missionTitleHighlight', title: 'Mission statement highlight word(s)', description: 'e.g. "commitments"', type: 'string', group: 'vision', initialValue: 'commitments'},
    {
      name: 'missionCommitments',
      title: 'Mission commitments',
      description: 'The checklist of commitments shown on the Mission card',
      type: 'array',
      group: 'vision',
      of: [{type: 'string'}],
    },

    // Core Values intro (the values themselves are their own document type)
    {name: 'valuesEyebrow', title: 'Eyebrow', type: 'string', group: 'values', initialValue: 'Core Values'},
    {name: 'valuesTitle', title: 'Title', type: 'string', group: 'values', initialValue: 'What we stand for.'},
    {name: 'valuesTitleHighlight', title: 'Title highlight word(s)', description: 'e.g. "stand for."', type: 'string', group: 'values', initialValue: 'stand for.'},
    {name: 'valuesSubtitle', title: 'Subtitle', type: 'text', rows: 2, group: 'values', initialValue: 'Six values that guide every decision at SIMSREE - from admissions to placements, from classroom debates to flagship events.'},

    // Continue Exploring CTA
    {name: 'ctaEyebrow', title: 'Eyebrow', type: 'string', group: 'cta', initialValue: 'Continue Exploring'},
    {name: 'ctaTitle', title: 'Title', type: 'string', group: 'cta', initialValue: 'Read what comes next.'},
    {name: 'ctaTitleHighlight', title: 'Title highlight word(s)', description: 'e.g. "next."', type: 'string', group: 'cta', initialValue: 'next.'},
    {name: 'ctaSubtitle', title: 'Subtitle', type: 'string', group: 'cta', initialValue: 'From history to leadership, to recognition to work - explore every facet of SIMSREE.'},
    {
      name: 'ctaCards',
      title: 'Cards',
      description: 'The 3 content cards shown in the closing CTA section',
      type: 'array',
      group: 'cta',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'tag', title: 'Tag', description: 'e.g. "Leadership", "Recognition", "Network"', type: 'string'},
            {name: 'title', title: 'Title', description: 'e.g. "Simerations", "Rankings & accreditations"', type: 'string'},
            {name: 'description', title: 'Description', type: 'text', rows: 2},
            {name: 'linkLabel', title: 'Link label', description: 'e.g. "Read the Director\'s message"', type: 'string'},
            {name: 'linkUrl', title: 'Link URL', type: 'string'},
          ],
          preview: {select: {title: 'title', subtitle: 'tag'}},
        },
      ],
    },
  ],
  preview: {
    prepare() {
      return {title: 'History Page'}
    },
  },
}
