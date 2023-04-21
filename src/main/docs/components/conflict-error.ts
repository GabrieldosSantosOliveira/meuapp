export const conflictError = {
  description: 'Erro de conflito',
  content: {
    'application/json': {
      schema: {
        $ref: '#/schemas/error',
      },
    },
  },
};
