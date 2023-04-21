export const noticeSchema = {
  type: 'object',
  properties: {
    id: {
      type: 'string',
      format: 'uuid',
    },
    author: {
      $ref: '#/schemas/author',
    },
    category: {
      $ref: '#/schemas/category',
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
    createdAt: {
      type: 'string',
      format: 'date-time',
    },
    updatedAt: {
      type: 'string',
      format: 'date-time',
    },
  },
  required: [
    'id',
    'author',
    'category',
    'content',
    'image',
    'title',
    'description',
    'createdAt',
    'updatedAt',
  ],
};
