export default {
  name: 'studentExploreCard',
  title: "Student's Corner - Explore Card",
  type: 'document',
  description: 'The "places to start" grid. The count in the heading follows this list.',
  fields: [
    {name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required()},
    {name: 'description', title: 'Description', type: 'text', rows: 3},
    {name: 'image', title: 'Image', type: 'image', options: {hotspot: true}},
    {name: 'badge', title: 'Badge', description: 'Small pill above the title, e.g. "Enhanced"', type: 'string'},
    {name: 'ctaLabel', title: 'Link label', type: 'string', initialValue: 'Open'},
    {name: 'url', title: 'Link URL', type: 'string'},
    {name: 'wide', title: 'Wide card?', description: 'Renders full width with the image beside the text', type: 'boolean', initialValue: false},
    {name: 'order', title: 'Display order', type: 'number', validation: (Rule) => Rule.required()},
  ],
  orderings: [{title: 'Display order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'title', subtitle: 'description', media: 'image'}},
}
