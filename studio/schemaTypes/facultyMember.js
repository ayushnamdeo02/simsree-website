const DISCIPLINES = ['Finance', 'Marketing', 'Operations', 'HR & OB', 'Systems', 'Economics', 'Strategy']

export default {
  name: 'facultyMember',
  title: 'Faculty - Core Faculty',
  type: 'document',
  description: 'Permanent faculty shown in the filterable grid',
  fields: [
    {name: 'name', title: 'Name', type: 'string', validation: (Rule) => Rule.required()},
    {name: 'photo', title: 'Photo', type: 'image', options: {hotspot: true}},
    {name: 'role', title: 'Role', description: 'e.g. "Professor & Head, Finance"', type: 'string'},
    {
      name: 'discipline',
      title: 'Discipline',
      description: 'Drives the filter chips and their counts',
      type: 'string',
      options: {list: DISCIPLINES},
      validation: (Rule) => Rule.required(),
    },
    {name: 'qualification', title: 'Qualification', description: 'e.g. "PhD · IIM Ahmedabad"', type: 'string'},
    {name: 'specialism', title: 'Specialism', description: 'e.g. "Capital markets · corporate finance"', type: 'string'},
    {name: 'tenure', title: 'Tenure line', description: 'e.g. "19 years at SIMSREE"', type: 'string'},
    {name: 'order', title: 'Display order', type: 'number', validation: (Rule) => Rule.required()},
  ],
  orderings: [{title: 'Display order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]}],
  preview: {select: {title: 'name', subtitle: 'role', media: 'photo'}},
}
