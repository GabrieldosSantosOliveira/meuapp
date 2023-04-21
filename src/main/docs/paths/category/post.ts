export const post = {
  tags: ['Category'],
  summary: 'Este endpoint cria um novo author',
  description: 'Esse endpoint pode ser executada por qualquer author',
  requestBody: {
    required: true,
    content: {
      'application/json': {
        schema: {
          $ref: '#/schemas/categoryParams',
        },
      },
    },
  },
  responses: {
    201: {
      description: 'Sucesso author criado',
      content: {
        'application/json': {
          schema: {
            $ref: '#/schemas/category',
          },
        },
      },
    },
    400: {
      $ref: '#/components/badRequest',
    },
    404: {
      $ref: '#/components/notFound',
    },
    500: {
      $ref: '#/components/serverError',
    },
  },
};
