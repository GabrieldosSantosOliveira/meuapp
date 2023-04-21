export const noticeParams = {
  type: 'object',
  properties: {
    category: {
      type: 'string',
    },
    content: {
      $ref: '#/schemas/content',
    },
    image: {
      type: 'string',
    },
    title: {
      type: 'string',
    },
    description: {
      type: 'string',
    },
  },
  required: ['category', 'content', 'image', 'title', 'description'],
};
