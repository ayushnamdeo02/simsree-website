export default {
  name: 'recruiterEngagementPage',
  title: 'Recruiter Engagement Page',
  type: 'document',
  groups: [
    {name: 'hero', title: 'Hero'},
    {name: 'form', title: 'Form'},
    {name: 'delivery', title: 'Where Submissions Go'},
    {name: 'states', title: 'Form States'},
  ],
  fields: [
    // Hero
    {name: 'heroEyebrow', title: 'Eyebrow', type: 'string', group: 'hero', initialValue: 'Structured Intake'},
    {name: 'heroTitle', title: 'Title', type: 'string', group: 'hero', initialValue: 'Hire from SIMSREE.'},
    {name: 'heroTitleItalic', title: 'Italic portion of title', type: 'string', group: 'hero', initialValue: 'SIMSREE.'},
    {name: 'heroDescription', title: 'Description', type: 'text', rows: 2, group: 'hero'},
    {name: 'heroImage', title: 'Hero image', type: 'image', options: {hotspot: true}, group: 'hero'},

    // Form intro
    {name: 'formEyebrow', title: 'Eyebrow', type: 'string', group: 'form', initialValue: 'Recruiter Engagement Form'},
    {name: 'formTitle', title: 'Title', type: 'string', group: 'form', initialValue: 'Submit your hiring needs'},
    {name: 'formTitleHighlight', title: 'Title highlight word(s)', type: 'string', group: 'form', initialValue: 'hiring needs'},
    {name: 'formSubtitle', title: 'Subtitle', type: 'string', group: 'form', initialValue: "Fill in your details — we'll confirm a slot within 24 hours."},
    {name: 'consentLabel', title: 'Consent checkbox label', type: 'text', rows: 2, group: 'form', initialValue: "I agree to SIMSREE's privacy notice and consent to be contacted regarding this enquiry."},
    {name: 'submitLabel', title: 'Submit button label', type: 'string', group: 'form', initialValue: 'Submit hiring needs'},
    {name: 'formFootnote', title: 'Footnote under the button', type: 'string', group: 'form', initialValue: 'Your request goes straight to placements@simsree.org and the Placement Chair.'},
    {
      name: 'sectorOptions',
      title: 'Sector dropdown options',
      type: 'array',
      group: 'form',
      of: [{type: 'string'}],
      initialValue: ['BFSI', 'FMCG', 'Consulting', 'IT/Tech', 'Pharma', 'Manufacturing', 'Media', 'Other'],
    },
    {
      name: 'engagementOptions',
      title: 'Engagement type dropdown options',
      type: 'array',
      group: 'form',
      of: [{type: 'string'}],
      initialValue: ['Final Placement', 'Summer Internship', 'Live Project', 'Guest Lecture', 'Campus Visit', 'Other'],
    },

    // Delivery
    {
      name: 'endpointUrl',
      title: 'Form endpoint URL',
      description:
        'Where submissions are POSTed as JSON. Leave empty and the form falls back to opening the enquiry as a pre-filled email instead. Any service that accepts a JSON POST works (Formspree, Web3Forms, a custom endpoint).',
      type: 'url',
      group: 'delivery',
      validation: (Rule) => Rule.uri({scheme: ['https']}),
    },
    {
      name: 'fallbackEmail',
      title: 'Fallback email address',
      description: 'Used by the email fallback when there is no endpoint, or when a submission fails.',
      type: 'string',
      group: 'delivery',
      initialValue: 'placements@simsree.org',
    },

    // States
    {name: 'successTitle', title: 'Success message title', type: 'string', group: 'states', initialValue: 'Request received.'},
    {name: 'successBody', title: 'Success message body', type: 'text', rows: 2, group: 'states', initialValue: 'A Placement Committee member will confirm your slot within 24 hours.'},
    {name: 'failTitle', title: 'Failure message title', type: 'string', group: 'states', initialValue: "That didn't go through."},
    {name: 'failBody', title: 'Failure message body', type: 'text', rows: 2, group: 'states', initialValue: 'Your details are still here — try again, or send them to us by email instead.'},

    {name: 'statesEyebrow', title: 'States section eyebrow', type: 'string', group: 'states', initialValue: 'Form State Machine — Wireframed'},
    {name: 'statesTitle', title: 'States section title', type: 'string', group: 'states', initialValue: 'All four states'},
    {name: 'statesTitleHighlight', title: 'Title highlight word(s)', type: 'string', group: 'states', initialValue: 'four states'},
    {name: 'statesSubtitle', title: 'States section subtitle', type: 'text', rows: 2, group: 'states', initialValue: 'What you saw above (idle / sending / success / fail) is the full state machine — submit to walk through it.'},
    {
      name: 'stateCards',
      title: 'State cards',
      type: 'array',
      group: 'states',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'label', title: 'Badge label', type: 'string'},
            {
              name: 'tone',
              title: 'Badge tone',
              type: 'string',
              options: {list: ['idle', 'sending', 'success', 'fail']},
              initialValue: 'idle',
            },
            {name: 'description', title: 'Description', type: 'string'},
          ],
          preview: {select: {title: 'label', subtitle: 'description'}},
        },
      ],
    },
  ],
  preview: {prepare() { return {title: 'Recruiter Engagement Page'} }},
}
