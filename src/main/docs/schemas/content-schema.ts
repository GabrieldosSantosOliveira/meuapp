export const contentSchema = {
  type: 'array',
  items: {
    type: 'object',
    properties: {
      text: {
        type: 'string',
      },
      heading: {
        type: 'string',
      },
      id: {
        type: 'string',
        format: 'uuid',
      },
    },
    required: ['text', 'id'],
  },
};
