export const commentType = {
    name: 'comment',
    title: 'Comment',
    type: 'document',
    fields: [
      {
        name: 'name',
        title: 'Name',
        type: 'string',
      },
      {
        name: 'email',
        title: 'Email',
        type: 'string',
      },
      {
        name: 'comment',
        title: 'Comment',
        type: 'text',
      },
      {
        name: 'approved',
        title: 'Approved',
        type: 'boolean',
        description: 'Only approved comments are shown on the site.',
      },
      {
        name: 'post',
        title: 'Post',
        type: 'reference',
        to: [{ type: 'post' }],
      },
    ],
}
  