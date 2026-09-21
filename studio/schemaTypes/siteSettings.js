export default {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    {
      name: 'headerLogo',
      title: 'Header logo (dark version)',
      description:
        'Shown once the page is scrolled and the navbar background turns white. Use a transparent PNG or SVG in the dark/full-colour version of the logo.',
      type: 'image',
    },
    {
      name: 'headerLogoLight',
      title: 'Header logo (light/white version)',
      description:
        'Shown at the top of pages with a photo hero, where the navbar is transparent over the image. Use a white/reversed transparent PNG or SVG. If left empty, the dark logo is used everywhere.',
      type: 'image',
    },
    {
      name: 'utilityLinks',
      title: 'Utility bar links',
      description: 'Small links shown in the top strip (NIRF Report, TEDxSIMSREE, etc.)',
      type: 'array',
      of: [{type: 'navLink'}],
    },
    {
      name: 'mainNav',
      title: 'Main navigation',
      type: 'array',
      of: [{type: 'navItem'}],
    },
    {
      name: 'applyButtonLabel',
      title: 'Header "Apply" button label',
      type: 'string',
      initialValue: 'Apply',
    },
    {
      name: 'applyButtonUrl',
      title: 'Header "Apply" button URL',
      type: 'string',
      initialValue: '/admissions',
    },
    {
      name: 'footerEmblem',
      title: 'Footer emblem/logo',
      description: 'e.g. Government of Maharashtra crest shown above the institute name in the footer',
      type: 'image',
    },
    {
      name: 'footerColumns',
      title: 'Footer columns',
      type: 'array',
      of: [{type: 'footerColumn'}],
    },
    {
      name: 'footerAddressLine1',
      title: 'Footer institute name',
      type: 'string',
      initialValue: 'Sydenham Institute of Management Studies, Research & Entrepreneurship Education',
    },
    {
      name: 'footerAddressLine2',
      title: 'Footer address',
      type: 'string',
      initialValue: 'B-Road, Churchgate, Mumbai 400 020',
    },
  ],
  preview: {
    prepare() {
      return {title: 'Site Settings (Navigation & Footer)'}
    },
  },
}
