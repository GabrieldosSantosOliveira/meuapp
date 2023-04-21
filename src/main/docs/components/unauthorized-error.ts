export const unauthorizedError = {
  description: 'Sem autorização',
  content: {
    'application/json': {
      schema: {
        $ref: '#/schemas/error',
      },
    },
  },
};
