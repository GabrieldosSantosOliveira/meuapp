export const infoSchema = {
  type: 'object',
  properties: {
    count: {
      type: 'integer',
    },
    pages: {
      type: 'integer',
    },
    next: { type: 'string' },
    prev: { type: 'string' },
  },
  required: ['next', 'prev', 'pages', 'count'],
};
