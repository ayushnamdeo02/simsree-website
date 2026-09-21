export default {
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  fields: [
    {
      name: 'heroBadge',
      title: 'Hero badge text',
      type: 'string',
      initialValue: "Mumbai's Premier Management Institute · Since 1983",
    },
    {
      name: 'heroTitle',
      title: 'Hero title',
      type: 'string',
      initialValue: 'More than ready.',
    },
    {
      name: 'heroSubtitle',
      title: 'Hero subtitle (small line)',
      type: 'string',
      initialValue: 'SIMSREE ready.',
    },
    {
      name: 'heroDescription',
      title: 'Hero description',
      type: 'text',
      rows: 3,
    },
    {
      name: 'heroImage',
      title: 'Hero background image',
      type: 'image',
      options: {hotspot: true},
    },
    {
      name: 'heroPrimaryCtaLabel',
      title: 'Primary CTA label',
      type: 'string',
      initialValue: 'See why SIMSREE',
    },
    {
      name: 'heroPrimaryCtaUrl',
      title: 'Primary CTA URL',
      type: 'string',
      initialValue: '/about',
    },
    {
      name: 'heroSecondaryCtaLabel',
      title: 'Secondary CTA label',
      type: 'string',
      initialValue: 'Start your application',
    },
    {
      name: 'heroSecondaryCtaUrl',
      title: 'Secondary CTA URL',
      type: 'string',
      initialValue: '/admissions',
    },

    {
      name: 'admissionAlertText',
      title: 'Admission alert text',
      type: 'string',
    },
    {
      name: 'admissionAlertLinkLabel',
      title: 'Admission alert link label',
      type: 'string',
      initialValue: 'See MMS 2026-27 dates',
    },
    {
      name: 'admissionAlertLinkUrl',
      title: 'Admission alert link URL',
      type: 'string',
      initialValue: '/admissions/mms',
    },

    {
      name: 'locationEyebrow',
      title: 'Location section eyebrow',
      type: 'string',
      initialValue: 'Location Advantage',
    },
    {
      name: 'locationTitle',
      title: 'Location section title (line 1)',
      description: 'e.g. "Anchored in"',
      type: 'string',
    },
    {
      name: 'locationLine2',
      title: 'Location section title (line 2, before the highlight)',
      description: "Sits on line 2 ahead of the highlighted phrase.",
      type: 'string',
    },
    {
      name: 'locationHighlight',
      title: 'Location section title highlight',
      description: 'e.g. "financial core."',
      type: 'string',
    },
    {
      name: 'locationDescription',
      title: 'Location description',
      type: 'text',
      rows: 4,
    },
    {
      name: 'locationImage',
      title: 'Location image',
      type: 'image',
      options: {hotspot: true},
    },

    {
      name: 'testimonialQuote',
      title: 'Testimonial quote',
      type: 'text',
      rows: 3,
    },
    {
      name: 'testimonialName',
      title: 'Testimonial author name',
      type: 'string',
    },
    {
      name: 'testimonialMeta',
      title: 'Testimonial author meta',
      description: 'e.g. "MMS · Batch 2022–24"',
      type: 'string',
    },
    {
      name: 'testimonialPhoto',
      title: 'Testimonial author photo',
      type: 'image',
      options: {hotspot: true},
    },
  ],
  preview: {
    prepare() {
      return {title: 'Homepage content'}
    },
  },
}
