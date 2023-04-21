export const badRequest = {
  description: 'Requisição invalida',
  content: {
    'application/json': {
      schema: {
        type: 'object',
        properties: {
          error: {
            type: 'array',
            items: {
              type: 'object',
              properties: {},
            },
          },
        },
      },
    },
  },
};
