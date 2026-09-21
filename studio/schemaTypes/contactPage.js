export default {
  name: 'contactPage',
  title: 'Contact Us Page',
  type: 'document',
  groups: [
    {name: 'hero', title: 'Hero'},
    {name: 'picker', title: 'Role Picker'},
    {name: 'general', title: 'General Form'},
    {name: 'directory', title: 'Department Directory'},
    {name: 'location', title: 'Find Us'},
    {name: 'disclosure', title: 'Anti-Ragging'},
    {name: 'form', title: 'Form Settings'},
  ],
  fields: [
    // Hero
    {name: 'heroEyebrow', title: 'Eyebrow', type: 'string', group: 'hero', initialValue: 'Who are you here as?'},
    {name: 'heroTitle', title: 'Title', type: 'string', group: 'hero', initialValue: "Pick a path. We'll route you."},
    {name: 'heroTitleItalic', title: 'Italic portion of title', type: 'string', group: 'hero', initialValue: 'route you.'},
    {name: 'heroDescription', title: 'Description', type: 'text', rows: 2, group: 'hero'},
    {name: 'heroImage', title: 'Hero image', type: 'image', options: {hotspot: true}, group: 'hero'},

    // Picker
    {name: 'pickerEyebrow', title: 'Eyebrow', type: 'string', group: 'picker', initialValue: 'I am a...'},
    {name: 'pickerTitle', title: 'Title', description: 'The role count is prefixed automatically', type: 'string', group: 'picker', initialValue: 'paths · one page.'},
    {name: 'pickerTitleHighlight', title: 'Title highlight word(s)', type: 'string', group: 'picker', initialValue: 'one page.'},
    {name: 'pickerSubtitle', title: 'Subtitle', type: 'string', group: 'picker', initialValue: 'Pick your role below — the page tailors itself to you.'},

    // General (no role selected)
    {name: 'generalEyebrow', title: 'Eyebrow', type: 'string', group: 'general', initialValue: 'General Contact'},
    {name: 'generalTitle', title: 'Title', type: 'string', group: 'general', initialValue: 'Send us a message.'},
    {name: 'generalTitleHighlight', title: 'Title highlight word(s)', type: 'string', group: 'general', initialValue: 'message.'},
    {name: 'generalSubtitle', title: 'Subtitle', type: 'string', group: 'general', initialValue: 'General enquiry form — or pick a role above for a faster, tailored route.'},
    {name: 'generalSubmitLabel', title: 'Submit label', type: 'string', group: 'general', initialValue: 'Send my message'},
    {name: 'generalFootnote', title: 'Footnote', type: 'string', group: 'general', initialValue: 'Generic enquiry · routes to info@simsree.org'},

    // Directory
    {name: 'directoryEyebrow', title: 'Eyebrow', type: 'string', group: 'directory', initialValue: 'Department Directory · Live-Site Data'},
    {name: 'directoryTitle', title: 'Title', type: 'string', group: 'directory', initialValue: 'Direct department contacts'},
    {name: 'directorySubtitle', title: 'Subtitle', type: 'string', group: 'directory', initialValue: 'Every number and email below is current and official.'},
    {
      name: 'departments',
      title: 'Department contacts',
      description: 'The circular avatar row',
      type: 'array',
      group: 'directory',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'name', title: 'Name', type: 'string', validation: (Rule) => Rule.required()},
            {name: 'role', title: 'Role', type: 'string'},
            {name: 'phone', title: 'Phone', type: 'string'},
            {name: 'email', title: 'Email', type: 'string'},
            {name: 'photo', title: 'Photo', type: 'image', options: {hotspot: true}},
          ],
          preview: {select: {title: 'name', subtitle: 'role', media: 'photo'}},
        },
      ],
    },
    {
      name: 'directoryPanels',
      title: 'Directory panels',
      description: 'The bordered panels under the avatars, e.g. Chairpersons, Placement Cell',
      type: 'array',
      group: 'directory',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'title', title: 'Title', type: 'string'},
            {name: 'body', title: 'Body', description: 'One line, or leave empty and use rows', type: 'text', rows: 2},
            {
              name: 'rows',
              title: 'Rows',
              description: 'Name + contact pairs, e.g. the admissions helper list',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {name: 'label', title: 'Name', type: 'string'},
                    {name: 'value', title: 'Contact', type: 'string'},
                  ],
                  preview: {select: {title: 'label', subtitle: 'value'}},
                },
              ],
            },
            {name: 'wide', title: 'Full-width panel?', type: 'boolean', initialValue: false},
          ],
          preview: {select: {title: 'title', subtitle: 'body'}},
        },
      ],
    },

    // Location
    {name: 'locationEyebrow', title: 'Eyebrow', type: 'string', group: 'location', initialValue: 'Find Us'},
    {name: 'locationTitle', title: 'Address title', description: 'Uses the shared address when empty', type: 'string', group: 'location'},
    {name: 'locationTitleHighlight', title: 'Title highlight word(s)', type: 'string', group: 'location', initialValue: 'Churchgate'},
    {name: 'locationSubtitle', title: 'Subtitle', type: 'string', group: 'location', initialValue: '2 minutes from Churchgate station · inside Sydenham College campus.'},
    {name: 'mapsUrl', title: 'Google Maps URL', type: 'string', group: 'location'},
    {name: 'mapEmbedUrl', title: 'Map embed URL', description: 'Optional Google Maps embed src. Leave empty to show a placeholder.', type: 'string', group: 'location'},
    {name: 'directionsTitle', title: 'Directions panel title', type: 'string', group: 'location', initialValue: 'Step-by-step from Churchgate station'},
    {name: 'directions', title: 'Directions steps', type: 'array', of: [{type: 'string'}], group: 'location'},

    // Anti-ragging
    {name: 'disclosureEyebrow', title: 'Eyebrow', type: 'string', group: 'disclosure', initialValue: 'Mandatory Disclosure'},
    {name: 'disclosureTitle', title: 'Title', type: 'string', group: 'disclosure', initialValue: 'Anti-Ragging Helpline.'},
    {name: 'disclosureTitleHighlight', title: 'Title highlight word(s)', type: 'string', group: 'disclosure', initialValue: 'Helpline.'},
    {name: 'disclosureBody', title: 'Body', type: 'text', rows: 3, group: 'disclosure'},
    {
      name: 'disclosureButtons',
      title: 'Buttons',
      type: 'array',
      group: 'disclosure',
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
      name: 'disclosureCards',
      title: 'Support cards',
      type: 'array',
      group: 'disclosure',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'title', title: 'Title', type: 'string'},
            {name: 'body', title: 'Body', type: 'string'},
          ],
          preview: {select: {title: 'title', subtitle: 'body'}},
        },
      ],
    },

    // Form settings
    {
      name: 'endpointUrl',
      title: 'Form endpoint URL',
      description:
        'Where enquiries are POSTed as JSON. Leave empty and the form opens a pre-filled email instead. Any service accepting a JSON POST works.',
      type: 'url',
      group: 'form',
      validation: (Rule) => Rule.uri({scheme: ['https']}),
    },
    {name: 'fallbackEmail', title: 'Fallback email', type: 'string', group: 'form', initialValue: 'info@simsree.org'},
    {name: 'consentLabel', title: 'Consent label', type: 'string', group: 'form', initialValue: "I agree to SIMSREE's privacy notice."},
    {name: 'successTitle', title: 'Success title', type: 'string', group: 'form', initialValue: 'Message sent.'},
    {name: 'successBody', title: 'Success body', type: 'text', rows: 2, group: 'form', initialValue: 'We reply within 1 business day.'},
    {name: 'failTitle', title: 'Failure title', type: 'string', group: 'form', initialValue: "That didn't go through."},
    {name: 'failBody', title: 'Failure body', type: 'text', rows: 2, group: 'form', initialValue: 'Your details are still here — try again, or email us instead.'},
  ],
  preview: {prepare() { return {title: 'Contact Us Page'} }},
}
