export default {
  name: 'directorPage',
  title: "Director's Message Page",
  type: 'document',
  groups: [
    {name: 'hero', title: 'Hero'},
    {name: 'quote', title: 'Pull Quote'},
    {name: 'portrait', title: 'Signature Portrait'},
    {name: 'contact', title: 'Get in Touch'},
  ],
  fields: [
    // Hero
    {name: 'heroEyebrow', title: 'Eyebrow', type: 'string', group: 'hero', initialValue: 'Office of the Director · Since 2021'},
    {name: 'heroTitle', title: 'Title', type: 'string', group: 'hero', initialValue: 'A word from the Director.'},
    {name: 'heroTitleHighlight', title: 'Title highlight word(s)', description: 'e.g. "Director."', type: 'string', group: 'hero', initialValue: 'Director.'},
    {name: 'heroDescription', title: 'Description', type: 'text', rows: 3, group: 'hero'},
    {name: 'heroImage', title: 'Hero image', type: 'image', options: {hotspot: true}, group: 'hero'},
    {name: 'heroName', title: 'Name', type: 'string', group: 'hero', initialValue: 'Dr. Shriniwas Dhure'},
    {name: 'heroRole', title: 'Role', type: 'string', group: 'hero', initialValue: 'Director · SIMSREE'},
    {
      name: 'heroStats',
      title: 'Hero credential chips',
      description: 'e.g. "22 yrs · In Management Education", "PhD · Management Studies"',
      type: 'array',
      group: 'hero',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'value', title: 'Value', description: 'e.g. "22 yrs" or "PhD"', type: 'string'},
            {name: 'label', title: 'Label', description: 'e.g. "In Management Education"', type: 'string'},
          ],
          preview: {select: {title: 'value', subtitle: 'label'}},
        },
      ],
    },
    {name: 'heroPrimaryCtaLabel', title: 'Primary CTA label', type: 'string', group: 'hero', initialValue: 'Read the message'},
    {name: 'heroPrimaryCtaUrl', title: 'Primary CTA URL', type: 'string', group: 'hero', initialValue: '#message'},
    {name: 'heroSecondaryCtaLabel', title: 'Secondary CTA label', type: 'string', group: 'hero', initialValue: "Email Director's office"},
    {name: 'heroSecondaryCtaUrl', title: 'Secondary CTA URL', type: 'string', group: 'hero', initialValue: 'mailto:director@simsree.org'},

    // Pull Quote
    {name: 'quoteText', title: 'Quote', type: 'text', rows: 3, group: 'quote', initialValue: 'SIMSREE has always stood for something beyond a degree — for character forged through initiative, responsibility, and a deep engagement with the world of business.'},
    {name: 'quoteHighlight', title: 'Quote highlight word(s)', description: 'e.g. "beyond a degree"', type: 'string', group: 'quote', initialValue: 'beyond a degree'},
    {name: 'quotePhoto', title: 'Small circular photo', type: 'image', options: {hotspot: true}, group: 'quote'},
    {name: 'quoteName', title: 'Name', type: 'string', group: 'quote', initialValue: 'Dr. Shriniwas Dhure'},
    {name: 'quoteMeta', title: 'Meta line', type: 'string', group: 'quote', initialValue: 'Director, SIMSREE · 2021–present'},

    // Signature Portrait
    {name: 'portraitImage', title: 'Portrait photo', type: 'image', options: {hotspot: true}, group: 'portrait'},
    {name: 'signatureImage', title: 'Signature image', description: 'Scanned/drawn signature graphic', type: 'image', group: 'portrait'},
    {name: 'portraitName', title: 'Name', type: 'string', group: 'portrait', initialValue: 'Dr. Shriniwas Dhure'},
    {name: 'portraitRole', title: 'Role', type: 'string', group: 'portrait', initialValue: 'Director, SIMSREE · Churchgate, Mumbai'},
    {name: 'portraitPhone', title: 'Phone line', type: 'string', group: 'portrait', initialValue: "Reach the Director's office · 022 6151 0700"},
    {name: 'portraitEmail', title: 'Email', type: 'string', group: 'portrait', initialValue: 'director@simsree.org'},

    // Get in Touch
    {name: 'contactEyebrow', title: 'Eyebrow', type: 'string', group: 'contact', initialValue: "Reach the Director's Office"},
    {name: 'contactTitle', title: 'Title', type: 'string', group: 'contact', initialValue: 'Get in touch.'},
    {name: 'contactTitleHighlight', title: 'Title highlight word(s)', description: 'e.g. "touch."', type: 'string', group: 'contact', initialValue: 'touch.'},
    {name: 'contactSubtitle', title: 'Subtitle', type: 'text', rows: 2, group: 'contact', initialValue: "For institutional matters, partnerships, recruiter relationships, and campus visits — the Director's office is here."},
    {name: 'contactCallNumber', title: 'Phone number', type: 'string', group: 'contact', initialValue: '022 6151 0700'},
    {name: 'contactCallLabel', title: 'Phone sub-label', type: 'string', group: 'contact', initialValue: 'PA to Director · Mon–Sat · 11am–7pm'},
    {name: 'contactEmailAddress', title: 'Email address', type: 'string', group: 'contact', initialValue: 'director@simsree.org'},
    {name: 'contactEmailLabel', title: 'Email sub-label', type: 'string', group: 'contact', initialValue: 'Institutional matters · partnerships · visits'},
    {name: 'contactVisitAddress', title: 'Visit address', type: 'string', group: 'contact', initialValue: 'B-Road, Churchgate'},
    {name: 'contactVisitLabel', title: 'Visit sub-label', type: 'string', group: 'contact', initialValue: '2 min from Churchgate station · Mumbai 400 020'},
  ],
  preview: {
    prepare() {
      return {title: "Director's Message Page"}
    },
  },
}
