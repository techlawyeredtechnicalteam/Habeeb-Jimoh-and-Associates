export default {
  name: 'policy',
  title: 'Policy Page',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Policy', value: 'policy' },
          { title: 'Terms', value: 'terms' }
        ],
        layout: 'radio'
      },
      validation: Rule => Rule.required(),
      description: 'Choose whether this is a Policy or Terms document'
    },
    {
      name: 'description',
      title: 'Short Description',
      type: 'text',
      rows: 3,
    },
    {
      name: 'lastUpdated',
      title: 'Last Updated',
      type: 'date',
      validation: Rule => Rule.required()
    },
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
            {title: 'H4', value: 'h4'},
          ],
          lists: [
            {title: 'Bullet', value: 'bullet'},
            {title: 'Numbered', value: 'number'}
          ],
        }
      ]
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 1
    }
  ],
  preview: {
    select: {
      title: 'title',
      category: 'category',
      order: 'order'
    },
    prepare({ title, category, order }) {
      return {
        title,
        subtitle: `${category === 'policy' ? '📄 Policy' : '📋 Terms'} - Order: ${order}`
      }
    }
  }
}