export default {
  name: 'navLink',
  title: 'Link',
  type: 'object',
  fields: [
    {name: 'label', title: 'Label', type: 'string', validation: (Rule) => Rule.required()},
    {
      name: 'path',
      title: 'Path',
      description:
        'e.g. /about or /academics/mms. Leave blank for a group heading that only holds sub-links (like "Full Time").',
      type: 'string',
      validation: (Rule) =>
        Rule.custom((path, context) =>
          path || context.parent?.children?.length ? true : 'Add a path, or add sub-links to make this a group heading',
        ),
    },
    {
      name: 'children',
      title: 'Sub-links',
      description: 'Optional. Turns this item into a group: the links listed here show indented beneath it.',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'navSubLink',
          title: 'Sub-link',
          fields: [
            {name: 'label', title: 'Label', type: 'string', validation: (Rule) => Rule.required()},
            {name: 'path', title: 'Path', type: 'string', validation: (Rule) => Rule.required()},
          ],
          preview: {select: {title: 'label', subtitle: 'path'}},
        },
      ],
    },
  ],
  preview: {
    select: {title: 'label', subtitle: 'path', children: 'children'},
    prepare: ({title, subtitle, children}) => ({
      title,
      subtitle: children?.length ? `${subtitle || 'Group'} · ${children.length} sub-links` : subtitle,
    }),
  },
}
