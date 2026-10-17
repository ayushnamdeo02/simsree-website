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
    {
      name: 'disclaimerEnabled',
      title: 'Show the disclaimer popup',
      description: 'Shown once per visit, on whichever page a visitor lands on',
      type: 'boolean',
      fieldset: 'disclaimer',
      initialValue: true,
    },
    {name: 'disclaimerTitle', title: 'Title', type: 'string', fieldset: 'disclaimer', initialValue: 'Disclaimer'},
    {name: 'disclaimerText', title: 'Text', type: 'text', rows: 5, fieldset: 'disclaimer'},
    {
      name: 'disclaimerHighlight',
      title: 'Bold phrase',
      description: 'Part of the text to show in bold, e.g. "ONLY ON MERIT BASIS."',
      type: 'string',
      fieldset: 'disclaimer',
    },
    {name: 'disclaimerButtonLabel', title: 'Button label', type: 'string', fieldset: 'disclaimer', initialValue: 'I understand'},
  ],
  fieldsets: [{name: 'disclaimer', title: 'Disclaimer popup', options: {collapsible: true, collapsed: false}}],
  preview: {
    prepare() {
      return {title: 'Site Settings (Navigation & Footer)'}
    },
  },
}
