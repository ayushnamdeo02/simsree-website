export default {
  name: 'aboutPage',
  title: 'About Us Page',
  type: 'document',
  groups: [
    {name: 'hero', title: 'Hero'},
    {name: 'story', title: 'Our Story'},
    {name: 'leadership', title: 'Leadership'},
    {name: 'recognition', title: 'Recognition'},
    {name: 'campus', title: 'Campus & Culture'},
    {name: 'alumni', title: 'Alumni Network'},
    {name: 'contact', title: 'Get in Touch'},
  ],
  fields: [
    // Hero
    {name: 'heroEyebrow', title: 'Eyebrow', type: 'string', group: 'hero', initialValue: 'About SIMSREE · Established 1983'},
    {name: 'heroTitle', title: 'Title', type: 'string', group: 'hero', initialValue: 'Forty years of distinctive management education.'},
    {name: 'heroDescription', title: 'Description', type: 'text', rows: 4, group: 'hero'},
    {name: 'heroImage', title: 'Hero image', type: 'image', options: {hotspot: true}, group: 'hero'},
    {name: 'heroPrimaryCtaLabel', title: 'Primary CTA label', type: 'string', group: 'hero', initialValue: 'Read our history'},
    {name: 'heroPrimaryCtaUrl', title: 'Primary CTA URL', type: 'string', group: 'hero', initialValue: '/about/history'},
    {name: 'heroSecondaryCtaLabel', title: 'Secondary CTA label', type: 'string', group: 'hero', initialValue: 'See how we work'},
    {name: 'heroSecondaryCtaUrl', title: 'Secondary CTA URL', type: 'string', group: 'hero', initialValue: '/about/student-driven-system'},
    {name: 'heroDirectorLinkLabel', title: "Director's message link label", type: 'string', group: 'hero', initialValue: "Read the Director's message"},
    {name: 'heroDirectorLinkUrl', title: "Director's message link URL", type: 'string', group: 'hero', initialValue: '/about/directors-message'},
    {
      name: 'heroStats',
      title: 'Hero stat chips',
      description: 'e.g. Founded 1983, 40+ Years, 13 Committees, 5000+ Alumni — set alternating Dark for the navy-background chips',
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

    // Our Story
    {name: 'storyEyebrow', title: 'Eyebrow', type: 'string', group: 'story', initialValue: 'Our Story'},
    {name: 'storyTitle', title: 'Title', type: 'string', group: 'story', initialValue: 'A legacy built over four decades.'},
    {name: 'storyTitleHighlight', title: 'Title highlight word(s)', description: 'The part of the title shown in teal, e.g. "four decades."', type: 'string', group: 'story', initialValue: 'four decades.'},
    {name: 'storyBody', title: 'Body', type: 'text', rows: 8, group: 'story'},
    {name: 'storyLinkLabel', title: 'Link label', type: 'string', group: 'story', initialValue: 'Read the full history'},
    {name: 'storyLinkUrl', title: 'Link URL', type: 'string', group: 'story', initialValue: '/about/history'},

    // Leadership
    {name: 'leadershipEyebrow', title: 'Eyebrow', type: 'string', group: 'leadership', initialValue: 'Leadership'},
    {name: 'leadershipTitle', title: 'Title', type: 'string', group: 'leadership', initialValue: "From the Director's desk."},
    {name: 'leadershipTitleHighlight', title: 'Title highlight word(s)', description: 'e.g. "Director\'s"', type: 'string', group: 'leadership', initialValue: "Director's"},
    {name: 'leadershipQuote', title: 'Quote', type: 'text', rows: 4, group: 'leadership'},
    {name: 'leadershipName', title: 'Name', type: 'string', group: 'leadership', initialValue: 'Dr. Shriniwas Dhure'},
    {name: 'leadershipRole', title: 'Role', type: 'string', group: 'leadership', initialValue: 'Director, SIMSREE'},
    {name: 'leadershipLinkLabel', title: 'Link label', type: 'string', group: 'leadership', initialValue: 'Read the full message'},
    {name: 'leadershipLinkUrl', title: 'Link URL', type: 'string', group: 'leadership', initialValue: '/about/directors-message'},

    // Recognition
    {name: 'recognitionEyebrow', title: 'Eyebrow', type: 'string', group: 'recognition', initialValue: 'Recognition'},
    {name: 'recognitionTitle', title: 'Title', type: 'string', group: 'recognition', initialValue: 'Rankings & accreditations you can verify.'},
    {name: 'recognitionTitleHighlight', title: 'Title highlight word(s)', description: 'e.g. "&"', type: 'string', group: 'recognition', initialValue: '&'},
    {name: 'recognitionBody', title: 'Body', type: 'text', rows: 4, group: 'recognition'},
    {name: 'recognitionLinkLabel', title: 'Link label', type: 'string', group: 'recognition', initialValue: 'See where we rank'},
    {name: 'recognitionLinkUrl', title: 'Link URL', type: 'string', group: 'recognition', initialValue: '/about/rankings'},

    // Campus & Culture (intro copy — the cards are their own document type)
    {name: 'campusEyebrow', title: 'Eyebrow', type: 'string', group: 'campus', initialValue: 'Campus & Culture'},
    {name: 'campusTitle', title: 'Title', type: 'string', group: 'campus', initialValue: 'Where learning goes beyond the classroom.'},
    {name: 'campusTitleHighlight', title: 'Title highlight word(s)', description: 'e.g. "beyond the classroom."', type: 'string', group: 'campus', initialValue: 'beyond the classroom.'},
    {name: 'campusBody', title: 'Body', type: 'text', rows: 4, group: 'campus'},

    // Alumni Network (intro copy — the cards are their own document type)
    {name: 'alumniEyebrow', title: 'Eyebrow', type: 'string', group: 'alumni', initialValue: 'Alumni Network'},
    {name: 'alumniTitle', title: 'Title', type: 'string', group: 'alumni', initialValue: '5,000+ alumni worldwide.'},
    {name: 'alumniBody', title: 'Body', type: 'text', rows: 4, group: 'alumni'},

    // News intro
    {name: 'newsEyebrow', title: 'Eyebrow', type: 'string', group: 'contact', initialValue: 'News & Announcements'},
    {name: 'newsTitle', title: 'Title', type: 'string', group: 'contact', initialValue: 'Just announced.'},
    {name: 'newsTitleHighlight', title: 'Title highlight word(s)', description: 'e.g. "announced."', type: 'string', group: 'contact', initialValue: 'announced.'},
    {name: 'newsSubtitle', title: 'Subtitle', type: 'string', group: 'contact', initialValue: 'Latest from the admissions, awards, and government notifications.'},
    {name: 'newsLinkLabel', title: 'View all link label', type: 'string', group: 'contact', initialValue: 'View all announcements'},

    // Get in Touch
    {name: 'contactEyebrow', title: 'Eyebrow', type: 'string', group: 'contact', initialValue: 'Get in Touch'},
    {name: 'contactTitle', title: 'Title', type: 'string', group: 'contact', initialValue: 'Want to visit campus?'},
    {name: 'contactBody', title: 'Body', type: 'text', rows: 3, group: 'contact'},
    {name: 'contactPrimaryCtaLabel', title: 'Primary CTA label', type: 'string', group: 'contact', initialValue: 'Book a campus visit'},
    {name: 'contactPrimaryCtaUrl', title: 'Primary CTA URL', type: 'string', group: 'contact', initialValue: '/contact'},
    {name: 'contactSecondaryCtaLabel', title: 'Secondary CTA label', type: 'string', group: 'contact', initialValue: 'Find your programme'},
    {name: 'contactSecondaryCtaUrl', title: 'Secondary CTA URL', type: 'string', group: 'contact', initialValue: '/academics'},
  ],
  preview: {
    prepare() {
      return {title: 'About Us Page'}
    },
  },
}
